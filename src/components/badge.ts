import { BaseComponent } from '../core/base-component';

/**
 * Wire Badge Component
 * Usage: <wire-badge variant="primary">New</wire-badge>
 */
export class WireBadge extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['variant'];
  }

  render(): void {
    const badge = document.createElement('span');
    badge.className = 'badge wireframe-element';
    badge.innerHTML = this.innerHTML;
    
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(badge);
  }
}

// Register the component
if (!customElements.get('wire-badge')) {
  customElements.define('wire-badge', WireBadge);
}
