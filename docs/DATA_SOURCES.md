# Data sources and provenance

JAL-AESR INDIA follows an **India-first, observation-led data hierarchy**. Primary data remain with authoritative providers; this repository stores identifiers, metadata, processing code and compact derived products where redistribution is permitted.

## Preliminary proof-of-need sources

| Component | Pilot landscape | Provider / platform | Preliminary use |
|---|---|---|---|
| Groundwater | Karnal, Haryana | National Water Data Portal / Haryana Ground Water Department | Groundwater-level variability |
| Rainfall | Yavatmal, Maharashtra | National Water Data Portal / Maharashtra Surface Water Department | Reported rainfall variability |
| Surface water | Mettur–Cauvery, Tamil Nadu | National Water Data Portal / Central Water Commission | Surface-water-level variability |

The preliminary analysis uses the **2021–2025 observation window subject to source-specific availability**. Missing periods are retained rather than filled for presentation.

## Full national programme

### Groundwater
- Central Ground Water Board (CGWB)
- National Water Data Portal (NWDP)
- India-WRIS
- State groundwater departments

### Surface water
- Central Water Commission
- NWDP / India-WRIS
- reservoirs, rivers, canals, irrigation tanks and command-area datasets where available

### Rainfall and climate
- India Meteorological Department
- nationally available rainfall and climate observations
- complementary reanalysis or satellite precipitation only where needed for spatial continuity

### Agriculture and irrigation
- official crop calendars
- irrigation-source statistics
- crop area and agricultural statistics
- command-area and irrigation-infrastructure data where available

### Indian Earth observation
- NISAR
- Resourcesat-2/2A AWiFS, LISS-III and LISS-IV
- EOS-04 / RISAT
- Cartosat
- Bhuvan resources

### Complementary Earth observation
- Sentinel-1 and Sentinel-2
- Landsat
- SMAP
- MODIS
- ERA5-Land or related products where needed

## Redistribution policy

Do **not** upload provider-scale raw telemetry archives, large satellite scenes or restricted datasets to this repository. Instead retain:

1. authoritative source name;
2. dataset/resource identifier;
3. access date;
4. spatial/temporal coverage;
5. variables used;
6. processing script version;
7. derived output identifier.

This repository is intended to make the analysis **auditable and reproducible without duplicating authoritative national data holdings**.
