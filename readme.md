# 🧪 SageBox Lab

> Development tools for SageBox UI components

[![npm version](https://img.shields.io/npm/v/@sage-box/lab.svg)](https://www.npmjs.com/package/@sage-box/lab)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

SageBox Lab is a collection of visual development tools that help you build and customize SageBox components. All tools work **100% offline** once installed.

## Installation

```bash
npm install -g @sage-box/lab
```

Or as a dev dependency:

```bash
npm install -D @sage-box/lab
```

## Usage

```bash
# List available tools
sagebox-lab list

# Open Icon Manager
sagebox-lab icon-manager

# Open Style Editor
sagebox-lab style-editor

# Open Event Editor
sagebox-lab event-editor
```

## Tools

### 🎨 Icon Manager

Manage and organize SVG icons for your project:

- Import icons from popular icon sets (Lucide, Material, etc.)
- Preview and search icons
- Export optimized SVG sprites
- Generate TypeScript types

```bash
sagebox-lab icon-manager
# or
sagebox-lab icons
```

### 🎭 Style Editor

Edit and preview CSS tokens and design variables:

- Visual token editor
- Live preview
- Dark/light mode preview
- Export CSS custom properties

```bash
sagebox-lab style-editor
# or
sagebox-lab styles
```

### ⚡ Event Editor

Configure and test component events:

- Visual event configuration
- Live event testing
- Generate event handlers
- Debug event flow

```bash
sagebox-lab event-editor
# or
sagebox-lab events
```

## Integration with SageBox CLI

If you have both `sagebox` and `@sage-box/lab` installed, you can use:

```bash
sagebox lab icon-manager
sagebox lab style-editor
sagebox lab event-editor
```

## Development

```bash
# Clone the repository
git clone https://github.com/Adravilag/sagebox-lab.git
cd sagebox-lab

# Install dependencies
npm install

# Start a tool in dev mode
npm run icon-manager
npm run style-editor
npm run event-editor

# Build all tools
npm run build
```

## Project Structure

```
sagebox-lab/
├── apps/
│   ├── icon-manager/     # Icon management tool
│   ├── style-editor/     # CSS token editor
│   └── event-editor/     # Event configuration tool
├── packages/
│   └── shared/           # Shared utilities
├── bin/
│   └── cli.js            # CLI entry point
└── package.json
```

## Related

- [SageBox](https://github.com/Adravilag/sagebox) - Modern Web Components Library
- [SageBox Docs](https://sagebox.dev) - Documentation

## License

MIT © [Adrian Dávila Guerra](https://github.com/Adravilag)
