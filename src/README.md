# Source-code architecture

This folder is reserved for reusable, tested analysis modules developed during the full JAL-AESR INDIA programme.

Recommended structure as the project grows:

- `groundwater/` — groundwater ingestion, QA, recovery and trend metrics
- `rainfall/` — rainfall timing, dry-spell and anomaly metrics
- `surface_water/` — river, reservoir, tank and persistence metrics
- `earth_observation/` — NISAR/IRS/Sentinel preprocessing and feature generation
- `crop_water/` — crop calendars, critical-stage demand and sufficiency calculations
- `integration/` — cross-source coupling and irrigation-security modelling
- `validation/` — independent validation, uncertainty and sensitivity analysis
- `visualization/` — national maps, figures and Digital Water Observatory products

Proposal-stage pilot plotting code belongs in `pilot/scripts/`; this folder should contain reusable national-project code only.
