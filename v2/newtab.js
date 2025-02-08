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

    // 🔎 Search Bar - Redirect to default search engine
    document.getElementById("search-bar").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(this.value)}`;
        }
    });

});
