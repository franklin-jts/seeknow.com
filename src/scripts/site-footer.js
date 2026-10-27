export default function init() {
  /* ================================================================
     SITE LINKS — single place for every route used by the finale and footer.
     null = no live destination yet. Never point these at invented URLs.
     showPending: true shows unlinked items as dotted text in previews;
     set false for production so missing destinations are simply omitted.
     ================================================================ */
  const SITE = {
    showPending: true,
    links: {
      demo: null, contact: null,
      referNow: '/refer-now', console: '/console', seekPeople: '/seek-people', pricing: '#pricing',
      wos: '#platform', recruitment: null, employee: null, hrms: null, solutions: null,
      about: null, careers: null,
      resources: null, support: null, privacy: null, terms: null, cookies: null
    },
    social: [
      // { name: 'LinkedIn', url: 'https://www.linkedin.com/company/…' }  ← official profiles only
    ],
    legalEntity: null // e.g. 'JTS Business Services OPC Private Limited' once confirmed for public display
  };

  /* finale CTAs */
  const fin = document.getElementById('finale');
  if (fin) {
    fin.querySelectorAll('[data-route]').forEach(a => {
      const r = SITE.links[a.dataset.route];
      if (r) a.setAttribute('href', r);
      else { a.setAttribute('href', '#'); a.dataset.pending = 'true'; a.title = 'Destination not connected yet'; }
    });
  }

  /* footer links */
  const ft = document.getElementById('site-footer');
  let pending = 0;
  ft.querySelectorAll('a[data-link]').forEach(a => {
    const r = SITE.links[a.dataset.link];
    if (r) { a.setAttribute('href', r); return; }
    pending++;
    if (SITE.showPending) { const s = document.createElement('span'); s.className = 'ft-pend'; s.textContent = a.textContent; s.title = 'Route not configured yet'; a.replaceWith(s); }
    else a.closest('li').remove();
  });
  ft.querySelectorAll('.ft-cols nav').forEach(n => { if (!n.querySelector('li')) n.remove(); });
  if (pending && SITE.showPending) document.getElementById('ft-dev').hidden = false;

  /* legal strip mirrors the configured legal links */
  const legal = document.getElementById('ft-legal');
  [['privacy','Privacy Policy'],['terms','Terms of Service'],['cookies','Cookie Policy']].forEach(([k, t]) => {
    const r = SITE.links[k]; if (!r) return;
    const li = document.createElement('li'); const a = document.createElement('a'); a.href = r; a.textContent = t; li.appendChild(a); legal.appendChild(li);
  });

  /* social (official profiles only) */
  const ICON = {
    LinkedIn: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/>',
    Instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3c-2.4 0-2.7 0-3.7.06C5.6 3.2 3.2 5.6 3.06 8.3 3 9.3 3 9.6 3 12s0 2.7.06 3.7c.14 2.7 2.54 5.1 5.24 5.24 1 .06 1.3.06 3.7.06s2.7 0 3.7-.06c2.7-.14 5.1-2.54 5.24-5.24.06-1 .06-1.3.06-3.7s0-2.7-.06-3.7C20.8 5.6 18.4 3.2 15.7 3.06 14.7 3 14.4 3 12 3z"/>',
    Facebook: '<path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.3 4.3c-2.3 0-3.8 1.4-3.8 3.97v2.23H8v3h2.5V21z"/>',
    YouTube: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/>'
  };
  const soc = document.getElementById('ft-soc');
  SITE.social.filter(s => s && s.url && ICON[s.name]).forEach(s => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Seek Now on ${s.name} (opens in a new tab)"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[s.name]}</svg></a>`;
    soc.appendChild(li);
  });
  soc.hidden = !soc.children.length;

  document.getElementById('ft-year').textContent = new Date().getFullYear();
  if (SITE.legalEntity) document.getElementById('ft-entity').textContent = ' ' + SITE.legalEntity + '.';

  /* collapsible columns on small screens only */
  const mqS = matchMedia('(max-width: 560px)');
  const syncCols = () => ft.querySelectorAll('.ft-cols details').forEach(d => { d.open = !mqS.matches; });
  mqS.addEventListener('change', syncCols); syncCols();

  /* finale: arrival, staged headline, arc, gentle lift into the footer */
  if (!fin) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  fin.classList.add('s10-js');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  if (!reduce && 'IntersectionObserver' in window && fin.getBoundingClientRect().top > innerHeight * .8) {
    fin.classList.add('wait');
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { fin.classList.remove('wait'); io.disconnect(); } }, { threshold: .35 });
    io.observe(fin.querySelector('.s10-h2'));
  }
  let tk = false;
  const upd = () => {
    tk = false;
    const r = fin.getBoundingClientRect(), vh = innerHeight;
    const arrive = clamp((vh - r.top) / (vh * .9));
    const arc = clamp((vh * .55 - r.top) / (vh * .7));
    const out = clamp((vh - r.bottom) / (vh * .6));
    fin.style.setProperty('--deep', arrive.toFixed(3));
    fin.style.setProperty('--arc', (.55 + .6 * arc).toFixed(3));
    fin.style.setProperty('--lift', out.toFixed(3));
    fin.style.setProperty('--fade', out.toFixed(3));
  };
  if (reduce) { fin.style.setProperty('--deep', 1); fin.style.setProperty('--arc', .95); }
  else { addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(upd); } }, { passive: true }); addEventListener('resize', upd); upd(); }

  /* restrained pointer-following light (desktop fine pointer only) */
  const mqP = matchMedia('(hover: hover) and (pointer: fine)');
  if (!reduce) fin.addEventListener('pointermove', e => {
    if (!mqP.matches) return;
    const r = fin.getBoundingClientRect();
    const x = 50 + ((e.clientX - r.left) / r.width - .5) * 14, y = 62 + ((e.clientY - r.top) / r.height - .5) * 10;
    fin.style.setProperty('--px', x.toFixed(2) + '%'); fin.style.setProperty('--py', y.toFixed(2) + '%');
  });
  fin.addEventListener('pointerleave', () => { fin.style.setProperty('--px', '50%'); fin.style.setProperty('--py', '62%'); });
}
