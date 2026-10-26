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


## Real-world geography
- [ ] New lives receive a real named country and a city from that country's city list.
- [ ] The HUD shows country and city; the initial life log includes the starting city and country.
- [ ] Legacy saves without a city receive a valid city on load.
- [ ] The generic sampled-country label is no longer used.


## Full life-cycle integration test (priority)

### Automated/static preflight
- [x] JavaScript parses successfully with `new Function(worldLifeSource)`.
- [x] Required UI IDs referenced by the game script exist in `index.html`.
- [x] Core lifecycle functions are present: `newLife`, `tick`, `decide`, `startGate`, `combatAction`, `archiveLife`, `load`, and `normalizeState`.
- [x] Daily clock advances one day per tick and advances age only after 12 simplified 30-day months (360 ticks).
- [x] Death conditions exist for age 85 or health reaching 0; Hunter combat defeat also ends a life.
- [x] Life archive is guarded by an `archived` flag to avoid duplicate Legacy entries.

### End-to-end scenario — manual browser/Android test still required
1. **Birth:** start a new life; confirm a real country/city, age 0, day 1, health/funds, opening log, and scene.
2. **Growing up:** advance 1 day and confirm the date/log move by one day; run 29 more ticks and confirm month rollover; advance through 360 ticks and confirm age increases by exactly one year.
3. **Awakening:** continue to an awakening decision (or use a controlled test save); choose registration and confirm random rank, class, and power are assigned, Hunter Level starts at 1, and Hunter EXP becomes visible only after awakening.
4. **Career path:** verify a civilian can take school/work choices without awakening; verify an awakened character can use power in daily life, train, and receive Hunter-specific work offers; confirm money, energy, health, EXP, and logs update consistently.
5. **Character growth:** gain enough Hunter EXP from training or a Gate win to level up; verify stats rise and official rank does not change just because level rises.
6. **Gate combat:** enter a Gate, attack/use skill/retreat; confirm enemy and player HP, rewards only on victory, no rewards on retreat, and defeat ends the life.
7. **Death & Legacy:** reach age 85 or health 0; confirm simulation stops, ending screen appears, and exactly one Legacy record includes age, location, career, Hunter status, and days lived.
8. **New life & save:** start another life; confirm prior life remains in Legacy and new life starts at age 0/day 1 with a fresh location. Reload and verify current life and Legacy persist.
9. **Regression:** test Auto ON/OFF, all speed settings, pending decisions, reset, and narrow Android Chrome layout.

### Pass criteria / known limits
- A scenario passes only after observed in a real browser; static checks do not count as end-to-end pass.
- No real browser automation, Android gameplay run, or Vercel deployment check has been performed in this pass.
- The prototype calendar intentionally uses 30-day months; use a controlled test save/debug harness to test rare awakening and death efficiently rather than waiting for random events.
