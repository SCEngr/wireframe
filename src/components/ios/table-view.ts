import { BaseComponent } from "../../core/base-component";

export class WireIosTableView extends BaseComponent {
  static get observedAttributes() {
    return ["grouped"];
  }

  render(): void {
    const table = document.createElement("div");
    table.className = "wire-ios-table-view";
    table.style.width = "100%";
    table.style.display = "flex";
    table.style.flexDirection = "column";
    table.style.padding = this.hasAttribute("grouped") ? "16px" : "0";

    const slot = document.createElement("slot");
    table.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(table);
  }
}

export class WireIosTableCell extends BaseComponent {
  static get observedAttributes() {
    return ["show-chevron", "label"];
  }

  render(): void {
    const cell = document.createElement("div");
    cell.className = "wire-ios-table-cell wireframe-element";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "space-between";
    cell.style.padding = "12px 16px";
    cell.style.width = "100%";
    cell.style.minHeight = "44px";

    // Left content
    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.flexDirection = "column";
    left.style.flex = "1";

    const labelSlot = document.createElement("slot");
    labelSlot.name = "label";
    left.appendChild(labelSlot);

    if (this.hasAttribute("label")) {
      const label = document.createElement("span");
      label.style.fontSize = "17px";
      label.textContent = this.getAttribute("label");
      left.appendChild(label);
    }

    cell.appendChild(left);

    // Chevron
    if (this.hasAttribute("show-chevron")) {
      const chevron = document.createElement("span");
      chevron.style.color = "#c7c7cc";
      chevron.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      `;
      cell.appendChild(chevron);
    }

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(cell);
  }
}

if (!customElements.get("wire-ios-table-view")) {
  customElements.define("wire-ios-table-view", WireIosTableView);
}
if (!customElements.get("wire-ios-table-cell")) {
  customElements.define("wire-ios-table-cell", WireIosTableCell);
}
