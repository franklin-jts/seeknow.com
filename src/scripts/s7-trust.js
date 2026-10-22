export default function init() {
    /* ================================================================
       PROOF CONTENT — only approved, verified items are ever shown.
       Add entries with approved:true once publication is confirmed.
       showPlaceholders: true  → development preview shows labelled placeholders
       showPlaceholders: false → production: empty blocks stay hidden
       ================================================================ */
    const PROOF = {
      showPlaceholders: true,
      logos: [
        // { name: 'Organisation name', src: '/assets/clients/name.svg', kind: 'software' | 'services', approved: true }
      ],
      testimonials: [
        // { quote: 'Exact approved wording', name: 'Full name', role: 'Designation', org: 'Organisation', photo: '/assets/people/name.jpg', kind: 'software' | 'services', approved: true }
      ],
      facts: [
        // { value: '12', suffix: '+', label: 'Years in business', context: 'Company records, Oct 2026', scope: 'company' | 'product', approved: true }
      ]
    };
    const ROUTES = { contact: '#', solutions: '#' }; // replace with the existing contact and solutions routes
    const KIND = { software: 'Seek Now software customer', services: 'Workforce services client' };
    const SCOPE = { company: 'Company-level', product: 'Seek Now product' };

    const sec = document.getElementById('trust');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    const ok = arr => arr.filter(x => x && x.approved === true);

    /* Part 1 · logos */
    const logos = ok(PROOF.logos);
    const rel = document.getElementById('s7-rel'), trackEl = document.getElementById('s7-track'), note = document.getElementById('s7-mq-note');
    if (logos.length || PROOF.showPlaceholders) {
      rel.hidden = false;
      let tiles;
      if (logos.length) {
        tiles = logos.map(l => `<div class="s7-logo"><img src="${esc(l.src)}" alt="${esc(l.name)}" loading="lazy" decoding="async"></div>`).join('');
        const kinds = [...new Set(logos.map(l => l.kind))];
        if (kinds.length > 1) note.textContent = 'Includes Seek Now software customers and workforce services clients.';
      } else {
        tiles = Array.from({ length: 8 }, (_, i) => `<div class="s7-logo ph"><div><b>Approved logo ${i + 1}</b><small>Dev placeholder</small></div></div>`).join('');
        note.innerHTML = '<span class="s7-dev">Dev placeholder · add approved logos to PROOF.logos</span>';
      }
      trackEl.innerHTML = `<div style="display:flex;gap:20px">${tiles}</div><div style="display:flex;gap:20px" aria-hidden="true">${tiles}</div>`;
      trackEl.lastElementChild.querySelectorAll('img').forEach(i => i.alt = '');
    }

    /* Part 2 · testimonials */
    const tst = ok(PROOF.testimonials);
    const wrap = document.getElementById('s7-tst'), slidesEl = document.getElementById('s7-slides');
    const prog = document.getElementById('s7-prog'), count = document.getElementById('s7-count');
    const prev = document.getElementById('s7-prev'), next = document.getElementById('s7-next');
    let items = tst, isPh = false;
    if (!tst.length && PROOF.showPlaceholders) {
      isPh = true;
      items = [{ quote: 'An approved customer testimonial will appear here, in the customer’s exact words, once it has been verified for publication.', name: 'Customer name', role: 'Designation', org: 'Organisation', kind: null }];
      document.getElementById('s7-tst-dev').hidden = false;
    }
    let cur = 0;
    if (items.length) {
      wrap.hidden = false;
      slidesEl.innerHTML = items.map((t, i) => {
        const ini = t.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('');
        const pic = t.photo ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}" loading="lazy" decoding="async" width="52" height="52">` : `<span class="ini${isPh ? ' ph' : ''}" aria-hidden="true">${esc(ini)}</span>`;
        return `<figure class="s7-slide${isPh ? ' ph' : ''}${i === 0 ? ' on' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}"${i ? ' aria-hidden="true"' : ''}>
          <blockquote><p style="margin:0">${esc(t.quote)}</p></blockquote>
          <figcaption class="s7-att">${pic}<div><b>${esc(t.name)}</b><span>${esc(t.role)}, ${esc(t.org)}</span>${t.kind ? `<span class="s7-kind">${esc(KIND[t.kind] || '')}</span>` : ''}</div></figcaption>
        </figure>`;
      }).join('');
      prog.innerHTML = items.map((_, i) => `<i class="${i === 0 ? 'on' : ''}"></i>`).join('');
      const slides = [...slidesEl.children], bars = [...prog.children];
      const go = n => {
        cur = (n + items.length) % items.length;
        slides.forEach((s, i) => { const on = i === cur; s.classList.toggle('on', on); if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true'); });
        bars.forEach((b, i) => b.classList.toggle('on', i === cur));
        count.textContent = `${String(cur + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
      };
      prev.addEventListener('click', () => go(cur - 1));
      next.addEventListener('click', () => go(cur + 1));
      wrap.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); prev.focus(); } if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); next.focus(); } });
      prev.disabled = next.disabled = items.length < 2;
      go(0);
    }

    /* Part 3 · facts */
    const facts = ok(PROOF.facts);
    const fwrap = document.getElementById('s7-facts'), fl = document.getElementById('s7-fl');
    let fitems = facts, fph = false;
    if (!facts.length && PROOF.showPlaceholders) {
      fph = true;
      document.getElementById('s7-facts-dev').hidden = false;
      fitems = [
        { value: '—', label: 'Years of business experience', context: 'Verified figure and date required', scope: 'company' },
        { value: '—', label: 'Active business relationships', context: 'Verified figure and date required', scope: 'company' },
        { value: '—', label: 'Industries served', context: 'Verified figure and date required', scope: 'company' },
        { value: '—', label: 'Employees supported on Seek Now', context: 'Verified figure and date required', scope: 'product' }
      ];
    }
    if (fitems.length) {
      fwrap.hidden = false;
      fl.innerHTML = fitems.map(f => `<li class="s7-f${fph ? ' ph' : ''}"><span class="v">${esc(f.value)}${f.suffix ? `<sup>${esc(f.suffix)}</sup>` : ''}</span><span class="l">${esc(f.label)}</span>${f.context ? `<span class="c">${esc(f.context)}</span>` : ''}${f.scope ? `<span class="scope">${esc(SCOPE[f.scope] || f.scope)}</span>` : ''}</li>`).join('');
    }

    /* Gentle entrances (only for content below the fold) */
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.remove('pre', 'dim');
        io.unobserve(e.target);
      }), { threshold: .25 });
      [...sec.querySelectorAll('[data-f]'), wrap].forEach(el => {
        if (el.hidden) return;
        if (el.getBoundingClientRect().top > innerHeight * .9) { if (el !== wrap) el.classList.add('pre'); io.observe(el); }
        else el.classList.remove('dim');
      });
    } else wrap.classList.remove('dim');

    /* Headline words brighten calmly as the band scrolls through */
    const band = document.getElementById('s7-band');
    const words = [...band.querySelectorAll('h3 .w')];
    if (!reduce) {
      let tk = false;
      const upd = () => {
        tk = false;
        const r = band.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (innerHeight * .55)));
        words.forEach((w, i) => { const k = Math.min(1, Math.max(0, p * words.length - i)); w.style.setProperty('--wo', (.22 + .78 * k).toFixed(3)); });
      };
      addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(upd); } }, { passive: true });
      upd();
    }
  }
