import { BaseComponent } from "../core/base-component";

export class WirePagination extends BaseComponent {
  static get observedAttributes() {
    return ["current", "total"];
  }

  render(): void {
    const container = document.createElement("div");
    container.className = "wire-pagination";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "4px";

    const current = parseInt(this.getAttribute("current") || "1");
    const total = parseInt(this.getAttribute("total") || "5");

    // Previous button
    const prev = document.createElement("div");
    prev.className = "wire-pagination-item wireframe-element";
    prev.style.padding = "6px 10px";
    prev.style.fontSize = "0.875rem";
    prev.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    `;
    container.appendChild(prev);

    // Page numbers
    for (let i = 1; i <= total; i++) {
      const page = document.createElement("div");
      page.className = "wire-pagination-item wireframe-element";
      page.style.padding = "6px 10px";
      page.style.fontSize = "0.875rem";
      page.style.minWidth = "32px";
      page.style.textAlign = "center";
      page.textContent = String(i);

      if (i === current) {
        page.style.backgroundColor = "#9ca3af";
        page.style.color = "#fff";
      }

      container.appendChild(page);
    }

    // Next button
    const next = document.createElement("div");
    next.className = "wire-pagination-item wireframe-element";
    next.style.padding = "6px 10px";
    next.style.fontSize = "0.875rem";
    next.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    `;
    container.appendChild(next);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-pagination")) {
  customElements.define("wire-pagination", WirePagination);
}
