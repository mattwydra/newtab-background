# **Phase 4: Choice of Websites**
### **Objective:**
- **[v4a](https://mattwydra.github.io/newtab-background/v4/v4a/newtab.html)**Allow users to select different categories (Productivity, Gaming, Media, Custom).
- **[v4b](https://mattwydra.github.io/newtab-background/v4/v4b/newtab.html)**Enable users to add custom bookmarks.

### **Implementation:**
- Add buttons for category selection.
- Implement a form to allow adding custom sites.
- Store custom sites in `localStorage`.

### **Code Implementation:**
```javascript
const categories = { custom: JSON.parse(localStorage.getItem("customSites")) || [] };

function addCustomSite(url, title) {
    categories.custom.push({ url, title });
    localStorage.setItem("customSites", JSON.stringify(categories.custom));
    renderSites("custom");
}

document.getElementById("add-site-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.getElementById("custom-url").value;
    const title = document.getElementById("custom-title").value;
    if (url && title) addCustomSite(url, title);
});
```

## Each Version's README:
- [v4a](v4a/README.md)
- [v4b](v4b/README.md)

## Each Version's zip:
- [v4a](https://mattwydra.github.io/newtab-background/v4/v4d/ext4a.zip)
- [v4b](https://mattwydra.github.io/newtab-background/v4/v4d/ext4b.zip)