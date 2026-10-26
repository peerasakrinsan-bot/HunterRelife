# Hunter Re:Life — Real-World Life Simulator + Hunter Awakening

## Product direction

Pivot from a fully fictional fantasy-world life sim to a modern Earth life simulator inspired by the *structure* of 1 in 8 Billion: random birth, real countries and demographic context, a year-by-year life timeline, autonomous decisions, pause/speed/auto, and a life chronicle. Do not copy the reference game's code, art, text, exact UI assets, or branding.

The unique layer is an original Hunter/Gate system inspired by the broad genre conventions of hunter manhwa/anime. The character lives in a recognizable present-day country and society; a small, configurable share of people awaken and gain access to Hunter careers.

## Core loop

1. Start a new life. Draw country using annual live-birth weights (or optionally population weights); draw sex, urban/rural setting, household resources, and family circumstances using documented probability tables where available.
2. Advance one simulated year per tick. Resolve childhood, education, health, relationships, work, income, and age-appropriate events.
3. At an age-dependent check, determine whether the character awakens. Awakening is rare and independent of wealth/status unless a specific mechanic explicitly changes the odds.
4. Before awakening, there is no Hunter level or Hunter EXP; ordinary life progression is represented by education, work, health and relationships. On awakening, Hunter Level 1 and the Hunter EXP track unlock, and the system randomly assigns official rank, class, and one special power. If awakened, the character may train, register, test for rank, join a guild, take Gate missions, develop class/skills, sustain injuries, gain income/reputation, or die from justified mission outcomes. If not awakened, ordinary lives and careers remain fully playable.
5. Critical events pause in Manual/Assisted modes; Full Auto uses personality, goals, safety, and resources.
6. End the life at a modelled lifespan/death event or retirement. Produce a chronicle and preserve completed lives when starting again.

## Real-world grounding

Use public demographic sources rather than fabricated country probabilities:
- UN DESA, World Population Prospects 2024 for births, population and life tables: https://population.un.org/wpp/
- World Bank Indicators API for country indicators such as life expectancy, urban population, income and education: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api

Every imported dataset should include source URL, indicator name, reference year, units, and license/attribution in `data/SOURCES.md`. Reference-year gaps must be visible. Statistics describe populations and are not predictions for a specific person. Do not claim that fantasy awakening, Gates, monster incidents or Hunter ranks are real-world statistics; they are clearly labelled fictional systems layered over real-world context.

## Hunter layer

- Modern world, real country/city context, real family and career circumstances.
- Fictional global Gate incidents and Hunter agencies are an alternate-reality layer, clearly distinguished from real events.
- Awakening randomly assigns Hunter rank (weighted E/D/C/B/A/S odds), Hunter class, and one special power. Keep the official rank independent from level; rank must not auto-upgrade from EXP.
- Classes: Warrior, Assassin, Mage, Archer, Tank, Healer, Summoner, Hybrid, plus original advanced classes.
- Gate missions take multiple simulated days and preserve enemy HP/progress; calculate combat before applying rewards, injuries and mission outcomes.
- Non-awakened paths: education, skilled trades, service, research, entrepreneurship, public service and family life.
- A rare awakening is not an automatic success; equipment, training, decisions, resources, and risk matter.
- Awakened characters periodically choose between applying their power to work/study, training for Hunter EXP, or resting and investing in family/wellbeing. Power use consumes energy; energy recovers slowly over days and faster when resting. Power effects can benefit civilian careers and daily routines, not only Gate combat.
- Power-based specialist careers can unlock through successful use of an awakened ability in adult life. Examples include recovery specialist, energy technician, rapid-response specialist, and shadow operations assistant. These are optional alternate-reality careers; they do not force the player to become a Hunter.

## Interface and pacing

- Mobile-first vertical interface.
- Top HUD: character name, age, real country, year, health, life-stage, Hunter status, pause/speed/auto.
- Main scene: original pixel-art modern location (home, street, school, workplace, hospital, Hunter guild, Gate interior); character remains visually centered while scene changes according to activity.
- Below: event timeline and world news, with critical decision cards and 2–4 meaningful choices.
- Bottom navigation: Life, Character, Relationships, Map, Inventory, Skills, Hunter/Guild, World, Legacy.
- Daily tick is the chosen prototype pacing: 30-day months and 12 months per year. Character age advances after 360 ticks. This is a simplified fictional calendar, not a real-world calendar.
- Save current life locally and preserve completed chronicles in a local Legacy archive. No cloud save or background progression claims unless implemented.

## Implementation sequence

1. Replace fantasy-only birth generator with a data-driven real-world birth draw and a clearly attributed starter dataset.
2. Use one simulated day per tick with a documented 30-day month / 12-month calendar for the prototype; age advances every 360 simulated days. Preserve sequential ticks and pause/speed behavior.
3. Add real-world life-stage, education, career, income, health and relationship event systems.
4. Add rare awakening as an optional fictional layer; build Hunter ranks, classes, training, guilds, Gates and combat on top.
5. Rework UI labels, character details, locations and pixel scene for modern Earth and Hunter-specific situations.
6. Validate birth-weight distribution, age progression, paused time, auto/manual decisions, mission persistence, one-time rewards, save/load, and life chronicle.

## Scope and honesty

This is an original hybrid concept, not an exact copy. A credible real-world simulator requires sourced country datasets and clear notes about which events are real-statistics-based versus fictional game rules. A playable prototype may begin with a smaller, explicitly documented dataset before expanding coverage.


## Career progression and specialist work
- Adult careers now track work experience and can earn periodic promotions with salary increases. Promotion odds are bounded and affected modestly by job level and education.
- Awakened Hunters who develop a power-specialist career may receive power-specific contract opportunities. Players can accept higher-paying, higher-energy-risk assignments, negotiate safer lower-paying work, or decline.
- Hunters without a specialist career may receive occasional organization offers. Demonstrations cost energy and may unlock a specialist role; training first or declining are valid choices.
- These systems are fictional game mechanics and do not represent real-world salaries or employment advice.
