import { BaseComponent } from "../../core/base-component";

export class WireIosTabBar extends BaseComponent {
  render(): void {
    const bar = document.createElement("div");
    bar.className = "wire-ios-tab-bar wireframe-element";
    bar.style.display = "flex";
    bar.style.justifyContent = "space-around";
    bar.style.alignItems = "center";
    bar.style.height = "49px";
    bar.style.width = "100%";
    bar.style.borderTop = "var(--wire-border-width, 0.5px) solid var(--wire-border-color, #c7c7cc)";

    const slot = document.createElement("slot");
    bar.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(bar);
  }
}

export class WireIosTabBarItem extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "label", "selected"];
  }

  render(): void {
    const item = document.createElement("div");
    item.className = "wire-ios-tab-bar-item";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.alignItems = "center";
    item.style.justifyContent = "center";
    item.style.gap = "2px";
    item.style.padding = "4px 0";
    item.style.minWidth = "48px";
    item.style.flex = "1";

    const isSelected = this.hasAttribute("selected");

    // Icon placeholder
    const icon = document.createElement("div");
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.display = "flex";
    icon.style.alignItems = "center";
    icon.style.justifyContent = "center";
    icon.style.borderRadius = "4px";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      </svg>
    `;
    item.appendChild(icon);

    // Label
    const label = document.createElement("span");
    label.style.fontSize = "10px";
    label.textContent = this.getAttribute("label") || "Item";

    if (isSelected) {
      icon.style.color = "var(--wire-accent-color, #007aff)";
      label.style.color = "var(--wire-accent-color, #007aff)";
    }

    item.appendChild(label);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-ios-tab-bar")) {
  customElements.define("wire-ios-tab-bar", WireIosTabBar);
}
if (!customElements.get("wire-ios-tab-bar-item")) {
  customElements.define("wire-ios-tab-bar-item", WireIosTabBarItem);
}
