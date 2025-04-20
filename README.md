# svelte-5-mvp

Minimalist implementation demonstrating core Svelte 5 features and runes-based reactivity system.

## Structure

```
svelte-5-mvp/
├── index.html              # Entry HTML file that loads the Svelte application
├── package.json            # Project dependencies and scripts configuration
├── package-lock.json       # Locked versions of dependencies
├── vite.config.js          # Vite bundler configuration
├── node_modules/           # External dependencies
├── README.md               # This documentation file
└── src/                    # Source code directory
    ├── main.js             # Application entry point
    ├── App.svelte          # Root component
    └── components/         # Reusable UI components
```

## Technical Overview

This project demonstrates Svelte 5's new runes-based reactivity system, replacing the previous compiler-based approach. Key technical implementations include:

- `$state`, `$derived`, and `$effect` runes for fine-grained reactivity
- Component composition with context API
- Zero-runtime CSS styling using `:global()` selectors
- Leverages Vite for optimized development and production builds

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Requirements

- Node.js 18+
- npm 9+