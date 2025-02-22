/* script.js */
async function fetchAnime() {
    const username = document.getElementById("username").value;
    const statusText = document.getElementById("status");
    if (!username) {
        statusText.textContent = "Please enter a MAL username.";
        return;
    }
    statusText.textContent = "Loading...";
    try {
        const response = await fetch(`https://api.jikan.moe/v4/users/${username}/history/anime`);
        const data = await response.json();
        console.log("API Response:", data); // Debugging line

        if (!data || !data.data || data.data.length === 0) {
            statusText.textContent = "No recent anime history found.";
            return;
        }

        const animeId = data.data[0].entry.mal_id;
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const animeData = await animeResponse.json();
        console.log("Anime Details Response:", animeData);

        if (!animeData || !animeData.data || !animeData.data.images) {
            statusText.textContent = "Could not retrieve anime details.";
            return;
        }

        const anime = animeData.data;
        document.body.style.backgroundImage = `url(${anime.images.jpg.large_image_url})`;
        document.body.style.backgroundSize = "auto 80vh";
        document.body.style.backgroundPositionY = "0vh";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundColor = "black";

        statusText.textContent = `Background set to: ${anime.title}`;
    } catch (error) {
        statusText.textContent = "Error fetching data. Try again later.";
        console.error("Fetch error:", error);
    }
}
