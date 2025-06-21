import { BaseComponent } from '../core/base-component';

export class WireIcon extends BaseComponent {
  static get observedAttributes() {
    return ['name', 'size'];
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
    const iconContainer = document.createElement('div');
    iconContainer.className = 'wire-icon';
    iconContainer.style.display = 'inline-flex';
    iconContainer.style.alignItems = 'center';
    iconContainer.style.justifyContent = 'center';
    
    const size = this.getAttribute('size') || '24';
    iconContainer.style.width = `${size}px`;
    iconContainer.style.height = `${size}px`;
    
    const iconName = this.getAttribute('name') || 'circle';
    
    // Simple SVG icons based on name
    let svgContent = '';
    
    switch (iconName) {
      case 'check':
        svgContent = '<path d="M20 6L9 17L4 12"></path>';
        break;
      case 'x':
        svgContent = '<path d="M18 6L6 18M6 6l12 12"></path>';
        break;
      case 'loader':
        svgContent = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';
        break;
      case 'chevron-down':
        svgContent = '<path d="M6 9l6 6 6-6"></path>';
        break;
      case 'chevron-right':
        svgContent = '<path d="M9 18l6-6-6-6"></path>';
        break;
      case 'tool':
        svgContent = '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>';
        break;
      default:
        svgContent = '<circle cx="12" cy="12" r="10"></circle>';
    }
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    svg.innerHTML = svgContent;
    iconContainer.appendChild(svg);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(iconContainer);
  }
}

// Register the custom element
customElements.define('wire-icon', WireIcon);
