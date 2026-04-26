import { BaseComponent } from "../../core/base-component";

export class WireAndroidTextField extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "value"];
  }

  render(): void {
    const variant = this.getAttribute("variant") || "outlined";

    const container = document.createElement("div");
    container.className = "wire-android-text-field";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    container.style.width = "100%";

    // Input area
    const input = document.createElement("div");
    input.className = "wire-android-text-field-input wireframe-element";
    input.style.display = "flex";
    input.style.alignItems = "center";
    input.style.padding = "12px 16px";
    input.style.minHeight = "56px";
    input.style.width = "100%";
    input.style.position = "relative";
    input.style.borderRadius = variant === "filled" ? "4px 4px 0 0" : "4px";

    if (variant === "filled") {
      input.style.backgroundColor = "#f5f5f5";
      input.style.borderBottom = "2px solid var(--wire-accent-color, #6200ee)";
      input.style.border = "none";
      input.style.borderRadius = "4px 4px 0 0";
    } else {
      input.style.border = "1px solid var(--wire-border-color, #e0e0e0)";
    }

    // Label (floating style)
    const label = this.getAttribute("label");
    const value = this.getAttribute("value");

    if (value && label) {
      // Label above
      const topLabel = document.createElement("span");
      topLabel.style.fontSize = "12px";
      topLabel.style.color = "var(--wire-accent-color, #6200ee)";
      topLabel.style.paddingLeft = variant === "filled" ? "0" : "4px";
      topLabel.textContent = label;
      container.appendChild(topLabel);
    }

    // Value text
    const valueEl = document.createElement("span");
    valueEl.style.fontSize = "16px";
    valueEl.textContent = value || label || "Text field";
    if (!value) {
      valueEl.style.opacity = "0.6";
    }
    input.appendChild(valueEl);

    container.appendChild(input);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-android-text-field")) {
  customElements.define("wire-android-text-field", WireAndroidTextField);
}
