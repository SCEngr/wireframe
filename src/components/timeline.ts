import { BaseComponent } from "../core/base-component";

export class WireTimeline extends BaseComponent {
  render(): void {
    const timeline = document.createElement("div");
    timeline.className = "wire-timeline";
    timeline.style.display = "flex";
    timeline.style.flexDirection = "column";
    timeline.style.gap = "0";

    const slot = document.createElement("slot");
    timeline.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(timeline);
  }
}

export class WireTimelineItem extends BaseComponent {
  static get observedAttributes() {
    return ["status"];
  }

  render(): void {
    const status = this.getAttribute("status") || "default";

    const item = document.createElement("div");
    item.className = "wire-timeline-item";
    item.style.display = "flex";
    item.style.gap = "12px";
    item.style.minHeight = "48px";

    // Left rail with dot and line
    const rail = document.createElement("div");
    rail.style.display = "flex";
    rail.style.flexDirection = "column";
    rail.style.alignItems = "center";
    rail.style.width = "16px";

    const dot = document.createElement("div");
    dot.className = "wire-timeline-dot wireframe-element";
    dot.style.width = "12px";
    dot.style.height = "12px";
    dot.style.borderRadius = "50%";
    dot.style.flexShrink = "0";

    if (status === "active") {
      dot.style.backgroundColor = "#6b7280";
    } else if (status === "completed") {
      dot.style.backgroundColor = "#9ca3af";
    }

    rail.appendChild(dot);

    const line = document.createElement("div");
    line.style.width = "1px";
    line.style.flex = "1";
    line.style.backgroundColor = "#9ca3af";
    line.style.marginTop = "4px";
    rail.appendChild(line);

    // Content
    const content = document.createElement("div");
    content.style.flex = "1";
    content.style.paddingBottom = "16px";

    const contentSlot = document.createElement("slot");
    content.appendChild(contentSlot);

    item.appendChild(rail);
    item.appendChild(content);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(item);
  }
}

if (!customElements.get("wire-timeline")) {
  customElements.define("wire-timeline", WireTimeline);
}
if (!customElements.get("wire-timeline-item")) {
  customElements.define("wire-timeline-item", WireTimelineItem);
}
