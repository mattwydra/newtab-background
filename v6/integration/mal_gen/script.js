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

            // Create a container for the buttons if it doesn't exist
            let buttonWrapper = document.getElementById("button-wrapper");
            if (!buttonWrapper) {
                buttonWrapper = document.createElement("div");
                buttonWrapper.id = "button-wrapper";
                document.body.appendChild(buttonWrapper);
            }

            // No need to clear buttonWrapper here—just append new buttons
            for (const entry of batch) {
                const animeId = entry.entry.mal_id;
                const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
                const animeData = await animeResponse.json();

                if (!animeData || !animeData.data || !animeData.data.images) {
                    continue;
                }

                const anime = animeData.data;
                allBackgrounds.push(anime.images.jpg.large_image_url);

                // Create a wrapper div for each button
                const animeWrapper = document.createElement("div");
                animeWrapper.classList.add("anime-wrapper");

                // Create the button
                const button = document.createElement("button");
                button.textContent = `${anime.title_english || anime.title}`;
                button.onclick = () => setBackground(anime);

                // Create the close button
                const closeButton = document.createElement("span");
                closeButton.textContent = "✖";
                closeButton.classList.add("close-button");
                closeButton.onclick = () => animeWrapper.remove();

                // Append elements
                animeWrapper.appendChild(button);
                animeWrapper.appendChild(closeButton);
                buttonWrapper.appendChild(animeWrapper);
            }



            currentIndex += fetchCount;
            fetchPatternIndex = (fetchPatternIndex + 1) % fetchCounts.length;

            if (currentIndex < recentAnime.length) {
                setTimeout(fetchBatch, 1700); // Wait 1.7 seconds (rate-limitations)
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
    const animeButtons = document.querySelectorAll(".anime-button, .close-button, .anime-wrapper");
    animeButtons.forEach(button => {
        button.style.opacity = tiledMode ? "0%" : "100%";
    });
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

    const animeButtons = document.querySelectorAll(".anime-button, .close-button, .anime-wrapper");
    if (MAL_shown) {
        MALToggle.textContent = "MAL Prompt: HIDDEN";
        // Hide elements
        document.getElementById("username").hidden = true;
        document.getElementById("header").innerHTML = "";
        document.getElementById("header").style.backgroundColor = "rgba(255, 192, 239, 0)";
        document.getElementById("header").style.color = "black";
        document.getElementById("generate-btn").hidden = true;
        document.getElementById("toggle-background-mode").hidden = true;
        animeButtons.forEach(button => {
            button.style.opacity = "0%";
        });
    } else {
        MALToggle.textContent = "MAL Prompt: SHOWN";
        // Show elements
        document.getElementById("username").hidden = false;
        document.getElementById("header").innerHTML = "MyAnimeList Background Generator";
        document.getElementById("header").style.backgroundColor = "rgba(255, 192, 239, 0.73)";
        document.getElementById("header").style.color = "black";
        document.getElementById("header").style.padding = "10px 20px";
        document.getElementById("header").style.fontSize = "24px";
        document.getElementById("header").style.width = "20%";
        document.getElementById("generate-btn").hidden = false;
        document.getElementById("toggle-background-mode").hidden = false;
        animeButtons.forEach(button => {
            button.style.opacity = "100%";
        });
    }
    // Toggle the MAL_shown state after updating the visibility of elements
    MAL_shown = !MAL_shown;
}


// v5d integration:

