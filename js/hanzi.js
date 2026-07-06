function initHanziPie(){
  const canvas = document.getElementById('wordPie');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [
    {
      key: 'shokei',
      label: '象形文字',
      value: 5,
      chartValue: 7,
      color: '#4f46e5',
      samples: [
        '山 — மலை',
        '人 — மனிதன்',
        '木 — மரம்'
      ],
      detail: 'உருவக் குறியீடு'
    },
    {
      key: 'shiji',
      label: '指事文字',
      value: 3,
      chartValue: 4,
      color: '#10b981',
      samples: [
        '上 — மேலே',
        '下 — கீழே',
        '中 — நடு'
      ],
      detail: 'சிந்தனைக் குறியீடு'
    },
    {
      key: 'kaii',
      label: '会意文字',
      value: 10,
      chartValue: 9,
      color: '#f59e0b',
      samples: [
        '日 + 月 = 明',
        '木 + 木 + 木 = 森',
        '人 + 言 = 信'
      ],
      detail: 'கூட்டுக் குறியீடு'
    },
    {
      key: 'keisei',
      label: '形声文字',
      value: 80,
      chartValue: 76,
      color: '#ef4444',
      samples: [
        '木 + 交 = 校 (கோ-ko)',
        '言 + 吾 = 語 (கோ-go)',
        '氵 + 可 = 河 (க)'
      ],
      detail: 'உச்சரிப்பு-பொருள் குறியீடு'
    },
    {
      key: 'tenchu',
      label: '転注文字',
      value: 1,
      chartValue: 2,
      color: '#8b5cf6',
      samples: [
        '楽 — இசை → மகிழ்ச்சி',
        '長 — நீளம் → தலைவன்',
        '自 — மூக்கு → தன்/தான்'
      ],
      detail: 'பொருள் திரிந்த குறியீடு'
    },
    {
      key: 'kasha',
      label: '仮借文字',
      value: 1,
      chartValue: 2,
      color: '#06b6d4',
      samples: [
        '来 — தானியம் → வரும்/வருகிற',
        '我 — ஆயுதம் → நான்/தன்',
        '七 — வெட்டு → ஏழு'
      ],
      detail: 'ஒலிக்கடன் குறியீடு'
    }
  ];

  const C = { x: canvas.width / 2, y: canvas.height / 2, r: Math.min(canvas.width, canvas.height) / 2 - 14 };
  let hovered = -1;
  let selected = -1;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const total = data.reduce((sum, item) => sum + (item.chartValue ?? item.value), 0);
    let start = -Math.PI / 2;
    const active = hovered >= 0 ? hovered : selected;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const value = item.chartValue ?? item.value;
      const angle = (value / total) * Math.PI * 2;
      const end = start + angle;
      const isActive = i === active;
      let radius = isActive ? C.r + 8 : C.r;
      if (value <= 3) {
        // enlarge very small segments for better visibility
        radius += 5;
      }
      ctx.beginPath();
      ctx.moveTo(C.x, C.y);
      ctx.arc(C.x, C.y, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      start = end;
    }

    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(C.x, C.y, C.r * 0.38, 0, Math.PI * 2);
    ctx.fill();
  }

  function getIndexAt(x, y) {
    const dx = x - C.x;
    const dy = y - C.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > C.r + 8) return -1;

    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += Math.PI * 2;

    const total = data.reduce((sum, item) => sum + (item.chartValue ?? item.value), 0);
    let start = -Math.PI / 2;
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const value = item.chartValue ?? item.value;
      const angleSpan = (value / total) * Math.PI * 2;
      const end = start + angleSpan;
      if (angle >= start && angle < end) return i;
      start = end;
    }
    return -1;
  }

  function updateTile(index) {
    const container = document.getElementById('wordTileContent');
    const header = document.getElementById('wordTileHeader');
    if (!container || !header) return;

    if (index >= 0) {
      const item = data[index];
      header.textContent = `${item.label} - ${item.detail}`;
      container.innerHTML = `<ul style="margin:6px 0;padding-left:18px;">${item.samples.map((sample) => `<li>${sample}</li>`).join('')}</ul>`;
    } else {
      header.textContent = '形声文字 - உச்சரிப்பு-பொருள் குறியீடு';
      container.innerHTML = '';
    }
  }

  const defaultIndex = data.findIndex((item) => item.key === 'keisei');
  if (defaultIndex >= 0) {
    selected = defaultIndex;
    updateTile(defaultIndex);
  }
  hovered = -1;
  draw();

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    const idx = getIndexAt(x, y);
    if (idx !== hovered) {
      hovered = idx;
      draw();
    }
    canvas.style.cursor = idx >= 0 ? 'pointer' : 'default';
  });

  canvas.addEventListener('mouseleave', () => {
    hovered = -1;
    draw();
  });

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    const idx = getIndexAt(x, y);
    if (idx >= 0) {
      selected = idx;
      updateTile(idx);
      draw();
    } else {
      selected = -1;
      updateTile(-1);
      draw();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHanziPie);
} else {
  initHanziPie();
}
