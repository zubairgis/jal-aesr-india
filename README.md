# JAL-AESR INDIA

**A NISAR–IRS multi-sensor framework for assessing surface–groundwater coupling, irrigation security and agricultural water resilience across India’s agro-ecological regions**

> **Core idea:** Agricultural water security is determined not only by how much rain falls, but by where water is stored, how farmers can access it, and whether it is available when crops actually require it.

## Why this project

India does not face one agricultural water-security problem. Similar climate variability can produce very different agricultural outcomes where farming is:

- **groundwater-buffered** — irrigation can continue during rainfall deficits while aquifer stress accumulates;
- **rainfall-dependent** — crop-water exposure responds more directly to monsoon timing and dry spells; or
- **surface-water-buffered** — rainfall and upstream flows are converted into stored or routed irrigation supply.

JAL-AESR INDIA therefore proposes a national framework that integrates **rainfall, surface water, groundwater, crop-water timing and agro-ecological context** rather than assessing each water source independently.

## Rapid proof-of-need pilot

The proposal is supported by a deliberately lightweight in-situ pilot designed to demonstrate the need for integration rather than reproduce the full national methodology.

| Pilot | Illustrative landscape | Water regime | Preliminary variable |
|---|---|---|---|
| P1 | Karnal, Haryana | Groundwater-buffered | Groundwater-level variability |
| P2 | Yavatmal, Maharashtra | Rainfall-dependent | Reported rainfall variability |
| P3 | Mettur–Cauvery, Tamil Nadu | Surface-water-buffered | Surface-water-level variability |

The pilot uses existing public observations within the **2021–2025 analysis window, subject to source-specific data availability**. Missing periods are retained transparently. Source-specific standardized anomalies are used only for visual comparison and are **not** a composite water-security index.

## Proposed national research architecture

The full programme will develop a national analytical system in which:

\[
\mathrm{AgroWaterState}_{i,t}=f(\mathrm{SurfaceWater}_{i,t},\mathrm{SoilMoisture}_{i,t},\mathrm{Groundwater}_{i,t},\mathrm{Recharge}_{i,t},\mathrm{IrrigationDependence}_{i,t},\mathrm{CropWaterDemand}_{i,t})
\]

The central operational concept is **crop-stage water availability**: whether sufficient water is accessible from the locally relevant source during critical crop-development periods.

## What makes JAL-AESR INDIA different

1. **Source-aware:** rainfall, surface water and groundwater are treated as connected but non-equivalent water pathways.
2. **Crop-timed:** assessment is aligned to agricultural demand rather than annual hydrological totals alone.
3. **Agro-ecologically transferable:** India’s agro-ecological regions provide the national spatial framework.
4. **Observation-first:** groundwater state is anchored to monitored observations; NISAR is not treated as a direct groundwater-storage sensor.
5. **India-first Earth observation:** NISAR, IRS/Resourcesat, EOS-04/RISAT, Cartosat and Bhuvan are integrated with complementary Sentinel, Landsat and climate products where useful.
6. **Open and reproducible:** code, metadata schemas, non-restricted derived data and figure workflows will be version controlled here.

## Repository guide

- [`docs/`](docs/) — project concept, data architecture and reproducibility notes
- [`pilot/`](pilot/) — rapid proof-of-need evidence used in the proposal
- [`pilot/figures/`](pilot/figures/) — proposal-ready figures
- [`pilot/tables/`](pilot/tables/) — compact derived tables used to generate figures
- [`src/`](src/) — reusable analysis code for the full programme
- [`notebooks/`](notebooks/) — reproducible exploratory and demonstration notebooks
- [`data/`](data/) — metadata only; raw large datasets are not redistributed here

## Reviewer quick route

For a rapid review of the scientific case:

1. Read [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md).
2. Open [`pilot/README.md`](pilot/README.md) for the preliminary evidence logic.
3. View the three proposal figures in [`pilot/figures/`](pilot/figures/).
4. Check [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) for provenance and [`docs/REPRODUCIBILITY.md`](docs/REPRODUCIBILITY.md) for the open-science plan.

## Data policy

Large primary datasets, telemetry archives and satellite rasters are intentionally **not committed** to GitHub. They remain with authoritative providers or secured project storage. The repository stores:

- source identifiers and metadata;
- compact derived tables;
- scripts and notebooks;
- non-restricted vector layers when redistribution is permitted;
- final figures and documentation.

This keeps the repository lightweight, auditable and reproducible without duplicating authoritative data holdings.

## Status

**Proposal-stage research programme.** The current repository documents the scientific concept and preliminary proof-of-need. National-scale NISAR–IRS integration, crop-specific modelling, validation and the proposed Digital Water Observatory form part of the full research programme.
