# FATEBORN: AWAKENED

A mobile-first pixel-art fantasy life simulator about reincarnating into a world of Hunters, Gates, dungeons, and awakened powers.

## MVP gameplay
- Daily life loop: choose rest, train, work, hunt, study, or socialize; then advance exactly one in-game day.
- Life stages from infant to elder, age progression, milestones, and rebirth.
- Automatic hunt resolution, EXP, levels, stats, skills, gold, mana essence, and Gate encounters.
- Story choices, class paths, event log, and life chronicle.
- Browser localStorage autosave and installable PWA shell with offline cache.
- CSS pixel-art scene and responsive mobile-first interface.

## Run
Open `index.html` in a browser or serve this directory using a static web server. Service worker caching is enabled on HTTP(S).

## Save and time
Saves are stored in localStorage on the current browser/device and do not sync across devices. When returning after full real-world days have elapsed, the calendar and age advance by that number of days. During play, the player can advance one in-game day at a time.

## Deploy to Vercel
Import this repository, use no build command, and set the output directory to `.`.

## Next milestones
Cloud saves/accounts, deeper combat and enemy variety, more Gate ranks, richer event chains, and balancing/testing.