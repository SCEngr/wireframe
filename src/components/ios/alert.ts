import { BaseComponent } from "../../core/base-component";

export class WireIosAlert extends BaseComponent {
  render(): void {
    const container = document.createElement("div");
    container.className = "wire-ios-alert wireframe-element";
    container.style.width = "270px";
    container.style.borderRadius = "14px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.overflow = "hidden";
    container.style.backgroundColor = "#fafafa";
    container.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";

    // Title
    const titleSlot = document.createElement("slot");
    titleSlot.name = "title";
    const titleContainer = document.createElement("div");
    titleContainer.style.padding = "20px 16px 8px";
    titleContainer.style.textAlign = "center";
    titleContainer.style.fontWeight = "600";
    titleContainer.style.fontSize = "17px";
    titleContainer.appendChild(titleSlot);
    container.appendChild(titleContainer);

    // Message
    const messageSlot = document.createElement("slot");
    messageSlot.name = "message";
    const messageContainer = document.createElement("div");
    messageContainer.style.padding = "0 16px 20px";
    messageContainer.style.textAlign = "center";
    messageContainer.style.fontSize = "13px";
    messageContainer.appendChild(messageSlot);
    container.appendChild(messageContainer);

    // Buttons divider
    const divider = document.createElement("div");
    divider.style.borderTop = "var(--wire-border-width, 0.5px) solid var(--wire-border-color, #c7c7cc)";
    container.appendChild(divider);

    // Buttons row
    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.height = "44px";

    const buttonSlot = document.createElement("slot");
    buttonSlot.name = "buttons";
    buttonRow.appendChild(buttonSlot);

    // Default buttons
    const cancelBtn = document.createElement("div");
    cancelBtn.style.flex = "1";
    cancelBtn.style.display = "flex";
    cancelBtn.style.alignItems = "center";
    cancelBtn.style.justifyContent = "center";
    cancelBtn.style.fontSize = "17px";
    cancelBtn.style.color = "var(--wire-accent-color, #007aff)";
    cancelBtn.style.fontWeight = "400";
    cancelBtn.style.cursor = "default";
    cancelBtn.textContent = "Cancel";

    const btnDivider = document.createElement("div");
    btnDivider.style.width = "var(--wire-border-width, 0.5px)";
    btnDivider.style.backgroundColor = "var(--wire-border-color, #c7c7cc)";

    const confirmBtn = document.createElement("div");
    confirmBtn.style.flex = "1";
    confirmBtn.style.display = "flex";
    confirmBtn.style.alignItems = "center";
    confirmBtn.style.justifyContent = "center";
    confirmBtn.style.fontSize = "17px";
    confirmBtn.style.color = "var(--wire-accent-color, #007aff)";
    confirmBtn.style.fontWeight = "600";
    confirmBtn.style.cursor = "default";
    confirmBtn.textContent = "OK";

    buttonRow.appendChild(cancelBtn);
    buttonRow.appendChild(btnDivider);
    buttonRow.appendChild(confirmBtn);
    container.appendChild(buttonRow);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-ios-alert")) {
  customElements.define("wire-ios-alert", WireIosAlert);
}
