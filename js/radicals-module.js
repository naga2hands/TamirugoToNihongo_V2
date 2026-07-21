(function(){
  const strokeFilters = document.getElementById('strokeFilters');
  const radicalGrid = document.getElementById('radicalGrid');
  const radicalFields = document.getElementById('radicalFields');
  const relatedKanjiEl = document.getElementById('relatedKanji');
  const relatedKanjiSection = document.getElementById('relatedKanjiSection');

  const strokeRanges = [
    { label: 'All', range: [1, 17] },
    { label: '1-2 strokes', range: [1, 2] },
    { label: '3 strokes', range: [3, 3] },
    { label: '4 strokes', range: [4, 4] },
    { label: '5 strokes', range: [5, 5] },
    { label: '6 strokes', range: [6, 6] },
    { label: '7 strokes', range: [7, 7] },
    { label: '8-10 strokes', range: [8, 10] },
    { label: '11-17 strokes', range: [11, 17] }
  ];

  let currentStrokeRange = [1, 17];
  let allRadicalData = [];
  let allKanjiData = [];
  let selectedRadicalId = null;
  let selectedKanjiId = null;

  function parseCSV(text) {
    const rows = [];
    let cur = '';
    let row = [];
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (inQuotes && text[i+1] === '"') { cur += '"'; i++; continue; }
        inQuotes = !inQuotes; continue;
      }
      if (ch === ',' && !inQuotes) { row.push(cur); cur = ''; continue; }
      if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (cur !== '' || row.length) { row.push(cur); cur = ''; rows.push(row); row = []; }
        continue;
      }
      cur += ch;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }

  function createStrokeFilters() {
    strokeFilters.innerHTML = '';
    strokeRanges.forEach(item => {
      const label = document.createElement('label');
      label.className = 'toggle-button';
      if (item.range[0] === 1 && item.range[1] === 17) label.classList.add('active');
      label.style.display = 'inline-flex';
      label.style.alignItems = 'center';
      label.style.gap = '6px';
      label.style.cursor = 'pointer';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'stroke';
      radio.value = item.range.join('-');
      radio.checked = item.range[0] === 1 && item.range[1] === 17;
      radio.addEventListener('change', () => {
        currentStrokeRange = item.range;
        updateStrokeFilters();
        renderRadicals(filterByStroke(allRadicalData), allKanjiData);
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(item.label));
      strokeFilters.appendChild(label);
    });
  }

  function updateStrokeFilters() {
    strokeFilters.querySelectorAll('input[name="stroke"]').forEach(r => {
      const range = r.value.split('-').map(Number);
      r.parentElement.classList.toggle('active', range[0] === currentStrokeRange[0] && range[1] === currentStrokeRange[1]);
    });
  }

  function filterByStroke(radicals) {
    return radicals.filter(r => {
      const sc = parseInt(r['Stroke count']) || 0;
      return sc >= currentStrokeRange[0] && sc <= currentStrokeRange[1];
    });
  }

  function loadData() {
    Promise.all([
      fetch('data/Kanji-Radicals.csv').then(r=>r.text()),
      fetch('data/Kanji-Detailed.csv').then(r=>r.text())
    ]).then(([radText,kanjiText])=>{
      const rRows = parseCSV(radText);
      const kRows = parseCSV(kanjiText);
      const rHdr = rRows[0].map(h=>h.trim());
      const kHdr = kRows[0].map(h=>h.trim());
      const radicals = rRows.slice(1).map(r=>{ const o={}; for(let i=0;i<rHdr.length;i++) o[rHdr[i]]= (r[i]||'').trim(); return o; });
      const kanji = kRows.slice(1).map(r=>{ const o={}; for(let i=0;i<kHdr.length;i++) o[kHdr[i]]= (r[i]||'').trim(); return o; });
      allRadicalData = radicals;
      allKanjiData = kanji;
      window.__kanjiDataset = kanji;
      createStrokeFilters();
      renderRadicals(filterByStroke(radicals), kanji);
    }).catch(console.error);
  }

  function renderRadicals(radicals, kanji) {
    radicalGrid.innerHTML = '';
    selectedRadicalId = null; // reset selection when grid changes
    radicals.forEach(r=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kana-tile';
      btn.style.minHeight = '72px';
      btn.style.fontSize = '24px';
      btn.style.display = 'flex';
      btn.style.flexDirection = 'column';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'space-between';
      btn.style.padding = '6px';
      btn.dataset.id = r['ID'];
      const mainText = document.createElement('div');
      mainText.style.fontSize = '26px';
      mainText.textContent = r['Radical'] || '';
      btn.appendChild(mainText);
      const variant = r['Variants'] || '';
      if (variant) {
        const varText = document.createElement('div');
        varText.style.fontSize = '11px';
        varText.style.color = '#6b7280';
        varText.style.textAlign = 'center';
        varText.textContent = variant;
        btn.appendChild(varText);
      }
      btn.addEventListener('click', ()=> showRadical(r, kanji));
      radicalGrid.appendChild(btn);
    });
    // auto-load first radical details
    if (radicals.length > 0) {
      showRadical(radicals[0], kanji);
    }
  }

  function showRadical(r, kanji) {
    selectedRadicalId = r['ID'];
    selectedKanjiId = null; // reset kanji selection when radical changes
    radicalGrid.querySelectorAll('.kana-tile').forEach(b=>{
      b.classList.toggle('active', b.dataset.id === r['ID']);
    });
    radicalFields.innerHTML = '';
    const fields = [
      ['Radical','Radical'],
      ['Variants','Variants'],
      ['Tamil Meaning','Tamil Meaning'],
      ['Meaning and reading','Meaning and reading'],
//      ['Frequency','Frequency'],
//      ['Jōyō freq','Jōyō freq'],
      ['Examples','Examples'],
//      ['Group','Group'],
      ['Stroke count','Stroke count']
    ];
    fields.forEach(([label,key])=>{
      const row = document.createElement('div');
      row.style.display='flex';
      row.style.gap='8px';
      row.style.alignItems='flex-start';
      row.innerHTML = `<strong style="width:140px;flex-shrink:0;">${label}:</strong><div style="flex:1;word-wrap:break-word;">${r[key]||''}</div>`;
      radicalFields.appendChild(row);
    });

    // related kanji
    const related = (kanji||[]).filter(k=>k['Radical'] && k['Radical'] === r['Radical']);
    relatedKanjiEl.innerHTML = '';
    related.slice(0,60).forEach(k=>{
      const b = document.createElement('button');
      b.type='button';
      b.className='kana-tile';
      b.style.minHeight='48px';
      b.style.fontSize='22px';
      b.textContent = k['Kanji']||'';
      b.dataset.kanjiId = k['ID'];
      b.addEventListener('click', ()=> selectKanjiBrief(k));
      relatedKanjiEl.appendChild(b);
    });
    relatedKanjiSection.style.display = related.length > 0 ? 'block' : 'none';
    // auto-load first related kanji details
    if (related.length > 0) {
      selectKanjiBrief(related[0]);
    }
  }

  function selectKanjiBrief(k) {
    selectedKanjiId = k['ID'];
    // highlight the selected kanji tile
    relatedKanjiEl.querySelectorAll('.kana-tile').forEach(b=>{
      b.classList.toggle('active', b.dataset.kanjiId === k['ID']);
    });
    showKanjiBrief(k);
  }

  function showKanjiBrief(k) {
    const detailContent = document.getElementById('kanjiDetailContent');
    const html = `
      <div style="font-size:32px;font-weight:700;text-align:center;margin-bottom:12px;">${k['Kanji']||''}</div>
      <div style="display:grid;grid-template-columns:1fr;gap:8px;font-size:0.95rem;">
        <div><strong>Reading (Jōyō):</strong> ${k['Reading within Joyo']||''}</div>
        <div><strong>English:</strong> ${k['English Meaning']||''}</div>
        <div><strong>Tamil:</strong> ${k['Tamil Meaning']||''}</div>
        <div><strong>Strokes:</strong> ${k['Strokes']||''}</div>
      </div>
    `;
    detailContent.innerHTML = html;
  }

  loadData();
})();
