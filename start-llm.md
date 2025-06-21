# Wireframe UI Component Library Extension Prompt

## Project Background

You are working on a wireframe-style UI component library project called "Wireframe UI". This project is built with Web Components and TypeScript, focusing on providing minimalist, non-interactive wireframe components suitable for prototype design and interface demonstrations. All components are presented with simple wireframe outlines, without complex interaction effects and style variations.

## Task Objective

Please extend the Wireframe UI component library by adding the following new components. All new components should adhere to the existing wireframe style design principles:

1.  **Accordion**: A collapsible content panel.
2.  **Tabs**: A tabbed interface for organizing and displaying different content areas.
3.  **Dialog**: A modal dialog component.
4.  **Dropdown**: A dropdown component that displays a list of options.
5.  **Toggle**: A switch component representing an on/off state.
6.  **Slider**: A slider component for selecting a value from a range.
7.  **Tooltip**: A small tooltip component for displaying additional information.
8.  **Progress**: A linear indicator for displaying progress.

## Technical Requirements

1.  All components must inherit from the `BaseComponent` class.
2.  Use Shadow DOM for style encapsulation.
3.  Apply the unified `.wireframe-element` style class.
4.  Maintain the wireframe style with solid borders and no complex interaction effects.
5.  Components should be non-interactive and purely for display purposes.
6.  Follow the existing project structure and coding style.

## Component Implementation Guide

### Basic Structure

Each new component should follow this basic structure:

```typescript
import { BaseComponent } from '../core/base-component';

export class WireComponentName extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  render(): void {
    // Create the component's DOM structure
    const element = document.createElement('div');
    element.className = 'component-name wireframe-element';
    
    // Add component-specific content and structure
    
    // Clear shadow DOM and inject styles and content
    this.shadow.innerHTML = '';
    this.injectStyles();
    this.shadow.appendChild(element);
  }
}

// Register the custom element
customElements.define('wire-component-name', WireComponentName);
```

### Styling Guidelines

All new components should adhere to the following styling principles:

1.  Use solid borders (`border: 1px solid #9ca3af`)
2.  Use a neutral gray color (`color: #6b7280`)
3.  Transparent background (`background-color: transparent`)
4.  Disable user selection (`user-select: none`)
5.  Appropriate padding and spacing
6.  No hover effects or other interactive state styles

### Specific Component Implementation Suggestions

#### Accordion

-   Use a simple title and content area structure.
-   The title area should display an expand/collapse indicator (e.g., a simple + or - sign).
-   The content area should use a slot for custom content.

#### Dialog

-   Include a title bar, content area, and action button area.
-   Use slots for custom content in each section.
-   Do not implement actual open/close functionality; only display the dialog's appearance.

#### Tabs

-   Include a tab header area and a content area.
-   Use slots to define multiple tabs.
-   Display one "selected" tab, but do not implement actual switching functionality.

## Example Usage

After implementing each component, add a corresponding demo section in `playground/index.html`, following the existing format:

```html
<!-- ComponentName Component Name -->
<section class="component-section" id="component-id">
  <h2 class="component-title">ComponentName Component Name</h2>
  <p class="component-description">A brief description of the component</p>
  <div class="component-demo">
    <!-- Component example -->
    <wire-component-name></wire-component-name>
  </div>
  <pre class="code-example">&lt;wire-component-name&gt;&lt;/wire-component-name&gt;</pre>
</section>
```

## Final Deliverables

Upon completion, ensure that:

1.  All new components are implemented in the `src/components/` directory.
2.  All components are correctly exported and registered in `src/index.ts`.
3.  Demos for new components are added to `playground/index.html`.
4.  Run `npm run build` to rebuild the project.
5.  Use `npx serve .` to preview and test all components locally.

Please keep the code clean, readable, and adhere to the existing project style and best practices.
