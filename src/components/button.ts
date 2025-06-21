import { BaseComponent } from '../core/base-component';

/**
 * Wire Button Component
 * Usage: <wire-button variant="primary" size="md">Click me</wire-button>
 */
export class WireButton extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['variant', 'size', 'disabled'];
  }

  render(): void {
    // 简化按钮，不再使用 variant 和 size 参数
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'btn wireframe-element';
    buttonDiv.innerHTML = this.innerHTML;
    
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(buttonDiv);
  }
}

// Register the component
if (!customElements.get('wire-button')) {
  customElements.define('wire-button', WireButton);
}
