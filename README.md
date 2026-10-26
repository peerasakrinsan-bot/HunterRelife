# Hunter Re:Life — Autonomous Hunter Life Simulator

A mobile-first browser RPG about living an entire life in an original fantasy world of Gates, Hunters, guilds, and dungeons. Built with vanilla HTML, CSS, and JavaScript for static hosting.

## Implemented in this MVP
- Randomly generated lives with six ancestries, birthplace, family, personality, social class, natural talent, stats, and goals.
- Calendar with 7-day weeks, 30-day months, 12-month years; character age is tracked separately as years/months/days.
- Autonomous daily activities, fatigue, HP/MP recovery, study, training, work, social ties, and exploration.
- Pause/resume, 1x, 2x, 4x, and 10x fast simulation. Ticks are processed sequentially so pending decisions stop fast-forward.
- Manual, Assisted, and Full Auto decision modes.
- Awakening checks, Hunter ranks, classes, skills, levels, equipment, inventory, and reputation.
- Multi-day Gate missions with persistent enemy HP, automatic combat calculations, retreat conditions, bosses, loot, and one-time rewards.
- World news, regional threat, market changes, guild notices, relationship tracking, and a life chronicle.
- CSS pixel-art side-scrolling scene with a camera that follows the character and keeps them centered while the world moves.
- Browser localStorage save/load and installable PWA shell with offline cache.

## Run and deploy
Open `index.html` or serve the folder using a static web server. For Vercel, import the repository, use no build command, and set output directory to `.`.

## Save and simulation notes
The save is local to the current browser/device. There is no account system, cloud sync, server-authoritative simulation, or background execution guarantee. The simulation advances while the page is active; browser suspension can pause timers. Fast mode runs 10 sequential daily ticks per second while no decision is pending.

## Known MVP limitations
- Pixel art is built from CSS shapes rather than imported sprite sheets; the scene has a tile-like ground, landmarks, basic activity animations, and camera follow, but not a full hand-authored tile collision engine.
- Combat is an abstract daily auto-combat model rather than real-time action combat. Mission enemy HP and rewards persist and are resolved through game-state calculations.
- World events, social bonds, careers, and life endings are a foundation for expansion; illness/accident/disaster death paths, a full economy, detailed NPC schedules, and cloud saves are not yet implemented.
- This is a playable prototype, not a fully content-complete commercial game.

## Validation
Source syntax and UI element references were checked through the GitHub workflow. Browser-level interaction tests should still be run after deployment on Android Chrome before considering the release production-ready.
