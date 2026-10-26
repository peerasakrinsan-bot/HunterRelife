# Data sources and limitations — Hunter Re:Life

## Current prototype status

The country table in `world-life.js` is a **starter demonstration dataset**, not a complete, validated statistical dataset. It includes selected countries plus an `Other countries (sampled)` catch-all. The weights are approximate, then normalized by the engine. Therefore the draw is not yet a precise estimate of a randomly born person's country, and the UI explicitly tells players this.

Country life expectancy, income/GDP and schooling fields are broad rounded context values for gameplay only. They are not currently wired into a statistically calibrated survival model or detailed income distribution. Age, health, career, education, relationships, and event outcomes are simplified fictional game rules.

## References for a future verified data import

- UN DESA, *World Population Prospects 2024*: https://population.un.org/wpp/ — source to use for population, annual births and life tables. Import the relevant country/area tables with the reference year recorded.
- World Bank Indicators API documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api — source for indicators such as life expectancy, GDP per capita and urban population. Each indicator must retain its code and observation year.
- 1 in 8 Billion official site, as a design reference for the broad life-simulation concept (not a data source for this project's hard-coded values): https://1in8b.life/

## Requirements before claiming statistical fidelity

1. Replace the approximate weights with a complete, versioned UN WPP births dataset, including country/area codes and source year.
2. Add a documented population-weighted option only if population data is also imported.
3. Import sex-specific life tables and use age/sex/country-specific mortality probabilities if modelling death by life table.
4. Import indicator-specific source years and clearly label missing values or regional estimates.
5. Keep Hunter awakening, Gates, monsters, guilds, rank promotion and mission outcomes labelled as fictional game systems. Never present them as real-world statistics.


## Current birth-generation implementation (2026-10-27)

- The birth flow now samples family-income tier and sibling count using a lightweight country-development proxy derived from the existing starter GDP-per-capita values in `world-life.js`.
- This is a gameplay heuristic, **not** a measured country-specific household-income or fertility distribution. The GDP values and country weights are approximate starter values and must not be described as official current statistics.
- World Bank Indicators API documentation: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api . The API offers indicators that can support a later data-import step; country-specific birth weights require an appropriate births/population dataset and reference year.
- Next data upgrade: import versioned UN World Population Prospects births by country/area and year; then use births as country-selection weights. Import fertility indicators only as a clearly labelled proxy for sibling counts, not as a direct household-size measure.


## Birth-origin traits and childhood events (2026-10-27)

The birth flow now assigns a simulated home language, urban/suburban/rural setting, environment description, school-access score, and opportunity score. These are lightweight gameplay traits, not verified country-level measurements. The language map is a simplified starter list and may not reflect multilingual reality in every city or household.

Traits influence the simulation: family wealth changes starting money; school access modifies education progression; opportunity modestly changes work-income chances; childhood events can affect health, happiness, family bonds, social ties, education, and school progress. Existing saves receive fallback values for newly introduced fields.

For future data-backed versions, use official country datasets and retain the source year. UN World Population Prospects 2024 provides population estimates and projections for 237 countries or areas; its data portal also provides downloadable datasets and an API. See https://population.un.org/wpp and https://www.un.org/development/desa/pd/content/World-Population-Prospects-2024. Do not treat the current generated scores as official statistics.


## Adult career and Hunter progression (2026-10-27)

The life simulator now uses the character's school-access score, education progression, opportunity score, family resources, health and preparation history as gameplay modifiers for adult path choices. University acceptance is probabilistic; vocational training can lead to a full-time job; initial job pools and income vary by educational background and opportunity. Hunter readiness also considers education, opportunity, health and preparation, while keeping awakening and rank fictional game mechanics.

These coefficients are game-balance heuristics, not empirically calibrated forecasts of an individual's real-world outcomes. For future data-backed tuning, UNESCO UIS provides comparable country-level indicators on education access, participation, completion, technical/vocational training and tertiary enrolment: https://data.unesco.org/explore/dataset/uis001/table?flg=en-us . The World Bank education portal also lists enrolment, completion and learning indicators: https://datatopics.worldbank.org/education/ . Country averages should be used as broad context, never as deterministic predictions about an individual.
