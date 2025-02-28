async function fetchAnime() {
    const username = document.getElementById("username").value;
    const statusText = document.getElementById("status");
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    if (!username) {
        statusText.textContent = "Please enter a MAL username.";
        return;
    }
    statusText.textContent = "Please wait, gathering titles... tiling won't properly work until all have been fetched";

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
                setTimeout(fetchBatch, 1500); // Wait 3 seconds
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

const backgroundContainer = document.getElementById("background-container");

function setBackground(anime = null) {
    backgroundContainer.innerHTML = ""; // Clear previous images

    if (!tiledMode && anime) {
        // Single image mode
        const imgDiv = document.createElement("div");
        imgDiv.className = "background-image";
        imgDiv.style.backgroundImage = `url(${anime.images.jpg.large_image_url})`;
        imgDiv.style.backgroundPosition = ""; // Reset position
        imgDiv.style.width = "30vw";
        imgDiv.style.height = "60vh";
        imgDiv.style.backgroundRepeat = "no-repeat";
        imgDiv.style.backgroundColor = "black";
        backgroundContainer.appendChild(imgDiv);
    } else if (tiledMode && allBackgrounds.length > 0) {
        // Multi-image mode (grid)
        allBackgrounds.slice(0, 10).forEach(url => {
            const imgDiv = document.createElement("div");
            imgDiv.className = "background-image";
            imgDiv.style.backgroundImage = `url(${url})`;
            backgroundContainer.appendChild(imgDiv);
        });
    }


    // // If switching back to single mode, auto-select the most recent anime
    // if (!tiledMode && allBackgrounds.length > 0) {
    //     const mostRecentAnime = document.querySelector(".anime-button"); // First anime button
    //     if (mostRecentAnime) {
    //         console.log("Simulating click on:", mostRecentAnime.textContent); // Debug log
    //         mostRecentAnime.click();
    //     } else {
    //         console.log("No anime button found");
    //     }
    // }



    // Update status text
    const statusText = document.getElementById("status");
    statusText.textContent = tiledMode
        ? "Tiled background (2x5) applied!"
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
        // Hide elements
        document.getElementById("username").hidden = true;
        document.getElementById("header").hidden = true;
        document.getElementById("generate-btn").hidden = true;
        document.getElementById("toggle-background-mode").hidden = true;
    } else {
        MALToggle.textContent = "MAL Prompt: SHOWN";
        // Show elements
        document.getElementById("username").hidden = false;
        document.getElementById("header").hidden = false;
        document.getElementById("generate-btn").hidden = false;
        document.getElementById("toggle-background-mode").hidden = false;
    }
    // Toggle the MAL_shown state after updating the visibility of elements
    MAL_shown = !MAL_shown;
}