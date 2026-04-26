import { BaseComponent } from "../../core/base-component";

export class WireAndroidSnackbar extends BaseComponent {
  static get observedAttributes() {
    return ["message", "action"];
  }

  render(): void {
    const snackbar = document.createElement("div");
    snackbar.className = "wire-android-snackbar wireframe-element";
    snackbar.style.display = "flex";
    snackbar.style.alignItems = "center";
    snackbar.style.justifyContent = "space-between";
    snackbar.style.padding = "14px 16px";
    snackbar.style.width = "100%";
    snackbar.style.maxWidth = "400px";
    snackbar.style.borderRadius = "4px";
    snackbar.style.backgroundColor = "#323232";
    snackbar.style.color = "#fff";
    snackbar.style.border = "none";
    snackbar.style.boxShadow = "0 3px 5px rgba(0,0,0,0.2)";
    snackbar.style.fontSize = "14px";

    // Message
    const message = document.createElement("span");
    message.style.flex = "1";
    message.textContent = this.getAttribute("message") || "Message text";
    snackbar.appendChild(message);

    // Action button
    if (this.hasAttribute("action")) {
      const action = document.createElement("span");
      action.style.fontWeight = "500";
      action.style.color = "#bb86fc";
      action.style.paddingLeft = "16px";
      action.style.textTransform = "uppercase";
      action.style.fontSize = "14px";
      action.style.cursor = "default";
      action.textContent = this.getAttribute("action");
      snackbar.appendChild(action);
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(snackbar);
  }
}

if (!customElements.get("wire-android-snackbar")) {
  customElements.define("wire-android-snackbar", WireAndroidSnackbar);
}
