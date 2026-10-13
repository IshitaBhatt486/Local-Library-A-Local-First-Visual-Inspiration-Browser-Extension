# Local Library

A private, local-first browser extension for capturing and organizing visual inspiration. Everything is stored in the browser with no backend, account, analytics, or intentional remote transfer.

## Features

- Capture a selected page region or visible viewport without saving the capture overlay.
- Organize captures into collections with search, tags, notes, and manual drag-and-drop ordering.
- Add text cards and sticky notes directly into the same reorderable collection grid.
- View complete capture images in the grid, inspect source details, duplicate/download captures, and create PNG/JPEG share cards.
- Resize the workspace where supported, open a collection in a full-page extension tab, or use fullscreen mode.
- Export/import validated JSON backups; manage theme and local data from settings.
- Use a command palette and a context-menu capture shortcut.

## Stack

React, TypeScript, Vite, Manifest V3, IndexedDB, and Vitest.

## Run locally

```bash
npm install
npm run build
```

Load the generated `dist/` folder as an unpacked extension in Chrome/Chromium. Then open the toolbar popup to start a collection.

Useful commands:

```bash
npm run dev
npm run check
npm test
```

## Documentation

See [internal-docs](./internal-docs/README.md) for architecture, technical decisions, interview notes, and the [Firefox testing guide](./internal-docs/06-testing-in-firefox.md).
