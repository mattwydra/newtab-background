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

    // Potential future elegant solution (needs fixing):
    /*
    function renderHelper(presetNum) {
        switch (presetNum) {
            case 1:
                renderSites("productivity");
                break;
            case 2:
                renderSites("gaming");
                break;
            case 3:
                renderSites("media");
                break;
            case 4:
                renderSites("custom");
                break;
            default:
                topSitesContainer.innerHTML = "";
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
        }
    } 
    */

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

// GitHub raw paths for images
const regularImagePath = "https://raw.githubusercontent.com/gymney/hopecore/main/assets/hc";
const specialImagePath = "https://raw.githubusercontent.com/gymney/hopecore/main/assets/daily-reminder-that-you-will-have-this";

// Function to fetch and parse the quotes file
async function getQuotes() {
    try {
        const response = await fetch("./assets/quotes.txt");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        return text.split("\n").filter(line => line.trim() !== "");
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
}

// Function to get a random image URL from GitHub
async function getRandomImage(folderPath) {
    const apiUrl = `https://api.github.com/repos/gymney/hopecore/contents/${folderPath}`;
    try {
        const response = await fetch(apiUrl);
        if (response.status === 404) return "";
        const files = await response.json();
        if (!Array.isArray(files)) return "";

        const imageFilenames = files
            .filter(file => file.name.toLowerCase().endsWith('.png'))
            .map(file => file.name);

        if (imageFilenames.length === 0) return "";

        const randomIndex = Math.floor(Math.random() * imageFilenames.length);
        return `${folderPath}/${imageFilenames[randomIndex]}`;
    } catch (error) {
        console.error("Error fetching image filenames:", error);
        return "";
    }
}

// Function to generate the hopecore content
async function generateHopecore() {
    try {
        const quotes = await getQuotes();
        if (quotes.length === 0) return;

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].trim();
        const isSpecialQuote = randomQuote.toLowerCase() === "daily reminder that you will have this";
        const folderPath = isSpecialQuote ? "assets/daily-reminder-that-you-will-have-this" : "assets/hc";
        const imageUrl = await getRandomImage(folderPath);
        if (!imageUrl) return;

        // Set background image
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = "contain";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        // Update the quote
        const resultContainer = document.getElementById("result");
        resultContainer.replaceChildren();
        const quoteElement = document.createElement("div");
        quoteElement.textContent = randomQuote;
        quoteElement.style.textAlign = "center";
        quoteElement.style.fontSize = "24px";
        quoteElement.style.fontWeight = "bold";
        quoteElement.style.color = "lavender";
        quoteElement.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)";
        quoteElement.style.marginTop = "20px";
        quoteElement.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        quoteElement.style.padding = "10px";
        quoteElement.style.borderRadius = "5px";
        quoteElement.style.position = "absolute";
        quoteElement.style.top = "20px";
        quoteElement.style.left = "50%";
        quoteElement.style.transform = "translateX(-50%)";


        resultContainer.appendChild(quoteElement);
    } catch (error) {
        console.error("Error generating hopecore content:", error);
    }
}

// Select the generate button
const generateButton = document.getElementById("hopecore-link");

// Attach event listeners
if (generateButton) {
    generateButton.addEventListener("click", generateHopecore);
} else {
    console.error("Generate button not found!");
}

// Select the auto-toggle button
const autoToggle = document.getElementById("auto-toggle");

// Create toggle variables
let autogen = false;
var autoGenRefreshId;

// Attach event listeners
if (autoToggle) {
    autoToggle.addEventListener("click", () => {
        autogen = !autogen;
        if (autogen) {
            autoGenerate();
            autoToggle.textContent = "auto generate: ON";
        }
        else {
            autoToggle.textContent = "auto generate: OFF";
            clearInterval(autoGenRefreshId);
        }
    });
} else {
    console.error("Generate button not found!");
}

async function autoGenerate() {
    autoGenRefreshId = setInterval(generateHopecore, 10000);
}

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
        HUDToggle.textContent = "hide bookmarks: ON";
    } else {
        HUDToggle.textContent = "hide bookmarks: OFF";
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

// Run on page load
document.addEventListener("DOMContentLoaded", generateHopecore);