import { BaseComponent } from '../core/base-component';

export class WireRow extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const row = document.createElement('div');
    row.className = 'wire-row';
    row.style.display = 'flex';
    row.style.flexDirection = 'row';
    row.style.alignItems = 'center';
    row.style.gap = '8px';
    row.style.width = '100%';
    row.style.boxSizing = 'border-box';
    
    // Create slot for content
    const slotElement = document.createElement('slot');
    row.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(row);
  }
}

// Register the custom element
customElements.define('wire-row', WireRow);
