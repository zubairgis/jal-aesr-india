# Interactive reviewer map

The reviewer companion is served from `docs/index.html`.

## Spatial layers

The page loads three layers:

1. India state/UT boundaries;
2. India agro-ecological subregions (AESR framework);
3. three JAL-AESR proof-of-need pilot locations.

For the two national reference layers the application first checks for local files in `docs/data/` and, if they are not yet present, automatically falls back to the established web-ready copies in `zubairgis/aesr-shift-india/data/reference/`.

This makes the reviewer companion functional immediately while preserving a path to a fully self-contained repository.

## GitHub Pages

Publish the `main` branch from the `/docs` folder. The intended public address is:

`https://zubairgis.github.io/jal-aesr-india/`

## Scientific scope

The interactive map is a proposal-stage communication and exploration tool. AESR polygons provide agro-ecological context. Pilot locations demonstrate contrasting water-dependence mechanisms. Neither constitutes a validated national agricultural water-security product. National water-security outputs will be generated only under the proposed full JAL-AESR INDIA programme.
