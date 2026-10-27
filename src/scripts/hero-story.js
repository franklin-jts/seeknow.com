export default function init() {
  /* ---- Config ---- */
  const CONFIG = {
    badge: "India's First Workforce Operating System",
    routes: { home:'#top', platform:'#platform', products:'#platform', solutions:'#', resources:'#', company:'#', demo:'#', explore:'#platform', discover:'#top' }
  };
  document.querySelectorAll('[data-route]').forEach(a => { const r = CONFIG.routes[a.dataset.route]; if (r) a.setAttribute('href', r); });
  document.querySelectorAll('[data-badge]').forEach(el => { el.textContent = CONFIG.badge; });

  const root   = document.documentElement;
  const header = document.getElementById('top-header');
  const panel  = document.getElementById('m-panel');

  const openMenu = () => {
    header.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    const b = document.getElementById('burger');
    if (b) { b.setAttribute('aria-expanded', 'true'); b.setAttribute('aria-label', 'Close menu'); }
  };

  const closeMenu = () => {
    header.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
    const b = document.getElementById('burger');
    if (b) { b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', 'Open menu'); }
  };

  const burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', () => {
      panel.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  document.querySelectorAll('.m-panel a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---- Static orbit showcase (Section 2) ---- */
  initStaticStory();

  /* ---- Header scroll state ---- */
  const updateHeader = () => {
    header.classList.toggle('scrolled', scrollY > 12);
    const heroLogo = document.getElementById('hero-logo');
    if (heroLogo) document.body.classList.toggle('hero-passed', heroLogo.getBoundingClientRect().bottom < 80);
  };
  addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---- Product showcase animations (story-list section) ---- */
  initProductCards();

  /* ---- Ecosystem cinematic story (Section 4) ---- */
  initEcoStory();

  /* ---- Ecosystem tab switcher ---- */
  initEcoTabs();

  /* ---- Global section scroll-reveal ---- */
  initSectionReveal();
}

function initProductCards() {
  /* ── story-list scroll-reveal: intro heading + 3 cards ── */
  const slIntro = document.getElementById('sl-intro');
  const slCards = [...document.querySelectorAll('.sl-card')];

  // Intro observer
  if (slIntro) {
    const introIO = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        slIntro.classList.add('sl-in');
        introIO.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    introIO.observe(slIntro);
  }

  // Cards: each observed individually so they fire one by one as they scroll into view
  slCards.forEach(card => {
    const cardIO = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        card.classList.add('sl-in');
        cardIO.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    cardIO.observe(card);
  });
}

/* ─────────────────────────────────────────────
   Section scroll-reveal
   Sections after the hero animate in one by one
   as they enter the viewport.
───────────────────────────────────────────── */
function initSectionReveal() {
  // Sections to animate in — ordered after #top (hero).
  // #platform / #story are excluded because they use their own pinned-scroll animation.
  // #story-list (mobile cards) already has in-view logic for cards; we skip it to avoid double-animating.
  const SECTION_IDS = [
    'why-seek-now',
    'ecosystem',
    'roles',
    'capabilities',
    'trust',
    'faq',
    'pricing',
    'finale',
  ];

  // Add the reveal class to each section and set up child staggering
  SECTION_IDS.forEach(id => {
    const sec = document.getElementById(id);
    if (!sec) return;

    // Don't double-apply
    if (sec.classList.contains('sr-reveal')) return;
    sec.classList.add('sr-reveal');

    // For sections that don't have .inner, try to stagger their visible children
    const inner = sec.querySelector('.inner');
    if (inner) {
      [...inner.children].forEach(child => child.classList.add('sr-child'));
    } else {
      // Direct children fallback
      [...sec.children].slice(0, 8).forEach(child => child.classList.add('sr-child'));
    }
  });

  // IntersectionObserver: trigger each section once it's 10% visible
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('sr-visible');
        io.unobserve(entry.target); // fire once only
      }
    });
  }, {
    threshold: 0.08,       // fire when 8% of section is in view
    rootMargin: '0px 0px -40px 0px', // slightly before it fully enters
  });

  // Observe all marked sections
  document.querySelectorAll('.sr-reveal').forEach(sec => io.observe(sec));
}

