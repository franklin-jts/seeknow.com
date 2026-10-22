export default function init() {
    const ROUTES = { ecosystem: '#' }; // replace with the existing ecosystem/products route
    const sec = document.getElementById('why-seek-now');
    sec.querySelectorAll('[data-route]').forEach(a => { const r = ROUTES[a.dataset.route]; if (r) a.setAttribute('href', r); });

    const track = sec.querySelector('.v-track'), stage = sec.querySelector('.v-stage');
    const s1 = sec.querySelector('.v-s1'), glow = sec.querySelector('.v-glow'), ring = sec.querySelector('.v-ring');
    const mark = sec.querySelector('.v-mark'), lift = sec.querySelector('.v-lift'), reveal = sec.querySelector('.v-reveal');
    const parts = [...sec.querySelectorAll('[data-v]')].map(el => { const [a, b] = el.dataset.v.split(',').map(Number); return { el, a, b }; });
    const logos = [...sec.querySelectorAll('.fl-logo')].map((el, i) => ({ el, x: +el.dataset.x / 100, y: +el.dataset.y / 100, z: +el.dataset.z, ph: i * 1.9, sp: .55 + (i * 37 % 10) / 22 }));
    const cvs = sec.querySelector('.v-canvas'), ctx = cvs.getContext('2d');

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
    const smooth = t => t * t * (3 - 2 * t);
    const mqW = matchMedia('(min-width: 1024px) and (min-height: 620px)');
    const mqR = matchMedia('(prefers-reduced-motion: reduce)');

    let pin = false, W = 0, H = 0, cx = 0, cy = 0, dpr = 1, raf = 0, inView = false, last = 0;
    let P = [];
    const spawn = init => ({ a: Math.random() * Math.PI * 2, r: (init ? .25 + Math.random() * .75 : 1) * Math.hypot(W, H) * .55 + 30, v: .55 + Math.random() * .9 });

    function measure() {
      W = stage.clientWidth; H = stage.clientHeight;
      dpr = Math.min(1.5, devicePixelRatio || 1);
      cvs.width = W * dpr; cvs.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = reveal.offsetLeft + mark.offsetLeft + mark.offsetWidth / 2;
      cy = reveal.offsetTop + mark.offsetTop + mark.offsetHeight / 2;
      P = Array.from({ length: 80 }, () => spawn(true));
    }

    function reset() {
      [s1, glow, ring, mark, lift, ...logos.map(l => l.el), ...parts.map(p => p.el)].forEach(el => { el.style.transform = ''; el.style.opacity = ''; el.style.filter = ''; });
      ctx.clearRect(0, 0, cvs.width, cvs.height);
    }

    function progress() {
      const r = track.getBoundingClientRect();
      return clamp(-r.top / (track.offsetHeight - innerHeight));
    }

    function frame(ts) {
      raf = 0;
      if (!pin) return;
      const dt = last ? Math.min(50, ts - last) / 16.67 : 1; last = ts;
      const t = ts / 1000, p = progress();

      // Scene 1: headline fades, floating slows
      const o1 = 1 - smooth(clamp((p - .1) / .16));
      s1.style.opacity = o1.toFixed(3);
      s1.style.transform = `translateY(${(-(1 - o1) * 40).toFixed(1)}px)`;
      const fo = 1 - smooth(clamp((p - .12) / .2));

      // Scene 2: vortex pull along curved spiral paths
      logos.forEach((L, i) => {
        const st = .26 + i * .02, e = ease(clamp((p - st) / .32));
        const bx = L.x * W, by = L.y * H, vx = bx - cx, vy = by - cy;
        const th = e * 1.05, k = 1 - e;
        const px = cx + (vx * Math.cos(th) - vy * Math.sin(th)) * k;
        const py = cy + (vx * Math.sin(th) + vy * Math.cos(th)) * k;
        const fx = Math.cos(t * L.sp * .7 + L.ph) * 7 * fo * L.z, fy = Math.sin(t * L.sp + L.ph) * 11 * fo * L.z;
        const s = L.z * (1 - .86 * e);
        L.el.style.transform = `translate(-50%,-50%) translate3d(${(px - bx + fx).toFixed(1)}px,${(py - by + fy).toFixed(1)}px,0) scale(${s.toFixed(3)})`;
        L.el.style.opacity = ((.72 + .28 * Math.min(1, L.z)) * (1 - smooth(clamp((e - .5) / .5)))).toFixed(3);
        L.el.style.filter = e > .04 ? `blur(${(e * e * 4).toFixed(2)}px)` : '';
      });

      // Central energy
      const g = smooth(clamp((p - .18) / .3)), settle = smooth(clamp((p - .72) / .12));
      glow.style.opacity = (g * (1 - .35 * settle)).toFixed(3);
      glow.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${(.45 + .75 * g - .2 * settle).toFixed(3)})`;
      const rk = clamp((p - .64) / .14);
      ring.style.opacity = rk > 0 && rk < 1 ? ((1 - rk) * .75).toFixed(3) : '0';
      ring.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${(.35 + 1.7 * rk).toFixed(3)})`;

      // Scene 3: Seek Now reveal, then lift toward the next section
      const m = ease(clamp((p - .62) / .12)), q = ease(clamp((p - .9) / .1));
      mark.style.opacity = m.toFixed(3);
      mark.style.transform = `scale(${((.7 + .3 * m) * (1 - .16 * q)).toFixed(3)})`;
      mark.style.filter = m < 1 ? `blur(${((1 - m) * 8).toFixed(2)}px) drop-shadow(0 0 28px rgba(134,96,248,.55))` : '';
      lift.style.transform = `translateY(${(-q * H * .05).toFixed(1)}px)`;
      parts.forEach(({ el, a, b }) => {
        const o = ease(clamp((p - a) / (b - a)));
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${((1 - o) * 22).toFixed(1)}px)`;
        el.inert = o < .05;
      });

      // Particle trails flowing inward
      ctx.clearRect(0, 0, W, H);
      const I = smooth(clamp((p - .2) / .18)) * (1 - smooth(clamp((p - .68) / .1)));
      if (I > .01) {
        const Rmax = Math.hypot(W, H) * .55;
        ctx.lineCap = 'round'; ctx.lineWidth = 1;
        P.forEach((q2, i) => {
          const x0 = cx + Math.cos(q2.a) * q2.r, y0 = cy + Math.sin(q2.a) * q2.r;
          q2.r -= q2.v * (1.1 + q2.r * .011) * dt;
          q2.a += (.004 + 12 / (q2.r + 70)) * dt;
          if (q2.r < 10) { P[i] = spawn(false); return; }
          const tr = 3.2;
          const x1 = cx + Math.cos(q2.a) * q2.r, y1 = cy + Math.sin(q2.a) * q2.r;
          const xs = x1 + (x0 - x1) * tr, ys = y1 + (y0 - y1) * tr;
          const al = I * Math.min(1, (1 - q2.r / Rmax) * 1.8) * .5;
          ctx.strokeStyle = `rgba(196,170,255,${al.toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(xs, ys); ctx.lineTo(x1, y1); ctx.stroke();
        });
      }

      if (inView) raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (pin && inView && !raf) { last = 0; raf = requestAnimationFrame(frame); } };

    function setMode() {
      const was = pin;
      pin = mqW.matches && !mqR.matches;
      sec.classList.toggle('v-pinned', pin);
      if (pin) { measure(); kick(); } else if (was) { reset(); parts.forEach(({ el }) => el.inert = false); }
    }
    new IntersectionObserver(es => { inView = es[0].isIntersecting; kick(); }, { rootMargin: '100px 0px' }).observe(track);
    addEventListener('resize', () => { if (pin) { measure(); kick(); } });
    mqW.addEventListener('change', setMode);
    mqR.addEventListener('change', setMode);
    setMode();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (pin) measure(); });
  }
