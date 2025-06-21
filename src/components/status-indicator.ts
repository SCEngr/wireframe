import { BaseComponent } from '../core/base-component';

export class WireStatusIndicator extends BaseComponent {
  static get observedAttributes() {
    return ['status'];
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
    const container = document.createElement('div');
    container.className = 'wire-status-indicator wireframe-element';
    container.style.display = 'inline-flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '24px';
    container.style.height = '24px';
    
    const status = this.getAttribute('status') || 'default';
    
    // Create SVG icon based on status
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    let svgContent = '';
    
    switch (status) {
      case 'success':
        svgContent = '<path d="M20 6L9 17L4 12"></path>';
        break;
      case 'failed':
        svgContent = '<path d="M18 6L6 18M6 6l12 12"></path>';
        break;
      case 'processing':
        svgContent = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';
        break;
      default:
        svgContent = '<circle cx="12" cy="12" r="10"></circle>';
    }
    
    svg.innerHTML = svgContent;
    container.appendChild(svg);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define('wire-status-indicator', WireStatusIndicator);
