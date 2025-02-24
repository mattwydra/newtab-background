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

        const fetchBatch = async () => {
            if (currentIndex >= recentAnime.length) {
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

                // Create a wrapper div for the button and close button
                const animeWrapper = document.createElement("div");
                animeWrapper.classList.add("anime-wrapper");

                // Create the anime button
                const button = document.createElement("button");
                button.textContent = `${anime.title_english || anime.title}`;
                button.onclick = () => setBackground(anime);

                // Create the 'x' button
                const closeButton = document.createElement("span");
                closeButton.textContent = "✖"; // Unicode 'X' character
                closeButton.classList.add("close-button");
                closeButton.onclick = () => animeWrapper.remove();

                // Append button and close button to the wrapper
                animeWrapper.appendChild(button);
                animeWrapper.appendChild(closeButton);
                buttonContainer.appendChild(animeWrapper);
            }

            currentIndex += fetchCount;
            fetchPatternIndex = (fetchPatternIndex + 1) % fetchCounts.length;

            if (currentIndex < recentAnime.length) {
                setTimeout(fetchBatch, 3000); // Wait 3 seconds
            } else {
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

    const headerText = document.getElementById("header");
    headerText.style.backgroundColor = "rgba(255, 192, 239, 0.73)";
    headerText.style.padding = "10px 20px";
    headerText.style.fontSize = "24px";
    headerText.style.color = "black";

    document.getElementById("status").textContent = `Background set to: ${anime.title}`;
    const statusText = document.getElementById("status");
    statusText.style.position = "absolute";
    statusText.style.bottom = "75px"; // Adjust as needed
    statusText.style.left = "50%";
    statusText.style.transform = "translateX(-50%)"; // Center horizontally
    statusText.style.fontSize = "20px";
}

// Select the MAL-toggle button
const MALToggle = document.getElementById("MAL-toggle");
let MAL_shown = true;

if (MALToggle) {
    MALToggle.addEventListener("click", hideMAL);
} else {
    console.error("Generate button not found!");
}

function hideMAL() {
    if (MAL_shown) {
        MALToggle.textContent = "MAL Prompt: HIDDEN";
    } else {
        MALToggle.textContent = "MAL Prompt: SHOWN";
    }
    document.getElementById("username").hidden = MAL_shown;
    document.getElementById("header").hidden = MAL_shown;
    document.getElementById("generate-btn").hidden = MAL_shown;
    MAL_shown = !MAL_shown;
}
