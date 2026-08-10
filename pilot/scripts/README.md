# Pilot figure scripts

Store only the **final reproducible script/notebook** used to generate the proposal figures from the compact tables in `pilot/tables/`.

Recommended file:

- `jal_aesr_proposal_figures.py` or
- `JAL_AESR_Proposal_Figures.ipynb`

The script should:

1. read the four compact R3 tables;
2. read the India state and AESR reference layers only if they are redistributed legally;
3. reproduce Figures 1–3;
4. save high-resolution PNG and vector PDF outputs;
5. preserve missing periods explicitly;
6. label source-specific anomalies as descriptive rather than a composite stress index.

Do not store exploratory one-off cells, download caches or large raw data in this folder.