/* ─────────────────────────────────────────────
   Ecosystem orbit preview — exact Story animations
   + interactive tab switcher for centre window.
───────────────────────────────────────────── */
function initOrbitPreview() {
  const preview = document.querySelector('.s4-orbit-preview');
  if (!preview) return;

  const wins    = [...preview.querySelectorAll('.s4-op-win')];
  const orbitEl = document.getElementById('s4-orbit-svg');
  const tabs    = [...document.querySelectorAll('.s4-tabsw .ptab')];
  if (!wins.length || !orbitEl) return;

  const $ = id => document.getElementById(id);

  // Window components in slot order: [ReferNow=0, Console=1, SeekPeople=2]
  // The three .s4-op-win slots: left(0), center(1), right(2)
  // We only swap the CENTRE slot's content when a tab is clicked.
  // We keep a logical "active" index and replace the centre win's inner content.

  // Map tab index → which window component to show in centre
  // Default active = Console (tab 1), which is already in centre
  let activeTab = 1;
  let swapping  = false;

  /* ── Measure & draw orbit SVG ── */
  let spinId = 0, revealed = false;

  const measure = () => {
    const pr = preview.getBoundingClientRect();
    const W  = pr.width, H = pr.height || 400;
    orbitEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const cx = W / 2, cy = H * 0.72, rx = W * 0.44, ry = H * 0.22;
    ['s4-ring','s4-ring2'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', cx); e.setAttribute('cy', cy);
      e.setAttribute('rx', rx); e.setAttribute('ry', ry);
    });
    const nodeXs = [W * 0.17, W * 0.50, W * 0.83];
    const nodeY  = cy + ry * 0.85;
    nodeXs.forEach((nx, i) => {
      const n = $('s4-n' + i); const t = $('s4-t' + i);
      if (n) { n.setAttribute('cx', nx); n.setAttribute('cy', nodeY); }
      if (t) { t.setAttribute('x',  nx); t.setAttribute('y',  nodeY + 20); }
    });
    const link = $('s4-link');
    if (link) {
      const [x0,x1,x2] = nodeXs; const y = nodeY;
      link.setAttribute('d',
        `M${x0},${y} Q${(x0+x1)/2},${y+28} ${x1},${y}` +
        ` Q${(x1+x2)/2},${y+28} ${x2},${y}`
      );
    }
  };

  /* ── Spinning spark ── */
  const spin = ts => {
    if (!revealed) { spinId = 0; return; }
    const pr = preview.getBoundingClientRect();
    const W = pr.width, H = pr.height || 400;
    const cx = W/2, cy = H*0.72, rx = W*0.44, ry = H*0.22;
    const a  = ts / 5200;
    const x  = cx + rx * Math.cos(a);
    const y  = cy + ry * Math.sin(a);
    ['s4-halo','s4-spark'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', x); e.setAttribute('cy', y);
    });
    spinId = requestAnimationFrame(spin);
  };

  /* ── Tab switcher: swap centre window with animation ── */
  const WIN_CONTENTS = [0, 1, 2]; // indices matching data-win attributes
  const centreWin = preview.querySelector('.s4-op-win--center');

  const setActiveTab = (idx) => {
    if (idx === activeTab || swapping || !centreWin) return;
    swapping = true;

    // Update tab button states
    tabs.forEach((t, i) => {
      const on = i === idx;
      t.classList.toggle('ptab--active', on);
      t.setAttribute('aria-selected', String(on));
    });

    // Highlight active node
    for (let i = 0; i < 3; i++) {
      const n = $('s4-n' + i);
      if (n) n.classList.toggle('s4-node-active', i === idx);
    }

    // Swap animation: out → swap content → in
    centreWin.classList.remove('s4-op-swap-in');
    centreWin.classList.add('s4-op-swap-out');

    setTimeout(() => {
      // Swap the data-win attribute so CSS/JS knows which is active
      centreWin.setAttribute('data-win', String(idx));

      // Replace inner HTML with the correct window
      // We find the sibling win that has the content we want
      // and copy its inner HTML into centre
      const sourceWin = preview.querySelector(`.s4-op-win[data-win="${idx}"]`);
      const leftWin   = preview.querySelector('.s4-op-win--left');
      const rightWin  = preview.querySelector('.s4-op-win--right');

      // Rotate: old centre content goes to a side, new active goes to centre
      // Simple approach: swap innerHTML between centre and the source side
      if (sourceWin && sourceWin !== centreWin) {
        const tmp = centreWin.innerHTML;
        centreWin.innerHTML = sourceWin.innerHTML;
        sourceWin.innerHTML = tmp;
        sourceWin.setAttribute('data-win', String(activeTab));
      }

      activeTab = idx;

      centreWin.classList.remove('s4-op-swap-out');
      centreWin.classList.add('s4-op-swap-in');

      setTimeout(() => {
        centreWin.classList.remove('s4-op-swap-in');
        swapping = false;
      }, 450);
    }, 350);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => setActiveTab(i));
  });

  /* ── Reveal on scroll ── */
  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    revealed = true;
    wins.forEach((win, i) => setTimeout(() => win.classList.add('s4-op-in'), i * 130));
    preview.classList.add('s4-op-in');
    if (!spinId) spinId = requestAnimationFrame(spin);
    io.disconnect();
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  measure();
  window.addEventListener('resize', measure);
  io.observe(preview);
}

