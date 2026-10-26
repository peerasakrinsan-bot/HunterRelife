# Phase 5 — Integration & QA checklist

## Static checks
- [x] JavaScript syntax validation.
- [x] DOM IDs referenced by JavaScript exist in HTML.
- [x] Daily tick, calendar, life decisions and Daily Log code paths present.
- [x] Hunter awakening, Gate combat, rewards, level progression and combat UI present.
- [x] Skills, Inventory and Legacy panels present.
- [x] Save/load uses localStorage; loaded state normalization handles missing arrays and invalid date/combat data.
- [x] Reset clears current save and local Legacy archive.

## Manual browser checks still required
- [ ] Start a new life; confirm country, age, date and initial scene.
- [ ] Advance one day; confirm Daily Log date increments.
- [ ] Pause/resume and verify all speed options.
- [ ] Trigger a life decision in manual and Auto modes.
- [ ] Reach Hunter awakening; start Gate, attack, use a skill and retreat.
- [ ] Confirm combat rewards, loot chance and save after reload.
- [ ] Confirm death archives the life and Legacy lists it.
- [ ] Test Android Chrome narrow layout and horizontal overflow.
- [ ] Verify Vercel deployment completed.

## Known limitations
Static checks are not end-to-end browser tests. The calendar is simplified (30-day months). Economy, ranks, skills, inventory and enemy balance are prototype mechanics. Legacy is stored locally and is not cloud-synced.
