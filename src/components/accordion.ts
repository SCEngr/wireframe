import { BaseComponent } from "../core/base-component";

export class WireAccordion extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const accordion = document.createElement("div");
    accordion.className = "wire-accordion";
    accordion.style.width = "100%";
    accordion.style.display = "flex";
    accordion.style.flexDirection = "column";
    accordion.style.boxSizing = "border-box";

    // Create slot for accordion items
    const slotElement = document.createElement("slot");
    accordion.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(accordion);
  }
}

export class WireAccordionItem extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const item = document.createElement("div");
    item.className = "wire-accordion-item wireframe-element";
    item.style.borderBottom = "1px solid #6b7280";
    item.style.width = "100%";
    item.style.boxSizing = "border-box";

    // Create header
    const header = document.createElement("div");
    header.className = "wire-accordion-header";
    header.style.padding = "12px";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.cursor = "default";

    // Add header slot
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    header.appendChild(headerSlot);

    // Add chevron icon
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    header.appendChild(chevron);

    // Create content
    const content = document.createElement("div");
    content.className = "wire-accordion-content";
    content.style.padding = "0 12px 12px 12px";

    // Add content slot
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    content.appendChild(contentSlot);

    // Add elements to item
    item.appendChild(header);
    item.appendChild(content);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

// Register the custom elements
customElements.define("wire-accordion", WireAccordion);
customElements.define("wire-accordion-item", WireAccordionItem);
