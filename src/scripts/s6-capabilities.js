export default function init() {
    /* Feature status: set any to 'soon' to show a "Coming soon" label instead of presenting it as live */
    const FEATURES = { faceRecognition:'live', locationAttendance:'live', shiftTracking:'live', payroll:'live', statutory:'live', salaryAdmin:'live', shiftConfig:'live', attendanceCycles:'live', rbac:'live' };
    const ROUTES = { seekPeople: '#' }; // replace with the existing Seek People product route
    const sec = document.getElementById('capabilities');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });
    sec.querySelectorAll('[data-feature]').forEach(li => { if (FEATURES[li.dataset.feature] === 'soon') { const s = document.createElement('span'); s.className = 'soon'; s.textContent = 'Coming soon'; li.appendChild(s); } });
    sec.classList.add('s6-js');

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const mqW = matchMedia('(min-width: 1024px) and (min-height: 640px)');
    const track = sec.querySelector('.s6-track');
    const scenes = [...sec.querySelectorAll('.c6-scene')];
    const chs = [...sec.querySelectorAll('.c6-ch')];
    const dots = [...sec.querySelectorAll('.s6-rail span')];
    const rail = sec.querySelector('.s6-rail');
    const netEl = sec.querySelector('[data-net]');
    const NET = 49950;
    const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');

    function setK(i, k) {
      scenes[i].style.setProperty('--k', k.toFixed(4));
      if (i === 1) netEl.textContent = inr(NET * clamp((k - .66) / .18));
    }

    /* intro reveal */
    if (!reduce.matches && 'IntersectionObserver' in window && sec.getBoundingClientRect().top > innerHeight * .85) {
      sec.classList.add('wait');
      const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { sec.classList.remove('wait'); io.disconnect(); } }, { threshold: .2 });
      io.observe(sec.querySelector('.s6-intro'));
    }

    /* pinned, scroll-scrubbed mode */
    let pin = false, ticking = false;
    function update() {
      ticking = false;
      if (!pin) return;
      const r = track.getBoundingClientRect();
      const lead = innerHeight * .5;
      const p = clamp((lead - r.top) / (track.offsetHeight - innerHeight + lead));
      const k1 = clamp(p / .3), tA = ease(clamp((p - .3) / .06));
      const k2 = clamp((p - .34) / .26), tB = ease(clamp((p - .6) / .06));
      const k3 = clamp((p - .64) / .3), tE = ease(clamp((p - .95) / .05));
      setK(0, k1); setK(1, k2); setK(2, k3);

      const rin = ease(clamp(k1 / .22));
      const s0 = scenes[0];
      s0.style.opacity = ((.3 + .7 * rin) * (1 - .82 * tA) * (1 - tB)).toFixed(3);
      s0.style.transform = `translateX(${(-26 * tA).toFixed(2)}%) scale(${(1 - .36 * tA).toFixed(3)})`;
      s0.querySelector('.c6-phone').style.transform = `rotateY(${(26 - 36 * rin).toFixed(2)}deg) rotateX(${(10 - 6 * rin).toFixed(2)}deg) translateY(${((1 - rin) * 6).toFixed(2)}%)`;

      const s1 = scenes[1];
      s1.style.opacity = (tA * (1 - tB)).toFixed(3);
      s1.style.transform = `perspective(1600px) translateY(${(((1 - tA) * 12) - tB * 16).toFixed(2)}%) rotateX(${((1 - tA) * 16 + tB * 62).toFixed(2)}deg) scale(${(.88 + .12 * tA).toFixed(3)})`;

      const s2 = scenes[2];
      s2.style.opacity = (tB * (1 - .45 * tE)).toFixed(3);
      s2.style.transform = `translateY(${((1 - tB) * 14).toFixed(2)}%) scale(${(.93 + .07 * tB - .06 * tE).toFixed(3)})`;
      s2.style.pointerEvents = tB > .5 ? 'auto' : 'none';
      s2.inert = tB < .5;

      const vis = [1 - tA, tA * (1 - tB), tB];
      chs.forEach((c, i) => {
        const o = clamp(vis[i]);
        c.style.opacity = o.toFixed(3);
        c.style.transform = `translateY(${((1 - o) * 18).toFixed(1)}px)`;
        c.inert = o < .05;
      });
      const prog = clamp((p - .02) / .9);
      rail.style.setProperty('--rp', prog.toFixed(3));
      const cur = tB > .5 ? 2 : tA > .5 ? 1 : 0;
      dots.forEach((d, i) => d.classList.toggle('on', i <= cur));
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

    /* static mode: one-shot lightweight demos as each scene enters view */
    const DUR = [3600, 2800, 3200];
    let sio = null;
    function play(i) {
      if (reduce.matches) { setK(i, 1); return; }
      const t0 = performance.now();
      const step = now => { const k = clamp((now - t0) / DUR[i]); setK(i, k); if (k < 1 && !pin) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }

    function clearInline() {
      scenes.forEach(s => { s.style.opacity = ''; s.style.transform = ''; s.style.pointerEvents = ''; s.inert = false; const ph = s.querySelector('.c6-phone'); if (ph) ph.style.transform = ''; });
      chs.forEach(c => { c.style.opacity = ''; c.style.transform = ''; c.inert = false; });
    }

    function setMode() {
      const was = pin;
      pin = mqW.matches && !reduce.matches;
      sec.classList.toggle('s6-pin', pin);
      if (sio) { sio.disconnect(); sio = null; }
      if (pin) { scenes.forEach(s => s.classList.remove('pre')); update(); return; }
      clearInline();
      if (reduce.matches || !('IntersectionObserver' in window)) { scenes.forEach((s, i) => { s.classList.remove('pre'); setK(i, 1); }); return; }
      sio = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const i = scenes.indexOf(e.target);
        e.target.classList.remove('pre');
        play(i);
        sio.unobserve(e.target);
      }), { threshold: .35 });
      scenes.forEach((s, i) => {
        if (s.getBoundingClientRect().top > innerHeight * .9) { s.classList.add('pre'); setK(i, 0); sio.observe(s); }
        else setK(i, 1);
      });
    }

    /* demo controls (affect this preview only) */
    const cal = sec.querySelector('.c6-cal');
    cal.querySelectorAll('button[data-f]').forEach(b => { b.addEventListener('click', () => {
      cal.dataset.f = b.dataset.f;
      cal.querySelectorAll('button[data-f]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    }); });
    const cycLabel = sec.querySelector('[data-cyc-label]');
    function radioGroup(group, onPick) {
      const btns = [...group.querySelectorAll('[role="radio"]')];
      const pick = (b, focus) => { btns.forEach(x => { const on = x === b; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; }); onPick(b); if (focus) b.focus(); };
      btns.forEach(b => { b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1; b.addEventListener('click', () => pick(b)); });
      group.addEventListener('keydown', e => {
        const i = btns.findIndex(x => x.getAttribute('aria-checked') === 'true');
        let n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % btns.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + btns.length) % btns.length;
        if (n !== null) { e.preventDefault(); pick(btns[n], true); }
      });
    }
    radioGroup(sec.querySelector('.cal-cyc [role="radiogroup"]'), b => { cycLabel.textContent = b.dataset.cyc; });
    const acc = sec.querySelector('.c6-acc'), note = sec.querySelector('[data-perm-note]');
    const NOTES = { hr: 'HR admins manage people data and payroll across the organisation.', mgr: 'Managers see and manage their own team.', emp: 'Employees see their own records and requests.' };
    radioGroup(acc.querySelector('[role="radiogroup"]'), b => { acc.dataset.r = b.dataset.r; note.textContent = NOTES[b.dataset.r]; });

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    mqW.addEventListener('change', setMode);
    reduce.addEventListener('change', setMode);
    setMode();
  }
