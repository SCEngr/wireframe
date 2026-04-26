import { BaseComponent } from '../core/base-component';

export class WireMessage extends BaseComponent {
  render(): void {
    const message = document.createElement('div');
    message.className = 'wire-message wireframe-element';
    message.style.padding = '12px';
    message.style.marginBottom = '8px';
    message.style.width = '100%';
    message.style.boxSizing = 'border-box';
    
    // Create slot for content
    const slotElement = document.createElement('slot');
    message.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(message);
  }
}

// Register the custom element
if (!customElements.get('wire-message')) {
  customElements.define('wire-message', WireMessage);
}
