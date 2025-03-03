async function fetchAnime() {
    const characterName = document.getElementById("characterName").value;
    const statusText = document.getElementById("status");
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    if (!characterName) {
        statusText.textContent = "Please enter a character.";
        return;
    }
    statusText.textContent = "Please wait, should only take 5 seconds...";

    try {
        const response = await fetch(`https://api.jikan.moe/v4/characters?q=${characterName}&limit=1`);
        const data = await response.json();
        console.log("API Response:", data);

        const character = data.data[0];
        // Get character image
        const characterImageUrl = character.images.jpg.image_url;

        // Set the character's image as the background
        document.body.style.backgroundImage = `url(${characterImageUrl})`;
        document.body.style.backgroundSize = "auto 80vh";
        document.body.style.backgroundPositionY = "0vh";
        document.body.style.backgroundRepeat = "no-repeat";

        const headerText = document.getElementById("header");
        headerText.style.backgroundColor = "rgba(255, 192, 239, 0.73)";
        headerText.style.padding = "10px 20px";
        headerText.style.fontSize = "24px";
        headerText.style.color = "black";

        document.getElementById("status").textContent = `Background set to: ${character.name}`;
        const statusText = document.getElementById("status");
        statusText.style.position = "absolute";
        statusText.style.bottom = "75px"; // Adjust as needed
        statusText.style.left = "50%";
        statusText.style.transform = "translateX(-50%)"; // Center horizontally
        statusText.style.fontSize = "20px";

    } catch (error) {
        statusText.textContent = "Error fetching data. Try again later.";
        console.error("Fetch error:", error);
    }
}

// Select the btn-toggle button
const buttonToggle = document.getElementById("btn-toggle");
let btn_shown = true;

if (buttonToggle) {
    buttonToggle.addEventListener("click", hidebtn);
} else {
    console.error("Generate button not found!");
}

function hidebtn() {
    if (btn_shown) {
        buttonToggle.textContent = "Prompt: HIDDEN";
        document.getElementById("header").innerHTML = "";
        document.getElementById("header").style.backgroundColor = "rgba(255, 192, 239, 0)";
        document.getElementById("header").style.color = "black";
    } else {
        buttonToggle.textContent = "Prompt: SHOWN";
        document.getElementById("header").innerHTML = "Character Background Generator";
        document.getElementById("header").style.backgroundColor = "rgba(255, 192, 239, 0.73)";
        document.getElementById("header").style.color = "black";
        document.getElementById("header").style.padding = "10px 20px";
        document.getElementById("header").style.fontSize = "24px";
        document.getElementById("header").style.width = "20%";
    }
    document.getElementById("characterName").hidden = btn_shown;
    document.getElementById("header").hidden = btn_shown;
    document.getElementById("generate-btn").hidden = btn_shown;
    btn_shown = !btn_shown;
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
    if (HUD_shown) {
        HUDToggle.textContent = "Bookmarks: HIDDEN";
    } else {
        HUDToggle.textContent = "Bookmarks: SHOWN";
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