(function() {
  const mnemonicGrid = document.getElementById('mnemonicGrid');
  const scriptButtons = Array.from(document.querySelectorAll('.script-toggle button'));
  const mnemonicImage = document.getElementById('mnemonicImage');
  const mnemonicText = document.getElementById('mnemonicText');
  const strokeGif = document.getElementById('strokeGif');

  let activeScript = 'hiragana';
  const baseKana = (window.kanaData || []).filter((item) => item.type === 'kihonon');
  let selectedKanaId = null;
  const kanaList = baseKana.slice().sort((a, b) => a.order - b.order);
  // Orders to remove / gray out (change these numbers as needed)
  const removedOrders = new Set([37,39,47,48,49,51,52,54,55]);
  // Mode: 'gray' = visually disabled; 'placeholder' = empty cell kept in grid
  const removalMode = 'placeholder';

  function renderKanaGrid() {
  mnemonicGrid.innerHTML = '';
  kanaList.forEach((kana) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'kana-tile';
    tile.dataset.id = kana.id;

    const isRemoved = removedOrders.has(kana.order);
    if (isRemoved && removalMode === 'placeholder') {
      // keep an empty placeholder so grid positions don't shift
      tile.classList.add('placeholder');
      tile.setAttribute('aria-hidden', 'true');
      tile.disabled = true;
      // append empty content to preserve size
      tile.innerHTML = '<span class="tile-kana">&nbsp;</span><span class="tile-sub">&nbsp;</span>';
    } else {
      tile.innerHTML = `
      <span class="tile-kana">${kana[activeScript] || kana.hiragana}</span>
      <span class="tile-sub">${kana.tamil}</span>
    `;
      if (isRemoved && removalMode === 'gray') {
        tile.classList.add('disabled');
        tile.setAttribute('aria-disabled', 'true');
        tile.disabled = true;
      }
    }

    if (kana.id === selectedKanaId) {
      tile.classList.add('active');
    }
    tile.addEventListener('click', () => selectKana(kana.id));
    mnemonicGrid.appendChild(tile);
  });
}

function updateToggleButtons() {
  scriptButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.script === activeScript);
  });
}

function resolveStrokeGif(entry) {
  if (!entry) return '';
  const v = entry.variants && entry.variants.kihonon;
  if (activeScript === 'katakana') {
    return (v && v.katakana_strokeGif) || '';
  }
  return (v && v.hiragana_strokeGif) || '';
}

function updateDetails() {
  const entry = kanaList.find((item) => item.id === selectedKanaId);
  if (!entry) {
    // Show a default mnemonic image and stroke GIF when nothing is selected
    if (activeScript === 'katakana') {
      mnemonicImage.src = 'assets/images/a2.png';
      strokeGif.src = 'assets/stroke-order/a2.gif';
    } else {
      mnemonicImage.src = 'assets/images/a.png';
      strokeGif.src = 'assets/stroke-order/a.gif';
    }
    mnemonicImage.alt = 'Default mnemonic illustration';
    mnemonicText.innerHTML = 'Select a kana to see its mnemonic and stroke order.';
    strokeGif.alt = 'Default stroke order animation';
    return;
  }

  // Resolve mnemonic image and text per active script
  const v = entry.variants && entry.variants.kihonon;
  if (activeScript === 'katakana') {
    mnemonicImage.src = (v && v.katakana_mnemonicImage) || '';
    mnemonicText.innerHTML = (v && v.katakana_mnemonicText) || '';
  } else {
    mnemonicImage.src = (v && v.hiragana_mnemonicImage) || '';
    mnemonicText.innerHTML = (v && v.hiragana_mnemonicText) || '';
  }
  mnemonicImage.alt = `Mnemonic for ${entry.hiragana}`;
  strokeGif.src = resolveStrokeGif(entry);
  strokeGif.alt = `Stroke order for ${entry.hiragana}`;
}

function playSelectedAudio() {
  const entry = kanaList.find((item) => item.id === selectedKanaId);
  if (!entry || !entry.audio) {
    return;
  }
  const player = new Audio(entry.audio);
  player.play().catch(() => {});
}

function selectKana(id) {
  selectedKanaId = id;
  renderKanaGrid();
  updateDetails();
  playSelectedAudio();
}

function setActiveScript(script) {
  activeScript = script;
  updateToggleButtons();
  renderKanaGrid();
  updateDetails();
}

scriptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveScript(button.dataset.script);
  });
});

updateToggleButtons();
renderKanaGrid();
updateDetails();
})();
