import { BaseComponent } from "../core/base-component";

export class WireBreadcrumb extends BaseComponent {
  render(): void {
    const nav = document.createElement("nav");
    nav.className = "wire-breadcrumb";
    nav.style.display = "flex";
    nav.style.alignItems = "center";
    nav.style.gap = "8px";
    nav.style.fontSize = "0.875rem";

    const slot = document.createElement("slot");
    nav.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(nav);
  }
}

export class WireBreadcrumbItem extends BaseComponent {
  render(): void {
    const item = document.createElement("span");
    item.className = "wire-breadcrumb-item wireframe-element";
    item.style.display = "inline-flex";
    item.style.alignItems = "center";
    item.style.gap = "8px";
    item.style.padding = "4px 8px";

    const slot = document.createElement("slot");
    item.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-breadcrumb")) {
  customElements.define("wire-breadcrumb", WireBreadcrumb);
}
if (!customElements.get("wire-breadcrumb-item")) {
  customElements.define("wire-breadcrumb-item", WireBreadcrumbItem);
}
