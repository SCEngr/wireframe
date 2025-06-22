import { BaseComponent } from "../core/base-component";

export class WireProgress extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value", "max"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const progress = document.createElement("div");
    progress.className = "wire-progress wireframe-element";
    progress.style.width = "100%";
    progress.style.height = "8px";
    progress.style.position = "relative";
    progress.style.overflow = "hidden";

    // Get progress value and max
    const value = parseInt(this.getAttribute("value") || "0", 10);
    const max = parseInt(this.getAttribute("max") || "100", 10);
    
    // Calculate percentage
    const percentage = Math.min(Math.max(0, value), max) / max * 100;

    // Create progress bar
    const bar = document.createElement("div");
    bar.className = "wire-progress-bar wireframe-element";
    bar.style.position = "absolute";
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.width = `${percentage}%`;
    bar.style.backgroundColor = "#9ca3af";

    // Add bar to progress
    progress.appendChild(bar);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(progress);
  }
}

// Register the custom element
customElements.define("wire-progress", WireProgress);
