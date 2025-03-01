async function fetchAnime() {
    const animeName = document.getElementById("animeName").value;
    const statusText = document.getElementById("status");
    const buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    if (!animeName) {
        statusText.textContent = "Please enter an anime.";
        return;
    }
    statusText.textContent = "Please wait, should only take 5 seconds...";

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${animeName}&limit=1`);
        const data = await response.json();
        console.log("API Response:", data);

        const anime = data.data[0]; // Get the first anime result
        // Get anime image
        const animeImageUrl = anime.images.jpg.large_image_url;

        // Set the anime's image as the background
        document.body.style.backgroundImage = `url(${animeImageUrl})`;
        document.body.style.backgroundSize = "auto 80vh";
        document.body.style.backgroundPositionY = "0vh";
        document.body.style.backgroundRepeat = "no-repeat";

        const headerText = document.getElementById("header");
        headerText.style.backgroundColor = "rgba(255, 192, 239, 0.73)";
        headerText.style.padding = "10px 20px";
        headerText.style.fontSize = "24px";
        headerText.style.color = "black";

        document.getElementById("status").textContent = `Background set to: ${anime.title}`;
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
    } else {
        buttonToggle.textContent = "Prompt: SHOWN";
    }
    document.getElementById("animeName").hidden = btn_shown;
    document.getElementById("header").hidden = btn_shown;
    document.getElementById("generate-btn").hidden = btn_shown;
    btn_shown = !btn_shown;
}
