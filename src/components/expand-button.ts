import { BaseComponent } from '../core/base-component';

export class WireExpandButton extends BaseComponent {
  static get observedAttributes() {
    return ['expanded'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const button = document.createElement('div');
    button.className = 'wire-expand-button wireframe-element';
    button.style.display = 'inline-flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.width = '24px';
    button.style.height = '24px';
    button.style.borderRadius = '4px';
    button.style.cursor = 'default';
    
    const isExpanded = this.hasAttribute('expanded');
    const icon = isExpanded ? '-' : '+';
    
    button.textContent = icon;

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(button);
  }
}

// Register the custom element
customElements.define('wire-expand-button', WireExpandButton);
