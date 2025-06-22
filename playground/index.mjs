// src/core/base-component.ts
class BaseComponent extends HTMLElement {
  shadow;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  injectStyles() {
    const styleSheet = document.createElement("style");
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
  connectedCallback() {
    this.injectStyles();
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

// src/components/button.ts
class WireButton extends BaseComponent {
  static get observedAttributes() {
    return ["variant", "size", "disabled"];
  }
  injectStyles() {
    super.injectStyles();
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
  render() {
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "btn wireframe-element";
    if (this.hasAttribute("variant")) {
      buttonDiv.setAttribute("variant", this.getAttribute("variant") || "");
    }
    if (this.hasAttribute("size")) {
      buttonDiv.setAttribute("size", this.getAttribute("size") || "");
    }
    if (this.hasAttribute("disabled")) {
      buttonDiv.setAttribute("disabled", "");
    }
    if (this.hasAttribute("loading")) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "btn-icon";
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
      svg.innerHTML = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';
      iconSpan.appendChild(svg);
      buttonDiv.appendChild(iconSpan);
    }
    const textSpan = document.createElement("span");
    textSpan.innerHTML = this.innerHTML;
    buttonDiv.appendChild(textSpan);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(buttonDiv);
  }
}
if (!customElements.get("wire-button")) {
  customElements.define("wire-button", WireButton);
}
// src/components/input.ts
class WireInput extends BaseComponent {
  static get observedAttributes() {
    return ["placeholder", "label", "disabled", "type", "value"];
  }
  injectStyles() {
    super.injectStyles();
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
  render() {
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
    const inputDiv = document.createElement("div");
    inputDiv.className = "input-field wireframe-element";
    if (this.hasAttribute("disabled")) {
      inputDiv.setAttribute("disabled", "");
    }
    if (this.hasAttribute("error")) {
      inputDiv.setAttribute("error", "");
      const iconDiv = document.createElement("div");
      iconDiv.className = "input-field-icon";
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
      svg.innerHTML = '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';
      iconDiv.appendChild(svg);
      inputDiv.appendChild(iconDiv);
    }
    inputDiv.textContent = value || placeholder;
    wrapper.appendChild(inputDiv);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(wrapper);
  }
}
if (!customElements.get("wire-input")) {
  customElements.define("wire-input", WireInput);
}
// src/components/card.ts
class WireCard extends BaseComponent {
  static get observedAttributes() {
    return ["variant"];
  }
  render() {
    const card = document.createElement("div");
    card.className = "card wireframe-element";
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    const header = document.createElement("div");
    header.className = "card-header";
    header.appendChild(headerSlot);
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    const body = document.createElement("div");
    body.className = "card-body";
    body.appendChild(contentSlot);
    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.appendChild(footerSlot);
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(card);
  }
}
if (!customElements.get("wire-card")) {
  customElements.define("wire-card", WireCard);
}
// src/components/badge.ts
class WireBadge extends BaseComponent {
  static get observedAttributes() {
    return ["variant"];
  }
  render() {
    const badge = document.createElement("span");
    badge.className = "badge wireframe-element";
    badge.innerHTML = this.innerHTML;
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(badge);
  }
}
if (!customElements.get("wire-badge")) {
  customElements.define("wire-badge", WireBadge);
}
// src/components/avatar.ts
class WireAvatar extends BaseComponent {
  static get observedAttributes() {
    return ["size", "src", "initials", "shape"];
  }
  render() {
    const shape = this.getAttribute("shape") || "circle";
    const avatar = document.createElement("div");
    avatar.className = `avatar wireframe-element ${shape === "circle" ? "avatar-circle" : "avatar-square"}`;
    avatar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    `;
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(avatar);
  }
}
if (!customElements.get("wire-avatar")) {
  customElements.define("wire-avatar", WireAvatar);
}
// src/components/alert.ts
class WireAlert extends BaseComponent {
  static get observedAttributes() {
    return ["variant", "dismissible"];
  }
  injectStyles() {
    super.injectStyles();
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .alert {
        display: flex;
        align-items: flex-start;
        padding: 12px 16px;
        border-radius: 4px;
        border-left: 4px solid #3b82f6;
        background-color: #eff6ff;
        color: #1e40af;
        margin-bottom: 16px;
        width: 100%;
      }
      .alert[variant="success"] {
        border-left-color: #10b981;
        background-color: #d1fae5;
        color: #065f46;
      }
      .alert[variant="warning"] {
        border-left-color: #f59e0b;
        background-color: #fef3c7;
        color: #92400e;
      }
      .alert[variant="danger"] {
        border-left-color: #ef4444;
        background-color: #fee2e2;
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
  render() {
    const alert = document.createElement("div");
    alert.className = "alert wireframe-element";
    const variant = this.getAttribute("variant");
    if (variant) {
      alert.setAttribute("variant", variant);
    }
    const iconContainer = document.createElement("div");
    iconContainer.className = "alert-icon";
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
    let iconPath = "";
    switch (variant) {
      case "success":
        iconPath = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
        break;
      case "warning":
        iconPath = '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>';
        break;
      case "danger":
        iconPath = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
        break;
      default:
        iconPath = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
    }
    svg.innerHTML = iconPath;
    iconContainer.appendChild(svg);
    alert.appendChild(iconContainer);
    const content = document.createElement("div");
    content.className = "alert-content";
    content.innerHTML = this.innerHTML;
    alert.appendChild(content);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(alert);
  }
}
if (!customElements.get("wire-alert")) {
  customElements.define("wire-alert", WireAlert);
}
// src/components/panel.ts
class WirePanel extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const panel = document.createElement("div");
    panel.className = "wire-panel wireframe-element";
    panel.style.padding = "16px";
    panel.style.width = "100%";
    panel.style.boxSizing = "border-box";
    const headerSlot = document.createElement("div");
    headerSlot.className = "panel-header";
    headerSlot.style.marginBottom = "12px";
    headerSlot.style.fontWeight = "bold";
    const headerSlotElement = document.createElement("slot");
    headerSlotElement.name = "header";
    headerSlot.appendChild(headerSlotElement);
    const contentSlot = document.createElement("div");
    contentSlot.className = "panel-content";
    const contentSlotElement = document.createElement("slot");
    contentSlot.appendChild(contentSlotElement);
    panel.appendChild(headerSlot);
    panel.appendChild(contentSlot);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(panel);
  }
}
customElements.define("wire-panel", WirePanel);
// src/components/row.ts
class WireRow extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const row = document.createElement("div");
    row.className = "wire-row";
    row.style.display = "flex";
    row.style.flexDirection = "row";
    row.style.alignItems = "center";
    row.style.gap = "8px";
    row.style.width = "100%";
    row.style.boxSizing = "border-box";
    const slotElement = document.createElement("slot");
    row.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(row);
  }
}
customElements.define("wire-row", WireRow);
// src/components/column.ts
class WireColumn extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const column = document.createElement("div");
    column.className = "wire-column";
    column.style.display = "flex";
    column.style.flexDirection = "column";
    column.style.gap = "8px";
    column.style.width = "100%";
    column.style.boxSizing = "border-box";
    const slotElement = document.createElement("slot");
    column.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(column);
  }
}
customElements.define("wire-column", WireColumn);
// src/components/icon.ts
class WireIcon extends BaseComponent {
  static get observedAttributes() {
    return ["name", "size"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const iconContainer = document.createElement("div");
    iconContainer.className = "wire-icon";
    iconContainer.style.display = "inline-flex";
    iconContainer.style.alignItems = "center";
    iconContainer.style.justifyContent = "center";
    const size = this.getAttribute("size") || "24";
    iconContainer.style.width = `${size}px`;
    iconContainer.style.height = `${size}px`;
    const iconName = this.getAttribute("name") || "circle";
    let svgContent = "";
    switch (iconName) {
      case "check":
        svgContent = '<path d="M20 6L9 17L4 12"></path>';
        break;
      case "x":
        svgContent = '<path d="M18 6L6 18M6 6l12 12"></path>';
        break;
      case "loader":
        svgContent = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';
        break;
      case "chevron-down":
        svgContent = '<path d="M6 9l6 6 6-6"></path>';
        break;
      case "chevron-right":
        svgContent = '<path d="M9 18l6-6-6-6"></path>';
        break;
      case "tool":
        svgContent = '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>';
        break;
      default:
        svgContent = '<circle cx="12" cy="12" r="10"></circle>';
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.innerHTML = svgContent;
    iconContainer.appendChild(svg);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(iconContainer);
  }
}
customElements.define("wire-icon", WireIcon);
// src/components/section.ts
class WireSection extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const section = document.createElement("div");
    section.className = "wire-section wireframe-element";
    section.style.padding = "16px";
    section.style.marginBottom = "16px";
    section.style.width = "100%";
    section.style.boxSizing = "border-box";
    const headerSlot = document.createElement("div");
    headerSlot.className = "section-header";
    headerSlot.style.marginBottom = "8px";
    headerSlot.style.fontWeight = "bold";
    const headerSlotElement = document.createElement("slot");
    headerSlotElement.name = "header";
    headerSlot.appendChild(headerSlotElement);
    const contentSlot = document.createElement("div");
    contentSlot.className = "section-content";
    const contentSlotElement = document.createElement("slot");
    contentSlot.appendChild(contentSlotElement);
    section.appendChild(headerSlot);
    section.appendChild(contentSlot);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(section);
  }
}
customElements.define("wire-section", WireSection);
// src/components/expand-button.ts
class WireExpandButton extends BaseComponent {
  static get observedAttributes() {
    return ["expanded"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const button = document.createElement("div");
    button.className = "wire-expand-button wireframe-element";
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.width = "24px";
    button.style.height = "24px";
    button.style.borderRadius = "4px";
    button.style.cursor = "default";
    const isExpanded = this.hasAttribute("expanded");
    const icon = isExpanded ? "-" : "+";
    button.textContent = icon;
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(button);
  }
}
customElements.define("wire-expand-button", WireExpandButton);
// src/components/message.ts
class WireMessage extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const message = document.createElement("div");
    message.className = "wire-message wireframe-element";
    message.style.padding = "12px";
    message.style.marginBottom = "8px";
    message.style.width = "100%";
    message.style.boxSizing = "border-box";
    const slotElement = document.createElement("slot");
    message.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(message);
  }
}
customElements.define("wire-message", WireMessage);
// src/components/heading.ts
class WireHeading extends BaseComponent {
  static get observedAttributes() {
    return ["level"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const level = this.getAttribute("level") || "1";
    const validLevels = ["1", "2", "3", "4", "5", "6"];
    const headingLevel = validLevels.includes(level) ? level : "1";
    const heading = document.createElement(`h${headingLevel}`);
    heading.className = `wire-heading wire-heading-${headingLevel}`;
    heading.style.margin = "0";
    heading.style.padding = "0";
    heading.style.fontWeight = "bold";
    const fontSizes = {
      "1": "24px",
      "2": "20px",
      "3": "18px",
      "4": "16px",
      "5": "14px",
      "6": "12px"
    };
    heading.style.fontSize = fontSizes[headingLevel] || fontSizes["4"];
    const slotElement = document.createElement("slot");
    heading.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(heading);
  }
}
customElements.define("wire-heading", WireHeading);
// src/components/status-indicator.ts
class WireStatusIndicator extends BaseComponent {
  static get observedAttributes() {
    return ["status"];
  }
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "wire-status-indicator wireframe-element";
    container.style.display = "inline-flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "24px";
    container.style.height = "24px";
    const status = this.getAttribute("status") || "default";
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
    let svgContent = "";
    switch (status) {
      case "success":
        svgContent = '<path d="M20 6L9 17L4 12"></path>';
        break;
      case "failed":
        svgContent = '<path d="M18 6L6 18M6 6l12 12"></path>';
        break;
      case "processing":
        svgContent = '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>';
        break;
      default:
        svgContent = '<circle cx="12" cy="12" r="10"></circle>';
    }
    svg.innerHTML = svgContent;
    container.appendChild(svg);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-status-indicator", WireStatusIndicator);
// src/components/accordion.ts
class WireAccordion extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const accordion = document.createElement("div");
    accordion.className = "wire-accordion";
    accordion.style.width = "100%";
    accordion.style.display = "flex";
    accordion.style.flexDirection = "column";
    accordion.style.boxSizing = "border-box";
    const slotElement = document.createElement("slot");
    accordion.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(accordion);
  }
}

class WireAccordionItem extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const item = document.createElement("div");
    item.className = "wire-accordion-item wireframe-element";
    item.style.borderBottom = "1px solid #6b7280";
    item.style.width = "100%";
    item.style.boxSizing = "border-box";
    const header = document.createElement("div");
    header.className = "wire-accordion-header";
    header.style.padding = "12px";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.cursor = "default";
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    header.appendChild(headerSlot);
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    header.appendChild(chevron);
    const content = document.createElement("div");
    content.className = "wire-accordion-content";
    content.style.padding = "0 12px 12px 12px";
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    content.appendChild(contentSlot);
    item.appendChild(header);
    item.appendChild(content);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}
customElements.define("wire-accordion", WireAccordion);
customElements.define("wire-accordion-item", WireAccordionItem);
// src/components/combobox.ts
class WireCombobox extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const combobox = document.createElement("div");
    combobox.className = "wire-combobox wireframe-element";
    combobox.style.width = "100%";
    combobox.style.width = "100%";
    combobox.style.position = "relative";
    combobox.style.boxSizing = "border-box";
    combobox.style.display = "flex";
    combobox.style.flexDirection = "column";
    combobox.style.padding = "4px";
    const inputContainer = document.createElement("div");
    inputContainer.className = "wire-combobox-input-container";
    inputContainer.style.display = "flex";
    inputContainer.style.alignItems = "center";
    inputContainer.style.padding = "8px 12px";
    inputContainer.style.padding = "4px";
    const inputSlot = document.createElement("slot");
    inputSlot.name = "input";
    inputContainer.appendChild(inputSlot);
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    chevron.style.marginLeft = "auto";
    inputContainer.appendChild(chevron);
    const dropdown = document.createElement("div");
    dropdown.className = "wire-combobox-dropdown wireframe-element";
    dropdown.style.width = "100%";
    dropdown.style.marginTop = "4px";
    dropdown.style.padding = "4px";
    dropdown.style.boxSizing = "border-box";
    dropdown.style.display = "flex";
    dropdown.style.flexDirection = "column";
    const defaultSlot = document.createElement("slot");
    dropdown.appendChild(defaultSlot);
    combobox.appendChild(inputContainer);
    combobox.appendChild(dropdown);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(combobox);
  }
}

class WireComboboxOption extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["selected"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const option = document.createElement("div");
    option.className = "wire-combobox-option wireframe-element";
    option.style.padding = "8px 12px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.cursor = "default";
    option.style.marginTop = "2px";
    const isSelected = this.hasAttribute("selected");
    if (isSelected) {
      const check = document.createElement("div");
      check.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      check.style.marginRight = "8px";
      option.appendChild(check);
    }
    const slotElement = document.createElement("slot");
    option.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(option);
  }
}
customElements.define("wire-combobox", WireCombobox);
customElements.define("wire-combobox-option", WireComboboxOption);
// src/components/tabs.ts
class WireTabs extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const tabs = document.createElement("div");
    tabs.className = "wire-tabs";
    tabs.style.width = "100%";
    tabs.style.boxSizing = "border-box";
    const tabList = document.createElement("div");
    tabList.className = "wire-tab-list";
    tabList.style.display = "flex";
    tabList.style.borderBottom = "1px solid #6b7280";
    tabList.style.marginBottom = "16px";
    const tabListSlot = document.createElement("slot");
    tabListSlot.name = "tab-list";
    tabList.appendChild(tabListSlot);
    const content = document.createElement("div");
    content.className = "wire-tab-content";
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    content.appendChild(contentSlot);
    tabs.appendChild(tabList);
    tabs.appendChild(content);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(tabs);
  }
}

class WireTab extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["active"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const tab = document.createElement("div");
    tab.className = "wire-tab";
    tab.style.padding = "8px 16px";
    tab.style.cursor = "default";
    const isActive = this.hasAttribute("active");
    if (isActive) {
      tab.className = "wire-tab wireframe-element";
      tab.style.borderBottom = "1px solid #6b7280";
      tab.style.borderTop = "1px solid #6b7280";
      tab.style.borderLeft = "1px solid #6b7280";
      tab.style.borderRight = "1px solid #6b7280";
      tab.style.borderBottomColor = "transparent";
      tab.style.marginBottom = "-1px";
      tab.style.position = "relative";
      tab.style.zIndex = "1";
    }
    const slotElement = document.createElement("slot");
    tab.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(tab);
  }
}

class WireTabPanel extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const panel = document.createElement("div");
    panel.className = "wire-tab-panel wireframe-element";
    panel.style.padding = "16px";
    panel.style.marginTop = "-1px";
    const slotElement = document.createElement("slot");
    panel.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(panel);
  }
}
customElements.define("wire-tabs", WireTabs);
customElements.define("wire-tab", WireTab);
customElements.define("wire-tab-panel", WireTabPanel);
// src/components/checkbox.ts
class WireCheckbox extends BaseComponent {
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
  render() {
    const container = document.createElement("div");
    container.className = "wire-checkbox-container";
    container.style.display = "inline-flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    const checkbox = document.createElement("div");
    checkbox.className = "wire-checkbox wireframe-element";
    checkbox.style.width = "16px";
    checkbox.style.height = "16px";
    checkbox.style.display = "flex";
    checkbox.style.alignItems = "center";
    checkbox.style.justifyContent = "center";
    const isChecked = this.hasAttribute("checked");
    if (isChecked) {
      const check = document.createElement("div");
      check.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      checkbox.appendChild(check);
    }
    const labelContainer = document.createElement("div");
    const slotElement = document.createElement("slot");
    labelContainer.appendChild(slotElement);
    container.appendChild(checkbox);
    container.appendChild(labelContainer);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-checkbox", WireCheckbox);
// src/components/radio-group.ts
class WireRadioGroup extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const group = document.createElement("div");
    group.className = "wire-radio-group";
    group.style.display = "flex";
    group.style.flexDirection = "column";
    group.style.gap = "8px";
    const slotElement = document.createElement("slot");
    group.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(group);
  }
}

class WireRadioItem extends BaseComponent {
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
  render() {
    const container = document.createElement("div");
    container.className = "wire-radio-item-container";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    const radio = document.createElement("div");
    radio.className = "wire-radio-item wireframe-element";
    radio.style.width = "16px";
    radio.style.height = "16px";
    radio.style.borderRadius = "50%";
    radio.style.display = "flex";
    radio.style.alignItems = "center";
    radio.style.justifyContent = "center";
    const isChecked = this.hasAttribute("checked");
    if (isChecked) {
      const dot = document.createElement("div");
      dot.style.width = "8px";
      dot.style.height = "8px";
      dot.style.borderRadius = "50%";
      dot.style.backgroundColor = "#6b7280";
      radio.appendChild(dot);
    }
    const labelContainer = document.createElement("div");
    const slotElement = document.createElement("slot");
    labelContainer.appendChild(slotElement);
    container.appendChild(radio);
    container.appendChild(labelContainer);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-radio-group", WireRadioGroup);
customElements.define("wire-radio-item", WireRadioItem);
// src/components/select.ts
class WireSelect extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  render() {
    const select = document.createElement("div");
    select.className = "wire-select wireframe-element";
    select.style.width = "100%";
    select.style.position = "relative";
    select.style.boxSizing = "border-box";
    select.style.display = "flex";
    select.style.padding = "4px";
    select.style.flexDirection = "column";
    const trigger = document.createElement("div");
    trigger.className = "wire-select-trigger";
    trigger.style.display = "flex";
    trigger.style.alignItems = "center";
    trigger.style.justifyContent = "space-between";
    trigger.style.padding = "4px";
    trigger.style.cursor = "default";
    const valueSlot = document.createElement("slot");
    valueSlot.name = "value";
    trigger.appendChild(valueSlot);
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    trigger.appendChild(chevron);
    const content = document.createElement("div");
    content.className = "wire-select-content wireframe-element";
    content.style.width = "100%";
    content.style.marginTop = "4px";
    content.style.boxSizing = "border-box";
    content.style.display = "flex";
    content.style.padding = "4px";
    content.style.flexDirection = "column";
    const defaultSlot = document.createElement("slot");
    content.appendChild(defaultSlot);
    select.appendChild(trigger);
    select.appendChild(content);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(select);
  }
}

class WireSelectOption extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["selected"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const option = document.createElement("div");
    option.className = "wire-select-option wireframe-element";
    option.style.padding = "8px 12px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.cursor = "default";
    option.style.marginBottom = "2px";
    const isSelected = this.hasAttribute("selected");
    if (isSelected) {
      const check = document.createElement("div");
      check.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      check.style.marginRight = "8px";
      option.appendChild(check);
    }
    const slotElement = document.createElement("slot");
    option.appendChild(slotElement);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(option);
  }
}
customElements.define("wire-select", WireSelect);
customElements.define("wire-select-option", WireSelectOption);
// src/components/toggle.ts
class WireToggle extends BaseComponent {
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
  injectStyles() {
    super.injectStyles();
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .wire-toggle {
        width: 40px;
        height: 22px;
        border-radius: 11px;
        position: relative;
        cursor: pointer;
        background-color: #e5e7eb;
        border: 2px solid #d1d5db;
        transition: all 0.2s ease;
      }
      .wire-toggle[checked] {
        background-color: #d1fae5;
        border-color: #10b981;
      }
      .wire-toggle-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 1px;
        background-color: #9ca3af;
        border: 1px solid #6b7280;
        transition: all 0.2s ease;
      }
      .wire-toggle[checked] .wire-toggle-thumb {
        left: 19px;
        background-color: #10b981;
        border-color: #059669;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }
  render() {
    const toggle = document.createElement("div");
    toggle.className = "wire-toggle wireframe-element";
    const isChecked = this.hasAttribute("checked");
    if (isChecked) {
      toggle.setAttribute("checked", "");
    }
    const thumb = document.createElement("div");
    thumb.className = "wire-toggle-thumb wireframe-element";
    toggle.appendChild(thumb);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(toggle);
  }
}
customElements.define("wire-toggle", WireToggle);
// src/components/slider.ts
class WireSlider extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["value", "min", "max"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const slider = document.createElement("div");
    slider.className = "wire-slider";
    slider.style.width = "100%";
    slider.style.position = "relative";
    slider.style.height = "20px";
    slider.style.display = "flex";
    slider.style.alignItems = "center";
    const track = document.createElement("div");
    track.className = "wire-slider-track wireframe-element";
    track.style.width = "100%";
    track.style.height = "4px";
    track.style.position = "relative";
    const min = parseInt(this.getAttribute("min") || "0");
    const max = parseInt(this.getAttribute("max") || "100");
    const value = parseInt(this.getAttribute("value") || "0");
    const percentage = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
    const filledTrack = document.createElement("div");
    filledTrack.className = "wire-slider-filled-track";
    filledTrack.style.position = "absolute";
    filledTrack.style.height = "100%";
    filledTrack.style.width = `${percentage}%`;
    filledTrack.style.backgroundColor = "#6b7280";
    track.appendChild(filledTrack);
    const thumb = document.createElement("div");
    thumb.className = "wire-slider-thumb wireframe-element";
    thumb.style.width = "16px";
    thumb.style.height = "16px";
    thumb.style.borderRadius = "50%";
    thumb.style.position = "absolute";
    thumb.style.top = "50%";
    thumb.style.left = `${percentage}%`;
    thumb.style.transform = "translate(-50%, -50%)";
    thumb.style.cursor = "default";
    slider.appendChild(track);
    slider.appendChild(thumb);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(slider);
  }
}
customElements.define("wire-slider", WireSlider);
// src/components/dialog.ts
class WireDialog extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["open"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "wire-dialog-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "8px";
    container.style.width = "100%";
    const dialog = document.createElement("div");
    dialog.className = "wire-dialog wireframe-element";
    dialog.style.width = "100%";
    dialog.style.maxWidth = "300px";
    dialog.style.display = "flex";
    dialog.style.flexDirection = "column";
    const header = document.createElement("div");
    header.className = "wire-dialog-header";
    header.style.padding = "12px";
    header.style.borderBottom = "1px solid #9ca3af";
    header.style.fontWeight = "500";
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    headerSlot.textContent = "Dialog Title";
    header.appendChild(headerSlot);
    const content = document.createElement("div");
    content.className = "wire-dialog-content";
    content.style.padding = "12px";
    content.style.flexGrow = "1";
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    contentSlot.textContent = "Dialog content goes here...";
    content.appendChild(contentSlot);
    const footer = document.createElement("div");
    footer.className = "wire-dialog-footer";
    footer.style.padding = "12px";
    footer.style.borderTop = "1px solid #9ca3af";
    footer.style.display = "flex";
    footer.style.justifyContent = "flex-end";
    footer.style.gap = "8px";
    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    const cancelButton = document.createElement("div");
    cancelButton.className = "btn wireframe-element";
    cancelButton.style.padding = "4px 8px";
    cancelButton.textContent = "Cancel";
    const confirmButton = document.createElement("div");
    confirmButton.className = "btn wireframe-element";
    confirmButton.style.padding = "4px 8px";
    confirmButton.textContent = "Confirm";
    footerSlot.appendChild(cancelButton);
    footerSlot.appendChild(confirmButton);
    footer.appendChild(footerSlot);
    dialog.appendChild(header);
    dialog.appendChild(content);
    dialog.appendChild(footer);
    container.appendChild(dialog);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-dialog", WireDialog);
// src/components/dropdown.ts
class WireDropdown extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["open"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "wire-dropdown-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    container.style.alignItems = "flex-start";
    const trigger = document.createElement("div");
    trigger.className = "wire-dropdown-trigger wireframe-element";
    trigger.style.padding = "8px 12px";
    trigger.style.display = "flex";
    trigger.style.alignItems = "center";
    trigger.style.justifyContent = "space-between";
    trigger.style.gap = "8px";
    trigger.style.cursor = "default";
    const triggerSlot = document.createElement("slot");
    triggerSlot.name = "trigger";
    triggerSlot.textContent = "Dropdown";
    trigger.appendChild(triggerSlot);
    const chevron = document.createElement("div");
    chevron.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
    trigger.appendChild(chevron);
    const content = document.createElement("div");
    content.className = "wire-dropdown-content wireframe-element";
    content.style.width = "100%";
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.padding = "4px";
    content.style.marginTop = "4px";
    const isOpen = this.hasAttribute("open");
    if (!isOpen) {
      content.style.display = "none";
    }
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    content.appendChild(contentSlot);
    const defaultItems = document.createElement("div");
    defaultItems.innerHTML = `
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px; margin-bottom: 2px;">Item 1</div>
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px; margin-bottom: 2px;">Item 2</div>
      <div class="wire-dropdown-item wireframe-element" style="padding: 8px 12px;">Item 3</div>
    `;
    contentSlot.appendChild(defaultItems);
    container.appendChild(trigger);
    container.appendChild(content);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-dropdown", WireDropdown);
// src/components/tooltip.ts
class WireTooltip extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["position", "visible"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const container = document.createElement("div");
    container.className = "wire-tooltip-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    container.style.alignItems = "flex-start";
    const position = this.getAttribute("position") || "top";
    const trigger = document.createElement("div");
    trigger.className = "wire-tooltip-trigger";
    trigger.style.display = "inline-block";
    const triggerSlot = document.createElement("slot");
    triggerSlot.name = "trigger";
    triggerSlot.textContent = "Hover me";
    trigger.appendChild(triggerSlot);
    const content = document.createElement("div");
    content.className = "wire-tooltip-content wireframe-element";
    content.style.padding = "6px 10px";
    content.style.fontSize = "12px";
    content.style.marginBottom = position === "bottom" ? "0" : "4px";
    content.style.marginTop = position === "top" ? "0" : "4px";
    content.style.marginLeft = position === "right" ? "4px" : "0";
    content.style.marginRight = position === "left" ? "4px" : "0";
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    contentSlot.textContent = "Tooltip content";
    content.appendChild(contentSlot);
    const isVisible = this.hasAttribute("visible");
    if (!isVisible) {
      content.style.display = "none";
    }
    if (position === "bottom") {
      container.appendChild(trigger);
      container.appendChild(content);
    } else if (position === "right") {
      const horizontalContainer = document.createElement("div");
      horizontalContainer.style.display = "flex";
      horizontalContainer.style.alignItems = "center";
      horizontalContainer.appendChild(trigger);
      horizontalContainer.appendChild(content);
      container.appendChild(horizontalContainer);
    } else if (position === "left") {
      const horizontalContainer = document.createElement("div");
      horizontalContainer.style.display = "flex";
      horizontalContainer.style.alignItems = "center";
      horizontalContainer.appendChild(content);
      horizontalContainer.appendChild(trigger);
      container.appendChild(horizontalContainer);
    } else {
      container.appendChild(content);
      container.appendChild(trigger);
    }
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}
customElements.define("wire-tooltip", WireTooltip);
// src/components/progress.ts
class WireProgress extends BaseComponent {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["value", "max"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const progress = document.createElement("div");
    progress.className = "wire-progress wireframe-element";
    progress.style.width = "100%";
    progress.style.height = "8px";
    progress.style.position = "relative";
    progress.style.overflow = "hidden";
    const value = parseInt(this.getAttribute("value") || "0", 10);
    const max = parseInt(this.getAttribute("max") || "100", 10);
    const percentage = Math.min(Math.max(0, value), max) / max * 100;
    const bar = document.createElement("div");
    bar.className = "wire-progress-bar wireframe-element";
    bar.style.position = "absolute";
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.width = `${percentage}%`;
    bar.style.backgroundColor = "#9ca3af";
    progress.appendChild(bar);
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(progress);
  }
}
customElements.define("wire-progress", WireProgress);
export {
  WireTooltip,
  WireToggle,
  WireTabs,
  WireTabPanel,
  WireTab,
  WireStatusIndicator,
  WireSlider,
  WireSelectOption,
  WireSelect,
  WireSection,
  WireRow,
  WireRadioItem,
  WireRadioGroup,
  WireProgress,
  WirePanel,
  WireMessage,
  WireInput,
  WireIcon,
  WireHeading,
  WireExpandButton,
  WireDropdown,
  WireDialog,
  WireComboboxOption,
  WireCombobox,
  WireColumn,
  WireCheckbox,
  WireCard,
  WireButton,
  WireBadge,
  WireAvatar,
  WireAlert,
  WireAccordionItem,
  WireAccordion
};
