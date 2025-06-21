import { BaseComponent } from '../core/base-component';

export class WireCheckbox extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['checked'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const container = document.createElement('div');
    container.className = 'wire-checkbox-container';
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
    container.style.gap = '8px';
    
    // Create checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'wire-checkbox wireframe-element';
    checkbox.style.width = '16px';
    checkbox.style.height = '16px';
    checkbox.style.display = 'flex';
    checkbox.style.alignItems = 'center';
    checkbox.style.justifyContent = 'center';
    
    // Check if checked
    const isChecked = this.hasAttribute('checked');
    
    // Add check icon if checked
    if (isChecked) {
      const check = document.createElement('div');
      check.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      checkbox.appendChild(check);
    }
    
    // Add label slot
    const labelContainer = document.createElement('div');
    const slotElement = document.createElement('slot');
    labelContainer.appendChild(slotElement);
    
    // Add elements to container
    container.appendChild(checkbox);
    container.appendChild(labelContainer);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define('wire-checkbox', WireCheckbox);
