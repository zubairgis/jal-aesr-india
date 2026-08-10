# Data management

This repository does not host provider-scale raw datasets. The `data/` area is for **metadata, small reference tables and redistribution-safe derived products only**.

## Recommended subfolders

- `data/metadata/` — source inventories, resource IDs, acquisition notes and variable dictionaries
- `data/reference/` — small reference layers/tables where redistribution is permitted
- `data/derived/` — compact national or pilot summaries that are safe to share

## Keep outside GitHub

Store these in Google Drive, institutional storage or authoritative provider systems:

- NWDP/CWC raw telemetry;
- large groundwater station archives;
- raw rainfall archives;
- NISAR, Sentinel, IRS, Landsat and other raster scenes;
- GeoTIFF predictor stacks;
- model caches and temporary downloads;
- any restricted or provider-limited data.

## Minimum metadata for every source

Record the provider, dataset title, resource identifier, access date, variable, unit, spatial coverage, temporal coverage, quality notes and processing script used.
