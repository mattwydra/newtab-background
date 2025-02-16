# Changing my Firefox new tab

This is a repo to house my code for a future firefox extension that I'm creating. The eventual version will support significant customization for your firefox newtab window. This is a passion project, so most of the features are oriented towards things that I'm passionate about, unfortunately. However, I will include detailed descriptions on how to change the code (what to change/where) for those of you who would like to change any features! The search feature works, but I'm currently looking into ways to simulate the top sites functionality on [GitHub pages](https://mattwydra.github.io/newtab-background/). If that's unsuccessful, then I will create video demos for each version. 

**Current version: [5.1](https://mattwydra.github.io/newtab-background/v5/v5c/newtab.html)**

---

### Phase 1: Basic Random Background on New Tab

- [Version 1](https://mattwydra.github.io/newtab-background/v1/newtab.html)
- Every time you open a new tab, a random image is selected from a folder or list.

### Phase 2: Background Rotation (Auto-Switch Every 10s)

- [Version 2.1](https://mattwydra.github.io/newtab-background/v2/newtab.html)
- Background image changes every 10 seconds.
- Optimization (2b): Only change if the tab is open (so it doesn't kill RAM).

### Phase 3: Adding in top-sites

- Features top sites as commonly seen on firefox, but styled differently.
- **[3.1](https://mattwydra.github.io/newtab-background/v3/v3a/newtab.html)**: Display top-sites with background that changes smoothly between pastel colors.
- **[3.2](https://mattwydra.github.io/newtab-background/v3/v3b/newtab.html)**: Display top-sites in front of the randomly selected background (changes every 10s).
- **[3.3](https://mattwydra.github.io/newtab-background/v3/v3c/newtab.html)**: Display the top-sites in front of the randomly selected background, but the background change is smooth as opposed to jarring.

### Phase 4: Choice of websites

- Choose between custom presets for quick access, or add your own.
- Quick access will be entertainment-focused or productivity-focused.
- Will feature a button to choose which preset.
- **[4.1](https://mattwydra.github.io/newtab-background/v4/v4a/newtab.html)**: Website with presets.
- **[4.2](https://mattwydra.github.io/newtab-background/v4/v4b/newtab.html)**: Introduce funcitonality for custom presets.

### Phase 5: Hopecore Integration

- **[5.1](https://mattwydra.github.io/newtab-background/v5/v5a/newtab.html)**: On new tab load, generate a hopecore image + quote.
- **[5.2](https://mattwydra.github.io/newtab-background/v5/v5b/newtab.html)**: Button to manually generate a new hopecore.
- **[5.3](https://mattwydra.github.io/newtab-background/v5/v5c/newtab.html)**: Auto-regenerate hopecore every 10 seconds.
- **[5.4](https://mattwydra.github.io/newtab-background/v5/v5d/newtab.html) (Partial Implementation)**: Add more sites to the presets, allow for adding/removing from presets, and will support more options:
   - hide bookmarks 
   - hide individual elements (search bar, sites, etc.)
   - add images (or videos/gifs, etc.)
   - add quotes

### Phase 6: Deep Personalization (MAL & Game Data)

- (6a): Fetch recent anime from MAL profile and use images from most recently watched shows.
- (6b): Link different platforms (MAL, Steam, etc.), adding a button to choose between recently played games or anime.
- (6c): Select from the most recent 3-5 anime/games (toggle buttons).
- (6d): Automatically rotate between all images (recent anime, games, hopecore, etc.).

## Other information:

### How to use this code:
1. Clone the repository
2. Navigate to ```about:debugging#/runtime/this-firefox```
3. Select 'Load Temporary Add-on...'
4. Navigate to: <path/to/cloned/repo>/<version>
5. Double-click the manifest.json file
6. Crtl+t to open a new tab

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
