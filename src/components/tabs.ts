import { BaseComponent } from '../core/base-component';

export class WireTabs extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const tabs = document.createElement('div');
    tabs.className = 'wire-tabs';
    tabs.style.width = '100%';
    tabs.style.boxSizing = 'border-box';
    
    // Create tab list container
    const tabList = document.createElement('div');
    tabList.className = 'wire-tab-list';
    tabList.style.display = 'flex';
    tabList.style.borderBottom = '1px solid #6b7280';
    tabList.style.marginBottom = '16px';
    
    // Add tab list slot
    const tabListSlot = document.createElement('slot');
    tabListSlot.name = 'tab-list';
    tabList.appendChild(tabListSlot);
    
    // Create content container
    const content = document.createElement('div');
    content.className = 'wire-tab-content';
    
    // Add content slot
    const contentSlot = document.createElement('slot');
    contentSlot.name = 'content';
    content.appendChild(contentSlot);
    
    // Add elements to tabs
    tabs.appendChild(tabList);
    tabs.appendChild(content);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(tabs);
  }
}

export class WireTab extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['active'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const tab = document.createElement('div');
    tab.className = 'wire-tab';
    tab.style.padding = '8px 16px';
    tab.style.cursor = 'default';
    
    // Check if active
    const isActive = this.hasAttribute('active');
    
    if (isActive) {
      tab.className = 'wire-tab wireframe-element';
      tab.style.borderBottom = '1px solid #6b7280';
      tab.style.borderTop = '1px solid #6b7280';
      tab.style.borderLeft = '1px solid #6b7280';
      tab.style.borderRight = '1px solid #6b7280';
      tab.style.borderBottomColor = 'transparent';
      tab.style.marginBottom = '-1px';
      tab.style.position = 'relative';
      tab.style.zIndex = '1';
    }
    
    // Add content slot
    const slotElement = document.createElement('slot');
    tab.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(tab);
  }
}

export class WireTabPanel extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    const panel = document.createElement('div');
    panel.className = 'wire-tab-panel wireframe-element';
    panel.style.padding = '16px';
    panel.style.marginTop = '-1px';
    
    // Add content slot
    const slotElement = document.createElement('slot');
    panel.appendChild(slotElement);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(panel);
  }
}

// Register the custom elements
customElements.define('wire-tabs', WireTabs);
customElements.define('wire-tab', WireTab);
customElements.define('wire-tab-panel', WireTabPanel);
