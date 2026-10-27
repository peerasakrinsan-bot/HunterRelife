# Hunter System — Existing Dependency Audit
Date: 2026-10-27

## Scope and approach
Read the current default-branch source before changing it. This is a dependency map of the implementation that exists today, not a claim that every gameplay path has been browser-tested. The implementation is intentionally kept in the existing life simulator rather than split into a second game loop.

## Dependency map

```text
newLife / saved character object (g)
  ├─ life clock: date, daysLived, age, speed, paused, auto
  │    └─ start() interval → tick() → autonomous life progression / event checks
  │                              └─ eventDecision() → queueDecision()
  │                                    └─ centralized decision modal / decide()
  ├─ attributes: health, energy, str, agi, int, vit, education, social, money
  ├─ awakening: birthday event → readiness roll → awakened, hunterPower, hunterClass, skills
  │    └─ mandatory registration decision → hunterCareer.registration
  │         ├─ rank + rankHistory
  │         ├─ guild + guildHistory
  │         └─ career label
  ├─ Hunter training / powerLife / organization offers
  │    └─ hunterCareer.trainingHistory, proficiency (where used), career/specialCareer
  ├─ Gate combat: startGate() → g.combat + g.activeMission
  │    ├─ combatAction(attack/skill/retreat)
  │    ├─ money / EXP / essence / inventory / stats
  │    └─ hunterCareer.missions (history snapshot) + active mission resolution
  ├─ retirement: hunterRetirement decision → hunterCareer.retired / retiredAt
  ├─ injury/death: health and combat outcomes → alive/paused + archiveLife()
  └─ persistence: save()/load()/normalizeState() → localStorage
       └─ render()/renderDetails() → existing HUD, combat panel, skills, inventory, life feed
```

## Existing systems confirmed in source
- **Single authoritative life state:** the character object g holds age, date, speed, pause state, attributes, health, money, skills, inventory, combat and career data.
- **Awakening:** a birthday opportunity can trigger a probabilistic readiness check; success assigns a power and specialization, then opens a registration choice. A failed check does not automatically awaken the character.
- **Registration/rank:** registration is separate from awakening; rank is assigned at initial evaluation and recorded in hunterCareer.rankHistory. Gate access checks awakening, registration, retirement and current combat state.
- **Skills/combat/equipment:** hunterPower, hunterClass, skills, inventory, str/agi/int/vit, g.combat and combatAction() are already used by gameplay.
- **Guild/career:** guild, career, hunterCareer.guildHistory, reputation, specialCareer and retirement fields exist.
- **Mission model:** the active Gate encounter is held in g.combat and g.activeMission; a snapshot is kept in hunterCareer.missions. Combat resolution already has success/retreat/death branches and a resolved guard.
- **Time/decisions:** one interval calls tick(); speed multiplies ticks, and eventDecision() uses the shared pending-decision controller. Decisions are persisted with the life save.
- **World and art:** geographic-world.js, village-scene.js, and character-sprites.js remain separate modules; this change does not replace them.
- **UI:** index.html owns the existing panels and IDs; life-ui.js is the active navigation shell; fateborn.css contains the visual styles.
- **Persistence:** save(), load(), and normalizeState() are the migration boundary for older local saves. Legacy lives are archived separately.

## Risks found and addressed in this pass
1. A decision handler can generate a second mandatory decision (awakening → registration). The old decision cleanup could then clear the new pending decision. The handler now detects a different pending object and leaves the new modal open.
2. A monthly event could open a decision mid-tick(), after which the remainder of the tick could still run world or death logic. The tick now exits and saves immediately after a mandatory decision is pending.
3. Auto mode could automatically submit a pending decision when toggled, violating the pause-until-choice contract. Toggling Auto now preserves the open decision and does not submit it on the player's behalf.

## Important limitations still present
- Gate missions are currently a single combat encounter with metadata/history; they are not yet multi-day travel/preparation/execution/return simulations.
- The code has a rank at initial registration, but this audit did not add a complete qualification/evaluation/promotion loop. Hunter level/EXP and official rank remain separate.
- Training and proficiency are not yet a unified, fully balanced progression system; existing power-training choices and histories are reused.
- Guild/NPC entities and rival-guild simulation are not yet a full persistent social graph. Current guild membership is mostly a state label/history.
- Injury recovery and long-term injury effects are not yet a complete time-consuming treatment model.
- Mission travel/deadlines, team composition, consumable costs, repair economy and bounded rewards need later incremental phases.
- No live browser, Android, or Vercel end-to-end run was performed for this audit. Static parse checks do not prove runtime correctness.

## Next safe implementation order
1. Validate decision lifecycle and pending-save restoration in a browser.
2. Add regression coverage for existing awakening → registration → rank flow and exactly-once mission rewards.
3. Extend active Gate mission stages without duplicating g.combat, time, money, inventory or health.
4. Add bounded training/proficiency and qualification-based rank evaluations.
5. Add injury/recovery time costs, guild state changes and career retirement regression checks.