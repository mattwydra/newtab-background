# **Phase 2: Background Rotation (Auto-Switch Every 10s)**
### **Objective:**
- Rotate the background image every 10 seconds.
- Optimize performance so it only updates if the tab is active.

### **Implementation:**
- Use `setInterval` to change the background at intervals.
- Check tab visibility before changing the image to prevent unnecessary updates.

### **Code Implementation:**
```javascript
function startBackgroundRotation() {
    setInterval(() => {
        if (!document.hidden) {
            setRandomBackground();
        }
    }, 10000);
}

document.addEventListener("DOMContentLoaded", startBackgroundRotation);
```
