import { BaseComponent } from "../core/base-component";

export class WireDrawer extends BaseComponent {
  static get observedAttributes() {
    return ["position", "open"];
  }

  render(): void {
    const position = this.getAttribute("position") || "left";
    const isOpen = this.hasAttribute("open");

    const drawer = document.createElement("div");
    drawer.className = "wire-drawer wireframe-element";
    drawer.style.width = position === "left" || position === "right" ? "280px" : "100%";
    drawer.style.height = position === "top" || position === "bottom" ? "200px" : "100%";
    drawer.style.display = "flex";
    drawer.style.flexDirection = "column";

    if (!isOpen) {
      drawer.style.display = "none";
    }

    // Header
    const header = document.createElement("div");
    header.className = "wire-drawer-header";
    header.style.padding = "12px";
    header.style.borderBottom = "1px solid #9ca3af";
    header.style.fontWeight = "500";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    header.appendChild(headerSlot);

    const closeBtn = document.createElement("span");
    closeBtn.style.width = "20px";
    closeBtn.style.height = "20px";
    closeBtn.style.display = "inline-flex";
    closeBtn.style.alignItems = "center";
    closeBtn.style.justifyContent = "center";
    closeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    `;
    header.appendChild(closeBtn);

    // Content
    const content = document.createElement("div");
    content.className = "wire-drawer-content";
    content.style.padding = "12px";
    content.style.flex = "1";

    const contentSlot = document.createElement("slot");
    content.appendChild(contentSlot);

    drawer.appendChild(header);
    drawer.appendChild(content);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(drawer);
  }
}

if (!customElements.get("wire-drawer")) {
  customElements.define("wire-drawer", WireDrawer);
}
