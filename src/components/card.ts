import { BaseComponent } from '../core/base-component';

/**
 * Wire Card Component
 * Usage: 
 * <wire-card>
 *   <div slot="header">Card Header</div>
 *   <div slot="content">Card Content</div>
 *   <div slot="footer">Card Footer</div>
 * </wire-card>
 */
export class WireCard extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['variant'];
  }

  render(): void {
    const card = document.createElement('div');
    card.className = 'card wireframe-element';
    
    // Header slot
    const headerSlot = document.createElement('slot');
    headerSlot.name = 'header';
    
    const header = document.createElement('div');
    header.className = 'card-header';
    header.appendChild(headerSlot);
    
    // Content slot
    const contentSlot = document.createElement('slot');
    contentSlot.name = 'content';
    
    const body = document.createElement('div');
    body.className = 'card-body';
    body.appendChild(contentSlot);
    
    // Footer slot
    const footerSlot = document.createElement('slot');
    footerSlot.name = 'footer';
    
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    footer.appendChild(footerSlot);
    
    // Assemble the card
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(card);
  }
}

// Register the component
if (!customElements.get('wire-card')) {
  customElements.define('wire-card', WireCard);
}
