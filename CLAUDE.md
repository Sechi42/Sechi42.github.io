# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio for Sergio Anaya Sánchez (Data Scientist), deployed via GitHub Pages at `Sechi42.github.io`. No build step, no package manager, no framework — pure HTML/CSS/JS.

To preview locally, open `index.html` directly in a browser or use any static file server:
```bash
python -m http.server 8080
```

## Architecture

Two HTML pages share a single `style.css`:

- **`index.html`** — Main page with: fixed navbar, hero section, architecture section, project cards grid, laptop mockup linking to dashboards, contact/social grid, footer. All modal JS and clipboard/toast logic lives inline at the bottom of this file.
- **`dashboards.html`** — Secondary page with embedded Tableau Public visualizations.
- **`script.js`** — Legacy Formspree contact form handler; not currently wired to any form in the HTML.

### CSS Design System

All colors and spacing are driven by CSS custom properties in `:root` (top of `style.css`):

| Variable | Purpose |
|---|---|
| `--bg-color` | Page background (`#0f172a`) |
| `--card-bg` | Glass card background |
| `--accent-color` | Sky blue highlights (`#38bdf8`) |
| `--text-primary` / `--text-secondary` | Text hierarchy |
| `--glass-border` | Consistent 1px semi-transparent border |

### Modal System

Modals for architecture diagrams (Mermaid) are triggered by button clicks. Each modal renders a Mermaid diagram lazily — `mermaid.run({ nodes: [mermaidDiv] })` is called only when the modal opens, using Mermaid v10 ESM from CDN. Both modals (`auditModal`, `archModal`) share a single `setupModal(btnId, modalId)` helper defined inline in `index.html`.

### External Dependencies (CDN only)

- **Mermaid v10** — architecture diagrams inside modals
- **Font Awesome 6.4** — all icons (brands + solid)
- **Inter** — Google Fonts
- **Tableau Public JS API** — dashboard embeds in `dashboards.html`

## Key Content Locations

- CV PDF: `utils/Data_Scientist_Sergio_Anaya.pdf`
- Logo/favicon: `images/logo.png`
- Project card images: `images/ysga_swarm.png`, `images/fleet_api.png`, `images/audit_ai.png`
- Dashboard preview: `images/dashboard_preview.png`

## Deployment

Push to `main` branch — GitHub Pages auto-deploys. No CI/CD configuration exists.
