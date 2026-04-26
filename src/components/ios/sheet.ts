import { BaseComponent } from "../../core/base-component";

export class WireIosSheet extends BaseComponent {
  static get observedAttributes() {
    return ["open"];
  }

  render(): void {
    const isOpen = this.hasAttribute("open");

    const sheet = document.createElement("div");
    sheet.className = "wire-ios-sheet wireframe-element";
    sheet.style.width = "100%";
    sheet.style.maxWidth = "400px";
    sheet.style.borderRadius = "var(--wire-border-radius, 0.75rem) var(--wire-border-radius, 0.75rem) 0 0";
    sheet.style.padding = "12px 16px 24px";
    sheet.style.display = isOpen ? "flex" : "none";
    sheet.style.flexDirection = "column";

    // Drag handle
    const handle = document.createElement("div");
    handle.style.width = "36px";
    handle.style.height = "5px";
    handle.style.borderRadius = "2.5px";
    handle.style.backgroundColor = "#c7c7cc";
    handle.style.margin = "0 auto 12px";
    handle.style.alignSelf = "center";
    sheet.appendChild(handle);

    // Content slot
    const content = document.createElement("div");
    content.style.flex = "1";
    const slot = document.createElement("slot");
    content.appendChild(slot);
    sheet.appendChild(content);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(sheet);
  }
}

if (!customElements.get("wire-ios-sheet")) {
  customElements.define("wire-ios-sheet", WireIosSheet);
}
