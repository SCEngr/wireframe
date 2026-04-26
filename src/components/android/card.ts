import { BaseComponent } from "../../core/base-component";

export class WireAndroidCard extends BaseComponent {
  render(): void {
    const card = document.createElement("div");
    card.className = "wire-android-card wireframe-element";
    card.style.width = "100%";
    card.style.borderRadius = "8px";
    card.style.overflow = "hidden";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.boxShadow = "var(--wire-shadow, 0 1px 3px rgba(0,0,0,0.12))";
    card.style.backgroundColor = "var(--wire-bg-color, #fff)";

    // Media slot
    const mediaSlot = document.createElement("slot");
    mediaSlot.name = "media";
    const mediaContainer = document.createElement("div");
    mediaContainer.style.width = "100%";
    mediaContainer.style.minHeight = "120px";
    mediaContainer.style.backgroundColor = "#e0e0e0";
    mediaContainer.style.display = "flex";
    mediaContainer.style.alignItems = "center";
    mediaContainer.style.justifyContent = "center";
    const mediaPlaceholder = document.createElement("span");
    mediaPlaceholder.style.opacity = "0.4";
    mediaPlaceholder.textContent = "Media";
    mediaContainer.appendChild(mediaPlaceholder);
    mediaContainer.appendChild(mediaSlot);
    card.appendChild(mediaContainer);

    // Content area
    const content = document.createElement("div");
    content.style.padding = "16px";
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.gap = "8px";

    // Title slot
    const titleSlot = document.createElement("slot");
    titleSlot.name = "title";
    const titleContainer = document.createElement("div");
    titleContainer.style.fontSize = "20px";
    titleContainer.style.fontWeight = "500";
    titleContainer.appendChild(titleSlot);

    // Subtitle slot
    const subSlot = document.createElement("slot");
    subSlot.name = "subtitle";
    const subContainer = document.createElement("div");
    subContainer.style.fontSize = "14px";
    subContainer.style.opacity = "0.6";
    subContainer.appendChild(subSlot);

    content.appendChild(titleContainer);
    content.appendChild(subContainer);
    card.appendChild(content);

    // Actions
    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "8px";
    actions.style.padding = "0 8px 8px";

    const actionSlot = document.createElement("slot");
    actionSlot.name = "actions";
    actions.appendChild(actionSlot);

    // Default action buttons
    const btn1 = document.createElement("span");
    btn1.style.padding = "8px 12px";
    btn1.style.fontSize = "14px";
    btn1.style.fontWeight = "500";
    btn1.style.color = "var(--wire-accent-color, #6200ee)";
    btn1.style.textTransform = "uppercase";
    btn1.textContent = "Action 1";
    actions.appendChild(btn1);

    const btn2 = document.createElement("span");
    btn2.style.padding = "8px 12px";
    btn2.style.fontSize = "14px";
    btn2.style.fontWeight = "500";
    btn2.style.color = "var(--wire-accent-color, #6200ee)";
    btn2.style.textTransform = "uppercase";
    btn2.textContent = "Action 2";
    actions.appendChild(btn2);

    card.appendChild(actions);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(card);
  }
}

if (!customElements.get("wire-android-card")) {
  customElements.define("wire-android-card", WireAndroidCard);
}
