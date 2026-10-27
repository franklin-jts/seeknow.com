export default function init() {
    const ROUTES = { referNow: '#', console: '#', seekPeople: '#', platform: '#platform' }; // replace with the site's real product routes
    const sec = document.getElementById('ecosystem');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });
    sec.classList.add('s4-js');

    const tabs = [...sec.querySelectorAll('[role="tab"]')];
    const panels = [...sec.querySelectorAll('[role="tabpanel"]')];
    const ind = sec.querySelector('.pind');
    const track = document.getElementById('s4-sc');
    const mqC = matchMedia('(max-width: 1100px)');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mqTilt = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1101px)');
    let active = 1, lockUntil = 0, isOn = false;

    function moveInd() {
      const t = tabs[active];
      ind.style.width = t.offsetWidth + 'px';
      ind.style.transform = `translateX(${t.offsetLeft}px)`;
    }
    function countUp(el, from, to, dur) {
      if (reduce) { el.textContent = to; return; }
      const t0 = performance.now();
      const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    function setActive(i, { focus = false, scroll = true } = {}) {
      const changed = i !== active;
      active = i;
      tabs.forEach((t, j) => { const on = j === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      panels.forEach((p, j) => p.classList.toggle('is-active', j === i));
      moveInd();
      if (focus) tabs[i].focus();
      if (scroll && mqC.matches) {
        const p = panels[i];
        lockUntil = performance.now() + 700;
        track.scrollTo({ left: p.offsetLeft - (track.clientWidth - p.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      }
      if (changed && isOn) panels[i].querySelectorAll('[data-count]').forEach(el => { const n = +el.dataset.count; countUp(el, Math.round(n * .6), n, 700); });
    }

    tabs.forEach((t, i) => t.addEventListener('click', () => setActive(i)));
    sec.querySelector('[role="tablist"]').addEventListener('keydown', e => {
      const map = { ArrowRight: 1, ArrowLeft: -1 };
      let n = null;
      if (e.key in map) n = (active + map[e.key] + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); setActive(n, { focus: true }); }
    });
    panels.forEach((p, i) => p.addEventListener('click', e => { if (!e.target.closest('a') && i !== active) setActive(i, { scroll: mqC.matches }); }));

    // swipe sync for the carousel
    let sraf = 0;
    track.addEventListener('scroll', () => {
      if (sraf || !mqC.matches) return;
      sraf = requestAnimationFrame(() => {
        sraf = 0;
        if (performance.now() < lockUntil) return;
        const c = track.scrollLeft + track.clientWidth / 2;
        let best = 0, bd = Infinity;
        panels.forEach((p, i) => { const d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } });
        if (best !== active) setActive(best, { scroll: false });
      });
    }, { passive: true });

    // understated tilt + light follow (desktop, fine pointer only)
    panels.forEach(p => {
      p.addEventListener('pointermove', e => {
        if (!mqTilt.matches || reduce) return;
        const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        p.classList.add('tilting');
        p.style.setProperty('--ry', ((x - .5) * 4).toFixed(2) + 'deg');
        p.style.setProperty('--rx', ((.5 - y) * 3).toFixed(2) + 'deg');
        p.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        p.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      p.addEventListener('pointerleave', () => { p.classList.remove('tilting'); ['--rx','--ry','--mx','--my'].forEach(v => p.style.removeProperty(v)); });
    });

    // entrance + in-screen microinteractions
    const els = [...sec.querySelectorAll('[data-e]')];
    const turnOn = () => {
      if (isOn) return; isOn = true; sec.classList.add('on');
      sec.querySelectorAll('[data-count]').forEach(el => countUp(el, 0, +el.dataset.count, 1100));
    };
    if (!reduce && 'IntersectionObserver' in window) {
      els.forEach(el => { if (el.getBoundingClientRect().top > innerHeight * .92) el.classList.add('pre'); });
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const pi = panels.indexOf(e.target);
        if (pi >= 0) { setTimeout(() => e.target.classList.remove('pre'), pi * 120); setTimeout(turnOn, 450); }
        else e.target.classList.remove('pre');
        io.unobserve(e.target);
      }), { rootMargin: '0px 0px -10% 0px' });
      els.forEach(el => io.observe(el));
    } else { sec.classList.add('on'); isOn = true; }

    const init = () => { setActive(active, { scroll: mqC.matches }); };
    addEventListener('resize', () => moveInd());
    mqC.addEventListener('change', init);
    init();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);
  }
