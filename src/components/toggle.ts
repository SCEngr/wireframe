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

  render(): void {
    const toggle = document.createElement("div");
    toggle.className = "wire-toggle wireframe-element";
    toggle.style.width = "36px";
    toggle.style.height = "20px";
    toggle.style.borderRadius = "10px";
    toggle.style.position = "relative";
    toggle.style.cursor = "default";

    // Check if checked
    const isChecked = this.hasAttribute("checked");

    // Create toggle thumb
    const thumb = document.createElement("div");
    thumb.className = "wire-toggle-thumb wireframe-element";
    thumb.style.width = "16px";
    thumb.style.height = "16px";
    thumb.style.borderRadius = "50%";
    thumb.style.position = "absolute";
    thumb.style.top = "1px";

    if (isChecked) {
      thumb.style.left = "17px";
    } else {
      thumb.style.left = "1px";
    }

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
