import { BaseComponent } from "../core/base-component";

/**
 * Wire Alert Component
 * Usage: <wire-alert variant="info">This is an information alert</wire-alert>
 */
export class WireAlert extends BaseComponent {
  static get observedAttributes(): string[] {
    return ["variant", "dismissible"];
  }

  protected injectStyles(): void {
    super.injectStyles(); // Call the base component's styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .alert {
        display: flex;
        align-items: flex-start;
        padding: 2px 8px;
        border-radius: 4px;
        margin-bottom: 16px;
        width: 100%;
      }
      .alert[variant="success"] {
        color: #065f46;
      }
      .alert[variant="warning"] {
        color: #92400e;
      }
      .alert[variant="danger"] {
        color: #b91c1c;
      }
      .alert-icon {
        flex-shrink: 0;
        margin-right: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .alert-content {
        flex-grow: 1;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  render(): void {
    const alert = document.createElement("div");
    alert.className = "alert wireframe-element";

    // Apply variant attribute if present
    const variant = this.getAttribute("variant");
    if (variant) {
      alert.setAttribute("variant", variant);
    }

    // Add appropriate icon based on variant
    const iconContainer = document.createElement("div");
    iconContainer.className = "alert-icon";

    // Create SVG icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    // Set icon path based on variant
    let iconPath = "";
    switch (variant) {
      case "success":
        iconPath =
          '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
        break;
      case "warning":
        iconPath =
          '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';
        break;
      case "danger":
        iconPath =
          '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
        break;
      default:
        iconPath =
          '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
    }

    svg.innerHTML = iconPath;
    iconContainer.appendChild(svg);
    alert.appendChild(iconContainer);

    // 内容容器
    const content = document.createElement("div");
    content.className = "alert-content";
    content.innerHTML = this.innerHTML;
    alert.appendChild(content);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(alert);
  }
}

// Register the component
if (!customElements.get("wire-alert")) {
  customElements.define("wire-alert", WireAlert);
}
