import { BaseComponent } from "../../core/base-component";

export class WireIosSegmentedControl extends BaseComponent {
  static get observedAttributes() {
    return ["segments", "selected"];
  }

  render(): void {
    const container = document.createElement("div");
    container.className = "wire-ios-segmented-control wireframe-element";
    container.style.display = "inline-flex";
    container.style.borderRadius = "8px";
    container.style.overflow = "hidden";
    container.style.width = "100%";

    const segments = (this.getAttribute("segments") || "First,Second,Third").split(",");
    const selectedIndex = parseInt(this.getAttribute("selected") || "0");

    segments.forEach((segment, i) => {
      const seg = document.createElement("div");
      seg.style.flex = "1";
      seg.style.textAlign = "center";
      seg.style.padding = "6px 12px";
      seg.style.fontSize = "13px";
      seg.style.fontWeight = "500";
      seg.style.cursor = "default";
      seg.style.borderRight = i < segments.length - 1
        ? "var(--wire-border-width, 0.5px) solid var(--wire-border-color, #c7c7cc)"
        : "none";
      seg.textContent = segment.trim();

      if (i === selectedIndex) {
        seg.style.backgroundColor = "var(--wire-accent-color, #007aff)";
        seg.style.color = "#fff";
      }

      container.appendChild(seg);
    });

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-ios-segmented-control")) {
  customElements.define("wire-ios-segmented-control", WireIosSegmentedControl);
}
