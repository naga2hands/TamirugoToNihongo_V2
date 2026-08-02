(function(){
  // Legacy Grade-based filter kept here for future re-enablement.
  /*
  const gradeFilters = document.getElementById('gradeFilters');
  const grades = ['all', '1', '2', '3', '4', '5', '6', '7'];
  let currentGrade = 'all';

  function createGradeFilters() {
    gradeFilters.innerHTML = '';
    grades.forEach(grade => {
      const label = document.createElement('label');
      label.className = 'toggle-button';
      if (grade === currentGrade) label.classList.add('active');
      label.style.display = 'inline-flex';
      label.style.alignItems = 'center';
      label.style.gap = '6px';
      label.style.cursor = 'pointer';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'grade';
      radio.value = grade;
      radio.checked = grade === currentGrade;
      radio.addEventListener('change', () => {
        currentGrade = grade;
        updateGradeFilters();
        renderGrid(filterByGrade());
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(grade === 'all' ? 'All' : 'Grade ' + grade));
      gradeFilters.appendChild(label);
    });
  }

  function updateGradeFilters() {
    gradeFilters.querySelectorAll('input[name="grade"]').forEach(r => {
      r.parentElement.classList.toggle('active', r.value === currentGrade);
    });
  }

  function filterByGrade() {
    if (currentGrade === 'all') return allKanjiData;
    return allKanjiData.filter(k => k['Grade'] && k['Grade'].trim() === currentGrade);
  }
  */

  const gradeFilters = document.getElementById('gradeFilters');
  const kanjiGrid = document.getElementById('kanjiGrid');
  const kanjiFields = document.getElementById('kanjiFields');
  const strokeImg = document.getElementById('strokePlaceholder');

  const jlptLevels = ['all', '5', '4', '3', '2', '1'];
  let currentJlpt = 'all';
  let allKanjiData = [];
  let selectedId = null;

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

  function createJlptFilters() {
    gradeFilters.innerHTML = '';
    jlptLevels.forEach(level => {
      const label = document.createElement('label');
      label.className = 'toggle-button';
      if (level === currentJlpt) label.classList.add('active');
      label.style.display = 'inline-flex';
      label.style.alignItems = 'center';
      label.style.gap = '6px';
      label.style.cursor = 'pointer';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'jlpt';
      radio.value = level;
      radio.checked = level === currentJlpt;
      radio.addEventListener('change', () => {
        currentJlpt = level;
        updateJlptFilters();
        renderGrid(filterByJlpt());
      });
      label.appendChild(radio);
      label.appendChild(document.createTextNode(level === 'all' ? 'All' : 'N' + level));
      gradeFilters.appendChild(label);
    });
  }

  function updateJlptFilters() {
    gradeFilters.querySelectorAll('input[name="jlpt"]').forEach(r => {
      r.parentElement.classList.toggle('active', r.value === currentJlpt);
    });
  }

  function filterByJlpt() {
    if (currentJlpt === 'all') return allKanjiData;
    return allKanjiData.filter(k => {
      const jlptValue = String(k['JLPT-test'] || '').trim();
      return jlptValue === currentJlpt;
    });
  }

  function loadKanji() {
    fetch('data/Kanji-Detailed.csv').then(r=>r.text()).then(text=>{
      const rows = parseCSV(text);
      if (!rows || rows.length < 2) return;
      const headers = rows[0].map(h=>h.trim());
      const data = rows.slice(1).map(r=>{
        const obj = {};
        for (let i=0;i<headers.length;i++) obj[headers[i]] = (r[i]||'').trim();
        return obj;
      });
      allKanjiData = data;
      window.__kanjiDataset = data;
      createJlptFilters();
      renderGrid(filterByJlpt());
    }).catch(console.error);
  }

  function renderGrid(data) {
    kanjiGrid.innerHTML = '';
    selectedId = null; // reset selection when grid changes
    data.forEach(entry=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kana-tile';
      btn.style.minHeight = '72px';
      btn.style.fontSize = '28px';
      btn.textContent = entry['Kanji'] || '';
      btn.dataset.id = entry['ID'];
      kanjiGrid.appendChild(btn);
      btn.addEventListener('click', ()=>{
        selectKanji(entry['ID']);
      });
    });
    // auto-load first kanji details
    if (data.length > 0) {
      selectKanji(data[0]['ID']);
    }
  }

  function selectKanji(id) {
    const dataset = window.__kanjiDataset || [];
    const entry = dataset.find(e=>e['ID'] == id);
    if (!entry) return;
    selectedId = id;
    kanjiGrid.querySelectorAll('.kana-tile').forEach(b=>{
      b.classList.toggle('active', b.dataset.id == id);
    });
    showDetails(entry);
  }

  function navigateToRadical(radicalName) {
    if (!radicalName) return;
    try {
      sessionStorage.setItem('radicalRedirect', radicalName.trim());
    } catch (error) {
      console.warn('Unable to persist radical redirect:', error);
    }
    const navButton = document.querySelector('.nav-item[data-module="radicals"]');
    if (navButton) {
      navButton.click();
      return;
    }
    if (window.loadModule) {
      window.loadModule('radicals');
    }
  }

  function showDetails(entry) {
    const fields = [
//      ['ID','ID'],
//      ['Kanji','Kanji'],
//      ['Name of Radical','Name of Radical'],
      ['Reading within Joyo','Reading within Joyo'],
      ['Tamil Meaning','Tamil Meaning'],
      ['English Meaning','English Meaning'],
      ['Strokes','Strokes'],
      ['Grade','Grade'],
      ['JLPT-test','JLPT-test'],
      ['Year of Inclusion','Year of Inclusion'],
      ['Kanji Classification','Kanji Classification'],
      ['Radical','Radical']
        ];
    kanjiFields.innerHTML = '';
    fields.forEach(([label,key])=>{
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '8px';
      row.style.alignItems = 'center';

      const labelEl = document.createElement('strong');
      labelEl.style.width = '170px';
      labelEl.textContent = label + ':';

      const valueWrap = document.createElement('div');
      valueWrap.style.flex = '1';
      valueWrap.style.wordWrap = 'break-word';

      const rawValue = entry[key] || '';
      if (key === 'Radical' && rawValue) {
        const radicalBtn = document.createElement('button');
        radicalBtn.type = 'button';
        radicalBtn.textContent = rawValue;
        radicalBtn.style.background = 'transparent';
        radicalBtn.style.border = 'none';
        radicalBtn.style.padding = '0';
        radicalBtn.style.color = '#1d4ed8';
        radicalBtn.style.cursor = 'pointer';
        radicalBtn.style.textDecoration = 'none';
        radicalBtn.style.fontWeight = '600';
        radicalBtn.style.textAlign = 'left';
        radicalBtn.addEventListener('click', () => navigateToRadical(rawValue));
        valueWrap.appendChild(radicalBtn);
      } else {
        valueWrap.textContent = rawValue;
      }

      row.appendChild(labelEl);
      row.appendChild(valueWrap);
      kanjiFields.appendChild(row);
    });
    // load stroke order image from CSV column
    const imagePath = entry['Stroke Order Image'] ? `assets/kanji-stroke-order/${entry['Stroke Order Image']}` : 'assets/stroke-order/placeholder.png';
    if (strokeImg) strokeImg.src = imagePath;
  }

  loadKanji();
})();
