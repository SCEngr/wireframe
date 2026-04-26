import { BaseComponent } from "../core/base-component";

export class WireStepper extends BaseComponent {
  render(): void {
    const stepper = document.createElement("div");
    stepper.className = "wire-stepper";
    stepper.style.display = "flex";
    stepper.style.alignItems = "flex-start";
    stepper.style.gap = "0";

    const slot = document.createElement("slot");
    stepper.appendChild(slot);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(stepper);
  }
}

export class WireStep extends BaseComponent {
  static get observedAttributes() {
    return ["status", "step"];
  }

  render(): void {
    const status = this.getAttribute("status") || "pending";
    const step = this.getAttribute("step") || "";

    const container = document.createElement("div");
    container.className = "wire-step";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.flex = "1";
    container.style.position = "relative";

    // Step indicator circle
    const indicator = document.createElement("div");
    indicator.className = "wire-step-indicator wireframe-element";
    indicator.style.width = "28px";
    indicator.style.height = "28px";
    indicator.style.borderRadius = "50%";
    indicator.style.display = "flex";
    indicator.style.alignItems = "center";
    indicator.style.justifyContent = "center";
    indicator.style.fontSize = "0.75rem";
    indicator.style.fontWeight = "500";

    if (status === "completed") {
      indicator.style.backgroundColor = "#9ca3af";
      indicator.style.color = "#fff";
      indicator.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    } else if (status === "active") {
      indicator.style.backgroundColor = "#6b7280";
      indicator.style.color = "#fff";
      indicator.textContent = step;
    } else {
      indicator.textContent = step;
    }

    container.appendChild(indicator);

    // Connecting line (positioned behind)
    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.top = "14px";
    line.style.left = "calc(50% + 14px)";
    line.style.width = "calc(100% - 28px)";
    line.style.height = "1px";
    line.style.backgroundColor = status === "completed" ? "#9ca3af" : "#d1d5db";
    container.appendChild(line);

    // Label
    const label = document.createElement("div");
    label.style.marginTop = "8px";
    label.style.fontSize = "0.75rem";
    label.style.textAlign = "center";

    const labelSlot = document.createElement("slot");
    label.appendChild(labelSlot);

    container.appendChild(label);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(container);
  }
}

if (!customElements.get("wire-stepper")) {
  customElements.define("wire-stepper", WireStepper);
}
if (!customElements.get("wire-step")) {
  customElements.define("wire-step", WireStep);
}
