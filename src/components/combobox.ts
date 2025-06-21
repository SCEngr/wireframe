import { BaseComponent } from "../core/base-component";

export class WireCombobox extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const combobox = document.createElement("div");
    combobox.className = "wire-combobox wireframe-element";
    combobox.style.width = "100%";
    combobox.style.width = "100%";
    combobox.style.position = "relative";
    combobox.style.boxSizing = "border-box";
    combobox.style.display = "flex";
    combobox.style.flexDirection = "column";
    combobox.style.padding = "4px";

    // Create input container
    const inputContainer = document.createElement("div");
    inputContainer.className = "wire-combobox-input-container";
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.padding = "8px 12px";
    inputContainer.style.padding = "4px";

    // Add input slot
    const inputSlot = document.createElement("slot");
    inputSlot.name = "input";
    inputContainer.appendChild(inputSlot);

    // Add chevron icon
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    chevron.style.marginLeft = "auto";
    inputContainer.appendChild(chevron);

    // Create dropdown container
    const dropdown = document.createElement("div");
    dropdown.className = "wire-combobox-dropdown wireframe-element";
    dropdown.style.width = "100%";
    dropdown.style.marginTop = "4px";
    dropdown.style.padding = "4px";
    dropdown.style.boxSizing = "border-box";
    dropdown.style.display = "flex";
    dropdown.style.flexDirection = "column";

    // Add default slot for options (direct children)
    const defaultSlot = document.createElement("slot");
    dropdown.appendChild(defaultSlot);

    // Add elements to combobox
    combobox.appendChild(inputContainer);
    combobox.appendChild(dropdown);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(combobox);
  }
}

export class WireComboboxOption extends BaseComponent {
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
    option.className = "wire-combobox-option wireframe-element";
    option.style.padding = "8px 12px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.cursor = "default";
    option.style.marginTop = "2px";

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
customElements.define("wire-combobox", WireCombobox);
customElements.define("wire-combobox-option", WireComboboxOption);
