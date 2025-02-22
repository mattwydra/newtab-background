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
    statusText.textContent = "Loading...";
    try {
        const response = await fetch(`https://api.jikan.moe/v4/users/${username}/history/anime`);
        const data = await response.json();
        console.log("API Response:", data);

        if (!data || !data.data || data.data.length === 0) {
            statusText.textContent = "No recent anime history found.";
            return;
        }

        const recentAnime = data.data.slice(0, 5); // Get last 5 anime

        for (const entry of recentAnime) {
            const animeId = entry.entry.mal_id;
            const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
            const animeData = await animeResponse.json();
            console.log("Anime Details Response:", animeData);

            if (!animeData || !animeData.data || !animeData.data.images) {
                continue;
            }

            const anime = animeData.data;
            const button = document.createElement("button");
            button.textContent = `${anime.title} (${anime.title_japanese || "N/A"})`;
            button.onclick = () => setBackground(anime);
            buttonContainer.appendChild(button);
        }

        statusText.textContent = "Select an anime to set as background.";
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
