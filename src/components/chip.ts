import { BaseComponent } from "../core/base-component";

export class WireChip extends BaseComponent {
  static get observedAttributes() {
    return ["dismissible"];
  }

  render(): void {
    const chip = document.createElement("div");
    chip.className = "wire-chip wireframe-element";
    chip.style.display = "inline-flex";
    chip.style.alignItems = "center";
    chip.style.gap = "4px";
    chip.style.padding = "2px 8px";
    chip.style.borderRadius = "9999px";
    chip.style.fontSize = "0.75rem";
    chip.style.fontWeight = "500";

    const slot = document.createElement("slot");
    chip.appendChild(slot);

    if (this.hasAttribute("dismissible")) {
      const dismiss = document.createElement("span");
      dismiss.style.width = "12px";
      dismiss.style.height = "12px";
      dismiss.style.display = "inline-flex";
      dismiss.style.alignItems = "center";
      dismiss.style.justifyContent = "center";
      dismiss.style.marginLeft = "2px";
      dismiss.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      `;
      chip.appendChild(dismiss);
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(chip);
  }
}

if (!customElements.get("wire-chip")) {
  customElements.define("wire-chip", WireChip);
}
