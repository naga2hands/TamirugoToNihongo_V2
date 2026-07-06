(function () {
  const hiraganaGrid = document.getElementById('hiraganaBirthGrid');
  const katakanaGrid = document.getElementById('katakanaBirthGrid');
  const kanaBirthIntro = document.getElementById('kanaBirthIntro');
  const kanaBirthOriginTitle = document.getElementById('kanaBirthOriginTitle');
  const kanaBirthOriginValue = document.getElementById('kanaBirthOriginValue');

  const kanaList = (window.kanaBirthData || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  let selectedKanaId = kanaList[0]?.id || null;

  function resolveAssetPath(rawPath) {
    if (!rawPath) {
      return '';
    }
    const normalizedPath = rawPath.replace(/\\/g, '/');
    const isPageInPagesFolder = window.location.pathname.includes('/pages/');
    return isPageInPagesFolder ? `../${normalizedPath}` : normalizedPath;
  }

  function createTile(entry, type) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'kana-birth-tile';
    button.dataset.id = entry.id;
    button.dataset.type = type;

    const imagePath = type === 'hiragana' ? entry.h_pic_path : entry.k_pic_path;
    const label = type === 'hiragana' ? entry.hiragana || entry.h_origin : entry.katakana || entry.k_origin;
    const isSelected = selectedKanaId === entry.id;

    if (isSelected) {
      button.classList.add('selected');
    }

    button.innerHTML = `
      <img src="${resolveAssetPath(imagePath)}" alt="${label}" />
    `;

    button.addEventListener('click', () => {
      selectedKanaId = entry.id;
      renderGrids();
      updateOriginPanel();
    });

    return button;
  }

  function renderGrids() {
    hiraganaGrid.innerHTML = '';
    katakanaGrid.innerHTML = '';

    kanaList.forEach((entry) => {
      hiraganaGrid.appendChild(createTile(entry, 'hiragana'));
      katakanaGrid.appendChild(createTile(entry, 'katakana'));
    });
  }

  function updateOriginPanel() {
    const entry = kanaList.find((item) => item.id === selectedKanaId) || kanaList[0];
    if (!entry) {
      kanaBirthOriginTitle.textContent = 'ஹிரகந & கதகந தோற்றம்';
      kanaBirthOriginValue.textContent = '—';
      return;
    }

    kanaBirthOriginTitle.textContent = 'ஹிரகந & கதகந தோற்றம்';
    const hiraOrigin = entry.h_origin;
    const kataOrigin = entry.k_origin;
    const hiraKana = entry.hiragana;
    const kataKana = entry.katakana;
    
    let displayText = '';
    if (hiraOrigin && hiraKana) {
      displayText += `${hiraOrigin} -> ${hiraKana}`;
    }
    if (kataOrigin && kataKana) {
      if (displayText) {
        displayText += `<br>${kataOrigin} -> ${kataKana}`;
      } else {
        displayText = `${kataOrigin} -> ${kataKana}`;
      }
    }
    
    kanaBirthOriginValue.innerHTML = displayText || '—';
  }

  renderGrids();
  updateOriginPanel();
})();