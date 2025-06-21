import { BaseComponent } from '../core/base-component';

/**
 * Wire Avatar Component
 * Usage: <wire-avatar size="md" initials="JD"></wire-avatar>
 * or: <wire-avatar size="lg" src="path/to/image.jpg"></wire-avatar>
 */
export class WireAvatar extends BaseComponent {
  static get observedAttributes(): string[] {
    return ['size', 'src', 'initials', 'shape'];
  }

  render(): void {
    const shape = this.getAttribute('shape') || 'circle';
    
    const avatar = document.createElement('div');
    avatar.className = `avatar wireframe-element ${shape === 'circle' ? 'avatar-circle' : 'avatar-square'}`;
    
    // 使用简单的用户图标
    avatar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    `;
    
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(avatar);
  }
}

// Register the component
if (!customElements.get('wire-avatar')) {
  customElements.define('wire-avatar', WireAvatar);
}
