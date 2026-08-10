# Reference spatial sources

The JAL-AESR INDIA reviewer companion reuses established web-ready reference layers from the earlier `aesr-shift-india` project so that the proposal-stage map is available immediately.

## India state / UT layer

Source repository path:

`zubairgis/aesr-shift-india/data/reference/india_states_web.geojson`

Preferred local destination when copied:

`docs/data/india_states_web.geojson`

## India agro-ecological subregion layer

Source repository path:

`zubairgis/aesr-shift-india/data/reference/india_aesr_60_web.geojson`

Preferred local destination when copied:

`docs/data/india_aesr_60_web.geojson`

## Current loading behaviour

`docs/index.html` tries the local destination first. If the local file is absent, it loads the source file from the earlier GitHub repository. This fallback is intentional and does not alter the previous repository.
