import { BaseComponent } from "../core/base-component";

export class WireToggle extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["checked"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  protected injectStyles(): void {
    super.injectStyles(); // Call the base component's styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .wire-toggle {
        width: 40px;
        height: 22px;
        border-radius: 11px;
        position: relative;
        cursor: pointer;
        border: 1px solid #d1d5db;
        transition: all 0.2s ease;
      }
      .wire-toggle[checked] .wire-toggle-thumb {
        background-color: #9ca3af;
      }

      .wire-toggle-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        border: 1px solid #6b7280;
        transition: all 0.2s ease;
      }
      .wire-toggle[checked] .wire-toggle-thumb {
        left: 19px;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  render(): void {
    const toggle = document.createElement("div");
    toggle.className = "wire-toggle wireframe-element";

    // Check if checked
    const isChecked = this.hasAttribute("checked");
    if (isChecked) {
      toggle.setAttribute("checked", "");
    }

    // Create toggle thumb
    const thumb = document.createElement("div");
    thumb.className = "wire-toggle-thumb wireframe-element";

    // Add thumb to toggle
    toggle.appendChild(thumb);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(toggle);
  }
}

// Register the custom element
customElements.define("wire-toggle", WireToggle);
