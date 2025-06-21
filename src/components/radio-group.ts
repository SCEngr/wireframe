import { BaseComponent } from '../core/base-component';

export class WireRadioGroup extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const group = document.createElement('div');
    group.className = 'wire-radio-group';
    group.style.display = 'flex';
    group.style.flexDirection = 'column';
    group.style.gap = '8px';
    
    // Create slot for radio items
    const slotElement = document.createElement('slot');
    group.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(group);
  }
}

export class WireRadioItem extends BaseComponent {
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
    container.className = 'wire-radio-item-container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.gap = '8px';
    
    // Create radio button
    const radio = document.createElement('div');
    radio.className = 'wire-radio-item wireframe-element';
    radio.style.width = '16px';
    radio.style.height = '16px';
    radio.style.borderRadius = '50%';
    radio.style.display = 'flex';
    radio.style.alignItems = 'center';
    radio.style.justifyContent = 'center';
    
    // Check if checked
    const isChecked = this.hasAttribute('checked');
    
    // Add dot if checked
    if (isChecked) {
      const dot = document.createElement('div');
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#6b7280';
      radio.appendChild(dot);
    }
    
    // Add label slot
    const labelContainer = document.createElement('div');
    const slotElement = document.createElement('slot');
    labelContainer.appendChild(slotElement);
    
    // Add elements to container
    container.appendChild(radio);
    container.appendChild(labelContainer);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom elements
customElements.define('wire-radio-group', WireRadioGroup);
customElements.define('wire-radio-item', WireRadioItem);
