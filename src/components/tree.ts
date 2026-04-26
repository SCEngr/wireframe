import { BaseComponent } from "../core/base-component";

export class WireTree extends BaseComponent {
  render(): void {
    const tree = document.createElement("div");
    tree.className = "wire-tree";
    tree.style.display = "flex";
    tree.style.flexDirection = "column";
    tree.style.gap = "2px";

    const slot = document.createElement("slot");
    tree.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(tree);
  }
}

export class WireTreeItem extends BaseComponent {
  static get observedAttributes() {
    return ["expanded", "level"];
  }

  render(): void {
    const level = parseInt(this.getAttribute("level") || "0");
    const isExpanded = this.hasAttribute("expanded");

    const item = document.createElement("div");
    item.className = "wire-tree-item";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.paddingLeft = `${level * 20}px`;

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "4px";
    row.style.padding = "4px 8px";

    // Expand/collapse indicator
    const indicator = document.createElement("span");
    indicator.style.width = "16px";
    indicator.style.height = "16px";
    indicator.style.display = "inline-flex";
    indicator.style.alignItems = "center";
    indicator.style.justifyContent = "center";
    indicator.style.fontSize = "12px";
    indicator.textContent = isExpanded ? "v" : ">";
    row.appendChild(indicator);

    // Label slot
    const labelSlot = document.createElement("slot");
    labelSlot.name = "label";
    row.appendChild(labelSlot);

    item.appendChild(row);

    // Children slot
    const childrenSlot = document.createElement("slot");
    childrenSlot.name = "children";
    item.appendChild(childrenSlot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-tree")) {
  customElements.define("wire-tree", WireTree);
}
if (!customElements.get("wire-tree-item")) {
  customElements.define("wire-tree-item", WireTreeItem);
}
