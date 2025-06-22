import { BaseComponent } from "../core/base-component";

export class WireTooltip extends BaseComponent {
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

  render(): void {
    const container = document.createElement("div");
    container.className = "wire-tooltip-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    container.style.alignItems = "flex-start";

    // Get tooltip position
    const position = this.getAttribute("position") || "top";
    
    // Create trigger element
    const trigger = document.createElement("div");
    trigger.className = "wire-tooltip-trigger";
    trigger.style.display = "inline-block";

    // Add trigger slot
    const triggerSlot = document.createElement("slot");
    triggerSlot.name = "trigger";
    triggerSlot.textContent = "Hover me";
    trigger.appendChild(triggerSlot);

    // Create tooltip content
    const content = document.createElement("div");
    content.className = "wire-tooltip-content wireframe-element";
    content.style.padding = "6px 10px";
    content.style.fontSize = "12px";
    content.style.marginBottom = position === "bottom" ? "0" : "4px";
    content.style.marginTop = position === "top" ? "0" : "4px";
    content.style.marginLeft = position === "right" ? "4px" : "0";
    content.style.marginRight = position === "left" ? "4px" : "0";

    // Add content slot
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    contentSlot.textContent = "Tooltip content";
    content.appendChild(contentSlot);

    // Check if tooltip is visible
    const isVisible = this.hasAttribute("visible");
    if (!isVisible) {
      content.style.display = "none";
    }

    // Arrange elements based on position
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
    } else { // top (default)
      container.appendChild(content);
      container.appendChild(trigger);
    }

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define("wire-tooltip", WireTooltip);
