# Hunter Re:Life — Autonomous Hunter Life Simulator

A mobile-first browser RPG about living an entire life in an original fantasy world of Gates, Hunters, guilds, and dungeons. Built with vanilla HTML, CSS, and JavaScript for static hosting.

## Implemented in this MVP
- Randomly generated lives with six ancestries, birthplace, family, personality, social class, hidden natural talent, stats, and goals. Configured ancestry and talent odds are shown accurately when revealed.
- Calendar with 7-day weeks, 30-day months, 12-month years; character age is tracked separately as years/months/days using the same 360-day year.
- Autonomous daily activities, fatigue, HP/MP recovery, study, training, work, social ties, and exploration.
- Pause/resume, 1x, 2x, 4x, and 10x fast simulation. Ticks are processed sequentially so pending decisions stop fast-forward.
- Manual, Assisted, and Full Auto decision modes.
- Awakening checks, Hunter ranks, classes, skills, levels, equipment, inventory, and reputation.
- Multi-day Gate missions with persistent enemy HP, automatic combat calculations, retreat conditions, bosses, loot, and one-time rewards.
- World news, regional threat, market changes, guild notices, relationship tracking, and a life chronicle.
- CSS pixel-art side-scrolling scene with a camera that follows the character and keeps them centered while the world moves.
- Mobile reference-flow UI pass: compact calendar/simulation HUD, character status ahead of the scene, taller scrolling scene, readable Life Events/World News timeline, and a fixed compact bottom navigation.
- Browser localStorage save/load and PWA manifest/service-worker offline shell with an original app icon.

## Run and deploy
Open `index.html` or serve the folder using a static web server. For GitHub Pages, open **Settings → Pages**, select **GitHub Actions** as the build/deployment source, then push to `main` or run the `Deploy Hunter ReLife to GitHub Pages` workflow. Once the workflow succeeds, the site will be available at `https://peerasakrinsan-bot.github.io/HunterRelife/`. The workflow has been added, but Pages still needs to be enabled in repository settings before a live URL can be confirmed. For Vercel, import the repository, use no build command, and set output directory to `.`.

## Save and simulation notes
The save is local to the current browser/device. There is no account system, cloud sync, server-authoritative simulation, or background execution guarantee. The simulation advances while the page is active; browser suspension can pause timers. Fast mode runs 10 sequential daily ticks per second while no decision is pending.

## Known MVP limitations
- Pixel art is built from CSS shapes rather than imported sprite sheets; the scene has a tile-like ground, landmarks, basic activity animations, and camera follow, but not a full hand-authored tile collision engine.
- Combat is an abstract daily auto-combat model rather than real-time action combat. Mission enemy HP and rewards persist and are resolved through game-state calculations.
- World events, social bonds, careers, and life endings are a foundation for expansion; illness/accident/disaster death paths, a full economy, detailed NPC schedules, and cloud saves are not yet implemented.
- This is a playable prototype, not a fully content-complete commercial game.

## Validation performed
- Parsed the JavaScript source successfully.
- Checked that all JavaScript DOM ID references exist in `index.html`.
- Ran 30 sequential daily ticks in a mock DOM harness: calendar advanced from month 1 day 1 to month 2 day 1, and character age advanced to 1 month.
- Checked pause/resume controls do not change the date unless ticks run.
- Simulated a boss gate mission in a mock DOM harness and verified enemy HP persists across daily ticks (200 → 170 → 140 in the test scenario), the gate was marked cleared, the mission ended, and gate-clear rewards were not duplicated on the next day.
- A full real-browser interaction pass on Android Chrome is still recommended before production release.
