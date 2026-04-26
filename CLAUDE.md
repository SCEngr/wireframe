# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install                  # Install dependencies
bun run dev                  # Watch mode — rebuilds src/index.ts on changes
bun run build                # Build to dist/index.js (IIFE)
bun run build:esm            # Build ESM output → dist/index.mjs
bun run build:min            # Build minified ESM → dist/index.min.mjs
bun run build:types          # Generate .d.ts declarations via tsc
bun run build:all            # All three builds + types
bun run build:complete       # build:all + playground build
bun run playground           # Serve from repo root → http://localhost:3000 redirects to /playground/
```

There is no test suite. The `test.html` file at the repo root is a manual test page that imports components from `dist/index.js`.

## Architecture

This is a Web Component library (`@bracken/wireframe`) providing wireframe-style UI components. All components are non-interactive display elements — they show wireframe outlines without real interactivity, designed for prototype demonstrations.

### Component model

Every component lives in `src/components/<name>.ts` and follows this pattern:

1. Extends `BaseComponent` (`src/core/base-component.ts`), which extends `HTMLElement` and sets up an open Shadow DOM
2. Overrides `injectStyles()` to add component-specific `<style>` into the Shadow DOM (call `super.injectStyles()` first for base `.wireframe-element` styles)
3. Implements `render()` — clears `this.shadow.innerHTML`, calls `this.injectStyles()`, builds DOM, appends to `this.shadow`
4. Self-registers at the bottom of the file with a guard: `if (!customElements.get("wire-xxx")) { customElements.define("wire-xxx", WireXxx); }`
5. Reactive attributes are declared via `static get observedAttributes()`; `attributeChangedCallback` re-renders

Styles are **inline in Shadow DOM**, not Tailwind — the `tailwind.config.js` exists but is not actually used by components. The `.wireframe-element` class from `BaseComponent` uses CSS custom properties for theming:

- `--wire-border-width`, `--wire-border-color`, `--wire-border-radius`
- `--wire-text-color`, `--wire-accent-color`, `--wire-bg-color`
- `--wire-font-family`, `--wire-shadow`

These pass through Shadow DOM, so setting them on `:root` or a platform class themes all components. Theme definitions are in `src/themes/platforms.css`. Activate with `<body class="platform-windows">`, `platform-macos`, `platform-ios`, or `platform-android`.

### Platform components

iOS native components in `src/components/ios/` — 8 components: NavigationBar, TabBar, TableView, SegmentedControl, SearchBar, Sheet, Switch, Alert. Tags follow `wire-ios-*` naming.

Android native components in `src/components/android/` — 8 components: TopAppBar, BottomNav, FAB, Snackbar, NavigationDrawer, ListItem, TextField, Card. Tags follow `wire-android-*` naming.

### Entry point

`src/index.ts` both `export *` and side-effect `import` every component file. The exports make classes available to consumers; the imports trigger `customElements.define()` registration.

### Key dependency

`lucide` is the only runtime dependency, used by `WireIcon` (`src/components/icon.ts`) to render SVG icons. Icon names use kebab-case attributes (e.g., `name="alert-triangle"`) which get converted to PascalCase Lucide component names internally.

### Playground

`playground/index.html` imports from `../dist/index.mjs` and showcases every component. When adding a new component, add a demo section there.

### CI/CD

Push to `main` triggers `.github/workflows/deploy.yml` — builds with Bun, copies playground into dist, deploys to GitHub Pages.

### Adding a new component

1. Create `src/components/<name>.ts` extending `BaseComponent`
2. Implement `render()` and optionally `injectStyles()`
3. Register with `customElements.define("wire-<name>", Wire<Name>)`
4. Add `export * from "./components/<name>"` and `import "./components/<name>"` to `src/index.ts`
5. Add a demo section in `playground/index.html`
