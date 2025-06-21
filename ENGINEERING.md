# Wireframe UI Project Engineering Information

## Project Overview

Wireframe UI is a line-style UI component library based on Web Components, focused on providing minimalist, non-interactive wireframe components suitable for prototype design and interface demonstrations. Components are presented with simple wireframe outlines, without complex interaction effects and style variations.

## Technology Stack

- **Language**: TypeScript
- **Component Technology**: Web Components (using Shadow DOM)
- **Build Tool**: Bun (for building and packaging)
- **Output Format**: ES Modules
- **Styling Approach**: Inline styles (injected via Shadow DOM)
- **Development Server**: serve (for local preview)

## Project Structure

```
wireframe/
├── dist/                 # Build output directory
│   └── index.js          # Packaged component library
├── src/                  # Source code directory
│   ├── core/             # Core functionality
│   │   └── base-component.ts  # Base component class
│   ├── components/       # UI components
│   │   ├── button.ts     # Button component
│   │   ├── input.ts      # Input component
│   │   ├── card.ts       # Card component
│   │   ├── badge.ts      # Badge component
│   │   ├── avatar.ts     # Avatar component
│   │   └── alert.ts      # Alert component
│   └── index.ts          # Main entry file
├── playground/           # Component demo page
│   └── index.html        # Component showcase and documentation
└── package.json          # Project configuration
```

## Component Architecture

All components inherit from the `BaseComponent` class, which provides the following core functionality:

1. **Shadow DOM Encapsulation**: Each component creates and manages its own Shadow DOM
2. **Style Injection**: Styles are directly injected into the Shadow DOM via the `injectStyles` method
3. **Lifecycle Management**: Handles component connection and disconnection events

Components use a declarative API, configuring component behavior and appearance through HTML attributes.

## Styling System

Component styles have the following characteristics:

1. **Wireframe Style**: All components use simple border outlines
2. **Unified Style Class**: Uses the `.wireframe-element` class to apply common wireframe styling
3. **No Interaction Effects**: All mouse hover and click effects are removed
4. **Non-Editable**: Interactive elements like input fields are designed as non-editable wireframe displays

## Build and Deployment

The project uses Bun as a build tool:

```bash
# Install dependencies
npm install

# Build project
npm run build

# Local preview
npx serve .
```

The build configuration compiles TypeScript source files into a single ES Module, which can be used directly in the browser via `<script type="module">`.

## Extension Method

To add new components:

1. Create a new component file in the `src/components/` directory
2. Inherit from the `BaseComponent` class
3. Implement the `render()` method
4. Export and register the component in `src/index.ts`

## Design Decisions

1. **Using Web Components**: Provides native component encapsulation and style isolation
2. **Shadow DOM**: Ensures component styles don't leak or get affected by external styles
3. **Inline Style Injection**: Avoids external style dependencies, ensuring components maintain consistent appearance in any environment
4. **ES Modules Format**: Supports modern browsers' native module system, no additional packaging steps required
5. **Simplified Properties**: Removed unnecessary variants and size properties, focusing on simple wireframe presentation
