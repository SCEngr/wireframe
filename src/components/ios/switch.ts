import { BaseComponent } from "../../core/base-component";

export class WireIosSwitch extends BaseComponent {
  static get observedAttributes() {
    return ["checked"];
  }

  render(): void {
    const isChecked = this.hasAttribute("checked");

    const container = document.createElement("div");
    container.className = "wire-ios-switch";
    container.style.display = "inline-flex";
    container.style.alignItems = "center";

    const track = document.createElement("div");
    track.style.width = "51px";
    track.style.height = "31px";
    track.style.borderRadius = "31px";
    track.style.position = "relative";
    track.style.transition = "all 0.2s ease";
    track.style.backgroundColor = isChecked ? "#34c759" : "#e5e5ea";
    track.style.border = isChecked ? "none" : "var(--wire-border-width, 0.5px) solid var(--wire-border-color, #c7c7cc)";

    const thumb = document.createElement("div");
    thumb.style.width = "27px";
    thumb.style.height = "27px";
    thumb.style.borderRadius = "50%";
    thumb.style.backgroundColor = "#fff";
    thumb.style.position = "absolute";
    thumb.style.top = "1px";
    thumb.style.left = isChecked ? "22px" : "2px";
    thumb.style.boxShadow = "0 2px 4px rgba(0,0,0,0.15)";
    thumb.style.transition = "all 0.2s ease";

    track.appendChild(thumb);
    container.appendChild(track);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-ios-switch")) {
  customElements.define("wire-ios-switch", WireIosSwitch);
}