/* ─────────────────────────────────────────────
   Ecosystem cinematic story (Section 4)
   Mirrors the Section 2 pinned story logic but
   targets #eco-story and eco-* element IDs.
   Uses its own CSS class (eco-active) independent
   of the global html.pinned class.
───────────────────────────────────────────── */
function initEcoStory() {
  const story = document.getElementById('eco-story');
  if (!story) return;

  const stage   = story.querySelector('.stage');
  const keys    = ['eco-refer', 'eco-console', 'eco-people'];
  const pw      = {};
  keys.forEach(k => { pw[k] = stage.querySelector('.pw[data-key="' + k + '"]'); });
  const caps    = [...stage.querySelectorAll('[data-cap]')];
  const hint    = document.getElementById('eco-hint');
  const handoff = document.getElementById('eco-handoff');
  const handoffT= document.getElementById('eco-handoff-t');
  const orbit   = document.getElementById('eco-orbit');
  const $       = id => document.getElementById(id);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const ease  = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

  const mqW = matchMedia('(min-width: 860px) and (min-height: 560px)');
  const mqR = matchMedia('(prefers-reduced-motion: reduce)');
  // eco-active is set directly on story element — no html.pinned dependency
  let active = false, sw = 0, sh = 0, ww = 0, H = 0, S = null, orbitOp = 0, spinId = 0, geo = null;

  const buildStates = () => {
    const fx   = sw * .28;  // push focused window further right, away from caption
    const P    = (x, y, s, r, d) => ({ x, y, s, r, d });

    // S[0]: ALL 3 WINDOWS spread side-by-side (screenshot 2 fan view)
    // This is the initial state before scrolling
    const spread = {
      'eco-refer':   P(-sw * .30, sh * .06, .78,  10, 0.15),
      'eco-console': P( 0,        sh * .00, .88,   0, 0.05),
      'eco-people':  P( sw * .30, sh * .06, .78, -10, 0.15),
    };

    const focus = P(fx, 0, 0.82, -5, 0);
    const nextA = P(fx + sw*.22,  sh*.16,  .52, -14, .62);
    const nextB = P(fx + sw*.32,  sh*.24, .40, -18, .8);
    const pastA = P(fx + sw*.22, -sh*.16,  .52, -14, .62);
    const pastB = P(fx + sw*.32, -sh*.24, .40, -18, .8);

    return [
      // S[0]: fan spread — all 3 visible (screenshot 2)
      spread,
      // S[1]: Discover — Refer Now in focus
      { 'eco-refer': focus,  'eco-console': nextA, 'eco-people': nextB },
      // S[2]: Recruit — Console in focus
      { 'eco-refer': pastA, 'eco-console': focus,  'eco-people': nextA },
      // S[3]: Manage — Seek People in focus
      { 'eco-refer': pastB, 'eco-console': pastA,  'eco-people': focus },
    ];
  };

  const measure = () => {
    sw = stage.clientWidth; sh = stage.clientHeight;
    ww = Math.round(Math.min(sw * .55, 980, (sh - 120) * 1.45));
    H  = ww * 440 / 680 + 32;
    keys.forEach(k => { if (pw[k]) pw[k].style.width = ww + 'px'; });
    if (orbit) orbit.setAttribute('viewBox', '0 0 ' + sw + ' ' + sh);
    S  = buildStates();
    // Use orbit spread state (S[3]) to position orbit geometry
    const u  = S[3], cx = sw / 2, cy = sh / 2;
    const cs = keys.map(k => ({ x: cx + u[k].x, y: cy + u[k].y, b: cy + u[k].y + (H * u[k].s) / 2 - 16 }));
    geo = { cx, cy: cy + sh * .15, rx: sw * .44, ry: sh * .27, cs };
    ['eco-ring', 'eco-ring2'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', geo.cx); e.setAttribute('cy', geo.cy);
      e.setAttribute('rx', geo.rx); e.setAttribute('ry', geo.ry);
    });
    const nb = cs.map(c => ({ x: c.x, y: c.b + 26 }));
    if ($('eco-link')) $('eco-link').setAttribute('d',
      `M${nb[0].x},${nb[0].y} Q${(nb[0].x+nb[1].x)/2},${nb[0].y+34} ${nb[1].x},${nb[1].y}` +
      ` Q${(nb[1].x+nb[2].x)/2},${nb[1].y+34} ${nb[2].x},${nb[2].y}`
    );
    nb.forEach((n, i) => {
      const c = $('eco-n' + i); const t = $('eco-t' + i);
      if (c) { c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); }
      if (t) { t.setAttribute('x', n.x);  t.setAttribute('y', n.y + 28); }
    });
  };

  const spin = ts => {
    if (orbitOp <= 0 || !active || !orbit) { spinId = 0; return; }
    const a = ts / 5200;
    const x = geo.cx + geo.rx * Math.cos(a);
    const y = geo.cy + geo.ry * Math.sin(a);
    ['eco-spark', 'eco-halo'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', x); e.setAttribute('cy', y);
    });
    spinId = requestAnimationFrame(spin);
  };

  const update = () => {
    if (!active || !S) return;

    const r     = story.getBoundingClientRect();
    const total = story.offsetHeight - innerHeight;
    const p     = clamp(-r.top / total);
    const T     = p * 4;                        // 4 steps: spread, Discover, Recruit, Manage
    const i     = Math.min(3, Math.floor(T));   // 0,1,2,3
    const e     = ease(clamp((T - i - .22) / .56));
    const t     = i + e;
    const cur   = {};

    keys.forEach(k => {
      if (!pw[k]) return;
      const a  = S[i][k], b = S[Math.min(i + 1, 3)][k];
      const v  = {
        x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e),
        s: lerp(a.s, b.s, e), r: lerp(a.r, b.r, e),
        d: lerp(a.d, b.d, e)
      };
      cur[k] = v;
      const el = pw[k];
      el.style.transform = `translate(-50%,-50%) translate3d(${v.x.toFixed(1)}px,${v.y.toFixed(1)}px,0) rotateY(${v.r.toFixed(2)}deg) scale(${v.s.toFixed(4)})`;
      el.style.setProperty('--d', v.d.toFixed(3));
      el.style.zIndex = Math.round(v.s * 100);
    });

    stage.style.setProperty('--k1', clamp((T - 1.1) / .4).toFixed(3));
    stage.style.setProperty('--col', (3 * clamp((T - 1.5) / .6)).toFixed(3));
    stage.style.setProperty('--k3', clamp((T - 2.75) / .45).toFixed(3));

    // 3 captions map to T steps 1, 2, 3 (data-cap 1,2,3)
    // T=0 is the spread view with no caption shown
    caps.forEach((c, n) => {
      const d  = t - (n + 1);                   // n=0→Discover at T=1
      const op = clamp(1 - Math.abs(d) * 2.4);
      const tr = `translateY(calc(-50% + ${(-d * 40).toFixed(1)}px))`;
      c.style.opacity   = op.toFixed(3);
      c.style.transform = tr;
      c.inert = op < .05;
    });

    if (hint) hint.style.opacity = clamp(1 - T * 3).toFixed(3);

    // Handoff chip between steps
    if ((i === 0 || i === 1) && e > 0 && e < 1) {
      const from = cur[keys[i]], to = cur[keys[i + 1]];
      if (from && to) {
        const fx0 = from.x - ww * from.s * .16, fy0 = from.y - H * from.s * .12;
        const tx0 = to.x   - ww * to.s   * (i === 0 ? .3 : .22);
        const ty0 = to.y   - H  * to.s   * (i === 0 ? .1 : .3);
        const hx  = lerp(fx0, tx0, e);
        const hy  = lerp(fy0, ty0, e) - Math.sin(Math.PI * e) * 70;
        if (handoffT) handoffT.textContent = i === 0 ? 'Shortlisted · to Console' : 'Offer accepted · to Seek People';
        if (handoff) {
          handoff.style.transform = `translate(-50%,-50%) translate3d(${hx.toFixed(1)}px,${hy.toFixed(1)}px,0)`;
          handoff.style.opacity   = Math.sin(Math.PI * e).toFixed(3);
        }
      }
    } else {
      if (handoff) handoff.style.opacity = '0';
    }

    // Orbit removed — skip opacity/spin updates
    orbitOp = 0;
    if (orbit) orbit.style.opacity = '0';
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); }
  };

  const setMode = () => {
    active = mqW.matches && !mqR.matches;
    // Apply active class directly on story — independent of html.pinned
    story.classList.toggle('eco-active', active);
    if (active) measure();
    update();
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { if (active) measure(); update(); });
  mqW.addEventListener('change', setMode);
  mqR.addEventListener('change', setMode);
  setMode();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { if (active) { measure(); update(); } });
  }
}

