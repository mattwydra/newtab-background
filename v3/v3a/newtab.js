document.addEventListener("DOMContentLoaded", async () => {
    const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];

    function setRandomBackground() {
        const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    setRandomBackground();

    let isTabActive = true;

    document.addEventListener("visibilitychange", () => {
        isTabActive = !document.hidden;
    });

    setInterval(() => {
        if (isTabActive) {
            setRandomBackground();
        }
    }, 10000);

    // Fetch Top Sites and display them
    async function loadTopSites() {
        const sites = await browser.topSites.get();
        const container = document.getElementById("top-sites");

        container.textContent = ""; // Clear previous

        sites.forEach(site => {
            const siteTitle = site.title || site.url.replace(/https?:\/\/(www\.)?/, "");
            const link = document.createElement("a");
            link.href = site.url;
            link.className = "top-site";
            link.textContent = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${site.url}" alt=""> <span>${siteTitle}</span>`;
            container.appendChild(link);
        });
    }

    loadTopSites();

    // 🔎 Search Bar - Redirect to default search engine
    document.getElementById("search-bar").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(this.value)}`;
        }
    });

});
