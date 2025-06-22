import { BaseComponent } from "../core/base-component";

export class WireDropdown extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["open"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const container = document.createElement("div");
    container.className = "wire-dropdown-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    container.style.alignItems = "flex-start";

    // Create trigger element
    const trigger = document.createElement("div");
    trigger.className = "wire-dropdown-trigger wireframe-element";
    trigger.style.padding = "8px 12px";
    trigger.style.display = "flex";
    trigger.style.alignItems = "center";
    trigger.style.justifyContent = "space-between";
    trigger.style.gap = "8px";
    trigger.style.cursor = "default";

    // Add trigger slot
    const triggerSlot = document.createElement("slot");
    triggerSlot.name = "trigger";
    triggerSlot.textContent = "Dropdown";
    trigger.appendChild(triggerSlot);

    // Add chevron icon
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    trigger.appendChild(chevron);

    // Create content container
    const content = document.createElement("div");
    content.className = "wire-dropdown-content wireframe-element";
    content.style.width = "100%";
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.padding = "4px";
    content.style.marginTop = "4px";

    // Check if dropdown is open
    const isOpen = this.hasAttribute("open");
    if (!isOpen) {
      content.style.display = "none";
    }

    // Add content slot
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    content.appendChild(contentSlot);

    // Create default dropdown items if no content is provided
    const defaultItems = document.createElement("div");
    defaultItems.innerHTML = `
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px; margin-bottom: 2px;">Item 1</div>
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px; margin-bottom: 2px;">Item 2</div>
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px;">Item 3</div>
    `;
    contentSlot.appendChild(defaultItems);

    // Add elements to container
    container.appendChild(trigger);
    container.appendChild(content);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define("wire-dropdown", WireDropdown);
