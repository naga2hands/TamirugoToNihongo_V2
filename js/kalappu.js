const tileByScript = {
  kanji: 'kanjiSection',
  hiragana: 'hiraganaSection',
  katakana: 'katakanaSection'
};

function clearHighlights() {
  document.querySelectorAll('.script-tile').forEach((tile) => tile.classList.remove('active'));
  document.querySelectorAll('.script-legend-item').forEach((button) => button.classList.remove('active'));
  document.querySelectorAll('.script-highlight').forEach((span) => span.classList.remove('is-active'));
}

function setActiveScript(scriptKey, options = {}) {
  const tile = document.getElementById(tileByScript[scriptKey]);
  const legendButton = document.querySelector(`.script-legend-item[data-script="${scriptKey}"]`);

  clearHighlights();

  if (legendButton) legendButton.classList.add('active');
  if (tile) {
    tile.classList.add('active');
    if (options.scrollIntoView !== false) {
      tile.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  document.querySelectorAll(`.script-highlight[data-script="${scriptKey}"]`).forEach((span) => {
    span.classList.add('is-active');
  });
}

function detectScript(char) {
  if (char === 'ー') return 'katakana';
  if (/\p{Script=Han}/u.test(char)) return 'kanji';
  if (/\p{Script=Hiragana}/u.test(char)) return 'hiragana';
  if (/\p{Script=Katakana}/u.test(char)) return 'katakana';
  return null;
}

function wrapScriptCharacters(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const parent = node.parentNode;
    if (!parent || parent.closest('.script-highlight')) return;

    const text = node.nodeValue;
    const fragment = document.createDocumentFragment();
    let changed = false;

    Array.from(text).forEach((char) => {
      const scriptType = detectScript(char);
      if (scriptType) {
        const span = document.createElement('span');
        span.className = `script-highlight ${scriptType}`;
        span.dataset.script = scriptType;
        span.textContent = char;
        fragment.appendChild(span);
        changed = true;
      } else {
        fragment.appendChild(document.createTextNode(char));
      }
    });

    if (changed) {
      parent.replaceChild(fragment, node);
    }
  });
}

function attachScriptInteractions() {
  const paragraph = document.getElementById('sampleParagraph');
  if (paragraph) {
    wrapScriptCharacters(paragraph);

    paragraph.querySelectorAll('.script-highlight').forEach((span) => {
      span.addEventListener('click', (event) => {
        event.stopPropagation();
        setActiveScript(span.dataset.script);
      });
    });
  }

  document.querySelectorAll('.script-legend-item').forEach((button) => {
    button.addEventListener('click', () => setActiveScript(button.dataset.script));
  });

  document.querySelectorAll('.script-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const scriptKey = tile.dataset.script;
      if (scriptKey) setActiveScript(scriptKey);
    });
  });

  setActiveScript('kanji', { scrollIntoView: false });
}

function initKalappuModule() {
  attachScriptInteractions();
  protectImages();
}

function protectImages() {
  document.querySelectorAll('.img-protect').forEach((container) => {
    container.addEventListener('contextmenu', (event) => event.preventDefault());
    container.addEventListener('dragstart', (event) => event.preventDefault());
    container.style.userSelect = 'none';
    container.style.position = 'relative';
    const blocker = document.createElement('div');
    blocker.style.position = 'absolute';
    blocker.style.left = '0';
    blocker.style.top = '0';
    blocker.style.right = '0';
    blocker.style.bottom = '0';
    blocker.style.zIndex = '2';
    blocker.style.background = 'transparent';
    blocker.style.pointerEvents = 'auto';
    blocker.addEventListener('contextmenu', (event) => event.preventDefault());
    blocker.addEventListener('mousedown', (event) => {
      if (event.button === 2) event.preventDefault();
    });
    container.appendChild(blocker);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initKalappuModule);
} else {
  initKalappuModule();
}

window.addEventListener('module:content-loaded', (event) => {
  if (event.detail === 'kalappu') {
    initKalappuModule();
  }
});