document.addEventListener("DOMContentLoaded", () => {
    const topSitesContainer = document.getElementById("top-sites");

    const predefinedSites = [
        { url: "https://www.google.com", title: "Google" },
        { url: "https://www.youtube.com", title: "YouTube" },
        { url: "https://www.speedtest.net/", title: "Speed Test" },
        { url: "https://www.github.com", title: "GitHub" },
        { url: "https://mattwydra.github.io/projects/", title: "Minigames" },
        { url: "https://mattwydra.github.io/about-me/", title: "About Me" },
        { url: "https://mattwydra.github.io/LLM-integration/", title: "Media Recs" },
        { url: "https://github.com/mattwydra/discord_bots", title: "Bots Repo" },
        { url: "https://leetcode.com/", title: "LeetCode" },
        { url: "https://neetcode.io/", title: "NeetCode" },
        { url: "https://www.wikipedia.org", title: "Wikipedia" },
        { url: "https://discord.com/", title: "Discord" },
        { url: "https://mail.google.com/mail", title: "Mail" },
        { url: "https://www.linkedin.com", title: "LinkedIn" },
        { url: "https://codesandbox.io", title: "CodeSandbox" },
        { url: "https://www.amazon.com", title: "Amazon" },

    ];
    predefinedSites.forEach(site => {
        const link = document.createElement("a");
        link.href = site.url;
        link.className = "top-site";

        // Create image element safely
        const img = document.createElement("img");
        img.src = `https://www.google.com/s2/favicons?sz=64&domain=${site.url}`;
        img.alt = "";

        // Create span for text safely
        const span = document.createElement("span");
        span.textContent = site.title; // Prevents unwanted HTML execution

        // Append elements to the link
        link.appendChild(img);
        link.appendChild(span);

        // Append link to the container
        topSitesContainer.appendChild(link);
    });


    const categories = {
        productivity: [
            { url: "https://humanbenchmark.com/", title: "Human Benchmark" },
            { url: "https://docs.google.com", title: "Google Docs" },
            { url: "https://calendar.google.com", title: "Google Calendar" },
            { url: "https://todoist.com", title: "Todoist" },
            { url: "https://www.github.com", title: "GitHub" }
        ],
        gaming: [
            { url: "https://store.steampowered.com", title: "Steam" },
            { url: "https://www.twitch.tv", title: "Twitch" },
            { url: "https://www.reddit.com/r/gaming", title: "Reddit Gaming" },
            { url: "https://discord.com", title: "Discord" },
            { url: "https://www.youtube.com/gaming", title: "YouTube Gaming" },
        ],
        media: [
            { url: "https://www.youtube.com", title: "YouTube" },
            { url: "https://www.spotify.com", title: "Spotify" },
            { url: "https://www.netflix.com", title: "Netflix" },
            { url: "https://www.hulu.com", title: "Hulu" },
            { url: "https://letterboxd.com", title: "Letterboxd" },
        ],
        custom: JSON.parse(localStorage.getItem("customSites")) || []
    };

    function renderSites(category) {
        topSitesContainer.replaceChildren(); // Clears existing elements safely

        categories[category].forEach(site => {
            const link = document.createElement("a");
            link.href = site.url;
            link.className = "top-site";

            // Create image element safely
            const img = document.createElement("img");
            img.src = `https://www.google.com/s2/favicons?sz=64&domain=${site.url}`;
            img.alt = "";

            // Create span for text safely
            const span = document.createElement("span");
            span.textContent = site.title; // Prevents unwanted HTML execution

            // Append elements to the link
            link.appendChild(img);
            link.appendChild(span);

            // Append link to the container
            topSitesContainer.appendChild(link);
        });
    }

    function addCustomSite(url, title) {
        const newSite = { url, title };

        // Update categories & localStorage
        categories.custom.push(newSite);
        localStorage.setItem("customSites", JSON.stringify(categories.custom));

        // Re-render the custom sites
        renderSites("custom");
    }

    document.getElementById("btn-default").addEventListener("click", () => {
        topSitesContainer.replaceChildren(); // Clears existing elements safely

        predefinedSites.forEach(site => {
            const link = document.createElement("a");
            link.href = site.url;
            link.className = "top-site";

            // Create image element safely
            const img = document.createElement("img");
            img.src = `https://www.google.com/s2/favicons?sz=64&domain=${site.url}`;
            img.alt = "";

            // Create span for text safely
            const span = document.createElement("span");
            span.textContent = site.title; // Prevents unwanted HTML execution

            // Append elements to the link
            link.appendChild(img);
            link.appendChild(span);

            // Append link to the container
            topSitesContainer.appendChild(link);
        });
    });

    document.getElementById("btn-productivity").addEventListener("click", (e) => {
        renderSites("productivity");
        curPreset = 1;
    });
    document.getElementById("btn-gaming").addEventListener("click", (e) => {
        renderSites("gaming");
        curPreset = 2;
    });
    document.getElementById("btn-media").addEventListener("click", (e) => {
        renderSites("media");
        curPreset = 3;
    });
    document.getElementById("btn-custom").addEventListener("click", () => {
        renderSites("custom");
        curPreset = 4;
    });

    // 🔎 Search Bar - Redirect to default search engine
    document.getElementById("search-bar").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(this.value)}`;
        }
    });

    document.getElementById("custom-bookmarks").addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("custom-url").value;
        const title = document.getElementById("custom-title").value;
        if (url && title) addCustomSite(url, title);
    });
});

let curPreset = 0;

console.log("Script is loaded!");

// Select the HUD-toggle button
const HUDToggle = document.getElementById("HUD-toggle");
let HUD_shown = true;

if (HUDToggle) {
    HUDToggle.addEventListener("click", hideHUD);
} else {
    console.error("Generate button not found!");
}

function hideHUD() {
    let searchBar = document.getElementById("searh")
    if (HUD_shown) {
        HUDToggle.textContent = "Bookmarks: HIDDEN";
    } else {
        HUDToggle.textContent = "Bookmarks: SHOWN";
        // renderHelper(curPreset);
    }
    document.getElementById("btn-default").hidden = HUD_shown;
    document.getElementById("btn-productivity").hidden = HUD_shown;
    document.getElementById("btn-gaming").hidden = HUD_shown;
    document.getElementById("btn-media").hidden = HUD_shown;
    document.getElementById("btn-custom").hidden = HUD_shown;
    document.getElementById("custom-bookmarks").hidden = HUD_shown;
    document.getElementById("top-sites").replaceChildren();
    HUD_shown = !HUD_shown;
}