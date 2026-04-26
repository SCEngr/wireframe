# Wireframe UI Project Engineering Information

## Project Overview

Wireframe UI is a line-style UI component library based on Web Components, focused on providing minimalist wireframe components suitable for prototype design and interface demonstrations. Components are presented with simple wireframe outlines.

## Technology Stack

- **Language**: TypeScript
- **Component Technology**: Web Components (Shadow DOM)
- **Build Tool**: Bun
- **Output Format**: ES Modules (also IIFE)
- **Styling**: Inline styles injected via Shadow DOM (Tailwind config exists but is not used)
- **Icons**: Lucide (only runtime dependency)

## Project Structure

```
wireframe/
├── dist/                     # Build output
│   ├── index.js              # IIFE bundle (bun build)
│   ├── index.mjs             # ESM bundle
│   ├── index.min.mjs         # Minified ESM bundle
│   └── types/                # Generated .d.ts declarations
├── src/                      # Source code
│   ├── core/                 # Base component class
│   │   └── base-component.ts
│   ├── components/           # All UI components (one file per component)
│   └── index.ts              # Barrel exports + side-effect imports
├── playground/               # Component demo/showcase
│   └── index.html
├── package.json
└── tsconfig.json
```

## Component Architecture

All components extend `BaseComponent` (`src/core/base-component.ts`), which extends `HTMLElement` and provides:

1. **Shadow DOM**: Each component creates an open Shadow DOM
2. **Style injection**: `injectStyles()` adds `<style>` into the Shadow DOM. Components override this to add their own styles, calling `super.injectStyles()` first for the base `.wireframe-element` class
3. **Render**: `render()` is abstract — each component implements it to build DOM
4. **Lifecycle**: `connectedCallback` calls `render()`. `attributeChangedCallback` calls `render()` when observed attributes change

## Build Commands

```bash
bun install                  # Install dependencies
bun run dev                  # Watch mode — rebuilds on changes
bun run build                # IIFE build → dist/index.js
bun run build:esm            # ESM build → dist/index.mjs
bun run build:min            # Minified ESM → dist/index.min.mjs
bun run build:types          # Generate .d.ts via tsc
bun run build:all            # All three JS builds + types
bunx serve playground        # Run playground demo locally
```

## Adding a New Component

1. Create `src/components/<name>.ts` extending `BaseComponent`
2. Implement `render()` — clear `this.shadow.innerHTML`, call `this.injectStyles()`, build DOM, append to `this.shadow`
3. Override `injectStyles()` if the component needs custom styles (call `super.injectStyles()` first)
4. Declare `static get observedAttributes()` for reactive HTML attributes
5. Register at file bottom: `if (!customElements.get("wire-<name>")) { customElements.define("wire-<name>", Wire<Name>); }`
6. Add `export * from "./components/<name>"` and `import "./components/<name>"` to `src/index.ts`
7. Add a demo section to `playground/index.html`

## Design Decisions

1. **Web Components**: Provides native component encapsulation and style isolation
2. **Shadow DOM**: Component styles don't leak or get affected by external styles
3. **Inline Style Injection**: Avoids external style dependencies; components maintain consistent appearance in any environment
4. **ES Modules**: Supports modern browsers' native module system
5. **Wireframe aesthetic**: Solid borders (#9ca3af), neutral gray text (#6b7280), transparent backgrounds, no hover effects — components are non-interactive display elements
