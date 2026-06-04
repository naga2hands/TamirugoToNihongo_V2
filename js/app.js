const navButtons = Array.from(document.querySelectorAll('.nav-item'));
const moduleTitle = document.getElementById('moduleTitle');
const moduleContent = document.getElementById('moduleContent');

const modules = {
  sounds: {
    title: 'தமிழ் எழுத்து வழி யப்பானிய அடிப்படை ஒலி ',
    path: 'pages/sounds.html',
    type: 'iframe'
  },
  mnemonics: {
    title: 'யப்பானிய கந எழுத்துரு நினைவுக்கருவி',
    path: 'pages/mnemonics.html',
    type: 'fragment',
    script: 'js/mnemonics.js'
  },
  'sound-types': {
    title: 'யப்பானிய மொழியின் மொத்த ஒலி வகைகள்',
    path: 'pages/sound-types.html',
    type: 'fragment',
    script: 'js/soundTypes.js'
  }
};

let currentModule = null;

function activateNav(moduleId) {
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.module === moduleId);
  });
}

function clearModuleScript() {
  const existing = document.getElementById('moduleScript');
  if (existing) {
    existing.remove();
  }
}

function resolveModuleUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch (error) {
    return path;
  }
}

function extractBodyContent(html) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    if (doc.body) {
      doc.body.querySelectorAll('script').forEach((script) => script.remove());
      return doc.body.innerHTML;
    }
    return html;
  } catch (error) {
    return html;
  }
}

async function fetchModuleContent(path) {
  const url = resolveModuleUrl(path);
  if (window.location.protocol === 'file:') {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    if (xhr.status === 200 || xhr.status === 0) {
      return xhr.responseText;
    }
    throw new Error(`Unable to load module via file protocol: ${xhr.status} ${xhr.statusText}`);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to load module: ${response.status}`);
  }
  return await response.text();
}

async function loadModule(moduleId) {
  const moduleKey = modules[moduleId] ? moduleId : 'sounds';
  const moduleInfo = modules[moduleKey];
  currentModule = moduleKey;
  activateNav(currentModule);
  moduleTitle.textContent = moduleInfo.title;
  moduleContent.innerHTML = '<div class="module-loading">Loading…</div>';
  clearModuleScript();

  if (moduleInfo.type === 'iframe') {
    moduleContent.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'iframe-wrapper';
    const iframe = document.createElement('iframe');
    iframe.className = 'legacy-frame';
    iframe.src = moduleInfo.path;
    iframe.title = moduleInfo.title;
    iframe.loading = 'lazy';
    iframe.setAttribute('aria-label', moduleInfo.title);
    wrapper.appendChild(iframe);
    moduleContent.appendChild(wrapper);
  } else {
    try {
      const html = await fetchModuleContent(moduleInfo.path);
      moduleContent.innerHTML = extractBodyContent(html);
      if (moduleInfo.script) {
        const script = document.createElement('script');
        script.id = 'moduleScript';
        script.src = moduleInfo.script;
        document.body.appendChild(script);
      }
    } catch (error) {
      moduleContent.innerHTML = '<div class="module-error">Unable to load module content.</div>';
      console.error(error);
    }
  }

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, '', `#${currentModule}`);
  }
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    loadModule(button.dataset.module);
  });
});

const initialModule = window.location.hash.replace('#', '') || 'sounds';
loadModule(initialModule);
