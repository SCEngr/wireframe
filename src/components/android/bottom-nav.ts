import { BaseComponent } from "../../core/base-component";

export class WireAndroidBottomNav extends BaseComponent {
  render(): void {
    const bar = document.createElement("div");
    bar.className = "wire-android-bottom-nav wireframe-element";
    bar.style.display = "flex";
    bar.style.justifyContent = "space-around";
    bar.style.alignItems = "center";
    bar.style.height = "56px";
    bar.style.width = "100%";
    bar.style.boxShadow = "0 -1px 3px rgba(0,0,0,0.08)";
    bar.style.borderRadius = "0";
    bar.style.border = "none";
    bar.style.borderTop = "1px solid var(--wire-border-color, #e0e0e0)";

    const slot = document.createElement("slot");
    bar.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(bar);
  }
}

export class WireAndroidBottomNavItem extends BaseComponent {
  static get observedAttributes() {
    return ["label", "selected"];
  }

  render(): void {
    const item = document.createElement("div");
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems = "center";
    item.style.justifyContent = "center";
    item.style.gap = "2px";
    item.style.padding = "6px 12px 8px";
    item.style.minWidth = "64px";
    item.style.flex = "1";

    const isSelected = this.hasAttribute("selected");

    // Icon placeholder
    const icon = document.createElement("div");
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.style.borderRadius = "50%";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="${isSelected ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    `;
    item.appendChild(icon);

    // Label
    const label = document.createElement("span");
    label.style.fontSize = "12px";
    label.style.fontWeight = "500";
    label.textContent = this.getAttribute("label") || "Item";

    if (isSelected) {
      icon.style.color = "var(--wire-accent-color, #6200ee)";
      label.style.color = "var(--wire-accent-color, #6200ee)";
    }

    item.appendChild(label);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-android-bottom-nav")) {
  customElements.define("wire-android-bottom-nav", WireAndroidBottomNav);
}
if (!customElements.get("wire-android-bottom-nav-item")) {
  customElements.define("wire-android-bottom-nav-item", WireAndroidBottomNavItem);
}
