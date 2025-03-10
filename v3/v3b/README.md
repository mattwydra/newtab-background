# Version 3b: Random Background Change
Version 3b [zip](https://mattwydra.github.io/newtab-background/v3/v3b/ext3b.zip)

## Overview
This version of the custom new tab page displays top sites against a randomly selected background image, which updates every 10 seconds.

## Features
- **Random Background Image**: The background changes every 10 seconds to a randomly chosen image from a predefined list.
- **Predefined Top Sites**: Displays a curated list of frequently visited sites instead of fetching dynamic top sites.
- **Search Bar**: Enables direct web searches from the new tab page.

## Installation
1. Download or clone the repository.
2. Load the extension in your browser by enabling developer mode and selecting the appropriate folder.
3. Set the custom new tab page as your default.

## How It Works
- JavaScript selects a random image from a predefined list and applies it as the background.
- The background updates every 10 seconds if the tab is active.
- A predefined set of popular websites is displayed as quick-access links.
- The search bar redirects queries to the default search engine.

## Files
- `newtab.html`: The main HTML structure.
- `styles.css`: Defines the layout and styling.
- `newtab.js`: Handles background selection, timed updates, and top-site display.

## Customization
- Modify `newtab.js` to add more background images.
- Edit the list of predefined top sites to fit personal preferences.
- Adjust styles in `styles.css` for different layouts or themes.

# Firefox Validation:
I'm still quite new to writing and publishing browser extensions, so use these at your own risk. However, I have tested all of the zips by uploading them to Firefox and running them through the Firefox validator. I can show the proof that they are considered safe (without errors and without warnings):

![](v3b_validation.png)