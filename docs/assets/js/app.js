(() => {
  const qs = (s, c=document) => c.querySelector(s);
  const qsa = (s, c=document) => [...c.querySelectorAll(s)];

  // Mobile navigation + scroll spy
  const navToggle = qs('.nav-toggle');
  const siteNav = qs('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    qsa('.site-nav a').forEach(a => a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }
  const sections = qsa('main section[id]');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      qsa('.site-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
    }, {rootMargin:'-28% 0px -62% 0px', threshold:[0.02,.15,.3]});
    sections.forEach(s => spy.observe(s));
  }

  // Leaflet map
  if (!window.L || !qs('#map')) return;
  const map = L.map('map', {zoomControl:true, preferCanvas:true}).setView([22.8, 79.1], 5);
  const light = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:18,
    attribution:'&copy; OpenStreetMap contributors'
  }).addTo(map);
  const imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom:18,
    attribution:'Tiles &copy; Esri'
  });

  const stateLayer = L.geoJSON(null, {
    style:{color:'#75878e', weight:.7, fillColor:'#f7f9f9', fillOpacity:.12, opacity:.75},
    onEachFeature:(f,l)=>{
      const p=f.properties||{};
      const name=p.shapeName||p.ST_NM||p.state||p.NAME_1||p.name||'State / UT';
      l.bindTooltip(String(name), {sticky:true, direction:'auto'});
    }
  }).addTo(map);

  const climateColors = {
    'hyper-arid':'#d8a75d','arid':'#e3bc73','semi-arid':'#d6c47c','dry semi-arid':'#d8c284',
    'dry subhumid':'#a9c77e','subhumid':'#8fbe83','moist subhumid':'#75b88e','humid':'#5aa59a',
    'perhumid':'#3f8f93','cold arid':'#b7a2c6','cold semi-arid':'#a995bd','default':'#8eb5b8'
  };
  const climateColor = raw => {
    const s=String(raw||'').trim().toLowerCase();
    for (const [k,v] of Object.entries(climateColors)) if (k!=='default' && s.includes(k)) return v;
    return climateColors.default;
  };
  const pick = (p, keys, fallback='—') => {
    for (const k of keys) if (p && p[k] !== undefined && p[k] !== null && String(p[k]).trim() !== '') return p[k];
    return fallback;
  };
  const esc = v => String(v ?? '—').replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m]));
  const aesrId = p => String(pick(p,['aesr_code','AESR_CODE','AESR_UID','FEATURE_ID'],'AESR'));
  let aesrById = new Map();
  let aesrLayerById = new Map();

  const updateAESRDetail = p => {
    const el=qs('#aesrDetail'); if(!el) return;
    const fields = [
      ['AESR', pick(p,['aesr_code','AESR_CODE','AESR_UID'])],
      ['AER', pick(p,['aer_code','AER_CODE'])],
      ['Subregion', pick(p,['subregion','SUBREGION','AESR_NAME'])],
      ['Climate', pick(p,['CLIM_STD','climate','CLIMATE'])],
      ['Soil', pick(p,['SOIL_GRP','soil_group','SOIL'])],
      ['LGP', pick(p,['lgp_ref','LGP_REF','LGP_ORDER'])],
      ['AWC', pick(p,['AWC_REF','awc_ref'])],
      ['Area', (()=>{const a=pick(p,['AREA_KM2','area_km2'],'—'); return a==='—'?a:`${a} km²`;})()]
    ];
    el.innerHTML = fields.map(([k,v])=>`<div class="kv"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('') +
      `<ul class="assessment-list"><li>Rainfall reliability and seasonal timing</li><li>Surface-water persistence and storage</li><li>Groundwater stress, recovery and recharge</li><li>Irrigation-source dependence</li><li>Crop-stage water demand and sufficiency</li><li>NISAR / IRS surface-moisture response</li></ul>`;
  };

  const aesrLayer = L.geoJSON(null, {
    style:f=>{
      const p=f.properties||{};
      const c=climateColor(pick(p,['CLIM_STD','climate','CLIMATE'],''));
      return {color:'#4d6a71',weight:.8,fillColor:c,fillOpacity:.40,opacity:.78};
    },
    onEachFeature:(f,l)=>{
      const p=f.properties||{};
      const id=aesrId(p);
      aesrById.set(id,p); aesrLayerById.set(id,l);
      const climate=pick(p,['CLIM_STD','climate','CLIMATE']);
      const sub=pick(p,['subregion','SUBREGION','AESR_NAME']);
      l.bindTooltip(`<strong>${esc(id)}</strong><br>${esc(sub)}<br><span>${esc(climate)}</span>`, {sticky:true});
      l.bindPopup(`<div class="popup-title">AESR ${esc(id)}</div><div class="popup-table"><div><b>Subregion</b><span>${esc(sub)}</span></div><div><b>Climate</b><span>${esc(climate)}</span></div><div><b>Soil</b><span>${esc(pick(p,['SOIL_GRP','soil_group','SOIL']))}</span></div><div><b>LGP</b><span>${esc(pick(p,['lgp_ref','LGP_REF','LGP_ORDER']))}</span></div><div><b>AWC</b><span>${esc(pick(p,['AWC_REF','awc_ref']))}</span></div></div>`);
      l.on({
        mouseover:e=>e.target.setStyle({weight:2,fillOpacity:.58}),
        mouseout:e=>aesrLayer.resetStyle(e.target),
        click:()=>{ updateAESRDetail(p); const sel=qs('#aesrSelect'); if(sel) sel.value=id; }
      });
    }
  }).addTo(map);

  const pilotColors = {'P1':'#315f8c','P2':'#d98b2b','P3':'#16877e'};
  const pilotLayers = new Map();
  const pilotLayer = L.geoJSON(null, {
    pointToLayer:(f,latlng)=>L.circleMarker(latlng,{radius:9,color:'#fff',weight:2.4,fillColor:pilotColors[f.properties?.PILOT]||'#145c67',fillOpacity:1}),
    onEachFeature:(f,l)=>{
      const p=f.properties||{};
      const pilot=pick(p,['PILOT','pilot_id'],'Pilot');
      pilotLayers.set(String(pilot),l);
      const popup=`<div class="popup-title">${esc(pilot)} · ${esc(pick(p,['ARCHETYPE','archetype']))}</div><div class="popup-table"><div><b>Site</b><span>${esc(pick(p,['SITE','site','STATION']))}</span></div><div><b>State</b><span>${esc(pick(p,['STATE','state']))}</span></div><div><b>Station</b><span>${esc(pick(p,['STATION','station']))}</span></div><div><b>Evidence</b><span>${esc(pick(p,['VARIABLE','variable','EVIDENCE']))}</span></div><div><b>Window</b><span>${esc(pick(p,['OBSERVATION_WINDOW','observation_window','START_DATE']))}</span></div><div><b>Records</b><span>${esc(pick(p,['N_RECORDS','records']))}</span></div></div>`;
      l.bindPopup(popup);
      l.bindTooltip(`${esc(pilot)} · ${esc(pick(p,['ARCHETYPE','archetype']))}`,{direction:'top'});
    }
  }).addTo(map);

  L.control.layers({'Scientific light':light,'Satellite imagery':imagery},{'Agro-ecological subregions':aesrLayer,'State / UT boundaries':stateLayer,'Pilot water regimes':pilotLayer},{collapsed:false}).addTo(map);

  const legend = L.control({position:'bottomright'});
  legend.onAdd=()=>{
    const d=L.DomUtil.create('div','legend');
    d.innerHTML='<div class="legend-title">AESR climate context</div>'+
      [['Hyper-/arid','#d8a75d'],['Semi-arid','#d6c47c'],['Subhumid','#8fbe83'],['Humid','#5aa59a'],['Perhumid','#3f8f93'],['Other / mixed','#8eb5b8']].map(x=>`<div class="legend-row"><span class="swatch" style="background:${x[1]}"></span>${x[0]}</div>`).join('')+
      '<div class="legend-title" style="margin-top:7px">Pilot regimes</div>'+
      `<div class="legend-row"><span class="circle-swatch" style="background:${pilotColors.P1}"></span>Groundwater-buffered</div><div class="legend-row"><span class="circle-swatch" style="background:${pilotColors.P2}"></span>Rainfall-dependent</div><div class="legend-row"><span class="circle-swatch" style="background:${pilotColors.P3}"></span>Surface-water-buffered</div>`;
    return d;
  };
  legend.addTo(map);

  const setStatus = (id,text,state='ready') => { const s=qs(`#${id}Status`), d=qs(`#${id}Dot`); if(s)s.textContent=text; if(d)d.className=`dot ${state}`; };
  const loadJSON = async (url) => { const r=await fetch(url,{cache:'no-store'}); if(!r.ok) throw new Error(`${r.status} ${r.statusText}`); return r.json(); };

  Promise.allSettled([
    loadJSON('data/india_states_web.geojson').then(g=>{stateLayer.addData(g); setStatus('state',`${g.features?.length||0} state/UT features loaded`); return g;}),
    loadJSON('data/india_aesr_60_web.geojson').then(g=>{
      aesrLayer.addData(g); setStatus('aesr',`${g.features?.length||0} AESR features loaded`);
      const select=qs('#aesrSelect');
      if(select){
        const opts=[...aesrById.entries()].sort((a,b)=>a[0].localeCompare(b[0],undefined,{numeric:true}));
        select.innerHTML='<option value="">Select an AESR…</option>'+opts.map(([id,p])=>`<option value="${esc(id)}">${esc(id)} · ${esc(pick(p,['subregion','SUBREGION','AESR_NAME'],'Agro-ecological subregion'))}</option>`).join('');
      }
      return g;
    }),
    loadJSON('data/pilot_sites.geojson').then(g=>{pilotLayer.addData(g); setStatus('pilot',`${g.features?.length||0} pilot sites loaded`); return g;})
  ]).then(results=>{
    if(results[0].status==='rejected') setStatus('state','State/UT layer unavailable','error');
    if(results[1].status==='rejected') setStatus('aesr','AESR layer unavailable','error');
    if(results[2].status==='rejected') setStatus('pilot','Pilot layer unavailable','error');
    const bounds=L.featureGroup([stateLayer,aesrLayer]).getBounds(); if(bounds.isValid()) map.fitBounds(bounds.pad(.02));
  });

  qs('#aesrSelect')?.addEventListener('change', e=>{
    const id=e.target.value; if(!id) return;
    const p=aesrById.get(id), layer=aesrLayerById.get(id); if(!p||!layer)return;
    updateAESRDetail(p); map.fitBounds(layer.getBounds(),{padding:[30,30],maxZoom:7}); layer.openPopup();
  });
  const zoomPilot = id => { const l=pilotLayers.get(id); if(!l)return; map.setView(l.getLatLng(),8,{animate:true}); l.openPopup(); };
  qsa('[data-pilot]').forEach(b=>b.addEventListener('click',()=>zoomPilot(b.dataset.pilot)));
  qs('#resetMap')?.addEventListener('click',()=>{const b=L.featureGroup([stateLayer,aesrLayer]).getBounds(); if(b.isValid())map.fitBounds(b.pad(.02));});

  // Live numbers sourced from pilot_sites.geojson for summary cards when available.
  loadJSON('data/pilot_sites.geojson').then(g=>{
    (g.features||[]).forEach(f=>{
      const p=f.properties||{}; const id=pick(p,['PILOT','pilot_id'],'');
      const el=qs(`[data-records="${id}"]`); if(el) el.textContent=Number(pick(p,['N_RECORDS','records'],0)).toLocaleString();
      const st=qs(`[data-station="${id}"]`); if(st) st.textContent=pick(p,['STATION','station'],'—');
    });
  }).catch(()=>{});
})();