/* ─────────────────────────────────────────────
   Section 2 — Static orbit showcase
   Positions the 3 windows in orbit spread and
   runs the spinning spark. No scroll-pin.
───────────────────────────────────────────── */
function initStaticStory() {
  const story = document.getElementById('story');
  if (!story) return;

  const stage  = story.querySelector('.stage-static');
  if (!stage) return;

  const keys   = ['refer', 'console', 'people'];
  const pw     = {};
  keys.forEach(k => { pw[k] = stage.querySelector('.pw[data-key="' + k + '"]'); });
  const orbit  = document.getElementById('orbit');
  const $      = id => document.getElementById(id);
  const mqR    = matchMedia('(prefers-reduced-motion: reduce)');

  let sw = 0, sh = 0, ww = 0, H = 0, geo = null, spinId = 0;

  const P = (x, y, s, r) => ({ x, y, s, r });

  const measure = () => {
    sw = stage.clientWidth;
    sh = stage.clientHeight;
    // Window width: 48% of stage, max 720px — leaves gap between windows
    ww = Math.round(Math.min(sw * .48, 720, (sh - 40) * 1.5));
    H  = ww * 440 / 680 + 32;

    // Orbit spread — wide horizontal gap, side windows slightly lower
    const spread = {
      refer:   P(-sw * .32, sh * .06, .78,  7),
      console: P( 0,        sh * .00, .88,  0),
      people:  P( sw * .32, sh * .06, .78, -7),
    };

    keys.forEach(k => {
      if (!pw[k]) return;
      const v = spread[k];
      pw[k].style.width     = ww + 'px';
      pw[k].style.transform = `translate(-50%,-50%) translate3d(${v.x.toFixed(1)}px,${v.y.toFixed(1)}px,0) rotateY(${v.r}deg) scale(${v.s})`;
      pw[k].style.zIndex    = Math.round(v.s * 100);
      pw[k].style.setProperty('--d', '0');
    });

    // Orbit SVG geometry
    if (!orbit) return;
    const cx = sw / 2, cy = sh / 2;
    geo = { cx, cy: cy + sh * .12, rx: sw * .42, ry: sh * .26 };
    orbit.setAttribute('viewBox', `0 0 ${sw} ${sh}`);

    ['o-ring', 'o-ring2'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', geo.cx); e.setAttribute('cy', geo.cy);
      e.setAttribute('rx', geo.rx); e.setAttribute('ry', geo.ry);
    });

    // Link path connecting node positions
    const nodeXs = [cx + spread.refer.x, cx + spread.console.x, cx + spread.people.x];
    const nodeY  = cy + spread.refer.y + H * spread.refer.s / 2 + 30;
    const link = $('o-link');
    if (link) link.setAttribute('d',
      `M${nodeXs[0]},${nodeY} Q${(nodeXs[0]+nodeXs[1])/2},${nodeY+32} ${nodeXs[1]},${nodeY}` +
      ` Q${(nodeXs[1]+nodeXs[2])/2},${nodeY+32} ${nodeXs[2]},${nodeY}`
    );
    nodeXs.forEach((nx, i) => {
      const n = $('o-n' + i); if (!n) return;
      n.setAttribute('cx', nx); n.setAttribute('cy', nodeY);
    });
  };

  // Spinning spark
  const spin = ts => {
    if (!geo) { spinId = 0; return; }
    const a = ts / 5200;
    const x = geo.cx + geo.rx * Math.cos(a);
    const y = geo.cy + geo.ry * Math.sin(a);
    ['o-spark', 'o-halo'].forEach(id => {
      const e = $(id); if (!e) return;
      e.setAttribute('cx', x); e.setAttribute('cy', y);
    });
    spinId = requestAnimationFrame(spin);
  };

  measure();
  window.addEventListener('resize', measure);

  if (!mqR.matches) {
    spinId = requestAnimationFrame(spin);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }
}

