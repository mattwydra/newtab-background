# **Phase 4: Choice of Websites**
### **Objective:**
- Allow users to select different categories (Productivity, Gaming, Media, Custom).
- Enable users to add custom bookmarks.

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