# **Phase 1: Basic Random Background on New Tab**
### **Objective:**
- Load a random background image every time a new tab is opened.
- Select the background from a predefined list or folder.

### **Implementation:**
- Create an array of background images.
- Use JavaScript to randomly select an image and apply it as the background.
- Ensure the background covers the entire screen.

### **Code Implementation:**
```javascript
const wallpapers = ["wallpapers/guts2.jpg", "wallpapers/guts.jpg"];

function setRandomBackground() {
    const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    document.body.style.background = `url('${randomImage}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
}

document.addEventListener("DOMContentLoaded", setRandomBackground);
```
