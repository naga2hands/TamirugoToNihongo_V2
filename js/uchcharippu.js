function initWordPie(){
  const canvas = document.getElementById('wordPie');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [
    { key: 'kango', label: 'கான்கொ', value: 50, color: '#4f46e5', samples: [
'学校 — がっこう (பள்ளி)',
'先生 — せんせい (ஆசிரியர்)',
'会社 — かいしゃ (நிறுவனம் / கம்பெனி)',
'文化 — ぶんか (கலாசாரம்)',
'経済 — けいざい (பொருளாதாரம்)',
'日本語 — にほんご (ஜப்பானிய மொழி)',
'電車 — でんしゃ (ரயில்)',
'勉強 — べんきょう (படிப்பு / படித்தல்)',
'新聞 — しんぶん (செய்தித்தாள்)',
'時間 — じかん (நேரம்)'
    ]},
    { key: 'wago', label: 'வகொ', value: 40, color: '#10b981', samples: [
'山 — やま (மலை)',
'川 — かわ (நதி / ஆறு)',
'水 — みず (தண்ணீர்)',
'人 — ひと (மனிதன் / நபர்)',
'手 — て (கை)',
'目 — め (கண்)',
'口 — くち (வாய்)',
'空 — そら (வானம் / ஆகாயம்)',
'海 — うみ (கடல்)',
'心 — こころ (மனம் / இதயம்)'
    ]},
    { key: 'gairaigo', label: 'கைரைகொ', value: 10, color: '#f59e0b', samples: [
'カメラ (கேமரா)',
'テレビ (தொலைக்காட்சி)',
'パン (ரொட்டி)',
'レストラン (உணவகம்)',
'ホテル (ஹோட்டல்)',
'バス (பஸ்)',
'ノート (குறிப்பேடு)',
'テーブル (மேசை)',
'コンピュータ (கணினி)',
'イドゥリ (இட்லி)'
    ]}
  ];

  const C = { x: canvas.width/2, y: canvas.height/2, r: Math.min(canvas.width, canvas.height)/2 - 12 };
  let hovered = -1;
  let selected = -1; // persistently selected slice (clicked)

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const total = data.reduce((s,d)=>s+d.value,0);
    let start = -Math.PI/2;
    const active = hovered >= 0 ? hovered : selected;
    for (let i=0;i<data.length;i++){
      const seg = data[i];
      const ang = (seg.value/total) * Math.PI*2;
      const end = start + ang;
      const isActive = (i===active);
      const rad = isActive ? C.r + 8 : C.r;
      ctx.beginPath();
      ctx.moveTo(C.x, C.y);
      ctx.arc(C.x, C.y, rad, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      start = end;
    }
    // draw center circle
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(C.x, C.y, C.r*0.45, 0, Math.PI*2);
    ctx.fill();
  }

  function getIndexAt(x,y){
    const dx = x - C.x; const dy = y - C.y; const dist = Math.sqrt(dx*dx+dy*dy);
    if (dist > C.r) return -1;
    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI/2) angle += Math.PI*2;
    // angle normalized from -PI/2
    let start = -Math.PI/2;
    const total = data.reduce((s,d)=>s+d.value,0);
    for (let i=0;i<data.length;i++){
      const ang = (data[i].value/total) * Math.PI*2;
      const end = start + ang;
      if (angle >= start && angle < end) return i;
      start = end;
    }
    return -1;
  }

  canvas.addEventListener('mousemove', (ev)=>{
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (canvas.width/rect.width);
    const y = (ev.clientY - rect.top) * (canvas.height/rect.height);
    const idx = getIndexAt(x,y);
    if (idx !== hovered) {
      hovered = idx;
      draw();
    }
    canvas.style.cursor = idx >= 0 ? 'pointer' : 'default';
  });

  canvas.addEventListener('mouseleave', ()=>{
    hovered = -1; draw();
  });

  canvas.addEventListener('click', (ev)=>{
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (canvas.width/rect.width);
    const y = (ev.clientY - rect.top) * (canvas.height/rect.height);
    const idx = getIndexAt(x,y);
    const container = document.getElementById('wordTileContent');
    if (!container) return;
    if (idx >= 0) {
      const seg = data[idx];
      // set as selected so highlight persists
      selected = idx;
      // update header and content
      const header = document.getElementById('wordTileHeader');
      if (header) header.textContent = `${seg.label} - மாதிரி சொற்கள்`;
      container.innerHTML = `<ul style="margin:6px 0;padding-left:18px;">${seg.samples.map(s=>`<li>${s}</li>`).join('')}</ul>`;
      draw();
    } else {
      // clicking outside clears selection
      selected = -1;
      const header = document.getElementById('wordTileHeader');
      if (header) header.textContent = `和語 - வகொ - Wago`;
      container.innerHTML = '';
      draw();
    }
  });

  // initial draw
  // default to Wago (selected)
  const defaultIdx = data.findIndex(d=>d.key==='wago');
  if (defaultIdx >= 0) {
    selected = defaultIdx;
    const seg = data[defaultIdx];
    const header = document.getElementById('wordTileHeader');
    const defaultContainer = document.getElementById('wordTileContent');
    if (header) header.textContent = `${seg.label} - மாதிரி சொற்கள்`;
    if (defaultContainer) defaultContainer.innerHTML = `<ul style="margin:6px 0;padding-left:18px;">${seg.samples.map(s=>`<li>${s}</li>`).join('')}</ul>`;
  }
  draw();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWordPie);
} else {
  initWordPie();
}
