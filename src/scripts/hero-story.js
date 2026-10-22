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

  const mqW = matchMedia('(min-width: 1024px) and (min-height: 620px)');
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
    return [
      { refer: P(-sw*.29, top(.8)+44, .8, 14, .16), console: P(0, top(1), 1, 0, 0), people: P(sw*.29, top(.8)+44, .8, -14, .16) },
      { refer: focus, console: nextA, people: nextB },
      { refer: pastA, console: focus, people: nextA },
      { refer: pastB, console: pastA, people: focus },
      { refer: P(-sw*.3, sh*.17, .58, 8, 0), console: P(0, sh*.12, .62, 0, 0), people: P(sw*.3, sh*.17, .58, -8, 0) }
    ];
  };

  const measure = () => {
    sw = stage.clientWidth; sh = stage.clientHeight;
    ww = Math.round(Math.min(sw * .5, 760, (sh - 200) * 1.45));
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
        const d = t - (n + 1);
        op = clamp(1 - Math.abs(d) * 2.4);
        tr = `translateY(calc(-50% + ${(-d * 40).toFixed(1)}px))`;
      } else {
        op = clamp((t - 3.45) / .45);
        tr = `translate(-50%, ${((1 - op) * 24).toFixed(1)}px)`;
      }
      c.style.opacity = op.toFixed(3);
      c.style.transform = tr;
      c.inert = op < .05;
    });

    hint.style.opacity = clamp(1 - T * 5).toFixed(3);

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

    orbitOp = clamp((t - 3.3) / .5);
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
}

function initProductCards() {
  /* ── Scroll-in reveals ── */
  const revealEls = [
    document.getElementById('pc-head'),
    document.getElementById('pc-tabs'),
    document.getElementById('pc-strip'),
  ].filter(Boolean);

  const cards = [...document.querySelectorAll('.pc-card')];

  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealIO.observe(el));
  cards.forEach(c => revealIO.observe(c));

  /* ── Tab switcher ── */
  const tabs = [...document.querySelectorAll('.pc-tab')];

  const setActive = idx => {
    tabs.forEach((t, i) => {
      const on = i === idx;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    cards.forEach((c, i) => {
      c.classList.toggle('pc-dimmed', i !== idx);
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => setActive(i));
  });
}
