from pathlib import Path
import re

path = Path('index.html')
s = path.read_text(encoding='utf-8')

# Remove Figure 3 from Section 01.
s, n1 = re.subn(
    r'\n\s*<figure class="research-figure">\s*<a[^>]*Figure3_FINAL_Hero_JAL_AESR\.webp.*?</figure>\s*',
    '\n', s, count=1, flags=re.S
)

# Remove Figure 1 and its context card from Section 02.
s, n2 = re.subn(
    r'\n\s*<div class="figure-context-grid">.*?</aside>\s*</div>\s*',
    '\n', s, count=1, flags=re.S
)

stack = '''
        <div class="evidence-figure-stack" aria-label="JAL-AESR INDIA preliminary proof-of-need figures">
          <figure class="research-figure">
            <a class="figure-link" href="docs/assets/figures/Figure1_FINAL_India_AESR_WaterRegimes.webp?v=20260812c" target="_blank" rel="noopener" aria-label="Open Figure 1 at full resolution">
              <img src="docs/assets/figures/Figure1_FINAL_India_AESR_WaterRegimes.webp?v=20260812c" alt="Map of India showing Karnal Haryana, Yavatmal Maharashtra and Mettur-Cauvery Tamil Nadu as three contrasting hydro-agricultural water regimes" loading="lazy">
            </a>
            <figcaption class="figure-caption">
              <span class="figure-kicker">Proposal Figure 1 · Spatial pilot context</span>
              <strong>Three contrasting hydro-agricultural water regimes.</strong> The map locates the groundwater-buffered, rainfall-dependent and surface-water-buffered proof-of-need landscapes within India’s agro-ecological framework. These sites demonstrate contrasting water-access mechanisms rather than nationally representative conditions.
            </figcaption>
          </figure>

          <figure class="research-figure">
            <a class="figure-link" href="docs/assets/figures/Figure2_FINAL_Evidence_Multipanel.webp?v=20260812c" target="_blank" rel="noopener" aria-label="Open Figure 2 at full resolution">
              <img src="docs/assets/figures/Figure2_FINAL_Evidence_Multipanel.webp?v=20260812c" alt="Six-panel preliminary evidence figure comparing groundwater, reported rainfall and surface-water variability, demand-period anomalies, seasonal fingerprints and the integrated JAL-AESR framework" loading="lazy">
            </a>
            <figcaption class="figure-caption">
              <span class="figure-kicker">Proposal Figure 2 · Preliminary evidence</span>
              <strong>Contrasting water-source behaviour during the 2021–2025 analysis window.</strong> Panels A–C show standardized monthly variability in groundwater, reported rainfall and surface-water conditions; Panel D compares relative source states during illustrative agricultural water-demand windows; Panel E shows distinct seasonal water-source fingerprints; and Panel F summarizes why an integrated national framework is required.
              <span class="figure-note">Observation coverage differs by source. Standardized anomalies are source-specific and are not a composite water-security index or a common physical stress scale.</span>
            </figcaption>
          </figure>

          <figure class="research-figure">
            <a class="figure-link" href="docs/assets/figures/Figure3_FINAL_Hero_JAL_AESR.webp?v=20260812c" target="_blank" rel="noopener" aria-label="Open Figure 3 at full resolution">
              <img src="docs/assets/figures/Figure3_FINAL_Hero_JAL_AESR.webp?v=20260812c" alt="Conceptual synthesis showing one climate forcing producing groundwater-buffered, rainfall-dependent and surface-water-buffered agricultural water pathways" loading="lazy">
            </a>
            <figcaption class="figure-caption">
              <span class="figure-kicker">Proposal Figure 3 · Conceptual synthesis</span>
              <strong>One climate forcing, three agricultural water pathways.</strong> The same climate variability can be translated differently through aquifer storage and pumping, direct seasonal rainfall, or stored and routed surface water. JAL-AESR INDIA therefore evaluates agricultural water security as a function of water source, crop timing and agro-ecological context rather than rainfall alone.
            </figcaption>
          </figure>
        </div>
'''

# Replace the old single Figure 2 under Section 03 with all three figures.
s, n3 = re.subn(
    r'\n\s*<figure class="research-figure">\s*<a[^>]*Figure2_FINAL_Evidence_Multipanel\.webp.*?</figure>\s*',
    '\n' + stack + '\n', s, count=1, flags=re.S
)

old_intro = (
    'The pilot deliberately uses simple in-situ observations rather than reproducing the full proposed national analysis. '
    'Its purpose is to demonstrate why rainfall, groundwater and surface water must be interpreted together with agricultural demand timing.'
)
new_intro = (
    'The rapid proof-of-need uses readily available in-situ observations to show why source-specific water pathways must be interpreted together with agricultural demand timing. '
    'The three figures move from spatial context, to observed source behaviour, to the integrated JAL-AESR INDIA concept.'
)
s = s.replace(old_intro, new_intro)
s = s.replace('docs/assets/css/figures.css?v=1', 'docs/assets/css/figures.css?v=3')
s = s.replace('docs/assets/css/figures.css?v=2', 'docs/assets/css/figures.css?v=3')

if not (n1 == 1 and n2 == 1 and n3 == 1):
    raise SystemExit(
        f'Unexpected current layout: section01 Figure3={n1}, section02 Figure1={n2}, section03 Figure2={n3}'
    )

path.write_text(s, encoding='utf-8')
print('Section 03 figure layout finalized successfully.')
