import { BaseComponent } from '../core/base-component';

/**
 * Wire Alert Component
 * Usage: <wire-alert variant="info">This is an information alert</wire-alert>
 */
export class WireAlert extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['variant', 'dismissible'];
  }

  render(): void {
    const alert = document.createElement('div');
    alert.className = 'alert wireframe-element';
    
    // 添加简单的图标
    const iconContainer = document.createElement('div');
    iconContainer.className = 'alert-icon';
    iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    alert.appendChild(iconContainer);
    
    // 内容容器
    const content = document.createElement('div');
    content.className = 'alert-content';
    content.innerHTML = this.innerHTML;
    alert.appendChild(content);
    
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(alert);
  }
}

// Register the component
if (!customElements.get('wire-alert')) {
  customElements.define('wire-alert', WireAlert);
}
