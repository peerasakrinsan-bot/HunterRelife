# Hunter Re:Life — Real-World Life Simulator + Hunter Awakening

A mobile-first browser life simulator set in the modern real world, with an original fictional Hunter/Gate layer. Built with vanilla HTML, CSS and JavaScript for static hosting.

## Current playable prototype
- Start a new life in a randomly drawn country from a clearly labelled starter dataset.
- Follow a character year by year from birth through childhood, education, work, relationships, old age and the end of life.
- Pause/resume, advance one year, and run at 1×, 2×, 4× or 8× speed.
- Make choices at life milestones and during random events; enable Auto mode to resolve choices automatically.
- Rare fictional Hunter awakening, registration, rank E, and Gate missions layered over ordinary modern life.
- Mobile-first interface with a modern pixel-art city scene, character status, life events, world news and a local save.
- Save/load through browser localStorage. The unfinished life stays on the current device/browser.

## Run and deploy
Open `index.html` or serve the repository as a static site. For Vercel, import the repository, use no build command and set output directory to `.`. For GitHub Pages, enable **Settings → Pages → Build and deployment → GitHub Actions** and run the deploy workflow.

## Important data limitations
The current country list is a starter sample, not a complete official dataset. It contains selected countries plus an `Other countries (sampled)` group, with approximate weights and rounded country context values. The simulation is playable, but it does not yet reproduce real country-level birth probabilities, mortality tables, income distributions, or education rates with statistical fidelity. The UI says this explicitly. See [data/SOURCES.md](data/SOURCES.md) for official data sources and the import plan.

Hunter awakening, Gates, monsters, guilds and mission results are fictional game mechanics. Ordinary careers and family life remain valid paths; the Hunter layer is not presented as real-world fact.

## Planned next steps
1. Import complete, versioned UN World Population Prospects birth weights.
2. Add country-specific sex ratios and age/sex life tables.
3. Expand education, income, health, migration and career models using documented public indicators.
4. Expand Hunter guilds, rank tests, multi-day missions and choices without displacing ordinary-life paths.
5. Validate game ticks, saves, auto decisions and probability distributions in browser tests.

This is an original hybrid concept inspired by the broad life-simulation genre; it does not copy another game's source code, text, art or branding.