/* ─────────────────────────────────────────────
   Ecosystem tab switcher (Section 4)
   Clicking Refer Now / Console / Seek People
   animates the matching window to the cinematic
   focus position and dims the others.
   Also wires the spotlight on the heading zone.
───────────────────────────────────────────── */
function initEcoTabs() {
  const tabs = [...document.querySelectorAll('#ecosystem .ptab')];
  if (!tabs.length) return;

  const story = document.getElementById('eco-story');
  if (!story) return;

  const stage = story.querySelector('.stage');
  if (!stage) return;

  // Keys match data-tab on buttons and data-key (prefixed) on .pw elements
  const KEY_MAP = { refer: 'eco-refer', console: 'eco-console', people: 'eco-people' };
  const TAB_ORDER = ['refer', 'console', 'people']; // tab index → key

  const getWin = key => stage.querySelector(`.pw[data-key="${KEY_MAP[key]}"]`);

  let activeKey = 'console'; // default active tab

  /* ── Transition helper ── */
  const TR = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .45s ease, filter .45s ease, z-index 0s';

  /* ── Build cinematic positions on demand ── */
  const getPositions = (focusKey) => {
    const sw = stage.clientWidth;
    const sh = stage.clientHeight;
    const ww = Math.round(Math.min(sw * .48, 700, (sh - 200) * 1.35));
    const H  = ww * 440 / 680 + 32;
    const fx = sw * .17;

    // focus: centred and big
    const focus = { x: fx, y: 0,           s: 1.04, r: -5,  op: 1,    bright: 1 };
    // one step behind: slightly right, below, smaller
    const nextA = { x: fx + sw*.20, y: sh*.17,  s: .60,  r: -14, op: 0.70, bright: 0.75 };
    const nextB = { x: fx + sw*.30, y: sh*.25,  s: .48,  r: -18, op: 0.45, bright: 0.55 };
    // one step ahead: slightly right, above, smaller
    const pastA = { x: fx + sw*.20, y: -sh*.17, s: .60,  r: -14, op: 0.70, bright: 0.75 };
    const pastB = { x: fx + sw*.30, y: -sh*.25, s: .48,  r: -18, op: 0.45, bright: 0.55 };

    // Map each window to a position depending on which is in focus
    const order  = TAB_ORDER; // ['refer','console','people']
    const fi     = order.indexOf(focusKey);
    const slots  = [pastB, pastA, focus, nextA, nextB];
    // fi=0 → refer:focus, console:nextA, people:nextB
    // fi=1 → refer:pastA, console:focus, people:nextA
    // fi=2 → refer:pastB, console:pastA, people:focus
    return {
      refer:   slots[2 - fi],
      console: slots[3 - fi],
      people:  slots[4 - fi],
    };
  };

  /* ── Apply positions to windows ── */
  const applyPositions = (focusKey) => {
    const pos = getPositions(focusKey);
    TAB_ORDER.forEach(key => {
      const el = getWin(key);
      if (!el) return;
      const v = pos[key];
      el.style.transition = TR;
      el.style.transform  = `translate(-50%,-50%) translate3d(${v.x.toFixed(1)}px,${v.y.toFixed(1)}px,0) rotateY(${v.r.toFixed(2)}deg) scale(${v.s.toFixed(4)})`;
      el.style.opacity    = v.op.toFixed(3);
      el.style.filter     = `brightness(${v.bright})`;
      el.style.zIndex     = Math.round(v.s * 100);
      // Reset the --d overlay that dims the window
      el.style.setProperty('--d', (1 - v.bright * 0.9).toFixed(3));
    });
  };

  /* ── Set active tab (buttons + windows) ── */
  const setActive = (key) => {
    if (key === activeKey) return;
    activeKey = key;

    // Update tab button states
    tabs.forEach(t => {
      const on = t.dataset.tab === key;
      t.classList.toggle('ptab--active', on);
      t.setAttribute('aria-selected', String(on));
    });

    // Animate windows — only when eco-story is NOT in eco-active pinned mode
    // (during pinned scroll the scroll handler owns transforms)
    if (!story.classList.contains('eco-active')) {
      applyPositions(key);
    } else {
      // In pinned mode: just brighten the focused window, dim others
      TAB_ORDER.forEach(k => {
        const el = getWin(k);
        if (!el) return;
        el.style.transition = 'filter .4s ease';
        el.style.filter = k === key ? 'brightness(1.15)' : 'brightness(0.5)';
      });
    }
  };

  // Init: apply default positions (non-pinned mode startup)
  if (!story.classList.contains('eco-active')) {
    applyPositions(activeKey);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => setActive(tab.dataset.tab));
  });

  // Keyboard navigation
  const tabList = document.querySelector('#ecosystem .ptabs');
  if (tabList) {
    tabList.addEventListener('keydown', e => {
      const idx = tabs.findIndex(t => t === document.activeElement);
      if (idx === -1) return;
      let next = -1;
      if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  next = (idx - 1 + tabs.length) % tabs.length;
      if (next !== -1) { e.preventDefault(); tabs[next].focus(); setActive(tabs[next].dataset.tab); }
    });
  }

  /* ── Spotlight on the Section 4 heading zone ── */
  // (handled by the global torch — see initTorch)
}
