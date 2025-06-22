import { BaseComponent } from "../core/base-component";

export class WireDialog extends BaseComponent {
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

  render(): void {
    // Create container for the entire dialog
    const container = document.createElement("div");
    container.className = "wire-dialog-container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "8px";
    container.style.width = "100%";

    // Create dialog element
    const dialog = document.createElement("div");
    dialog.className = "wire-dialog wireframe-element";
    dialog.style.width = "100%";
    dialog.style.maxWidth = "300px";
    dialog.style.display = "flex";
    dialog.style.flexDirection = "column";

    // Create dialog header
    const header = document.createElement("div");
    header.className = "wire-dialog-header";
    header.style.padding = "12px";
    header.style.borderBottom = "1px solid #9ca3af";
    header.style.fontWeight = "500";

    // Add header slot
    const headerSlot = document.createElement("slot");
    headerSlot.name = "header";
    headerSlot.textContent = "Dialog Title";
    header.appendChild(headerSlot);

    // Create dialog content
    const content = document.createElement("div");
    content.className = "wire-dialog-content";
    content.style.padding = "12px";
    content.style.flexGrow = "1";

    // Add content slot
    const contentSlot = document.createElement("slot");
    contentSlot.name = "content";
    contentSlot.textContent = "Dialog content goes here...";
    content.appendChild(contentSlot);

    // Create dialog footer
    const footer = document.createElement("div");
    footer.className = "wire-dialog-footer";
    footer.style.padding = "12px";
    footer.style.borderTop = "1px solid #9ca3af";
    footer.style.display = "flex";
    footer.style.justifyContent = "flex-end";
    footer.style.gap = "8px";

    // Add footer slot
    const footerSlot = document.createElement("slot");
    footerSlot.name = "footer";
    
    // Create default buttons for the footer
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

    // Add all sections to dialog
    dialog.appendChild(header);
    dialog.appendChild(content);
    dialog.appendChild(footer);
    
    // Add dialog to container
    container.appendChild(dialog);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

// Register the custom element
customElements.define("wire-dialog", WireDialog);
