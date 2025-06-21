import { BaseComponent } from '../core/base-component';

/**
 * Wire Input Component
 * Usage: <wire-input placeholder="Enter text" label="Username"></wire-input>
 */
export class WireInput extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['placeholder', 'label', 'disabled', 'type', 'value'];
  }

  render(): void {
    const placeholder = this.getAttribute('placeholder') || '输入文本';
    const label = this.getAttribute('label') || '';

    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'input-label';
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    // 创建一个div来模拟输入框
    const inputDiv = document.createElement('div');
    inputDiv.className = 'input-field wireframe-element';
    inputDiv.textContent = placeholder;
    
    wrapper.appendChild(inputDiv);

    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(wrapper);
  }
}

// Register the component
if (!customElements.get('wire-input')) {
  customElements.define('wire-input', WireInput);
}
