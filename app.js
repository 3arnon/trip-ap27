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
  const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;
  const P = T.photos;

  // NAV shadow
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

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
      <img class="stop-photo" src="${U(P[s.id], 700)}" alt="" loading="lazy">
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
      ${ph ? `<figure class="fphoto"><img src="${U(ph, 900)}" alt="" loading="lazy" decoding="async"><figcaption>להמחשה</figcaption></figure>` : ''}
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

  // DAYS
  const dayCard = (d, s) => `
    <article class="day ${s.theme}${d.date === todayISO() ? ' is-today' : ''}" id="d-${d.date}">
      <div class="date">
        ${T.icons[d.date] ? `<button class="sticker" type="button" aria-label="${esc(d.title)}">${T.icons[d.date]}</button>` : ''}
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
    banner.style.backgroundImage = `url('${U(P[s.id], 1800)}')`;
    banner.innerHTML = `<div><b>${esc(s.name)}</b><span>${esc(s.dates)}, ${s.nights} לילות</span></div>`;
    $('#day-list').innerHTML = s.days.map(d => dayCard(d, s)).join('');
  }

  // Tap a day's sticker: it jumps and a handful of copies fly out.
  document.addEventListener('click', e => {
    const st = e.target.closest('.sticker');
    if (!st) return;
    st.classList.remove('pop'); void st.offsetWidth; st.classList.add('pop');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = st.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      const b = document.createElement('span');
      b.className = 'burst'; b.textContent = st.textContent;
      const a = Math.PI * 2 * i / 7 + Math.random() * .5, dist = 60 + Math.random() * 50;
      b.style.left = r.left + r.width / 2 + 'px'; b.style.top = r.top + r.height / 2 + 'px';
      b.style.setProperty('--dx', Math.cos(a) * dist + 'px'); b.style.setProperty('--dy', Math.sin(a) * dist - 30 + 'px');
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 900);
    }
  });
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) showStop(b.dataset.stop); });
  document.querySelectorAll('.stop').forEach(a => a.addEventListener('click', () => showStop(a.dataset.stop)));

  // During the trip: open on today's destination and show a "today" card on top.
  const today = todayISO();
  let current = T.stops[0].id;
  for (const s of T.stops) for (const d of s.days) if (d.date === today) {
    current = s.id;
    $('#today').classList.remove('hidden');
    $('#today-card').innerHTML = dayCard(d, s);
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
      <div class="hotel-photo">
        <img src="${U(P[s.hotel.photo], 1200)}" alt="" loading="lazy">
        <div class="hotel-over"><span class="where">${esc(s.name)}, ${esc(s.dates)}</span><h3><bdi>${esc(s.hotel.name)}</bdi></h3></div>
        <span class="illus">להמחשה</span>
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
  $('#food-hero').style.backgroundImage = `url('${U(P.foodHero, 1800)}')`;

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
