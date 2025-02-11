# Version 3A: Pastel Gradient Background

## Overview
This version of the custom new tab page displays top sites while the background smoothly transitions between pastel colors. The background color changes continuously in a smooth loop to create a visually appealing experience.

## Features
- **Dynamic Pastel Gradient Background**: The background transitions smoothly between different pastel colors using CSS animations.
- **Top Sites Display**: Retrieves and displays the user's most visited websites using the browser's `topSites` API.
- **Search Bar**: Allows users to perform web searches directly from the new tab page.

## Installation
1. Download or clone the repository.
2. Load the extension in your browser by enabling developer mode and selecting the appropriate folder.
3. Set the custom new tab page as your default.

## How It Works
- The background color transitions smoothly using CSS keyframe animations.
- JavaScript fetches the user's top sites and displays them as clickable links.
- A search bar enables quick searches via the user's default search engine.

## Files
- `newtab.html`: The main HTML structure.
- `styles.css`: Defines the smooth color transition for the background and styling for top sites.
- `newtab.js`: Handles fetching top sites and setting up search functionality.

## Customization
- Modify `styles.css` to change the colors in the animation sequence.
- Adjust `newtab.js` if additional features are needed.
