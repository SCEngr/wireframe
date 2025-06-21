import { BaseComponent } from '../core/base-component';

export class WireColumn extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const column = document.createElement('div');
    column.className = 'wire-column';
    column.style.display = 'flex';
    column.style.flexDirection = 'column';
    column.style.gap = '8px';
    column.style.width = '100%';
    column.style.boxSizing = 'border-box';
    
    // Create slot for content
    const slotElement = document.createElement('slot');
    column.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(column);
  }
}

// Register the custom element
customElements.define('wire-column', WireColumn);
