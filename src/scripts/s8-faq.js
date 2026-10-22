export default function init() {
    const ROUTES = { contact: '#', demo: '#', referNow: '#', console: '#', seekPeople: '#' }; // replace with existing routes
    const sec = document.getElementById('faq');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });
    sec.classList.add('s8-js');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tabs = [...sec.querySelectorAll('.s8-tab')];
    const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const ind = sec.querySelector('.s8-ind');
    let cur = 0;
    const moveInd = () => { const t = tabs[cur]; ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft}px)`; };
    function select(i, focus) {
      if (i === cur) { if (focus) tabs[i].focus(); return; }
      cur = i;
      tabs.forEach((t, j) => { const on = j === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = j !== i; p.classList.remove('enter'); });
      if (!reduce) { void panels[i].offsetWidth; panels[i].classList.add('enter'); }
      moveInd();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      if (focus) tabs[i].focus();
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
    sec.querySelector('.s8-tabs').addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight') n = (cur + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (cur - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); select(n, true); }
    });

    /* fallback for browsers without exclusive <details name>: keep one open per category */
    if (!('name' in HTMLDetailsElement.prototype)) {
      panels.forEach(p => p.addEventListener('toggle', e => {
        if (!e.target.open) return;
        p.querySelectorAll('details[open]').forEach(d => { if (d !== e.target) d.open = false; });
      }, true));
    }

    /* calm entrance: heading reveal + staggered rows, only when below the fold */
    if (!reduce && 'IntersectionObserver' in window && sec.getBoundingClientRect().top > innerHeight * .85) {
      sec.classList.add('wait');
      const rows = [...panels[0].children];
      rows.forEach((r, i) => { r.style.setProperty('--i', i); r.classList.add('pre'); });
      const io = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        sec.classList.remove('wait');
        rows.forEach(r => r.classList.remove('pre'));
        io.disconnect();
      }, { threshold: .15 });
      io.observe(sec.querySelector('.s8-grid'));
    }

    moveInd();
    addEventListener('resize', moveInd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);
  }
