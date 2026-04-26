import { BaseComponent } from "../core/base-component";

export class WireSkeleton extends BaseComponent {
  static get observedAttributes() {
    return ["width", "height", "shape"];
  }

  render(): void {
    const width = this.getAttribute("width") || "100%";
    const height = this.getAttribute("height") || "16px";
    const shape = this.getAttribute("shape") || "rectangle";

    const skeleton = document.createElement("div");
    skeleton.className = "wire-skeleton wireframe-element";
    skeleton.style.width = width;
    skeleton.style.height = height;
    skeleton.style.backgroundColor = "#e5e7eb";

    if (shape === "circle") {
      skeleton.style.borderRadius = "50%";
      skeleton.style.width = height;
    } else if (shape === "text") {
      skeleton.style.height = "12px";
      skeleton.style.borderRadius = "4px";
    } else {
      skeleton.style.borderRadius = "4px";
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(skeleton);
  }
}

if (!customElements.get("wire-skeleton")) {
  customElements.define("wire-skeleton", WireSkeleton);
}
