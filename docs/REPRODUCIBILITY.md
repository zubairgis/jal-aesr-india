# Reproducibility and open-science plan

JAL-AESR INDIA is designed so that a reviewer or collaborator can trace each figure and analytical product from authoritative source metadata through processing code to derived outputs.

## Reproducibility principles

1. **Authoritative data remain authoritative.** Large source datasets are referenced, not duplicated.
2. **Every derived output is traceable.** Tables and figures should record the source dataset, resource identifier, variable, time window and script/notebook used.
3. **Missingness is explicit.** Missing observations are not silently converted to zeros or interpolated in proof-of-need figures.
4. **Source-specific units are preserved.** Variables are not placed on a common physical scale unless the transformation is scientifically justified.
5. **Standardized anomalies are descriptive, not a composite index.** They support within-source comparison and visualization only.
6. **Groundwater interpretation is observation-led.** NISAR is not used as a direct measure of subsurface groundwater storage.
7. **Version control is part of the method.** Code and documentation changes are recorded through Git history.

## Suggested provenance record

Each derived file should be accompanied by metadata containing:

- `project_id`
- `pilot_id` or national spatial unit
- `source_agency`
- `source_dataset`
- `source_resource_id`
- `access_date`
- `variable`
- `unit`
- `time_start`
- `time_end`
- `spatial_reference`
- `processing_script`
- `processing_version`
- `quality_flags`
- `output_file`

## Reviewer reproducibility route

For the proposal-stage pilot, reviewers should be able to reproduce the visual evidence from:

1. the compact derived tables in `pilot/tables/`;
2. the plotting script/notebook in `pilot/scripts/` or `notebooks/`;
3. the final figures in `pilot/figures/`;
4. source metadata documented in `docs/DATA_SOURCES.md`.

## Future national programme

The full project will extend the same provenance architecture to national data cubes, model training/validation, uncertainty products, crop-stage water-security outputs and the proposed Digital Water Observatory.
