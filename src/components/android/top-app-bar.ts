import { BaseComponent } from "../../core/base-component";

export class WireAndroidTopAppBar extends BaseComponent {
  static get observedAttributes() {
    return ["title"];
  }

  render(): void {
    const bar = document.createElement("div");
    bar.className = "wire-android-top-app-bar wireframe-element";
    bar.style.display = "flex";
    bar.style.alignItems = "center";
    bar.style.height = "56px";
    bar.style.padding = "0 4px";
    bar.style.width = "100%";
    bar.style.backgroundColor = "var(--wire-accent-color, #6200ee)";
    bar.style.color = "#fff";
    bar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    bar.style.border = "none";
    bar.style.borderRadius = "0";

    // Nav icon slot (hamburger or back)
    const navIcon = document.createElement("div");
    navIcon.style.width = "48px";
    navIcon.style.height = "48px";
    navIcon.style.display = "flex";
    navIcon.style.alignItems = "center";
    navIcon.style.justifyContent = "center";
    navIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      </svg>
    `;
    bar.appendChild(navIcon);

    // Title
    const title = document.createElement("span");
    title.style.flex = "1";
    title.style.fontSize = "20px";
    title.style.fontWeight = "500";
    title.style.paddingLeft = "8px";
    title.textContent = this.getAttribute("title") || "App Title";
    bar.appendChild(title);

    // Action buttons slot
    const actionsSlot = document.createElement("slot");
    actionsSlot.name = "actions";
    const actionsContainer = document.createElement("div");
    actionsContainer.style.display = "flex";
    actionsContainer.style.gap = "4px";
    actionsContainer.style.paddingRight = "4px";
    actionsContainer.appendChild(actionsSlot);

    // Default action icons
    const searchIcon = document.createElement("div");
    searchIcon.style.width = "48px";
    searchIcon.style.height = "48px";
    searchIcon.style.display = "flex";
    searchIcon.style.alignItems = "center";
    searchIcon.style.justifyContent = "center";
    searchIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    `;
    actionsContainer.appendChild(searchIcon);

    const moreIcon = document.createElement("div");
    moreIcon.style.width = "48px";
    moreIcon.style.height = "48px";
    moreIcon.style.display = "flex";
    moreIcon.style.alignItems = "center";
    moreIcon.style.justifyContent = "center";
    moreIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
      </svg>
    `;
    actionsContainer.appendChild(moreIcon);

    bar.appendChild(actionsContainer);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(bar);
  }
}

if (!customElements.get("wire-android-top-app-bar")) {
  customElements.define("wire-android-top-app-bar", WireAndroidTopAppBar);
}
