(function () {
  const T = window.TRIP;
  const $ = s => document.querySelector(s);
  // An en dash between digits is bidi-neutral and flips ranges in RTL ("7–12" shows as "12–7"); a hyphen keeps them in order.
  const esc = s => String(s).replace(/(\d)–(\d)/g, '$1-$2')
    .replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Rich text: a string, or an array of strings and [prefix, linkText, url] triples.
  function rich(v) {
    if (!v) return '';
    if (typeof v === 'string') return esc(v);
    return v.map(p => typeof p === 'string' ? esc(p)
      : esc(p[0]) + '<a href="' + esc(p[2]) + '" target="_blank" rel="noopener">' + esc(p[1]) + '</a>').join('');
  }
  const dayNum = d => Number(d.slice(8, 10));
  const todayISO = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });
  const U = (id, w = 1200) => id.includes('/') ? id : `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
  const P = T.photos;

  const nav = $('#nav');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // COUNTDOWN
  const dep = new Date(T.departure).getTime(), end = new Date(T.end).getTime();
  function tick() {
    const now = Date.now();
    if (now >= dep && now <= end) {
      $('#countdown').classList.add('hidden');
      $('#cd-label').textContent = 'אנחנו בתאילנד! 🌴';
      return;
    }
    if (now > end) { $('#countdown').classList.add('hidden'); $('#cd-label').textContent = 'היה מושלם. עד הפעם הבאה 🤍'; return; }
    let s = Math.floor((dep - now) / 1000);
    $('#cd-days').textContent = Math.floor(s / 86400);
    $('#cd-hours').textContent = Math.floor(s % 86400 / 3600);
    $('#cd-min').textContent = Math.floor(s % 3600 / 60);
  }
  tick(); setInterval(tick, 30000);

  // ROUTE: the three stops in travel order, with how we get from one to the next
  const LEGS = ['', '✈ טיסה', '🚐 נסיעה'];
  $('#route-cards').innerHTML = T.stops.map((s, i) => `
    <li><a class="stop ${s.theme}" href="#days" data-stop="${s.id}" data-n="${i + 1}">
      ${LEGS[i] ? `<span class="leg">${LEGS[i]}</span>` : ''}
      <span class="stop-photo rv"><img class="kb" src="${U(P[s.id], 700)}" alt="" loading="lazy"></span>
      <h3>${esc(s.name)}</h3>
      <span class="dates">${esc(s.dates)}</span>
      <span class="nights">${s.nights} לילות</span>
      <p>${esc(s.line)}</p>
      <span class="go">לימים של ${esc(s.name)}</span>
    </a></li>`).join('');

  // FOOD (AROI): a collapsible block per day, plus the food section further down.
  const IMG = q => 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(q);
  const MAP = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const MICH = '<span class="mich">MICHELIN</span>';
  function foodItem(f) {
    if (!f.name) return `<div class="fi"><span class="when">${esc(f.when)}</span><div>${esc(f.text)}${f.kids ? `<p class="kids"><em>לילדים</em> ${esc(f.kids)}</p>` : ''}</div></div>`;
    const ph = T.foodPhotos[f.name];
    return `<div class="fi"><span class="when">${esc(f.when)}</span><div>
      ${ph ? `<figure class="fphoto"><img src="${U(ph, 900)}" alt="" loading="lazy" decoding="async"></figure>` : ''}
      <b class="rest"><bdi>${esc(f.name)}</bdi></b>${f.michelin ? MICH : ''}
      <small>${esc(f.where)}</small>
      <p>${esc(f.note)}</p>
      <p class="fav"><em>מומלץ</em> ${esc(f.fav)}</p>
      <p class="kids"><em>לילדים</em> ${esc(f.kids)}</p>
      ${f.alt ? `<p class="alt">חלופה: ${esc(f.alt)}</p>` : ''}
      <p class="links"><a href="${esc(MAP(f.q))}" target="_blank" rel="noopener">מפה ↗</a><a href="${esc(IMG(f.q + ' food'))}" target="_blank" rel="noopener">תמונות האוכל ↗</a></p>
    </div></div>`;
  }
  function foodBlock(date) {
    const list = (T.food || {})[date];
    if (!list) return '';
    const names = list.filter(f => f.name).map(f => f.name);
    return `<details class="food"><summary>🍜 אוכלים היום${names.length ? ` <bdi>${esc(names.join(', '))}</bdi>` : ''}</summary>${list.map(foodItem).join('')}</details>`;
  }

  // DAY STICKERS: each day's symbol acts out the day (CSS keyframes). The monkey and the fish get help from JS further down.
  const fx = (e, cls, x, y, d) => `<i class="${cls}" style="--x:${x}px;--y:${y}px;--d:${d}s">${e}</i>`;
  const SLIDE_PATH = 'M14 14C30 14 22 33 36 35S50 44 55 50';
  const kid = (e, begin) => `
    <g opacity="0"><text font-size="16" x="-9" y="5">${e}</text>
      <animateMotion dur="3.4s" begin="${begin}s" repeatCount="indefinite" path="${SLIDE_PATH}" calcMode="spline"
        keyPoints="0;0;1;1" keyTimes="0;.15;.6;1" keySplines="0 0 1 1;.6 0 .9 .7;0 0 1 1"/>
      <animate attributeName="opacity" dur="3.4s" begin="${begin}s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;.08;.6;.64;1"/></g>
    <circle cx="55" cy="50" r="0" fill="none" stroke="#fff" stroke-width="2">
      <animate attributeName="r" dur="3.4s" begin="${begin}s" repeatCount="indefinite" values="0;0;10;10" keyTimes="0;.6;.85;1"/>
      <animate attributeName="opacity" dur="3.4s" begin="${begin}s" repeatCount="indefinite" values="0;0;1;0;0" keyTimes="0;.59;.6;.85;1"/></circle>`;
  const SLIDE = `<svg class="slide" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M0 48Q8 44 16 48T32 48T48 48T64 48V64H0Z" fill="#3cc6cc"/>
    <path d="M9 15V52M17 15V40" stroke="#8a5a36" stroke-width="2.5"/><path d="M9 22H17M9 29H17M9 36H17" stroke="#8a5a36" stroke-width="1.6"/>
    <path d="${SLIDE_PATH}" fill="none" stroke="#f0a316" stroke-width="7" stroke-linecap="round"/>
    <path class="flow" d="${SLIDE_PATH}" fill="none" stroke="#c8f6f8" stroke-width="2" stroke-dasharray="3 5" stroke-linecap="round"/>
    <path d="M6 14H20" stroke="#d93d74" stroke-width="3" stroke-linecap="round"/>
    ${kid('🧒', 0)}${kid('👧', 1.7)}</svg>`;
  const FISH = `<svg viewBox="0 0 40 26" aria-hidden="true"><path class="tail" d="M28 13L39 4V22Z" fill="#e8700f"/>
    <ellipse cx="17" cy="13" rx="15" ry="10" fill="#f58a1f" stroke="#08313d" stroke-width="1.2"/>
    <path d="M12 4Q9 13 12 22M22 4Q25 13 22 22" stroke="#fff" stroke-width="3.2" fill="none"/>
    <circle cx="7" cy="11" r="2.3" fill="#08313d"/><circle cx="7.7" cy="10.3" r=".8" fill="#fff"/></svg>`;
  const SCENES = {
    '🛬': '<span class="sc"><i class="a-land">🛬</i></span>',
    '🛕': '<i>🛕</i>' + fx('✨', 'tw', -20, -20, 0) + fx('✨', 'tw', 21, -13, .9) + fx('✨', 'tw', 15, 19, 1.7),
    '🐘': '<i class="a-sway">🐘</i>' + fx('💧', 'spray', -16, 0, 0) + fx('💧', 'spray', -6, 0, .45) + fx('💧', 'spray', -26, 0, .9),
    '🐷': '<i class="a-pig">🐖</i>',
    '🌊': '<span class="sc"><i class="a-roll">🌊</i><i class="a-roll" style="animation-delay:-1.8s">🌊</i></span>',
    '✈️': '<span class="sc"><i class="a-cloud">☁️</i><i class="a-fly">✈️</i></span>',
    '💦': '<i class="a-splash">💦</i>' + fx('💧', 'sq', -26, -18, 0) + fx('💧', 'sq', 25, -20, 0) + fx('💧', 'sq', -24, 20, 0) + fx('💧', 'sq', 26, 16, 0),
    '🛶': '<span class="sc"><i class="a-row">🛶</i><b class="water"></b></span>',
    '🌅': '<span class="sc sunset"><b class="sun"></b><b class="sea"></b></span>',
    '🌴': '<i class="a-palm">🌴</i>' + fx('🥥', 'coco', 0, 0, 0),
    '🎪': '<i class="a-tent">🎪</i>' + fx('🎉', 'cf', -24, -26, 0) + fx('✨', 'cf', 23, -28, .55) + fx('🎊', 'cf', 2, -38, 1.1),
    '🐒': '<i class="a-monkey">🐒</i>',
    '🏝️': '<span class="sc"><i class="a-isle">🏝️</i><i class="a-boat">⛵</i></span>',
    '🛝': `<span class="sc">${SLIDE}</span>`,
    '🐠': '<span class="sc aqua"><b class="bub" style="--x:-9px"></b><b class="bub" style="--x:7px;--d:1.1s"></b><b class="bub" style="--x:-1px;--d:2.2s"></b></span>',
    '🏠': '<i class="a-home">🏠</i>' + fx('❤️', 'heart', -9, 0, 0) + fx('🤍', 'heart', 8, 0, 1.4)
  };
  const sticker = (d, e) => `<button class="sticker" type="button" data-icon="${e}" aria-label="${esc(d.title)}">${SCENES[e] || `<i>${e}</i>`}</button>`;

  // DAYS
  const dayCard = (d, s) => `
    <article class="day ${s.theme}${d.date === todayISO() ? ' is-today' : ''}" id="d-${d.date}">
      <div class="date">
        ${T.icons[d.date] ? sticker(d, T.icons[d.date]) : ''}
        <b>${dayNum(d.date)}.4</b><span>יום ${esc(d.day)}</span>
      </div>
      <div>
        <h4>${esc(d.title)}${d.badge ? `<span class="badge">${esc(d.badge)}</span>` : ''}</h4>
        ${d.am ? `<div class="row"><span class="k">בוקר</span><span>${rich(d.am)}</span></div>` : ''}
        ${d.pm ? `<div class="row"><span class="k">ערב</span><span>${rich(d.pm)}</span></div>` : ''}
        ${d.g ? `<div class="row"><span class="k">יעקב וטלי</span><span>${rich(d.g)}</span></div>` : ''}
        ${foodBlock(d.date)}
      </div>
    </article>`;

  $('#tabs').innerHTML = T.stops.map((s, i) =>
    `<button class="tab${i === 0 ? ' on' : ''}" role="tab" data-stop="${s.id}">${esc(s.name)}</button>`).join('');
  function showStop(id) {
    const s = T.stops.find(x => x.id === id);
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('on', t.dataset.stop === id));
    const banner = $('#stop-banner');
    banner.className = 'stop-banner ' + s.theme;
    banner.style.animation = 'none'; void banner.offsetWidth; banner.style.animation = ''; // replay the entrance on each tab switch
    banner.innerHTML = `<i class="bg par kb" style="background-image:url('${U(P[s.id], 1800)}')"></i><div><b>${esc(s.name)}</b><span>${esc(s.dates)}, ${s.nights} לילות</span></div>`;
    const list = $('#day-list');
    list.querySelectorAll('.day').forEach(day => { if (day.fishAnim) day.fishAnim.cancel(); });
    list.querySelectorAll('.sticker, .day').forEach(el => seen.unobserve(el));
    list.innerHTML = s.days.map(d => dayCard(d, s)).join('');
    liven(list);
    onScroll();
  }

  // Tap a day's sticker: it jumps and a handful of copies fly out.
  document.addEventListener('click', e => {
    const st = e.target.closest('.sticker');
    if (!st) return;
    st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
    if (calm) return;
    const r = st.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('span');
      b.className = 'burst'; b.textContent = st.dataset.icon;
      const a = Math.PI * 2 * i / 7 + Math.random() * .5, dist = 60 + Math.random() * 50;
      b.style.left = r.left + r.width / 2 + 'px'; b.style.top = r.top + r.height / 2 + 'px';
      b.style.setProperty('--dx', Math.cos(a) * dist + 'px'); b.style.setProperty('--dy', Math.sin(a) * dist - 30 + 'px');
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 900);
    }
  });
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) showStop(b.dataset.stop); });
  document.querySelectorAll('.stop').forEach(a => a.addEventListener('click', () => showStop(a.dataset.stop)));

  // MOTION: stickers act only while on screen. The monkey catches bananas, and the aquarium fish swims its whole day.
  const seen = new IntersectionObserver(es => es.forEach(e => {
    const el = e.target;
    el.classList.toggle('live', e.isIntersecting);
    if (el.fishAnim) e.isIntersecting ? el.fishAnim.play() : el.fishAnim.pause();
    if (e.isIntersecting && el.querySelector('.a-monkey')) setTimeout(() => banana(el), 700);
  }), { rootMargin: '40px' });

  function liven(root) {
    root.querySelectorAll('.sticker').forEach(s => seen.observe(s));
    if (calm) { root.querySelectorAll('svg.slide').forEach(svg => svg.pauseAnimations()); return; }
    root.querySelectorAll('.day').forEach(day => { if (day.querySelector('.aqua')) { swim(day); seen.observe(day); } });
  }

  // Positions inside a day card, from its top-left corner.
  function spot(day, el) {
    const d = day.getBoundingClientRect(), s = el.getBoundingClientRect();
    return { W: d.width, H: d.height, x: s.left - d.left + s.width / 2, y: s.top - d.top + s.height / 2 };
  }
  const at = (x, y, rest = '') => `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) ${rest}`;

  // The fish leaves its circle, swims to the far side of the card and back, then rests at home.
  function swim(day) {
    const fish = document.createElement('span');
    fish.className = 'fish'; fish.innerHTML = FISH;
    day.appendChild(fish);
    const { W, H, x: hx, y: hy } = spot(day, day.querySelector('.sticker'));
    const L = 26, y = f => Math.min(H - 22, Math.max(22, f * H)), mid = (a, f) => a + (L - a) * f;
    const path = [[0, hx, hy, 1], [.08, hx, hy, 1], [.22, mid(hx, .35), y(.35), 1], [.36, mid(hx, .72), y(.16), 1], [.46, L, y(.55), 1],
      [.5, L, y(.55), -1], [.64, mid(hx, .7), y(.82), -1], [.8, mid(hx, .3), y(.42), -1], [.94, hx, hy, -1], [1, hx, hy, 1]];
    day.fishAnim = fish.animate(path.map(([offset, x, yy, f]) => ({ offset, transform: at(x, yy, `scaleX(${f})`), easing: 'ease-in-out' })),
      { duration: 9000 + W * 10, iterations: Infinity });
    if (!day.classList.contains('live')) day.fishAnim.pause();
  }

  // A banana flies in from the far side of the card; the monkey catches it and eats it in three bites.
  function banana(st) {
    const day = st.closest('.day');
    if (!day || calm || Date.now() - (st.lastThrow || 0) < 4000) return;
    st.lastThrow = Date.now();
    const { H, x: hx, y: hy } = spot(day, st), x0 = 18, y0 = Math.min(H - 20, hy + 50);
    const peak = Math.min(130, 50 + (hx - x0) * .12), ex = hx - 10;
    const nana = document.createElement('span');
    nana.className = 'nana'; nana.textContent = '🍌';
    day.appendChild(nana);
    const arc = [];
    for (let i = 0; i <= 18; i++) {
      const p = i / 18;
      arc.push({ transform: at(x0 + (ex - x0) * p, y0 + (hy - y0) * p - 4 * peak * p * (1 - p), `rotate(${p * 720}deg)`), opacity: p < .05 ? 0 : 1 });
    }
    nana.animate(arc, { duration: 900 + (hx - x0) * .7, easing: 'cubic-bezier(.3, .1, .45, 1)' }).onfinish = () => {
      const m = st.querySelector('.a-monkey');
      m.classList.remove('chomp'); void m.offsetWidth; m.classList.add('chomp');
      nana.animate([{ transform: at(ex, hy, 'rotate(720deg) scale(1)'), opacity: 1 }, { transform: at(ex + 4, hy, 'rotate(720deg) scale(0)'), opacity: 1 }],
        { duration: 900, easing: 'steps(3, end)', fill: 'forwards' }).onfinish = () => nana.remove();
    };
  }
  (function monkeys() {
    setTimeout(() => { document.querySelectorAll('.sticker.live .a-monkey').forEach(m => banana(m.closest('.sticker'))); monkeys(); }, 5000 + Math.random() * 5000);
  })();
  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => document.querySelectorAll('.day > .fish').forEach(f => {
      const day = f.parentElement; day.fishAnim.cancel(); f.remove(); swim(day);
    }), 300);
  });

  // SEA SOUND: waves synthesized in the browser, no audio file. Phones allow sound only after a touch,
  // so it starts on the first tap anywhere, and fades out as the page scrolls past the photo.
  const sea = { on: true, ctx: null, out: null, idle: 0 };
  try { sea.on = localStorage.getItem('trip27-sea') !== 'off'; } catch (e) {}
  const seaBtn = $('#sea-sound');
  function seaLabel() {
    const playing = !!sea.ctx && sea.on;
    seaBtn.classList.toggle('on', playing);
    seaBtn.setAttribute('aria-pressed', String(playing));
    $('#sea-label').textContent = playing ? 'השתקה' : 'קול הים';
  }
  // Brown noise with a crossfaded seam, so the loop never clicks.
  function noiseLoop(ctx, seconds) {
    const n = ctx.sampleRate * seconds, fade = ctx.sampleRate / 2, buf = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const raw = new Float32Array(n + fade), d = buf.getChannelData(c);
      let v = 0;
      for (let i = 0; i < raw.length; i++) { v = (v + .02 * (Math.random() * 2 - 1)) / 1.02; raw[i] = v * 3.5; }
      for (let i = 0; i < n; i++) d[i] = i < fade ? raw[i] * (i / fade) + raw[n + i] * (1 - i / fade) : raw[i];
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true; src.start();
    return src;
  }
  function seaStart() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC(), out = ctx.createGain();
    out.gain.value = 0; out.connect(ctx.destination);
    // a steady low rumble, plus surf that swells and washes back every few seconds
    const low = ctx.createBiquadFilter(), lowGain = ctx.createGain();
    low.type = 'lowpass'; low.frequency.value = 320; lowGain.gain.value = .45;
    noiseLoop(ctx, 6).connect(low).connect(lowGain).connect(out);
    const surf = ctx.createBiquadFilter(), surfGain = ctx.createGain();
    surf.type = 'lowpass'; surf.frequency.value = 400; surfGain.gain.value = .05;
    noiseLoop(ctx, 5).connect(surf).connect(surfGain).connect(out);
    (function wave() {
      const t = ctx.currentTime, rise = 1.6 + Math.random() * 1.2;
      surfGain.gain.setTargetAtTime(.5 + Math.random() * .4, t, rise / 3);
      surf.frequency.setTargetAtTime(1300 + Math.random() * 900, t, rise / 3);
      surfGain.gain.setTargetAtTime(.05, t + rise, 1.5);
      surf.frequency.setTargetAtTime(380, t + rise, 1.3);
      setTimeout(wave, 5500 + Math.random() * 3500);
    })();
    sea.ctx = ctx; sea.out = out;
    seaLevel();
  }
  // Full volume over the photo, silent once it's scrolled away (and the speaker rests).
  function seaLevel() {
    if (!sea.ctx) return;
    const v = sea.on && !document.hidden ? Math.max(0, 1 - scrollY / ($('.hero').offsetHeight * .8)) : 0;
    sea.out.gain.setTargetAtTime(v * .55, sea.ctx.currentTime, .3);
    clearTimeout(sea.idle);
    if (v > 0) { if (sea.ctx.state === 'suspended') sea.ctx.resume(); }
    else sea.idle = setTimeout(() => sea.ctx.suspend(), 1500);
  }
  function wakeSea(e) {
    if (!sea.on || (e.target.closest && e.target.closest('#sea-sound'))) return;
    if (!sea.ctx) seaStart(); else seaLevel();
    seaLabel();
  }
  ['click', 'touchend', 'keydown'].forEach(t => addEventListener(t, wakeSea, true));
  seaBtn.addEventListener('click', () => {
    sea.on = !(sea.ctx && sea.on);
    try { localStorage.setItem('trip27-sea', sea.on ? 'on' : 'off'); } catch (e) {}
    if (sea.on && !sea.ctx) seaStart(); else seaLevel();
    seaLabel();
  });
  document.addEventListener('visibilitychange', seaLevel);
  seaLabel();

  // SCROLL: nav shadow, the sea's volume, and photos that move a little slower than the page.
  const heroBg = $('.hero-bg');
  let ticking = false;
  function onScroll() {
    ticking = false;
    nav.classList.toggle('scrolled', scrollY > 10);
    seaLevel();
    if (calm) return;
    if (scrollY < innerHeight * 1.2) heroBg.style.setProperty('--py', (scrollY * .35).toFixed(1) + 'px');
    document.querySelectorAll('.par').forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.setProperty('--py', (-p * r.height * .2).toFixed(1) + 'px');
    });
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  // During the trip: open on today's destination and show a "today" card on top.
  const today = todayISO();
  let current = T.stops[0].id;
  for (const s of T.stops) for (const d of s.days) if (d.date === today) {
    current = s.id;
    $('#today').classList.remove('hidden');
    $('#today-card').innerHTML = dayCard(d, s);
    liven($('#today-card'));
  }
  showStop(current);

  // FOOD SECTION
  const picks = [];
  for (const s of T.stops) for (const d of s.days) for (const f of (T.food[d.date] || []))
    if (f.michelin || f.name === 'Black Ginger') picks.push({ f, d, s });
  $('#food-picks').innerHTML = picks.map(({ f, d, s }) => `
    <li class="${s.theme}">
      <img class="pick-photo" src="${U(T.foodPhotos[f.name], 500)}" alt="" loading="lazy">
      <div class="when"><b>${dayNum(d.date)}.4</b><span>${esc(s.name)}</span></div>
      <div>
        <a href="${esc(MAP(f.q))}" target="_blank" rel="noopener"><bdi>${esc(f.name)}</bdi></a>${f.michelin ? MICH : '<span class="special">הארוחה המיוחדת</span>'}
        <p>${esc(f.fav)}</p>
      </div>
    </li>`).join('');
  $('#dishes').innerHTML = T.dishes.map(x => `
    <li><a href="${esc(IMG(x.en + ' Thai dish'))}" target="_blank" rel="noopener">
      <span class="dn"><b>${esc(x.he)}</b><i>${esc(x.en)}</i></span><p>${esc(x.d)}</p>
    </a></li>`).join('');
  $('#food-tips').innerHTML = T.foodTips.map(([k, v]) => `<li><b>${esc(k)}</b> ${esc(v)}</li>`).join('');

  // HOTELS
  $('#hotel-cards').innerHTML = T.stops.map(s => `
    <article class="hotel ${s.theme}">
      <div class="hotel-photo rv">
        <img class="kb" src="${U(P[s.hotel.photo], 1200)}" alt="" loading="lazy">
        <div class="hotel-over"><span class="where">${esc(s.name)}, ${esc(s.dates)}</span><h3><bdi>${esc(s.hotel.name)}</bdi></h3></div>
      </div>
      <div class="hotel-body">
        <p class="unit">${esc(s.hotel.unit)}</p>
        <ul>${s.hotel.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        <p class="hotel-links">
          <a href="${esc(IMG(s.hotel.name + ' ' + s.hotel.unitEn))}" target="_blank" rel="noopener">התמונות האמיתיות</a>
          <a href="${esc(s.hotel.map)}" target="_blank" rel="noopener">ניווט למלון</a>
        </p>
      </div>
    </article>`).join('');
  $('#photo-credits').textContent = 'צילומים מ־Unsplash: ' + T.photoCredits;
  $('#food-hero').innerHTML = `<i class="bg par kb" style="background-image:url('${U(P.foodHero, 1800)}')"></i>`;

  // Big photos open like a curtain the first time they scroll in; hotel photos tilt toward the mouse.
  if (!calm) {
    const reveal = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.remove('pre'); reveal.unobserve(e.target); }
    }), { threshold: .2 });
    document.querySelectorAll('.rv').forEach(el => { el.classList.add('pre'); reveal.observe(el); });
    document.querySelectorAll('.hotel-photo').forEach(ph => {
      ph.addEventListener('pointermove', e => {
        if (e.pointerType !== 'mouse') return;
        const r = ph.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        ph.style.transform = `perspective(900px) rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) scale(1.02)`;
      });
      ph.addEventListener('pointerleave', () => { ph.style.transform = ''; });
    });
  }
  onScroll();

  // CHECKLIST (saved per device)
  const KEY = 'trip27-checks';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  $('#checklist').innerHTML = T.checklist.map((t, i) =>
    `<li><label><input type="checkbox" data-i="${i}"${saved[i] ? ' checked' : ''}><span>${esc(t)}</span></label></li>`).join('');
  $('#checklist').addEventListener('change', e => {
    if (!e.target.dataset.i) return;
    saved[e.target.dataset.i] = e.target.checked;
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (err) {}
  });

  // AI ASSISTANT
  const fab = $('#ai-fab'), panel = $('#ai-panel'), body = $('#ai-body'), input = $('#ai-input');
  const history = [];
  // Assistant replies may use **bold**; render that, escape everything else.
  function add(role, text) {
    const el = document.createElement('div');
    el.className = 'msg ' + role;
    if (role === 'bot') el.innerHTML = esc(text).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    else el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }
  function open(v) {
    panel.classList.toggle('open', v); fab.classList.toggle('open', v);
    panel.setAttribute('aria-hidden', String(!v));
    if (v) {
      if (!body.children.length) add('bot', 'היי! 🐒 אני קוקו, הקוף של הטיול. תשאלו אותי על התוכנית, המלונות, מה לארוז, או כל דבר על תאילנד. אני מבטיח לא לגנוב לכם בננות 🍌');
      setTimeout(() => input.focus(), 300);
    }
  }
  fab.addEventListener('click', () => open(true));

  // KOKO'S DAY: awake → (10s idle) sleeps → (5s) wakes up and waves → awake 30s → sleeps again.
  // While awake he goes "ooh ooh" now and then. Touching him wakes him up early.
  const say = $('#ai-say');
  let mood = 'awake', moodTimer = 0, ooTimer = 0;
  function speak(text, ms) {
    say.textContent = text; say.classList.add('show');
    if (ms) setTimeout(() => { if (say.textContent === text) say.classList.remove('show'); }, ms);
  }
  function setMood(m) { fab.classList.remove('is-oo', 'is-sleep', 'is-wave'); if (m) fab.classList.add('is-' + m); }
  function awake(ms) {
    mood = 'awake'; setMood(''); say.classList.remove('show');
    clearTimeout(moodTimer); moodTimer = setTimeout(sleep, ms);
    clearTimeout(ooTimer); ooLater();
  }
  function ooLater() {
    ooTimer = setTimeout(() => {
      if (mood !== 'awake' || panel.classList.contains('open')) return ooLater();
      setMood('oo'); speak('או או!', 1300);
      setTimeout(() => { if (mood === 'awake') setMood(''); }, 1350);
      ooLater();
    }, 5000 + Math.random() * 5000);
  }
  function sleep() {
    if (panel.classList.contains('open')) return awake(10000);
    mood = 'sleep'; clearTimeout(ooTimer); setMood('sleep'); speak('Zzz…');
    moodTimer = setTimeout(wake, 5000);
  }
  function wake() {
    mood = 'wave'; setMood('wave'); speak('שלום! 👋', 2400);
    clearTimeout(moodTimer); moodTimer = setTimeout(() => awake(30000), 2500);
  }
  fab.addEventListener('pointerenter', () => { if (mood === 'sleep') wake(); else if (mood === 'awake') awake(10000); });
  awake(10000);
  $('#ai-close').addEventListener('click', () => open(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });

  $('#ai-chips').innerHTML = T.aiQuickQuestions.map(q => `<button type="button">${esc(q)}</button>`).join('');
  $('#ai-chips').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); });
  $('#ai-form').addEventListener('submit', e => { e.preventDefault(); const q = input.value.trim(); if (q) ask(q); });

  // The family code is asked once and kept on this device; the assistant rejects requests without it.
  const CODE_KEY = 'trip27-code';
  let code = '';
  try { code = localStorage.getItem(CODE_KEY) || ''; } catch (e) {}
  let pendingQuestion = '';

  async function ask(q) {
    input.value = '';
    if (!T.aiEndpoint) {
      add('me', q);
      add('bot', 'אני עוד בהקמה 🛠️ ארנון מחבר אותי בקרוב. בינתיים, כל התוכנית כאן בדף.');
      return;
    }
    if (!code) {
      if (pendingQuestion) {
        add('me', '••••');
        code = q;
        try { localStorage.setItem(CODE_KEY, code); } catch (e) {}
        q = pendingQuestion;
        pendingQuestion = '';
      } else {
        add('me', q);
        pendingQuestion = q;
        add('bot', 'רגע לפני שאני עונה: מה קוד המשפחה? 🔐 (שואל רק פעם אחת)');
        return;
      }
    } else {
      add('me', q);
    }
    history.push({ role: 'user', content: q });
    const wait = add('bot typing', 'חושב…');
    try {
      const r = await fetch(T.aiEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Family-Code': code },
        body: JSON.stringify({ messages: history.slice(-12), today: todayISO() })
      });
      if (r.status === 401) {
        wait.remove();
        history.pop();
        code = '';
        try { localStorage.removeItem(CODE_KEY); } catch (e) {}
        pendingQuestion = q;
        add('bot', 'הקוד לא נכון 🙈 נסו שוב:');
        return;
      }
      const j = await r.json();
      wait.remove();
      const reply = j.reply || 'משהו השתבש, נסו שוב.';
      add('bot', reply);
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      wait.remove();
      add('bot', 'אין חיבור כרגע. נסו שוב בעוד רגע.');
    }
  }
})();
