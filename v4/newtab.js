document.addEventListener("DOMContentLoaded", () => {
    const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];
    const categories = {
        productivity: [
            { url: "https://www.notion.so", title: "Notion" },
            { url: "https://docs.google.com", title: "Google Docs" },
            { url: "https://calendar.google.com", title: "Google Calendar" },
            { url: "https://todoist.com", title: "Todoist" },
            { url: "https://www.wikipedia.org", title: "Wikipedia" },
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
        const topSitesContainer = document.getElementById("top-sites");
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

    document.getElementById("category-buttons").addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            renderSites(e.target.dataset.category);
        }
    });

    document.getElementById("add-site-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("custom-url").value;
        const title = document.getElementById("custom-title").value;
        if (url && title) addCustomSite(url, title);
    });

    setRandomBackground();
    setInterval(setRandomBackground, 10000);
    renderSites("productivity"); // Default category
});
