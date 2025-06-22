import { BaseComponent } from "../core/base-component";
import { createElement } from "lucide";
import * as icons from "lucide";

export class WireIcon extends BaseComponent {
  static get observedAttributes() {
    return ['name', 'size'];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  protected injectStyles(): void {
    super.injectStyles();
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .wire-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
      }
      .wire-icon svg {
        width: 100%;
        height: 100%;
      }
    `;
    this.shadow.appendChild(styleSheet);
  }

  render(): void {
    this.shadow.innerHTML = ""; // Clear shadow DOM
    this.injectStyles(); // Inject styles
    
    const iconContainer = document.createElement("div");
    iconContainer.className = "wire-icon wireframe-element";
    
    const size = this.getAttribute("size") || "24";
    iconContainer.style.width = `${size}px`;
    iconContainer.style.height = `${size}px`;
    
    const iconName = this.getAttribute("name") || "circle";
    
    try {
      // 首字母大写转换函数
      const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
      
      // 处理连字符名称，例如 alert-triangle 转为 AlertTriangle
      const formattedName = iconName.split('-').map(capitalize).join('');
      
      // 获取对应的图标组件
      const IconComponent = (icons as any)[formattedName] || (icons as any).Circle;
      
      if (IconComponent) {
        // 使用 Lucide 的 createElement 函数创建 SVG 元素
        const svgElement = createElement(IconComponent, {
          width: size,
          height: size,
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          class: "wireframe-icon"
        });
        
        iconContainer.appendChild(svgElement);
      } else {
        throw new Error(`Icon ${iconName} not found`);
      }
    } catch (error) {
      // 如果找不到图标或发生错误，使用默认的圆形图标
      const svgElement = createElement((icons as any).Circle, {
        width: size,
        height: size,
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        class: "wireframe-icon"
      });
      
      iconContainer.appendChild(svgElement);
    }
    // 已经在 try/catch 块中添加了 svgElement 到 iconContainer

    // 将图标容器添加到 shadow DOM
    this.shadow.appendChild(iconContainer);
  }
}

// Register the custom element
if (!customElements.get("wire-icon")) {
  customElements.define("wire-icon", WireIcon);
}
