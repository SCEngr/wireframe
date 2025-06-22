import { BaseComponent } from '../core/base-component';

export class WireHeading extends BaseComponent {
  static get observedAttributes() {
    return ['level'];
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
    const level = this.getAttribute('level') || '1';
    const validLevels = ['1', '2', '3', '4', '5', '6'];
    const headingLevel = validLevels.includes(level) ? level : '1';
    
    const heading = document.createElement(`h${headingLevel}`);
    heading.className = `wire-heading wire-heading-${headingLevel}`;
    heading.style.margin = '0';
    heading.style.padding = '0';
    heading.style.fontWeight = 'bold';
    
    // Set font size based on heading level
    const fontSizes = {
      '1': '24px',
      '2': '20px',
      '3': '18px',
      '4': '16px',
      '5': '14px',
      '6': '12px'
    };
    
    heading.style.fontSize = fontSizes[headingLevel as keyof typeof fontSizes] || fontSizes['4']; // 默认为 h4 大小
    
    // Create slot for content
    const slotElement = document.createElement('slot');
    heading.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(heading);
  }
}

// Register the custom element
customElements.define('wire-heading', WireHeading);
