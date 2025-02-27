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
        link.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${site.url}" alt=""> <span>${site.title}</span>`;
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
        // const topSitesContainer = document.getElementById("top-sites");
        topSitesContainer.innerHTML = "";

        categories[category].forEach(site => {
            const link = document.createElement("a");
            link.href = site.url;
            link.className = "top-site";
            link.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${site.url}" alt=""> <span>${site.title}</span>`;
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

    document.getElementById("btn-productivity").addEventListener("click", (e) => {
        renderSites("productivity");
    });
    document.getElementById("btn-gaming").addEventListener("click", (e) => {
        renderSites("gaming");
    });
    document.getElementById("btn-media").addEventListener("click", (e) => {
        renderSites("media");
    });
    document.getElementById("btn-custom").addEventListener("click", () => {
        renderSites("custom");
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
        resultContainer.innerHTML = "";
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


// Run on page load
document.addEventListener("DOMContentLoaded", generateHopecore);