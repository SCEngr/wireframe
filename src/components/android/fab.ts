import { BaseComponent } from "../../core/base-component";

export class WireAndroidFab extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "extended"];
  }

  render(): void {
    const fab = document.createElement("div");
    fab.className = "wire-android-fab wireframe-element";
    fab.style.borderRadius = this.hasAttribute("extended") ? "16px" : "50%";
    fab.style.width = this.hasAttribute("extended") ? "auto" : "56px";
    fab.style.height = "56px";
    fab.style.display = "inline-flex";
    fab.style.alignItems = "center";
    fab.style.justifyContent = "center";
    fab.style.gap = "8px";
    fab.style.padding = this.hasAttribute("extended") ? "0 16px" : "0";
    fab.style.backgroundColor = "var(--wire-accent-color, #6200ee)";
    fab.style.color = "#fff";
    fab.style.boxShadow = "0 3px 5px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.12)";
    fab.style.border = "none";
    fab.style.cursor = "default";

    // Icon (plus by default)
    const icon = document.createElement("span");
    icon.style.display = "flex";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    `;
    fab.appendChild(icon);

    // Extended label
    if (this.hasAttribute("extended")) {
      const label = document.createElement("span");
      label.style.fontSize = "14px";
      label.style.fontWeight = "500";
      label.style.paddingRight = "4px";
      const slot = document.createElement("slot");
      label.appendChild(slot);
      fab.appendChild(label);
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(fab);
  }
}

if (!customElements.get("wire-android-fab")) {
  customElements.define("wire-android-fab", WireAndroidFab);
}
