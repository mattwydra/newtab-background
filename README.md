# Changing my Firefox new tab

This is a repo to house my code for a future firefox extension that I'm creating. The eventual version will support significant customization for your firefox newtab window. This is a passion project, so most of the features are oriented towards things that I'm passionate about, unfortunately. However, I will include detailed descriptions on how to change the code (what to change/where) for those of you who would like to change any features! The search feature works, but I'm currently looking into ways to simulate the top sites functionality on [GitHub pages](https://mattwydra.github.io/newtab-background/). If that's unsuccessful, then I will create video demos for each version. 

**Current version: [6.6](https://mattwydra.github.io/newtab-background/v6/integration/base_code/newtab.html)**

---

### Phase 1: Basic Random Background on New Tab

- **[Version 1](https://mattwydra.github.io/newtab-background/v1/newtab.html)**
- Every time you open a new tab, a random image is selected from a folder or list.

### Phase 2: Background Rotation (Auto-Switch Every 10s)

- **[Version 2.1](https://mattwydra.github.io/newtab-background/v2/newtab.html)**
- Background image changes every 10 seconds.
- Optimization (2b): Only change if the tab is open (so it doesn't kill RAM).

### Phase 3: Adding in top-sites

- Features top sites as commonly seen on firefox, but styled differently.
- **[Version 3.1](https://mattwydra.github.io/newtab-background/v3/v3a/newtab.html)**: Display top-sites with background that changes smoothly between pastel colors.
- **[Version 3.2](https://mattwydra.github.io/newtab-background/v3/v3b/newtab.html)**: Display top-sites in front of the randomly selected background (changes every 10s).
- **[Version 3.3](https://mattwydra.github.io/newtab-background/v3/v3c/newtab.html)**: Display the top-sites in front of the randomly selected background, but the background change is smooth as opposed to jarring.

### Phase 4: Choice of websites

- Choose between custom presets for quick access, or add your own.
- Quick access will be entertainment-focused or productivity-focused.
- Will feature a button to choose which preset.
- **[Version 4.1](https://mattwydra.github.io/newtab-background/v4/v4a/newtab.html)**: Website with presets.
- **[Version 4.2](https://mattwydra.github.io/newtab-background/v4/v4b/newtab.html)**: Introduce funcitonality for custom presets.

### Phase 5: Hopecore Integration

- **[Version 5.1](https://mattwydra.github.io/newtab-background/v5/v5a/newtab.html)**: On new tab load, generate a hopecore image + quote.
- **[Version 5.2](https://mattwydra.github.io/newtab-background/v5/v5b/newtab.html)**: Button to manually generate a new hopecore.
- **[Version 5.3](https://mattwydra.github.io/newtab-background/v5/v5c/newtab.html)**: Auto-regenerate hopecore every 10 seconds.
- **[Version 5.4](https://mattwydra.github.io/newtab-background/v5/v5d/newtab.html)**: Add more sites to the presets, allow for adding/removing from presets, and will support more options:
   - hide bookmarks 
   - add quotes

### Phase 6: Deep Personalization (MAL & Game Data)

**PRE-INTEGRATION:**
- Create working versions of the following features, separate from the main code base (pre-integration)
- **[Version 6.1](https://mattwydra.github.io/newtab-background/v6/pre_integration/v1/index.html):** Fetch 3 recently watched anime from MAL profile and allow user to select their background based on the results.
- **[Version 6.2](https://mattwydra.github.io/newtab-background/v6/pre_integration/v2/index.html):** Handle rate-limitations to generate 10 buttons for 10 most recently watched anime, and make buttons in English.
- **[Version 6.3](https://mattwydra.github.io/newtab-background/v6/pre_integration/v3/index.html):** Enhanced styling for all buttons, and included a button to remove certain results from batch of fetched anime.
- **[Version 6.4](https://mattwydra.github.io/newtab-background/v6/pre_integration/v4/index.html):** Allow for user to choose from 3 versions: MAL profile, choice character, or choice anime.
- **[Version 6.5](https://mattwydra.github.io/newtab-background/v6/pre_integration/v5/index.html):** Create new 'tiled' option to make the background a collage of all 10 most recently watched anime.

**INTEGRATION:**
- **[Version 6.6](https://mattwydra.github.io/newtab-background/v6/integration/base_code/newtab.html):** Integrate phase 6 features into main codebase

### Phase 7: Refactoring and clean up (in development)
- (7a): Centralize re-used code (create packages or classes to call/reference).
- (7b): Fix certain naming schemes for readability, and update presets for top-sites.
- (7c): Fix styling for mobile use if possible.

### Phase 8: More features
- (8a): Link different platforms (MAL, Steam, etc.), adding a button to choose between recently played games or anime.
- (8b): Functionality to automatically rotate between all images (recent anime, games, hopecore, etc.).
- (8c): Enhanced features for all background generation options:
	- For anime gen, options to generate based on favorite shows/characters on MAL profile.
 	- For hopecore gen: option to hide individual elements (search bar, sites, etc.) and option to add images (or videos/gifs, etc.).

## Other information:

### How to use this code:
1. Clone the repository
2. Navigate to ```about:debugging#/runtime/this-firefox```
3. Select 'Load Temporary Add-on...'
4. Navigate to: <path/to/cloned/repo>
5. Navigate to the version you would like to use (e.g.: v5/v5d)
6. Double-click the manifest.json file
7. Crtl+t to open a new tab

### Changing the source code:
Feel free to change the code on your end as much as you please! However, changes may require a restart of the extension. In that case, return to ```about:debugging#/runtime/this-firefox``` and select 'Reload' below the temporary extension.

### How to change the background of your firefox browser without an extension:
Steps:

1. Type about:config in the address bar and set toolkit.legacyUserProfileCustomizations.stylesheets to true.
2. Go to about:support, find Profile Directory, and open it.
3. Create a chrome folder inside the profile directory (if it doesn't exist).
4. Inside the chrome folder, create a file called userChrome.css.
5. Paste the following code:

```css
@-moz-document url("about:newtab"), url("about:home"), url(about:privatebrowsing) {
    body {
        background: url("wallpapers/guts2.jpg") no-repeat center center fixed !important;
        background-size: cover !important;
	      background-repeat: no-repeat !important;
	      background-attachment: fixed !important;
	      background-position-x: center !important;
	      background-position-y: bottom !important;
    }
}

```
