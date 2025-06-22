import { BaseComponent } from "../core/base-component";

/**
 * Wire Input Component
 * Usage: <wire-input placeholder="Enter text" label="Username"></wire-input>
 */
export class WireInput extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["placeholder", "label", "disabled", "type", "value"];
  }

  protected injectStyles(): void {
    super.injectStyles(); // Call the base component's styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .input-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        width: 100%;
      }
      .input-label {
        font-size: 0.9em;
        color: #4b5563;
        margin-bottom: 5px;
        font-weight: 500;
      }
      .input-field {
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background-color: #f9fafb;
        padding: 8px 12px;
        min-height: 38px; /* Ensure consistent height */
        display: flex;
        align-items: center;
        color: #374151;
        position: relative;
      }
      .input-field[disabled] {
        background-color: #e5e7eb;
        color: #9ca3af;
        cursor: not-allowed;
        border-color: #d1d5db;
      }
      .input-field[error] {
        border-color: #ef4444;
        color: #b91c1c;
      }
      .input-field-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  render(): void {
    const placeholder = this.getAttribute("placeholder") || "输入文本";
    const label = this.getAttribute("label") || "";
    const value = this.getAttribute("value") || "";

    const wrapper = document.createElement("div");
    wrapper.className = "input-wrapper";

    if (label) {
      const labelEl = document.createElement("label");
      labelEl.className = "input-label";
      labelEl.textContent = label;
      wrapper.appendChild(labelEl);
    }

    // 创建一个div来模拟输入框
    const inputDiv = document.createElement("div");
    inputDiv.className = "input-field wireframe-element";

    // Apply attributes as properties
    if (this.hasAttribute("disabled")) {
      inputDiv.setAttribute("disabled", "");
    }

    if (this.hasAttribute("error")) {
      inputDiv.setAttribute("error", "");

      // Add error icon
      const iconDiv = document.createElement("div");
      iconDiv.className = "input-field-icon";

      // Create SVG error icon
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

      // Alert triangle icon path
      svg.innerHTML =
        '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';

      iconDiv.appendChild(svg);
      inputDiv.appendChild(iconDiv);
    }

    // Display value if provided, otherwise placeholder
    inputDiv.textContent = value || placeholder;

    wrapper.appendChild(inputDiv);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(wrapper);
  }
}

// Register the component
if (!customElements.get("wire-input")) {
  customElements.define("wire-input", WireInput);
}
