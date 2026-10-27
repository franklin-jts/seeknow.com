export default function init() {
    const ROUTES = { solutions: '#' }; // replace with the existing Solutions route
    const sec = document.getElementById('roles');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });
    sec.classList.add('s5-js');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tabs = [...sec.querySelectorAll('.rtab')];
    const rcs = [...sec.querySelectorAll('.rc')];
    const lays = [...sec.querySelectorAll('.lay')];
    const ind = sec.querySelector('.rind');
    const stage = sec.querySelector('.stage5');
    const sweep = sec.querySelector('.sweep');
    const roles = ['founders', 'hr', 'recruiters', 'employees'];
    let cur = 0;

    function moveInd() {
      const t = tabs[cur];
      ind.style.width = t.offsetWidth + 'px';
      ind.style.height = t.offsetHeight + 'px';
      ind.style.bottom = 'auto';
      ind.style.transform = `translate(${t.offsetLeft}px, ${t.offsetTop - 6}px)`;
    }
    function setRole(i, focus) {
      const changed = i !== cur;
      cur = i;
      tabs.forEach((t, j) => { const on = j === i; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      rcs.forEach((r, j) => r.classList.toggle('is-on', j === i));
      lays.forEach((l, j) => { const on = j === i; l.classList.toggle('is-on', on); if (on) l.removeAttribute('aria-hidden'); else l.setAttribute('aria-hidden', 'true'); });
      stage.dataset.role = roles[i];
      moveInd();
      if (focus) tabs[i].focus();
      if (changed && !reduce) { sweep.classList.remove('go'); void sweep.offsetWidth; sweep.classList.add('go'); }
    }
    tabs.forEach((t, i) => t.addEventListener('click', () => setRole(i)));
    sec.querySelector('.rtabs').addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (cur + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (cur - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); setRole(n, true); }
    });

    if (!reduce && 'IntersectionObserver' in window && sec.getBoundingClientRect().top > innerHeight * .85) {
      sec.classList.add('wait');
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { sec.classList.remove('wait'); io.disconnect(); } }, { threshold: .12 });
      io.observe(sec.querySelector('.s5-intro'));
    }

    setRole(0);
    addEventListener('resize', moveInd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);
  }
