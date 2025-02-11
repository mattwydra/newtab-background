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
        categories.custom.push({ url, title });
        localStorage.setItem("customSites", JSON.stringify(categories.custom));
        renderSites("custom");
    }

    // document.getElementById("category-buttons").addEventListener("click", (e) => {
    //     if (e.target.tagName === "BUTTON") {
    //         renderSites(e.target.dataset.category);
    //     }
    // });

    document.getElementById("btn-productivity").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            renderSites("productivity");
        }
    });
    document.getElementById("btn-gaming").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            renderSites("gaming");
        }
    });
    document.getElementById("btn-media").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            renderSites("media");
        }
    });
    // document.getElementById("btn-custom").addEventListener("click", (e) => {
    //     if (e.target.tagName === "BUTTON") {
    //         renderSites(e.target.dataset.category);
    //     }
    // });

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
