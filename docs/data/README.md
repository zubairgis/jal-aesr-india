# Web-ready spatial data

This directory supports the JAL-AESR INDIA interactive reviewer map.

## Local files

- `pilot_sites.geojson` — three proposal-stage proof-of-need locations.
- `india_states_web.geojson` — optional local copy of the India state/UT web layer.
- `india_aesr_60_web.geojson` — optional local copy of the India AESR web layer.

The two national reference layers already exist in the companion repository `zubairgis/aesr-shift-india/data/reference/`. The web map is intentionally coded to **prefer local copies here and fall back to those existing raw GitHub resources**. This avoids delaying the reviewer companion while keeping a clear route to a fully self-contained repository.

## Existing source files

- `https://github.com/zubairgis/aesr-shift-india/blob/main/data/reference/india_states_web.geojson`
- `https://github.com/zubairgis/aesr-shift-india/blob/main/data/reference/india_aesr_60_web.geojson`

## AESR attributes used by the interactive map

Where available, the popup exposes:

- `aesr_code`
- `aer_code`
- `subregion`
- `SOIL_GRP`
- `CLIM_STD`
- `lgp_ref`
- `AWC_REF`

## Data-use principle

These layers provide geographic and agro-ecological context. They are not themselves JAL-AESR water-security outputs. National water-security classes will be produced only by the proposed full research programme after source harmonization, crop-stage modelling and independent validation.
