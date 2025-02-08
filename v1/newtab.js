document.addEventListener("DOMContentLoaded", async () => {
    const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];

    function setRandomBackground() {
        const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    setRandomBackground();

    // Fetch Top Sites and display them
    async function loadTopSites() {
        const sites = await browser.topSites.get();
        const container = document.getElementById("top-sites");

        container.innerHTML = ""; // Clear previous

        sites.slice(0, 8).forEach(site => {
            const link = document.createElement("a");
            link.href = site.url;
            link.className = "top-site";
            link.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${site.url}" alt=""> <span>${site.title}</span>`;
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
