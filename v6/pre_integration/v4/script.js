/* script.js */
async function fetchAnime() {
    const username = document.getElementById("username").value;
    const statusText = document.getElementById("status");
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    if (!username) {
        statusText.textContent = "Please enter a MAL username.";
        return;
    }
    statusText.textContent = "Please wait, should only take 5 seconds...";

    try {
        const response = await fetch(`https://api.jikan.moe/v4/users/${username}/history/anime`);
        const data = await response.json();
        console.log("API Response:", data);

        if (!data || !data.data || data.data.length === 0) {
            statusText.textContent = "No recent anime history found.";
            return;
        }

        const recentAnime = data.data.slice(0, 10); // Get the first 10 anime history entries

        let currentIndex = 0;
        const fetchCounts = [2, 3, 3, 2]; // The rate-limited fetch pattern
        let fetchPatternIndex = 0;

        // Function to handle fetching in batches
        const fetchBatch = async () => {
            if (currentIndex >= recentAnime.length) {
                // Only update the status text once all anime have been processed
                statusText.textContent = "Select an anime to set as background.";
                return;
            }

            const fetchCount = fetchCounts[fetchPatternIndex];
            const batch = recentAnime.slice(currentIndex, currentIndex + fetchCount);

            for (const entry of batch) {
                const animeId = entry.entry.mal_id;
                const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
                const animeData = await animeResponse.json();
                console.log("Anime Details Response:", animeData);

                if (!animeData || !animeData.data || !animeData.data.images) {
                    continue;
                }

                const anime = animeData.data;
                const button = document.createElement("button");
                button.textContent = `${anime.title_english || anime.title}`;
                button.onclick = () => setBackground(anime);
                buttonContainer.appendChild(button);
            }

            currentIndex += fetchCount;
            fetchPatternIndex = (fetchPatternIndex + 1) % fetchCounts.length;

            if (currentIndex < recentAnime.length) {
                // Wait for a specified time before continuing
                setTimeout(fetchBatch, 1500); // Wait 1.5 seconds
            } else {
                // All requests are done, update the status text now
                statusText.textContent = "Select an anime to set as background.";
            }
        };

        fetchBatch();
    } catch (error) {
        statusText.textContent = "Error fetching data. Try again later.";
        console.error("Fetch error:", error);
    }
}

function setBackground(anime) {
    document.body.style.backgroundImage = `url(${anime.images.jpg.large_image_url})`;
    document.body.style.backgroundSize = "auto 80vh";
    document.body.style.backgroundPositionY = "0vh";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundColor = "black";
    document.getElementById("status").textContent = `Background set to: ${anime.title}`;
}
