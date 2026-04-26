import { BaseComponent } from "../../core/base-component";

export class WireAndroidListItem extends BaseComponent {
  static get observedAttributes() {
    return ["title", "subtitle", "trailing"];
  }

  render(): void {
    const item = document.createElement("div");
    item.className = "wire-android-list-item wireframe-element";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "16px";
    item.style.padding = "8px 16px";
    item.style.minHeight = "56px";
    item.style.width = "100%";

    // Leading icon slot
    const iconSlot = document.createElement("slot");
    iconSlot.name = "icon";
    const iconContainer = document.createElement("div");
    iconContainer.style.width = "40px";
    iconContainer.style.height = "40px";
    iconContainer.style.borderRadius = "50%";
    iconContainer.style.display = "flex";
    iconContainer.style.alignItems = "center";
    iconContainer.style.justifyContent = "center";
    iconContainer.style.flexShrink = "0";
    iconContainer.appendChild(iconSlot);
    item.appendChild(iconContainer);

    // Text content
    const textContainer = document.createElement("div");
    textContainer.style.flex = "1";
    textContainer.style.display = "flex";
    textContainer.style.flexDirection = "column";
    textContainer.style.gap = "2px";

    const title = document.createElement("span");
    title.style.fontSize = "16px";
    title.style.fontWeight = "400";
    title.textContent = this.getAttribute("title") || "List item title";
    textContainer.appendChild(title);

    const subtitle = this.getAttribute("subtitle");
    if (subtitle) {
      const sub = document.createElement("span");
      sub.style.fontSize = "14px";
      sub.style.opacity = "0.6";
      sub.textContent = subtitle;
      textContainer.appendChild(sub);
    }
    item.appendChild(textContainer);

    // Trailing
    const trailing = this.getAttribute("trailing");
    if (trailing) {
      const trail = document.createElement("span");
      trail.style.fontSize = "14px";
      trail.style.opacity = "0.6";
      trail.style.flexShrink = "0";
      trail.textContent = trailing;
      item.appendChild(trail);
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-android-list-item")) {
  customElements.define("wire-android-list-item", WireAndroidListItem);
}
