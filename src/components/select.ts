import { BaseComponent } from "../core/base-component";

export class WireSelect extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const select = document.createElement("div");
    select.className = "wire-select wireframe-element";
    select.style.width = "100%";
    select.style.position = "relative";
    select.style.boxSizing = "border-box";
    select.style.display = "flex";
    select.style.padding = "4px";
    select.style.flexDirection = "column";

    // Create trigger container
    const trigger = document.createElement("div");
    trigger.className = "wire-select-trigger";
    trigger.style.display = "flex";
    trigger.style.alignItems = "center";
    trigger.style.justifyContent = "space-between";
    trigger.style.padding = "4px";
    trigger.style.cursor = "default";

    // Add value slot
    const valueSlot = document.createElement("slot");
    valueSlot.name = "value";
    trigger.appendChild(valueSlot);

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
    content.className = "wire-select-content wireframe-element";
    content.style.width = "100%";
    content.style.marginTop = "4px";
    content.style.boxSizing = "border-box";
    content.style.display = "flex";
    content.style.padding = "4px";
    content.style.flexDirection = "column";

    // Add default slot for options (direct children)
    const defaultSlot = document.createElement("slot");
    content.appendChild(defaultSlot);

    // Add elements to select
    select.appendChild(trigger);
    select.appendChild(content);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(select);
  }
}

export class WireSelectOption extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["selected"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const option = document.createElement("div");
    option.className = "wire-select-option wireframe-element";
    option.style.padding = "8px 12px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.cursor = "default";
    option.style.marginBottom = "2px";

    // Check if selected
    const isSelected = this.hasAttribute("selected");

    // Add check icon if selected
    if (isSelected) {
      const check = document.createElement("div");
      check.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      check.style.marginRight = "8px";
      option.appendChild(check);
    }

    // Add content slot
    const slotElement = document.createElement("slot");
    option.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(option);
  }
}

// Register the custom elements
customElements.define("wire-select", WireSelect);
customElements.define("wire-select-option", WireSelectOption);
