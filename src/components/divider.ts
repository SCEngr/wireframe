import { BaseComponent } from "../core/base-component";

export class WireDivider extends BaseComponent {
  static get observedAttributes() {
    return ["direction"];
  }

  render(): void {
    const direction = this.getAttribute("direction") || "horizontal";

    const divider = document.createElement("div");
    divider.className = "wire-divider wireframe-element";

    if (direction === "vertical") {
      divider.style.width = "1px";
      divider.style.height = "100%";
      divider.style.minHeight = "24px";
      divider.style.alignSelf = "stretch";
    } else {
      divider.style.width = "100%";
      divider.style.height = "1px";
    }

    divider.style.backgroundColor = "#9ca3af";

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(divider);
  }
}

if (!customElements.get("wire-divider")) {
  customElements.define("wire-divider", WireDivider);
}
