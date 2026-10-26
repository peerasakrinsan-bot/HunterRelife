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
