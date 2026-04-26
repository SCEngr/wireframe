import { BaseComponent } from "../../core/base-component";

export class WireIosNavigationBar extends BaseComponent {
  static get observedAttributes() {
    return ["title", "show-back"];
  }

  render(): void {
    const bar = document.createElement("div");
    bar.className = "wire-ios-navigation-bar wireframe-element";
    bar.style.display = "flex";
    bar.style.alignItems = "center";
    bar.style.justifyContent = "center";
    bar.style.height = "44px";
    bar.style.padding = "0 8px";
    bar.style.position = "relative";
    bar.style.width = "100%";

    // Back button area (left)
    if (this.hasAttribute("show-back")) {
      const backBtn = document.createElement("div");
      backBtn.style.position = "absolute";
      backBtn.style.left = "8px";
      backBtn.style.display = "flex";
      backBtn.style.alignItems = "center";
      backBtn.style.gap = "2px";
      backBtn.style.color = "var(--wire-accent-color, #007aff)";
      backBtn.style.fontSize = "17px";
      backBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M10 2L2 10l8 8"/>
        </svg>
      `;
      const backLabel = document.createElement("span");
      backLabel.textContent = "Back";
      backLabel.style.fontSize = "17px";
      backBtn.appendChild(backLabel);
      bar.appendChild(backBtn);
    }

    // Title
    const title = document.createElement("span");
    title.style.fontWeight = "600";
    title.style.fontSize = "17px";
    title.textContent = this.getAttribute("title") || "Title";
    bar.appendChild(title);

    // Right button slot
    const rightSlot = document.createElement("slot");
    rightSlot.name = "right";
    const rightContainer = document.createElement("div");
    rightContainer.style.position = "absolute";
    rightContainer.style.right = "8px";
    rightContainer.appendChild(rightSlot);
    bar.appendChild(rightContainer);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(bar);
  }
}

if (!customElements.get("wire-ios-navigation-bar")) {
  customElements.define("wire-ios-navigation-bar", WireIosNavigationBar);
}
