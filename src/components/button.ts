import { BaseComponent } from "../core/base-component";

/**
 * Wire Button Component
 * Usage: <wire-button variant="primary" size="md">Click me</wire-button>
 */
export class WireButton extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["variant", "size", "disabled"];
  }

  protected injectStyles(): void {
    super.injectStyles(); // Call the base component's styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .btn {
        border: 1px solid #6b7280;
        border-radius: 4px;
        padding: 6px 12px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-weight: 500;
        color: #4b5563;
        background-color: #f3f4f6;
        transition: all 0.2s ease;
      }
      .btn[variant="secondary"] {
        background-color: transparent;
        border-color: #9ca3af;
        color: #6b7280;
      }
      .btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn[size="small"] {
        padding: 4px 8px;
        font-size: 0.875em;
      }
      .btn[size="large"] {
        padding: 8px 16px;
        font-size: 1.125em;
      }
      .btn-icon {
        display: inline-flex;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  render(): void {
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "btn wireframe-element";

    // Apply attributes as properties
    if (this.hasAttribute("variant")) {
      buttonDiv.setAttribute("variant", this.getAttribute("variant") || "");
    }

    if (this.hasAttribute("size")) {
      buttonDiv.setAttribute("size", this.getAttribute("size") || "");
    }

    if (this.hasAttribute("disabled")) {
      buttonDiv.setAttribute("disabled", "");
    }

    // Add icon for loading state
    if (this.hasAttribute("loading")) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "btn-icon";

      // Create SVG loader icon
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "16");
      svg.setAttribute("height", "16");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");

      // Loader icon path
      svg.innerHTML =
        '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';

      iconSpan.appendChild(svg);
      buttonDiv.appendChild(iconSpan);
    }

    // Add text content
    const textSpan = document.createElement("span");
    textSpan.innerHTML = this.innerHTML;
    buttonDiv.appendChild(textSpan);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(buttonDiv);
  }
}

// Register the component
if (!customElements.get("wire-button")) {
  customElements.define("wire-button", WireButton);
}
