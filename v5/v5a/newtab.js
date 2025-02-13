document.addEventListener("DOMContentLoaded", () => {
    const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];

    setRandomBackground();
    setInterval(setRandomBackground, 10000);

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

    function setRandomBackground() {
        const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

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


    document.getElementById("custom-bookmarks").addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("custom-url").value;
        const title = document.getElementById("custom-title").value;
        if (url && title) addCustomSite(url, title);
    });

    setRandomBackground();
    setInterval(setRandomBackground, 10000);
    renderSites("productivity"); // Default category
});


console.log("Script is loaded!");

// Select the generate button
const generateButton = document.getElementById("hopecore-link");

// Correct GitHub raw paths for images (using the updated repo links)
const regularImagePath = "https://raw.githubusercontent.com/gymney/hopecore/main/assets/hc";
const specialImagePath = "https://raw.githubusercontent.com/gymney/hopecore/main/assets/daily-reminder-that-you-will-have-this";

// Function to fetch and parse the quotes file
async function getQuotes() {
    try {
        console.log("Fetching quotes...");
        const response = await fetch("./assets/quotes.txt"); // Adjust path if needed
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        console.log("Quotes fetched successfully!");
        return text.split("\n").filter((line) => line.trim() !== "");
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

        // If the folder doesn't exist or is empty, return an empty string
        if (response.status === 404) {
            console.error(`Folder "${folderPath}" not found.`);
            return "";
        }

        const files = await response.json();

        if (!Array.isArray(files)) {
            console.error("Unexpected response format:", files);
            return "";
        }

        // Filter for .png and .PNG files (case-insensitive)
        const imageFilenames = files
            .filter(file => file.name.toLowerCase().endsWith('.png'))
            .map(file => file.name);

        if (imageFilenames.length === 0) {
            console.error("No images found in the folder!");
            return "";
        }

        const randomIndex = Math.floor(Math.random() * imageFilenames.length);
        const imageName = imageFilenames[randomIndex];
        return `${folderPath}/${imageName}`;
    } catch (error) {
        console.error("Error fetching image filenames:", error);
        return "";
    }
}

// Function to generate the hopecore content
async function generateHopecore() {
    try {
        console.log("Generating hopecore content...");

        // Load quotes
        const quotes = await getQuotes();
        if (quotes.length === 0) {
            console.error("No quotes available!");
            return;
        }

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].trim();
        console.log("Random quote selected:", randomQuote);

        const isSpecialQuote = randomQuote.toLowerCase() === "daily reminder that you will have this";
        console.log("Is this a special quote?", isSpecialQuote);

        const folderPath = isSpecialQuote ? "assets/daily-reminder-that-you-will-have-this" : "assets/hc";
        const imageUrl = await getRandomImage(folderPath);
        if (!imageUrl) return;

        console.log("Random image URL:", imageUrl);

        // Create and display the image and quote
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = "Generated Hopecore Image";
        imageElement.style.margin = "14px auto";
        imageElement.style.display = "block"; // Ensures the image is centered
        imageElement.style.maxWidth = "80%"; // Responsive sizing
        imageElement.style.height = "auto"; // Maintain aspect ratio

        const quoteElement = document.createElement("div");
        quoteElement.textContent = randomQuote;
        quoteElement.style.marginTop = "25px";
        quoteElement.style.textAlign = "center"; // Center text by default

        const resultContainer = document.getElementById("result");
        resultContainer.innerHTML = "";
        resultContainer.appendChild(quoteElement);
        resultContainer.appendChild(imageElement);

        // Adjust the quote width after the image loads
        imageElement.onload = () => {
            const imageWidth = imageElement.offsetWidth; // Get the rendered width of the image
            quoteElement.style.maxWidth = `${imageWidth}px`; // Match the quote's max width to the image
            quoteElement.style.margin = "0 auto"; // Center the quote below the image
        };

        console.log("Hopecore content generated successfully!");
    } catch (error) {
        console.error("Error generating hopecore content:", error);
    }
}


// Attach the event listener
if (generateButton) {
    generateButton.addEventListener("click", generateHopecore);
} else {
    console.error("Generate button not found!");
}
