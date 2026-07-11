# Sergio Anaya Sánchez Portfolio

Static data science and cloud architecture portfolio deployed with GitHub Pages at `Sechi42.github.io`.

## Technology

- HTML, CSS, and vanilla JavaScript
- Mermaid diagrams loaded from CDN
- Font Awesome and Google Fonts
- Tableau Public embeds

There is no framework, package manager, or build step.

## Run locally

Open `index.html` directly or start a static server:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Structure

- `index.html`: portfolio, project cards, architecture diagrams, and contact links.
- `dashboards.html`: embedded Tableau dashboards.
- `style.css`: shared visual system and responsive styles.
- `app.js`: client-side interactions and localization.
- `images/`: logos, previews, and project assets.
- `utils/`: downloadable CV and supporting files.

Pushes to `main` are deployed through GitHub Pages.
