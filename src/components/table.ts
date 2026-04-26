import { BaseComponent } from "../core/base-component";

export class WireTable extends BaseComponent {
  render(): void {
    const table = document.createElement("div");
    table.className = "wire-table wireframe-element";
    table.style.width = "100%";
    table.style.overflow = "hidden";

    const slot = document.createElement("slot");
    table.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(table);
  }
}

export class WireThead extends BaseComponent {
  render(): void {
    const thead = document.createElement("div");
    thead.className = "wire-thead";
    thead.style.borderBottom = "1px solid #9ca3af";
    thead.style.fontWeight = "500";

    const slot = document.createElement("slot");
    thead.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(thead);
  }
}

export class WireTbody extends BaseComponent {
  render(): void {
    const tbody = document.createElement("div");
    tbody.className = "wire-tbody";

    const slot = document.createElement("slot");
    tbody.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(tbody);
  }
}

export class WireTr extends BaseComponent {
  render(): void {
    const tr = document.createElement("div");
    tr.className = "wire-tr";
    tr.style.display = "flex";
    tr.style.borderBottom = "1px solid #e5e7eb";

    const slot = document.createElement("slot");
    tr.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(tr);
  }
}

export class WireTh extends BaseComponent {
  render(): void {
    const th = document.createElement("div");
    th.className = "wire-th wireframe-element";
    th.style.flex = "1";
    th.style.padding = "8px 12px";
    th.style.fontWeight = "500";
    th.style.fontSize = "0.875rem";

    const slot = document.createElement("slot");
    th.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(th);
  }
}

export class WireTd extends BaseComponent {
  render(): void {
    const td = document.createElement("div");
    td.className = "wire-td wireframe-element";
    td.style.flex = "1";
    td.style.padding = "8px 12px";
    td.style.fontSize = "0.875rem";

    const slot = document.createElement("slot");
    td.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(td);
  }
}

if (!customElements.get("wire-table")) {
  customElements.define("wire-table", WireTable);
}
if (!customElements.get("wire-thead")) {
  customElements.define("wire-thead", WireThead);
}
if (!customElements.get("wire-tbody")) {
  customElements.define("wire-tbody", WireTbody);
}
if (!customElements.get("wire-tr")) {
  customElements.define("wire-tr", WireTr);
}
if (!customElements.get("wire-th")) {
  customElements.define("wire-th", WireTh);
}
if (!customElements.get("wire-td")) {
  customElements.define("wire-td", WireTd);
}
