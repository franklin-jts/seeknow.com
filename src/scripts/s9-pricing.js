export default function init() {
    /* ================================================================
       PRICING CONFIG — the single source of truth for this section.
       ratePaise: integer paise per user per month (e.g. ₹199 → 19900), or null = "Price on Request".
       tax: null until GST treatment is confirmed, e.g. { label: 'GST (18%)', rateBasisPoints: 1800 }.
       checkoutRoute: only set when a real subscription flow exists.
       quoteRoute: the existing enquiry page; selections are passed as query parameters.
       Any amount shown here is indicative — final billing must be recalculated server-side.
       ================================================================ */
    const PRICING = {
      currency: 'INR',
      billingPeriod: 'month',
      maxUsers: 100000,
      products: {
        referNow:   { name: 'Refer Now',   ratePaise: null },
        console:    { name: 'Console',     ratePaise: null },
        seekPeople: { name: 'Seek People', ratePaise: null }
      },
      tax: null,
      checkoutRoute: null,
      quoteRoute: null
    };

    /* Seek Now pricing calculation — pure, UI-independent, integer paise.
       calcSubscription(config, selection)
       config.products[id].ratePaise: integer (per user per month) or null when not published
       config.tax: null, or { label: 'GST', rateBasisPoints: 1800 } once confirmed
       selection: { [id]: { selected: boolean, users: integer } } */
    function calcSubscription(config, selection) {
      const lines = [];
      let known = 0, complete = true, any = false;
      for (const id of Object.keys(config.products)) {
        const s = selection[id];
        if (!s || !s.selected) continue;
        const users = Number.isInteger(s.users) && s.users >= 1 ? s.users : 1;
        const rate = config.products[id].ratePaise;
        const hasRate = Number.isInteger(rate) && rate >= 0;
        const subtotalPaise = hasRate ? rate * users : null;
        if (hasRate) known += subtotalPaise; else complete = false;
        any = true;
        lines.push({ id, name: config.products[id].name, users, ratePaise: hasRate ? rate : null, subtotalPaise });
      }
      if (!any) return { lines, empty: true, complete: false, knownSubtotalPaise: 0, subtotalPaise: null, taxPaise: null, totalPaise: null, allSelected: false };
      const subtotalPaise = complete ? known : null;
      const tax = config.tax && Number.isInteger(config.tax.rateBasisPoints) ? config.tax : null;
      const taxPaise = complete && tax ? Math.round(subtotalPaise * tax.rateBasisPoints / 10000) : null;
      const totalPaise = complete ? subtotalPaise + (taxPaise || 0) : null;
      return { lines, empty: false, complete, knownSubtotalPaise: known, subtotalPaise, taxPaise, totalPaise, taxLabel: tax ? tax.label : null, allSelected: lines.length === Object.keys(config.products).length };
    }
    function formatINR(paise) {
      const rupees = paise / 100;
      return '₹' + rupees.toLocaleString('en-IN', { minimumFractionDigits: paise % 100 ? 2 : 0, maximumFractionDigits: 2 });
    }
    function sanitiseUsers(raw, max) {
      const m = String(raw).match(/\d+/);
      if (!m) return { value: null, valid: false };
      const n = parseInt(m[0], 10);
      if (n < 1) return { value: 1, valid: false };
      if (n > max) return { value: max, valid: false };
      return { value: n, valid: String(raw).trim() === String(n) };
    }

    const sec = document.getElementById('pricing');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ids = Object.keys(PRICING.products);
    const ICONS = {};
    const state = {};
    ids.forEach(id => { state[id] = { selected: false, users: 1 }; });

    const apps = {};
    sec.querySelectorAll('.s9-app').forEach(el => {
      const id = el.dataset.id;
      ICONS[id] = el.querySelector('.s9-ic').innerHTML;
      apps[id] = { el, cb: el.querySelector('.s9-cb'), qty: el.querySelector('[data-qty]'), dec: el.querySelector('[data-dec]'), inc: el.querySelector('[data-inc]'), sub: el.querySelector('[data-sub]'), err: el.querySelector('[data-err]'), rate: el.querySelector('[data-rate]') };
    });
    const linesEl = document.getElementById('s9-lines'), emptyEl = document.getElementById('s9-empty'), totEl = document.getElementById('s9-tot');
    const cta = document.getElementById('s9-cta'), done = document.getElementById('s9-done'), live = document.getElementById('s9-live');
    const suite = document.getElementById('s9-suite'), orbit = document.getElementById('s9-orbit');
    const bar = document.getElementById('s9-bar'), barT = document.getElementById('s9-bar-t');
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

    ids.forEach(id => { const r = PRICING.products[id].ratePaise; apps[id].rate.textContent = Number.isInteger(r) ? formatINR(r) : 'Price on Request'; });

    /* smooth number tween for displayed totals */
    const tweens = new WeakMap();
    function tweenTo(el, paise, suffix) {
      if (reduce) { el.innerHTML = formatINR(paise) + suffix; el.dataset.v = paise; return; }
      const from = Number(el.dataset.v || paise), t0 = performance.now();
      cancelAnimationFrame(tweens.get(el));
      const step = now => { const k = Math.min(1, (now - t0) / 320), e = 1 - Math.pow(1 - k, 3); el.innerHTML = formatINR(Math.round(from + (paise - from) * e)) + suffix; if (k < 1) tweens.set(el, requestAnimationFrame(step)); else el.dataset.v = paise; };
      tweens.set(el, requestAnimationFrame(step));
    }

    let liveTimer = 0, lastResult = null;
    function render(announce) {
      const r = calcSubscription(PRICING, state);
      lastResult = r;
      ids.forEach(id => {
        const a = apps[id], s = state[id], rate = PRICING.products[id].ratePaise;
        a.el.classList.toggle('sel', s.selected);
        a.cb.checked = s.selected;
        a.qty.disabled = a.dec.disabled = a.inc.disabled = !s.selected;
        if (s.selected) { a.dec.disabled = s.users <= 1; a.inc.disabled = s.users >= PRICING.maxUsers; }
        const u = `${s.users} ${s.users === 1 ? 'user' : 'users'}`;
        a.sub.innerHTML = Number.isInteger(rate) ? `${u} × ${formatINR(rate)} = <b>${formatINR(rate * s.users)}</b> / month` : `${u} · Price on Request`;
      });
      emptyEl.hidden = !r.empty;
      linesEl.innerHTML = r.lines.map(l => `<li class="s9-line"><span class="mi" aria-hidden="true">${ICONS[l.id]}</span><div><b>${esc(l.name)}</b><span>${l.users} ${l.users === 1 ? 'user' : 'users'}${l.ratePaise !== null ? ` × ${formatINR(l.ratePaise)} / month` : ''}</span></div><span class="amt${l.subtotalPaise === null ? ' req' : ''}">${l.subtotalPaise !== null ? formatINR(l.subtotalPaise) : 'Price on Request'}</span></li>`).join('');
      totEl.hidden = r.empty;
      if (!r.empty) {
        if (r.complete) {
          const taxRows = r.taxPaise !== null ? `<div class="s9-tr"><span>Subscription subtotal</span><span>${formatINR(r.subtotalPaise)}</span></div><div class="s9-tr"><span>${esc(r.taxLabel)}</span><span>${formatINR(r.taxPaise)}</span></div>` : '';
          totEl.innerHTML = `${taxRows}<div class="s9-big"><span>${r.taxPaise !== null ? 'Monthly payable' : 'Monthly subscription'}</span><b data-total></b></div>${r.taxPaise === null ? '<p class="s9-tax">Applicable taxes calculated at checkout or quotation.</p>' : ''}`;
          tweenTo(totEl.querySelector('[data-total]'), r.totalPaise, '<small>/ month</small>');
          barT.textContent = formatINR(r.totalPaise) + ' / month';
        } else {
          const known = r.knownSubtotalPaise > 0 ? `<div class="s9-tr"><span>Known subtotals</span><span>${formatINR(r.knownSubtotalPaise)}</span></div>` : '';
          totEl.innerHTML = `${known}<div class="s9-big"><span>Monthly subscription</span><b class="q">Custom Quote Required</b></div><p class="s9-tax">One or more selected applications are priced on request, so the full amount is pending. Applicable taxes are calculated at quotation.</p>`;
          barT.textContent = 'Custom quote required';
        }
      } else barT.textContent = '—';
      const canCheckout = !r.empty && r.complete && !!PRICING.checkoutRoute;
      cta.disabled = r.empty;
      cta.innerHTML = (canCheckout ? 'Get My Plan' : 'Request My Quote') + ' <span class="arr" aria-hidden="true">→</span>';
      suite.classList.toggle('on', r.allSelected);
      orbitLayout(r);
      bar.classList.toggle('show', !r.empty);
      if (announce) {
        clearTimeout(liveTimer);
        liveTimer = setTimeout(() => {
          live.textContent = r.empty ? 'No applications selected.' : `${r.lines.length} ${r.lines.length === 1 ? 'application' : 'applications'} selected. ${r.complete ? 'Monthly total ' + formatINR(r.totalPaise) + '.' : 'Custom quote required.'}`;
        }, 700);
      }
    }

    /* selection visual: lit symbols, light trails, unified composition when all three */
    const orbs = {}; orbit.querySelectorAll('.s9-orb').forEach(o => orbs[o.dataset.o] = o);
    const L = { l01: document.getElementById('s9-l01'), l12: document.getElementById('s9-l12'), l02: document.getElementById('s9-l02') };
    function orbitLayout(r) {
      const sel = ids.map(id => state[id].selected), all = r.allSelected;
      orbit.classList.toggle('all', all);
      const spread = [[18, 50], [50, 50], [82, 50]];
      const tri = [[50 - 19, 64], [50, 22], [50 + 19, 64]];
      ids.forEach((id, i) => {
        const [x, y] = all ? tri[i] : spread[i];
        orbs[id].style.setProperty('--ox', x + '%'); orbs[id].style.setProperty('--oy', y + '%');
        orbs[id].classList.toggle('on', sel[i]);
      });
      const pos = ids.map((id, i) => all ? tri[i] : spread[i]);
      const set = (ln, a, b, on) => { ln.setAttribute('x1', pos[a][0] + '%'); ln.setAttribute('y1', pos[a][1] + '%'); ln.setAttribute('x2', pos[b][0] + '%'); ln.setAttribute('y2', pos[b][1] + '%'); ln.classList.toggle('on', on); };
      set(L.l01, 0, 1, sel[0] && sel[1]); set(L.l12, 1, 2, sel[1] && sel[2]); set(L.l02, 0, 2, all || (sel[0] && sel[2] && !sel[1]));
    }

    /* controls */
    ids.forEach(id => {
      const a = apps[id];
      const toggle = on => { state[id].selected = on; done.hidden = true; if (on && !reduce) { a.el.classList.remove('pop'); void a.el.offsetWidth; a.el.classList.add('pop'); } render(true); };
      a.cb.addEventListener('change', () => toggle(a.cb.checked));
      a.el.querySelector('.s9-head').addEventListener('click', e => { if (e.target.closest('input,label,button,a')) return; a.cb.checked = !a.cb.checked; toggle(a.cb.checked); });
      const setUsers = (n, msg) => { state[id].users = n; a.qty.value = n; a.err.textContent = msg || ''; done.hidden = true; render(true); };
      a.dec.addEventListener('click', () => setUsers(Math.max(1, state[id].users - 1)));
      a.inc.addEventListener('click', () => setUsers(Math.min(PRICING.maxUsers, state[id].users + 1)));
      a.qty.addEventListener('input', () => {
        const s = sanitiseUsers(a.qty.value, PRICING.maxUsers);
        if (s.value === null) { a.err.textContent = 'Enter a whole number of users, 1 or more.'; return; }
        state[id].users = s.value; a.err.textContent = s.valid ? '' : `Using ${s.value}. Enter a whole number between 1 and ${PRICING.maxUsers.toLocaleString('en-IN')}.`;
        render(true);
      });
      a.qty.addEventListener('blur', () => { a.qty.value = state[id].users; if (sanitiseUsers(a.qty.value, PRICING.maxUsers).valid) a.err.textContent = ''; });
      a.qty.addEventListener('keydown', e => { if (['e', 'E', '+', '-', '.', ','].includes(e.key)) e.preventDefault(); });
    });

    /* quote / checkout hand-off (integration point) */
    function buildPayload(r) {
      return {
        billingPeriod: PRICING.billingPeriod, currency: PRICING.currency,
        applications: r.lines.map(l => ({ id: l.id, name: l.name, users: l.users, ratePaise: l.ratePaise, subtotalPaise: l.subtotalPaise })),
        subtotalPaise: r.subtotalPaise, taxLabel: r.taxLabel || null, taxPaise: r.taxPaise, totalPaise: r.totalPaise,
        complete: r.complete, note: 'Indicative only. Recalculate server-side with current rates before billing.'
      };
    }
    cta.addEventListener('click', () => {
      const r = calcSubscription(PRICING, state);
      if (r.empty) return;
      const payload = buildPayload(r);
      sec.dispatchEvent(new CustomEvent('seeknow:quote', { detail: payload, bubbles: true }));
      const dest = r.complete && PRICING.checkoutRoute ? PRICING.checkoutRoute : PRICING.quoteRoute;
      if (dest) {
        const q = new URLSearchParams();
        r.lines.forEach(l => q.set(l.id, String(l.users)));
        q.set('period', PRICING.billingPeriod);
        location.href = dest + (dest.includes('?') ? '&' : '?') + q.toString();
        return;
      }
      const summary = r.lines.map(l => `${l.name}: ${l.users} ${l.users === 1 ? 'user' : 'users'}`).join(', ');
      done.hidden = false;
      done.innerHTML = `<b>Your selection is ready:</b> ${esc(summary)}, billed per user per month. The enquiry form isn't connected in this preview, so nothing has been sent yet.<br><button type="button" id="s9-copy">Copy my selection</button>`;
      document.getElementById('s9-copy').addEventListener('click', e => {
        const txt = `Seek Now quote request — ${summary} (per user / month)`;
        navigator.clipboard && navigator.clipboard.writeText(txt).then(() => { e.target.textContent = 'Copied'; }, () => { e.target.textContent = 'Copy not available'; });
      });
    });

    /* concise cinematic intro (desktop, scroll-scrubbed) */
    const track = sec.querySelector('.s9-track');
    const tiers = [...sec.querySelectorAll('.s9-tier')];
    const parts = sec.querySelector('.s9-parts'), glow = sec.querySelector('.s9-glow');
    const staged = [...sec.querySelectorAll('[data-st]')].map(el => { const [a, b] = el.dataset.st.split(',').map(Number); return { el, a, b }; });
    const syms = [...sec.querySelectorAll('.s9-sym')];
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
    const mqW = matchMedia('(min-width: 1024px) and (min-height: 640px)');
    let pin = false, dots = [], tick = false;

    function makeParts() {
      parts.innerHTML = '';
      dots = [];
      tiers.forEach((t, ti) => {
        for (let i = 0; i < 16; i++) {
          const d = document.createElement('i');
          const a = (i / 16) * Math.PI * 2 + ti;
          dots.push({ el: d, ti, ax: Math.cos(a), ay: Math.sin(a) * .55, dist: 60 + (i * 37 % 90), x: t.style.getPropertyValue('--x'), y: t.style.getPropertyValue('--y') });
          d.style.left = t.style.getPropertyValue('--x'); d.style.top = t.style.getPropertyValue('--y');
          parts.appendChild(d);
        }
      });
    }
    function intro() {
      tick = false;
      if (!pin) return;
      const r = track.getBoundingClientRect();
      const lead = innerHeight * .35;
      const p = clamp((lead - r.top) / (track.offsetHeight - innerHeight + lead));
      const appear = ease(clamp(p / .14)), dis = ease(clamp((p - .22) / .26));
      tiers.forEach((t, i) => {
        const dz = dis * (1 + i * .15);
        t.style.opacity = (appear * (1 - clamp(dis * 1.15))).toFixed(3);
        t.style.transform = `translate(-50%,-50%) translateY(${((1 - appear) * 30).toFixed(1)}px) scale(${(1 - .28 * clamp(dz)).toFixed(3)})`;
        t.style.borderColor = `rgba(167,128,255,${(.35 * (1 - dis)).toFixed(3)})`;
      });
      dots.forEach(d => {
        const k = clamp((dis - .05) / .8);
        d.el.style.opacity = (Math.sin(Math.PI * k) * .9).toFixed(3);
        d.el.style.transform = `translate(${(d.ax * d.dist * k * 2.2).toFixed(1)}px,${(d.ay * d.dist * k * 2.2).toFixed(1)}px)`;
      });
      const g = ease(clamp((p - .3) / .3));
      glow.style.opacity = (g * .95).toFixed(3);
      glow.style.transform = `translate(-50%,-50%) scale(${(.4 + .6 * g).toFixed(3)})`;
      staged.forEach(({ el, a, b }) => { const o = ease(clamp((p - a) / (b - a))); el.style.opacity = o.toFixed(3); el.style.transform = `translateY(${((1 - o) * 22).toFixed(1)}px)`; });
      syms.forEach((s, i) => {
        const em = ease(clamp((p - .76 - i * .03) / .1)), settle = ease(clamp((p - .92) / .08));
        s.style.opacity = (em * (1 - .25 * settle)).toFixed(3);
        s.style.transform = `translateY(${((1 - em) * 40 + settle * 36).toFixed(1)}px) scale(${(.8 + .2 * em - .1 * settle).toFixed(3)})`;
      });
    }
    function setMode() {
      pin = mqW.matches && !reduce;
      sec.classList.toggle('s9-pin', pin);
      if (pin) { makeParts(); intro(); }
      else { [...tiers, ...syms, ...staged.map(s => s.el)].forEach(el => { el.style.opacity = ''; el.style.transform = ''; }); parts.innerHTML = ''; }
    }
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(intro); } }, { passive: true });
    mqW.addEventListener('change', setMode);
    setMode();

    /* mobile sticky total only while the builder is on screen */
    if ('IntersectionObserver' in window) {
      const builder = document.getElementById('s9-builder'), sumEl = sec.querySelector('.s9-sum');
      let inB = false, inS = false;
      const vis = () => { bar.style.visibility = inB && !inS ? 'visible' : 'hidden'; };
      new IntersectionObserver(es => { inB = es[0].isIntersecting; vis(); }).observe(builder);
      new IntersectionObserver(es => { inS = es[0].isIntersecting; vis(); }, { threshold: .15 }).observe(sumEl);
    } else bar.style.visibility = 'hidden';

    render(false);
  }
