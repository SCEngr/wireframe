import { BaseComponent } from "../core/base-component";

export class WireSection extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const section = document.createElement("div");
    section.className = "wire-section wireframe-element";
    section.style.padding = "16px";
    section.style.marginBottom = "16px";
    section.style.width = "100%";
    section.style.boxSizing = "border-box";

    // Create header slot
    const headerSlot = document.createElement("div");
    headerSlot.className = "section-header";
    headerSlot.style.marginBottom = "8px";
    headerSlot.style.fontWeight = "bold";

    const headerSlotElement = document.createElement("slot");
    headerSlotElement.name = "header";
    headerSlot.appendChild(headerSlotElement);

    // Create content slot
    const contentSlot = document.createElement("div");
    contentSlot.className = "section-content";

    const contentSlotElement = document.createElement("slot");
    contentSlot.appendChild(contentSlotElement);

    // Append all elements to section
    section.appendChild(headerSlot);
    section.appendChild(contentSlot);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(section);
  }
}

// Register the custom element
customElements.define("wire-section", WireSection);
