(function() {
  const soundTypeTabs = document.getElementById('soundTypeTabs');
  const hiraganaGrid = document.getElementById('hiraganaGrid');
  const katakanaGrid = document.getElementById('katakanaGrid');
  const soundTypeTitle = document.getElementById('soundTypeTitle');
  const soundTypeDescription = document.getElementById('soundTypeDescription');

  const soundDefs = window.soundTypeDefinitions || [];
  const kanaList = (window.kanaData || []).slice().sort((a, b) => a.order - b.order);
  let currentTab = soundDefs[0]?.id || 'kihonon';
  let selectedKanaId = null;
  // Orders to remove / gray out (keep in sync with mnemonics.js)
  const removedOrders = new Set([]);
  const removalMode = 'placeholder'; // 'gray' or 'placeholder'

  function getVariant(entry, tabId) {
  if (tabId === 'kihonon') {
    return entry.variants.kihonon;
  }
  if (tabId === 'dakuon') {
    return entry.variants.dakuon;
  }
  if (tabId === 'handakuon') {
    return entry.variants.handakuon;
  }
  if (tabId === 'chouon') {
    return entry.variants.chouon;
  }
  if (tabId === 'sokuon') {
    return entry.variants.sokuon;
  }
  if (tabId === 'gairaion') {
    return entry.variants.extended;
  }
  if (['youon1', 'youon2', 'youon3'].includes(tabId)) {
    const group = tabId === 'youon1' ? 'kihonon' : tabId === 'youon2' ? 'dakuon' : 'handakuon';
    return entry.variants.youon.find((item) => item.group === group) || null;
  }
  return null;
}

function createTabButton(def) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'tab-button';
  button.dataset.tab = def.id;
  button.textContent = def.label;
  button.addEventListener('click', () => selectTab(def.id));
  if (def.id === currentTab) {
    button.classList.add('active');
  }
  return button;
}

function renderTabs() {
  soundTypeTabs.innerHTML = '';
  soundDefs.forEach((def) => {
    soundTypeTabs.appendChild(createTabButton(def));
  });
}

function createGridCell(entry, variant, type) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sound-cell';
  button.dataset.id = entry.id;

  const isRemoved = removedOrders.has(entry.order);
  if (isRemoved) {
    if (removalMode === 'placeholder') {
      button.classList.add('placeholder');
      button.disabled = true;
      button.setAttribute('aria-hidden', 'true');
      button.innerHTML = `<span class="tile-kana">&nbsp;</span>`;
      return button;
    }
    if (removalMode === 'gray') {
      button.classList.add('disabled');
      button.disabled = true;
      button.innerHTML = `<span class="tile-kana">${variant ? variant[type] : '—'}</span>`;
      return button;
    }
  }

  if (!variant) {
    button.classList.add('disabled');
    button.innerHTML = `<span class="tile-kana">—</span>`;
    button.disabled = true;
    return button;
  }

  button.innerHTML = `
    <span class="tile-kana">${variant[type]}</span>
    <span class="tile-sub">${variant.tamil || entry.tamil}</span>
  `;

  if (selectedKanaId === entry.id) {
    button.classList.add('selected');
  }

  button.addEventListener('click', () => {
    selectKana(entry.id);
  });
  return button;
}

function renderGrids() {
  hiraganaGrid.innerHTML = '';
  katakanaGrid.innerHTML = '';

  kanaList.forEach((entry) => {
    const variant = getVariant(entry, currentTab);
    const hiraCell = createGridCell(entry, variant, 'hiragana');
    const kataCell = createGridCell(entry, variant, 'katakana');
    hiraganaGrid.appendChild(hiraCell);
    katakanaGrid.appendChild(kataCell);
  });
}

function selectKana(id) {
  const entry = kanaList.find((item) => item.id === id);
  const variant = getVariant(entry, currentTab);
  if (!entry || !variant) {
    return;
  }
  selectedKanaId = id;
  renderGrids();
  playAudio(variant.audio);
}

function playAudio(source) {
  if (!source) {
    return;
  }
  const player = new Audio(source);
  player.play().catch(() => {});
}

function updateSoundPanel() {
  const def = soundDefs.find((item) => item.id === currentTab);
  soundTypeTitle.innerHTML = def?.label || 'Sound category';
  soundTypeDescription.innerHTML = def?.description || '';
}

function selectTab(tabId) {
  currentTab = tabId;
  selectedKanaId = null;
  renderTabs();
  renderGrids();
  updateSoundPanel();
}

renderTabs();
updateSoundPanel();
renderGrids();
})();
