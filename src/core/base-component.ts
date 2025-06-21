/**
 * Base class for all wireframe components
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  
  /**
   * Inject base styles into the shadow DOM
   */
  protected injectStyles(): void {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      :host { display: inline-block; }
      * { box-sizing: border-box; }
      
      /* 通用线框样式 */
      .wireframe-element {
        border: 1px solid #9ca3af;
        border-radius: 0.25rem;
        color: #6b7280;
        background-color: transparent;
        user-select: none;
      }
      
      /* Button styles - wireframe */
      .btn { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        font-weight: 500; 
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
      }
      
      /* Input styles - wireframe */
      .input-wrapper { display: flex; flex-direction: column; gap: 0.25rem; }
      .input-label { font-size: 0.875rem; font-weight: 500; color: #6b7280; }
      .input-field { 
        padding: 0.5rem 0.75rem; 
        width: 100%;
      }
      
      /* Card styles - wireframe */
      .card { 
        overflow: hidden; 
        width: 100%;
      }
      .card-header { 
        border-bottom: 1px solid #9ca3af; 
        padding: 1rem; 
        font-weight: 500; 
      }
      .card-body { 
        padding: 1rem; 
      }
      .card-footer { 
        border-top: 1px solid #9ca3af; 
        padding: 1rem; 
      }
      
      /* Badge styles - wireframe */
      .badge { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        border-radius: 9999px; 
        padding: 0.125rem 0.5rem; 
        font-size: 0.75rem; 
        font-weight: 500; 
      }
      
      /* Avatar styles - wireframe */
      .avatar { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        width: 2.5rem; 
        height: 2.5rem; 
        font-size: 1rem;
        overflow: hidden; 
      }
      .avatar-circle { border-radius: 9999px; }
      .avatar-square { border-radius: 0.25rem; }
      .avatar img { 
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
        opacity: 0.5;
      }
      
      /* Alert styles - wireframe */
      .alert { 
        padding: 0.75rem 1rem; 
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .alert-icon {
        flex-shrink: 0;
      }
      .alert-content {
        flex: 1;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }
  
  /**
   * Render component content
   */
  protected abstract render(): void;
  
  /**
   * Called when component is connected to the DOM
   */
  connectedCallback(): void {
    this.injectStyles();
    this.render();
  }
  
  /**
   * Called when attributes are changed
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}
