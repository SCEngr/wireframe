import { BaseComponent } from "../../core/base-component";

export class WireIosSearchBar extends BaseComponent {
  static get observedAttributes() {
    return ["placeholder"];
  }

  render(): void {
    const bar = document.createElement("div");
    bar.className = "wire-ios-search-bar wireframe-element";
    bar.style.display = "flex";
    bar.style.alignItems = "center";
    bar.style.gap = "8px";
    bar.style.padding = "8px 12px";
    bar.style.borderRadius = "10px";
    bar.style.width = "100%";
    bar.style.backgroundColor = "var(--wire-bg-color, #f2f2f7)";

    // Search icon
    const icon = document.createElement("span");
    icon.style.display = "flex";
    icon.style.color = "#8e8e93";
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    `;
    bar.appendChild(icon);

    // Placeholder text
    const placeholder = document.createElement("span");
    placeholder.style.fontSize = "17px";
    placeholder.style.color = "#8e8e93";
    placeholder.textContent = this.getAttribute("placeholder") || "Search";
    bar.appendChild(placeholder);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(bar);
  }
}

if (!customElements.get("wire-ios-search-bar")) {
  customElements.define("wire-ios-search-bar", WireIosSearchBar);
}
