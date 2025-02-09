document.addEventListener("DOMContentLoaded", () => {
    const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];
    const predefinedSites = [
        { url: "https://www.google.com", title: "Google" },
        { url: "https://www.youtube.com", title: "YouTube" },
        { url: "https://www.reddit.com", title: "Reddit" },
        { url: "https://www.github.com", title: "GitHub" },
        { url: "https://www.wikipedia.org", title: "Wikipedia" }
    ];

    function setRandomBackground() {
        const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    setRandomBackground();
    setInterval(setRandomBackground, 10000);

    const topSitesContainer = document.getElementById("top-sites");

    predefinedSites.forEach(site => {
        const link = document.createElement("a");
        link.href = site.url;
        link.className = "top-site";
        link.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain=${site.url}" alt=""> <span>${site.title}</span>`;
        topSitesContainer.appendChild(link);
    });
});
