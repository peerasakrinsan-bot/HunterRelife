# Phase 5 — Integration & QA checklist

## Static checks
- [x] JavaScript syntax validation.
- [x] DOM IDs referenced by JavaScript exist in HTML.
- [x] Daily tick, calendar, life decisions and Daily Log code paths present.
- [x] Hunter awakening, Gate combat, rewards, level progression and combat UI present.
- [x] Skills, Inventory and Legacy panels present.
- [x] Save/load uses localStorage; loaded state normalization handles missing arrays and invalid date/combat data.
- [x] Reset clears current save and local Legacy archive.

## New power-life checks
- [ ] After awakening, verify monthly choice to apply power at work/study, train for EXP, or rest with family.
- [ ] Confirm training EXP can level the Hunter without changing official rank.
- [ ] Confirm the chosen power can produce an everyday-life benefit and Daily Log entry.

- [ ] Confirm energy decreases when using/training powers and recovers over time or when resting.
- [ ] Confirm adult characters can unlock a power-based specialist career after using powers in daily life.

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


## Career progression and Hunter specialist work
- [ ] Monthly promotion checks can increase job level and income without exceeding reasonable growth.
- [ ] Specialist careers can receive unique paid assignments, with energy costs and occasional risk.
- [ ] Non-specialist awakened Hunters can receive an organization offer and either unlock a specialist career, train, or decline.
- [ ] Low energy blocks power demonstrations and does not create a specialist career for free.
- [ ] Existing saves without workExperience or specialCareer continue to load.
