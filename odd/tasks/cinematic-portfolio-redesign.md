# Cinematic portfolio redesign

## Objective and rationale
Transform the static portfolio into a cinematic, high-impact data-science presentation without losing its bilingual content, dark/light themes, project links, diagrams, or Tableau dashboards. The chosen direction is midnight blue/near-black with cyan/violet accents, an oversized typographic hero, an animated data visual, layered depth, and choreographed scroll entrances. Keep motion comfortable and honor reduced-motion preferences.

## Scope and constraints
- In scope: `index.html`, `dashboards.html`, `style.css`, `app.js`; accessible navigation/modal/motion affordances directly affected by the redesign.
- Out of scope: content/project claims, new framework or build step, changing dashboard embed IDs, replacing the CV, unrelated `.gitignore` or `openspec/` changes, publishing or PR creation.
- Existing user changes in `.gitignore` and `openspec/` must remain untouched.
- Keep ES/EN translations and persisted themes working; respect mobile layouts, keyboard access, and `prefers-reduced-motion`.
- Technical artifact prose defaults to English; existing bilingual UI copy stays bilingual.

## Verification configuration
- TDD mode: not configured in repository/session; no existing test runner or test suite was found. Use ordinary static/functional checks, not invented RED/GREEN evidence.
- Exact available checks: `node --input-type=module --check < app.js` (plain `node --check app.js` fails on committed HEAD because this CDN-importing file is ESM without a Node module manifest); `git diff --check -- index.html style.css app.js dashboards.html`; scoped HTML/link/behavior inspection. User explicitly requested Playwright visual validation: an installed `playwright-core@1.61.1` and Chromium 1228 were located outside the repository. Run local static preview in a Playwright browser and inspect actual desktop/mobile, dark/light and reduced-motion screenshots and interactions before considering the design finished. Store screenshots outside the repository. Tableau embeds may depend on external network.
- Route: delegated direct work because each task changes multiple non-trivial files; `gentle-ai-worker` handles implementation and foreground checks. Mapping was delegated to `gentle-ai-explore` because four source files were needed.

## Delivery and review workload
- Forecast: roughly 750–1200 authored changed lines across three coherent units; advisory only, not a reason to minify or omit useful code. Actual T1 currently has ~1444 changed lines (CSS 1393 + HTML 51); review workload substantially exceeds the original forecast. Preserve coherent design rather than shrink it cosmetically.
- Strategy: `ask-on-risk`; user selected `feature-branch-chain` for future review slices. T1 is a cohesive oversized visual-system unit; keep its actual count visible and report a size exception if it cannot split cleanly after one honest slicing pass. No push, PR, or merge authorized.
- Commit permission: explicitly granted for this feature branch and redesign's work units; stage only in-scope feature files. Work-unit commits are required to close tasks under ODD.
- Branch: `feat/cinematic-portfolio-redesign`, based on `d4cd1d4`.
- Review boundaries: branch point `d4cd1d4`; no candidate committed/reviewed yet.

## Tasks
- [ ] T1 — Build the cinematic design system and homepage composition. Rework shared CSS tokens/layout and `index.html` hierarchy, hero data visual, section rhythm, project cards, and contact presentation while preserving existing interactive hooks and both themes. Check desktop/mobile structure, existing links/ids/data-i18n contracts, reduced-motion styling, and Playwright desktop/mobile screenshots. Route: delegated writer; trigger: 2 non-trivial files. Commit: pending.
- [ ] T2 — Add polished, accessible motion and interaction. Extend `app.js`/relevant HTML/CSS for progressive scroll choreography, pointer depth only where appropriate, keyboard-safe nav and modals, and reduced-motion behavior; preserve ES/EN/theme functionality. Check JS syntax and interaction contracts. Route: delegated writer; trigger: 2+ non-trivial files. Commit: pending.
- [ ] T3 — Redesign dashboard page and verify cross-page parity. Restyle `dashboards.html` using shared visual language, preserve Tableau IDs/embeds and bilingual/theme navigation, and ensure responsive presentation. Check structural/link integrity and cross-page consistency; validate desktop/mobile screenshots and interactions in Playwright, reporting external Tableau availability separately. Route: delegated writer; trigger: 2 non-trivial files. Commit: pending.

## Progress and next step
- Mapping complete; user selected tech-cinematic direction. Feature branch created.
- T1 implementation landed uncommitted in `index.html` and `style.css`: split hero with CSS-only data motif, shared dark/light design tokens, responsive section and card styling. Delegated writer reported `git diff --check -- index.html style.css` passing, 44 i18n keys found in both dictionaries, existing interactive IDs/targets intact, balanced markup/CSS braces and resolved local assets. Playwright Chromium 149 opened the live local page and captured full-page dark/light desktop 1440px, dark/light mobile 390px and reduced-motion screenshots in the system temp directory. Parent visually inspected these screenshots: layout and typography are consistent, cards and mobile navigation fit without apparent clipping; no immediate redesign correction identified. Browser observed zero JS errors, failed requests or horizontal overflow; all 15 reveals became visible; reduced motion had zero running animations; theme and ES/EN controls worked on desktop and in the mobile menu. Tableau page, modals and actual devices remain unchecked.
- T1 initial `node --check app.js` failed on unchanged committed source because Node parsed the CDN-importing ES module as CommonJS. Separate read-only diagnosis reproduced it and observed `node --input-type=module --check < app.js` exit 0. This is an incorrect initial runner, not a source failure; use the corrected command for subsequent checks.
- User explicitly authorized work-unit commits on this feature branch and chose feature-branch-chain for future review slicing; no PR/push authorized. T1 pre-commit static verification and requested Playwright design validation passed for the homepage. Next: commit only the scoped T1 source and feature document, record identity, then start T2. Keep T1 in progress until commit evidence is recorded.
