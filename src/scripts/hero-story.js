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

  /* ---- Pinned story ---- */
  const story   = document.getElementById('story');
  const stage   = story.querySelector('.stage');
  const keys    = ['refer', 'console', 'people'];
  const pw      = {};
  keys.forEach(k => { pw[k] = stage.querySelector('.pw[data-key="' + k + '"]'); });
  const caps    = [...stage.querySelectorAll('[data-cap]')];
  const hint    = document.getElementById('hint');
  const handoff = document.getElementById('handoff');
  const handoffT= document.getElementById('handoff-t');
  const orbit   = document.getElementById('orbit');
  const $       = id => document.getElementById(id);

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp  = (a, b, t) => a + (b - a) * t;
  const ease  = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

  const mqW = matchMedia('(min-width: 860px) and (min-height: 560px)');
  const mqR = matchMedia('(prefers-reduced-motion: reduce)');
  let pinned = false, sw = 0, sh = 0, ww = 0, H = 0, S = null, orbitOp = 0, spinId = 0, geo = null;

  const buildStates = () => {
    const fx   = sw * .17;
    const top  = s => 104 + H * s / 2 - sh / 2;
    const P    = (x, y, s, r, d) => ({ x, y, s, r, d });
    const focus = P(fx, 0, 1.04, -5, 0);
    const nextA = P(fx + sw*.2,  sh*.17,  .6, -14, .62);
    const nextB = P(fx + sw*.3,  sh*.25, .48, -18, .8);
    const pastA = P(fx + sw*.2, -sh*.17,  .6, -14, .62);
    const pastB = P(fx + sw*.3, -sh*.25, .48, -18, .8);
    const orbit = { refer: P(-sw*.3, sh*.17, .58, 8, 0), console: P(0, sh*.12, .62, 0, 0), people: P(sw*.3, sh*.17, .58, -8, 0) };
    return [
      // S[0]: orbit view first — shown immediately after hero
      orbit,
      // S[1]: 01 Discover — Refer Now in focus
      { refer: focus, console: nextA, people: nextB },
      // S[2]: 02 Recruit — Console in focus
      { refer: pastA, console: focus, people: nextA },
      // S[3]: 03 Manage — Seek People in focus
      { refer: pastB, console: pastA, people: focus },
      // S[4]: final spread (same as orbit — smooth loop back)
      orbit,
    ];
  };

  const measure = () => {
    sw = stage.clientWidth; sh = stage.clientHeight;
    ww = Math.round(Math.min(sw * .48, 700, (sh - 200) * 1.35));
    H  = ww * 440 / 680 + 32;
    keys.forEach(k => { pw[k].style.width = ww + 'px'; });
    orbit.setAttribute('viewBox', '0 0 ' + sw + ' ' + sh);
    S  = buildStates();
    const u  = S[4], cx = sw / 2, cy = sh / 2;
    const cs = keys.map(k => ({ x: cx + u[k].x, y: cy + u[k].y, b: cy + u[k].y + (H * u[k].s) / 2 - 16 }));
    geo = { cx, cy: cy + sh * .15, rx: sw * .44, ry: sh * .27, cs };
    ['o-ring', 'o-ring2'].forEach(id => {
      const e = $(id);
      e.setAttribute('cx', geo.cx); e.setAttribute('cy', geo.cy);
      e.setAttribute('rx', geo.rx); e.setAttribute('ry', geo.ry);
    });
    const nb = cs.map(c => ({ x: c.x, y: c.b + 26 }));
    $('o-link').setAttribute('d',
      `M${nb[0].x},${nb[0].y} Q${(nb[0].x+nb[1].x)/2},${nb[0].y+34} ${nb[1].x},${nb[1].y}` +
      ` Q${(nb[1].x+nb[2].x)/2},${nb[1].y+34} ${nb[2].x},${nb[2].y}`
    );
    nb.forEach((n, i) => {
      const c = $('o-n' + i); c.setAttribute('cx', n.x); c.setAttribute('cy', n.y);
      const t = $('o-t' + i); t.setAttribute('x', n.x);  t.setAttribute('y', n.y + 28);
    });
  };

  const spin = ts => {
    if (orbitOp <= 0 || !pinned) { spinId = 0; return; }
    const a = ts / 5200;
    const x = geo.cx + geo.rx * Math.cos(a);
    const y = geo.cy + geo.ry * Math.sin(a);
    ['o-spark', 'o-halo'].forEach(id => {
      const e = $(id); e.setAttribute('cx', x); e.setAttribute('cy', y);
    });
    spinId = requestAnimationFrame(spin);
  };

  const update = () => {
    header.classList.toggle('scrolled', scrollY > 12);

    /* Hero logo → nav logo */
    const heroLogo = document.getElementById('hero-logo');
    if (heroLogo) {
      document.body.classList.toggle('hero-passed', heroLogo.getBoundingClientRect().bottom < 80);
    }

    if (!pinned || !S) return;

    const r     = story.getBoundingClientRect();
    const total = story.offsetHeight - innerHeight;
    const p     = clamp(-r.top / total);
    const T     = p * 4;
    const i     = Math.min(3, Math.floor(T));
    const e     = ease(clamp((T - i - .22) / .56));
    const t     = i + e;
    const cur   = {};

    keys.forEach(k => {
      const a  = S[i][k], b = S[i + 1][k];
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

    stage.style.setProperty('--k1', clamp((T - .7)  / .4).toFixed(3));
    stage.style.setProperty('--col', (3 * clamp((T - 1.72) / .6)).toFixed(3));
    stage.style.setProperty('--k3', clamp((T - 2.75) / .45).toFixed(3));

    caps.forEach((c, n) => {
      let op, tr;
      if (n < 3) {
        // caps 0,1,2 = data-cap 1,2,3 (Discover, Recruit, Manage)
        // shift by 1 so they map to T steps 1,2,3
        const d = t - (n + 1);
        op = clamp(1 - Math.abs(d) * 2.4);
        tr = `translateY(calc(-50% + ${(-d * 40).toFixed(1)}px))`;
      } else {
        // cap-u (data-cap="4") — "Three products" — show at T≈0, fade out by T≈0.5
        op = clamp(1 - T / 0.5);
        tr = `translate(-50%, ${(T * 24).toFixed(1)}px)`;
      }
      c.style.opacity = op.toFixed(3);
      c.style.transform = tr;
      c.inert = op < .05;
    });

    hint.style.opacity = clamp(1 - T * 5).toFixed(3);

    // Handoff chip: shows during transitions between steps 1→2 and 2→3
    if ((i === 1 || i === 2) && e > 0 && e < 1) {
      const from = cur[keys[i - 1]], to = cur[keys[i]];
      const fx0 = from.x - ww * from.s * .16, fy0 = from.y - H * from.s * .12;
      const tx0 = to.x   - ww * to.s   * (i === 1 ? .3 : .22);
      const ty0 = to.y   - H  * to.s   * (i === 1 ? .1 : .3);
      const hx  = lerp(fx0, tx0, e);
      const hy  = lerp(fy0, ty0, e) - Math.sin(Math.PI * e) * 70;
      handoffT.textContent = i === 1 ? 'Shortlisted · to Console' : 'Offer accepted · to Seek People';
      handoff.style.transform = `translate(-50%,-50%) translate3d(${hx.toFixed(1)}px,${hy.toFixed(1)}px,0)`;
      handoff.style.opacity   = Math.sin(Math.PI * e).toFixed(3);
    } else {
      handoff.style.opacity = '0';
    }

    // orbit: show fully at T=0 (initial), fade out as user scrolls into step 1
    // and fade back in at the end (T>3.3)
    const orbitAtStart = clamp(1 - T / 0.6);
    const orbitAtEnd   = clamp((t - 3.3) / .5);
    orbitOp = Math.max(orbitAtStart, orbitAtEnd);
    orbit.style.opacity = orbitOp.toFixed(3);
    if (orbitOp > 0 && !spinId) spinId = requestAnimationFrame(spin);
  };

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    }
  };

  const setMode = () => {
    pinned = mqW.matches && !mqR.matches;
    root.classList.toggle('pinned', pinned);
    if (pinned) measure();
    update();
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { if (pinned) measure(); update(); });
  mqW.addEventListener('change', setMode);
  mqR.addEventListener('change', setMode);
  setMode();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { if (pinned) { measure(); update(); } });
  }

  /* ---- Product showcase animations (story-list section) ---- */
  initProductCards();

  /* ---- Ecosystem orbit preview animations ---- */
  initOrbitPreview();

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
