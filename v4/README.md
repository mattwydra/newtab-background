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

---

# Later phases (5 and 6):
## **Phase 5: Hopecore Integration**
### **Objective:**
- Display a hopecore image and quote on new tab load.
- Allow manual regeneration.
- Auto-regenerate every 10 seconds.

### **Implementation:**
- Fetch images and quotes from a predefined list.
- Display a new pair each time the tab is loaded or refreshed.
- Add a button to manually cycle through hopecore content.

---
## **Phase 6: Deep Personalization (MAL & Game Data)**
### **Objective:**
- Fetch and display recent anime from a user's MAL profile.
- Integrate Steam or other game tracking services.
- Allow users to toggle between anime, games, and hopecore images.
- Rotate between all personalized content.

### **Implementation:**
- Use APIs to fetch user data.
- Store preferences and allow toggling.
- Implement automatic image rotation between different data sources.
