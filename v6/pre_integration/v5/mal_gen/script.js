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

        const recentAnime = data.data.slice(0, 10); // Cap at most recent 50 anime
        allBackgrounds = []; // Clear previous backgrounds

        let currentIndex = 0;
        const fetchCounts = [2, 3, 3, 2]; // Rate-limited fetch pattern
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

                if (!animeData || !animeData.data || !animeData.data.images) {
                    continue;
                }

                const anime = animeData.data;
                allBackgrounds.push(anime.images.jpg.large_image_url); // Store image for tiling mode

                // Create anime button
                const animeWrapper = document.createElement("div");
                animeWrapper.classList.add("anime-wrapper");

                const button = document.createElement("button");
                button.textContent = `${anime.title_english || anime.title}`;
                button.onclick = () => setBackground(anime);

                const closeButton = document.createElement("span");
                closeButton.textContent = "✖";
                closeButton.classList.add("close-button");
                closeButton.onclick = () => animeWrapper.remove();

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

let tiledMode = false;
let allBackgrounds = [];

function setBackground(anime = null) {
    if (!tiledMode && anime) {
        // Single image mode
        document.body.style.backgroundImage = `url(${anime.images.jpg.large_image_url})`;
        document.body.style.backgroundSize = "auto 80vh";
        document.body.style.backgroundPositionY = "0vh";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundColor = "black";
    } else if (tiledMode && allBackgrounds.length > 0) {
        // Use at most 10 images to prevent extreme layering
        const selectedImages = allBackgrounds.slice(0, 10);
        document.body.style.backgroundImage = selectedImages.map(url => `url(${url})`).join(", ");
        document.body.style.backgroundSize = "33% 33%"; // Adjust grid layout
        document.body.style.backgroundRepeat = "no-repeat"; // Prevent full overlap
        document.body.style.backgroundPosition = [
            "0% 0%", "33% 0%", "66% 0%",
            "0% 33%", "33% 33%", "66% 33%",
            "0% 66%", "33% 66%", "66% 66%"
        ].slice(0, selectedImages.length).join(", ");
        document.body.style.backgroundColor = "black";
    }

    // Update status text
    const statusText = document.getElementById("status");
    statusText.textContent = tiledMode
        ? "Tiled background applied!"
        : `Background set to: ${anime ? anime.title : "none"}`;

    // Adjust UI styles
    const headerText = document.getElementById("header");
    headerText.style.backgroundColor = "rgba(255, 192, 239, 0.73)";
    headerText.style.padding = "10px 20px";
    headerText.style.fontSize = "24px";
    headerText.style.color = "black";

    statusText.style.position = "absolute";
    statusText.style.bottom = "75px";
    statusText.style.left = "50%";
    statusText.style.transform = "translateX(-50%)";
    statusText.style.fontSize = "20px";
}



function toggleTiledBackground() {
    tiledMode = !tiledMode;
    document.getElementById("toggle-background-mode").textContent = tiledMode ? "Switch to Single Image" : "Switch to Tiled Mode";

    if (tiledMode) {
        setBackground();
    } else {
        document.body.style.backgroundImage = "";
        document.getElementById("status").textContent = "Select an anime to set as background.";
    }
}
