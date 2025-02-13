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
        document.body.style.backgroundSize = "cover";
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