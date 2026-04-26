import { BaseComponent } from "../../core/base-component";

export class WireAndroidNavigationDrawer extends BaseComponent {
  static get observedAttributes() {
    return ["open"];
  }

  render(): void {
    const isOpen = this.hasAttribute("open");

    const drawer = document.createElement("div");
    drawer.className = "wire-android-navigation-drawer wireframe-element";
    drawer.style.width = "280px";
    drawer.style.height = "100%";
    drawer.style.display = isOpen ? "flex" : "none";
    drawer.style.flexDirection = "column";
    drawer.style.backgroundColor = "#fff";
    drawer.style.boxShadow = "0 8px 10px rgba(0,0,0,0.14)";
    drawer.style.border = "none";
    drawer.style.borderRadius = "0";

    // Header
    const header = document.createElement("div");
    header.style.padding = "16px";
    header.style.backgroundColor = "var(--wire-accent-color, #6200ee)";
    header.style.color = "#fff";
    header.style.minHeight = "100px";
    header.style.display = "flex";
    header.style.flexDirection = "column";
    header.style.justifyContent = "flex-end";

    const headerTitle = document.createElement("div");
    headerTitle.style.fontSize = "14px";
    headerTitle.style.fontWeight = "500";
    headerTitle.textContent = "Navigation Drawer";
    header.appendChild(headerTitle);

    const headerSubtitle = document.createElement("div");
    headerSubtitle.style.fontSize = "14px";
    headerSubtitle.style.opacity = "0.8";
    headerSubtitle.textContent = "user@example.com";
    header.appendChild(headerSubtitle);

    drawer.appendChild(header);

    // Menu items slot
    const menuSlot = document.createElement("slot");
    const menu = document.createElement("div");
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.padding = "8px 0";
    menu.appendChild(menuSlot);

    // Default menu items
    const items = ["Inbox", "Starred", "Sent", "Drafts"];
    items.forEach((itemText, i) => {
      const item = document.createElement("div");
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.gap = "16px";
      item.style.padding = "12px 16px";
      item.style.fontSize = "14px";
      item.style.color = i === 0 ? "var(--wire-accent-color, #6200ee)" : "inherit";
      item.style.fontWeight = i === 0 ? "500" : "400";

      const dot = document.createElement("div");
      dot.style.width = "24px";
      dot.style.height = "24px";
      dot.style.display = "flex";
      dot.style.alignItems = "center";
      dot.style.justifyContent = "center";
      dot.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
        </svg>
      `;
      item.appendChild(dot);

      const text = document.createElement("span");
      text.textContent = itemText;
      item.appendChild(text);

      menu.appendChild(item);
    });

    drawer.appendChild(menu);

    this.shadow.innerHTML = "";
    this.injectStyles();
    this.shadow.appendChild(drawer);
  }
}

if (!customElements.get("wire-android-navigation-drawer")) {
  customElements.define("wire-android-navigation-drawer", WireAndroidNavigationDrawer);
}
