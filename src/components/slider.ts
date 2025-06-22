import { BaseComponent } from "../core/base-component";

export class WireSlider extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["value", "min", "max"];
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render(): void {
    const slider = document.createElement("div");
    slider.className = "wire-slider";
    slider.style.width = "100%";
    slider.style.position = "relative";
    slider.style.height = "20px";
    slider.style.display = "flex";
    slider.style.alignItems = "center";

    // Create track
    const track = document.createElement("div");
    track.className = "wire-slider-track wireframe-element";
    track.style.width = "100%";
    track.style.height = "4px";
    track.style.position = "relative";

    // Get value, min, max
    const min = parseInt(this.getAttribute("min") || "0");
    const max = parseInt(this.getAttribute("max") || "100");
    const value = parseInt(this.getAttribute("value") || "0");

    // Calculate percentage
    const percentage = Math.max(
      0,
      Math.min(100, ((value - min) / (max - min)) * 100)
    );

    // Create filled track
    const filledTrack = document.createElement("div");
    filledTrack.className = "wire-slider-filled-track";
    filledTrack.style.position = "absolute";
    filledTrack.style.height = "100%";
    filledTrack.style.width = `${percentage}%`;
    filledTrack.style.backgroundColor = "#9ca3af";
    track.appendChild(filledTrack);

    // Create thumb
    const thumb = document.createElement("div");
    thumb.className = "wire-slider-thumb wireframe-element";
    thumb.style.width = "16px";
    thumb.style.height = "16px";
    thumb.style.borderRadius = "50%";
    thumb.style.background = "#9ca3af";
    thumb.style.position = "absolute";
    thumb.style.top = "50%";
    thumb.style.left = `${percentage}%`;
    thumb.style.transform = "translate(-50%, -50%)";
    thumb.style.cursor = "default";

    // Add elements to slider
    slider.appendChild(track);
    slider.appendChild(thumb);

    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(slider);
  }
}

// Register the custom element
customElements.define("wire-slider", WireSlider);
