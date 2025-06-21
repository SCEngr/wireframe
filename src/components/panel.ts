import { BaseComponent } from '../core/base-component';

export class WirePanel extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const panel = document.createElement('div');
    panel.className = 'wire-panel wireframe-element';
    panel.style.padding = '16px';
    panel.style.width = '100%';
    panel.style.boxSizing = 'border-box';

    // Create header slot
    const headerSlot = document.createElement('div');
    headerSlot.className = 'panel-header';
    headerSlot.style.marginBottom = '12px';
    headerSlot.style.fontWeight = 'bold';
    
    const headerSlotElement = document.createElement('slot');
    headerSlotElement.name = 'header';
    headerSlot.appendChild(headerSlotElement);
    
    // Create content slot
    const contentSlot = document.createElement('div');
    contentSlot.className = 'panel-content';
    
    const contentSlotElement = document.createElement('slot');
    contentSlot.appendChild(contentSlotElement);
    
    // Append all elements to panel
    panel.appendChild(headerSlot);
    panel.appendChild(contentSlot);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(panel);
  }
}

// Register the custom element
customElements.define('wire-panel', WirePanel);
