# AI Agent Guide: Reys NPM Package Evaluator

## Project Overview
A React + Vite frontend application designed to evaluate and analyze NPM packages. Currently in early development with a basic component structure.

## Quick Start for Agents

### Development Workflow
```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Production build to dist/
npm run lint     # Run ESLint (enforces react-hooks, react-refresh rules)
npm run preview  # Preview production build locally
```

## Architecture & Structure

### Component Hierarchy
```
App (src/App.jsx)
└── HomePage (src/pages/HomePage.jsx)
    └── Header (src/components/Header.jsx)
```

### Key Directories
- **src/components/** - Reusable React components (functional, PascalCase exports)
- **src/pages/** - Page-level components (route containers)
- **src/assets/** - SVG logos and static assets
- **public/** - Static files (favicon, etc.)

## Code Conventions

### Component Pattern
- **Functional components only** - Use PascalCase naming and named exports
- **CSS modules** - Each `.jsx` file has a paired `.css` file (e.g., `Header.jsx` + `Header.css`)
- **File naming** - Use PascalCase for components (e.g., `HomePage.jsx`, `Header.jsx`)

### Example
```jsx
import './Header.css'

export function Header() {
  return <div className='header-container'>...</div>
}
```

### JSX Style
- Use self-closing tags when no children
- Keep className strings with single quotes
- Import CSS at the top of each component file

### Linting Rules
- **ESLint enforces:**
  - React Hooks best practices (`eslint-plugin-react-hooks`)
  - React Refresh compatibility (`eslint-plugin-react-refresh`)
  - JS recommended rules (`@eslint/js`)

Run `npm run lint` before committing to catch violations early.

## Common Tasks

### Adding a New Component
1. Create `src/components/ComponentName.jsx` (PascalCase)
2. Create paired `src/components/ComponentName.css`
3. Export as named export: `export function ComponentName() { ... }`
4. Import and use in parent component

### Adding a New Page
1. Create `src/pages/PageName.jsx` in pages directory
2. Import any necessary components from `components/`
3. Update routing in `App.jsx` (when routing is added)

### Styling
- Use CSS modules (paired with components)
- Avoid inline styles unless temporary
- Keep selectors simple and component-scoped

## Development Notes

### Hot Module Replacement (HMR)
- Vite provides HMR out of the box; changes auto-reload in browser
- React Refresh is configured for fast, stateful updates

### Future Expansion Areas
- State management (likely needed for package search/evaluation logic)
- API integration (for NPM registry data)
- Routing (currently single page; add react-router-dom when needed)
- Package data display components

### Known Configuration
- React 19.2.8 (latest)
- Vite 8.2.2 with React plugin
- Browser globals are available (no Node.js APIs)
- ESLint uses flat config format (v9+)

## AI Agent Behavior Guide

When working on this project:
1. **Always run `npm run lint`** after making changes to verify compliance
2. **Follow the component pattern** - paired JSX + CSS files with named exports
3. **Keep components focused** - extract new components as the app grows
4. **Check `src/App.jsx`** before adding new pages to understand current routing
5. **Preserve the flat directory structure** - pages/ and components/ remain separated
6. **Test in dev mode** - use `npm run dev` and check the browser for visual verification

---
Generated for rapid AI agent onboarding. Update this file as conventions evolve.
