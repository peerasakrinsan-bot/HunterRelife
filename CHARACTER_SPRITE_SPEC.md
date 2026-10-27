# Universal Character Sprite System — Master Specification

## MVP implementation status
The first implementation is a procedural pixel-art renderer in `character-sprites.js`. It draws into the existing Canvas scene and does **not** claim that external PNG sheets have been generated. This keeps the game playable while an authored asset pack is created.

## Master template
- Style: GBA-inspired pixel-art shapes, hard edges, fixed palette, no smoothing.
- Logical cell: 24 × 32 pixels.
- Pivot: bottom-centre (12, 31); all actions align to the feet baseline.
- Default render scale: 2×; scale is stage-specific and integer-aligned where possible.
- Background: transparent at sprite level; the existing world canvas supplies the background.
- Directions: front/right/left/back are accepted by the renderer. The procedural MVP has dedicated left/back treatments and a right-facing base; true four-direction authored sheets remain a follow-up asset task.
- Frame naming convention for future files: `character_[identity]_[age]_[outfit]_[direction]_[animation]_[frame]`.
- Stable identity fields: id, gender, skinColor, hairColor, hairStyle, eyeColor, build, shirtColor. Missing traits derive deterministically from identity ID.
- Attachment metadata is represented as state (weapon, headgear, effects) for the procedural renderer; authored layered sheets should use the same cell and pivot.

## Life-stage registry
| ID | Age range | Scale | Posture |
|---|---:|---:|---|
| newborn | 0 | 0.58 | crawl / infant pose |
| toddler | 1–3 | 0.68 | wobble |
| early_childhood | 4–6 | 0.76 | child |
| childhood | 7–12 | 0.84 | child |
| adolescent | 13–17 | 0.94 | teen |
| young_adult | 18–25 | 1.00 | adult |
| adult | 26–40 | 1.00 | adult |
| mature_adult | 41–60 | 0.98 | mature |
| elderly | 61+ | 0.94 | elder / grey hair / cane |

## Outfit selection
The renderer selects baby, child, school, work, hunter, warrior, mage, ranger, or rogue looks from the simulated age, job/occupation, awakening state, and equipment. Children are prevented from receiving adult fantasy armor or weapons. Weapons/headgear only render from age 13 onward. Unknown and missing gear falls back to the everyday outfit.

## Animation states
The current procedural renderer supports idle, walk/run frame variation, newborn crawl pose, sleep marks, attack marks, magic effects, and injury treatment. The API accepts arbitrary action IDs; dedicated authored frame sequences for sitting, eating, studying, work, social interaction, block, dodge, victory, death, and other requested states are future extensions, not yet included.

## API
- `RebornSprites.stageFor(age)`
- `RebornSprites.resolve(characterState)`
- `RebornSprites.draw(ctx, x, feetY, characterState, {scale})`
- `RebornSprites.cache` / `getCached` / `clearCache`

The renderer is stateless per draw and does not generate new images per simulation tick. Identity is derived from a stable character identifier or name; pass a persistent ID when available. The scene remains autonomous: simulation chooses activity and direction, and the renderer only reflects that state.

## Known limits / next asset batch
- The existing simulation currently has one village Canvas scene; this MVP plugs into its autonomous player renderer without replacing the world/camera/calendar.
- Full male/female body-shape sets, rich hair/face libraries, detailed occupational costumes, regional wardrobe, genuine sprite-sheet slicing, PNG loading/caching, and every animation listed in the brief are not yet delivered.
- The current code draws procedural shapes, not finished production-quality sprite sheets matching the reference image. The uploaded image is a visual direction guide, not a generated asset pack.
- Future PNG sheets must use nearest-neighbour scaling, transparent backgrounds, fixed frame dimensions and pivots, and a documented source/license.
