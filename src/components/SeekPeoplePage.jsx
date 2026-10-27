import { memo, useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import homeShot from '../assets/seek-people/01-home.webp';
import attendanceShot from '../assets/seek-people/02-attendance.webp';
import regularisationShot from '../assets/seek-people/03-regularisation.webp';
import leaveShot from '../assets/seek-people/04-leave.webp';
import reimbursementShot from '../assets/seek-people/05-reimbursements.webp';
import overtimeShot from '../assets/seek-people/06-overtime.webp';
import payslipShot from '../assets/seek-people/07-payslip.webp';
import pulsesShot from '../assets/seek-people/08-pulses.webp';
import inboxShot from '../assets/seek-people/09-inbox.webp';
import complianceShot from '../assets/seek-people/10-compliance.webp';
import menuShot from '../assets/seek-people/11-menu.webp';
import settingsShot from '../assets/seek-people/12-settings.webp';
import './seek-people.css';

const SHOTS = {
  '01-home': homeShot,
  '02-attendance': attendanceShot,
  '03-regularisation': regularisationShot,
  '04-leave': leaveShot,
  '05-reimbursements': reimbursementShot,
  '06-overtime': overtimeShot,
  '07-payslip': payslipShot,
  '08-pulses': pulsesShot,
  '09-inbox': inboxShot,
  '10-compliance': complianceShot,
  '11-menu': menuShot,
  '12-settings': settingsShot,
};

const prefersReduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Reveal-on-scroll: adds `cls` to each matching child once it enters the viewport. */
function useReveal(ref, { items, cls = 'seen', threshold = 0.2, early = 0.9, enable = 'anim' }) {
  useEffect(() => {
    const sec = ref.current;
    if (!sec || prefersReduced() || !('IntersectionObserver' in window)) return undefined;
    sec.classList.add(enable);
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(cls);
            io.unobserve(e.target);
          }
        }),
      { threshold },
    );
    sec.querySelectorAll(items).forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * early) el.classList.add(cls);
      else io.observe(el);
    });
    return () => {
      io.disconnect();
      sec.classList.remove(enable);
      sec.querySelectorAll(items).forEach((el) => el.classList.remove(cls));
    };
  }, [ref, items, cls, threshold, early, enable]);
}

/* ═══════════ Scroll-scrubbed engines (ported 1:1 from seek-people.html, with cleanup) ═══════════ */

function initCinematicStage(sec) {
  const cleanups = [];
  const cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const seg = (p, a, b) => ease(cl((p - a) / (b - a)));
  const NS = 'http://www.w3.org/2000/svg';
  const header = document.querySelector('.site-header, header');
  const navH = () => (header ? header.getBoundingClientRect().height : 72);
  const mqStatic = matchMedia('(max-width: 819px), (prefers-reduced-motion: reduce)');
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  function Stage(sec) {
    const AW = +sec.dataset.aw,
      AH = +sec.dataset.ah,
      SX = +sec.dataset.sx,
      VH = +sec.dataset.vh,
      phone = sec.dataset.kind === 'phone';
    const intro = sec.querySelector('.xp-intro'),
      track = sec.querySelector('.xp-track'),
      stage = sec.querySelector('.xp-stage');
    const devW = sec.querySelector('.xp-devw'),
      dev = devW.querySelector('.xp-dev'),
      svg = sec.querySelector('.xp-trails');
    const chs = [...sec.querySelectorAll('.xp-ch')],
      heads = chs.map((c) => c.querySelector('.xp-head')),
      frags = chs.map((c) => [...c.querySelectorAll('.xp-f')]);
    const scrs = [...dev.querySelectorAll('.xp-scr')],
      navs = [...dev.querySelectorAll('[data-nav]')],
      prog = [...sec.querySelectorAll('.xp-prog li')];
    const wts = chs.map((c) => +(c.dataset.w || 1));
    const PRE = 0.12,
      POST = 0.3,
      T = PRE + wts.reduce((a, b) => a + b, 0) + POST;
    let acc = PRE;
    const SPAN = wts.map((w) => {
      const a = acc / T;
      acc += w;
      return [a, acc / T];
    });
    const U = (i, x) => SPAN[i][0] + x * (SPAN[i][1] - SPAN[i][0]);
    let mode = 'static',
      L = null,
      raf = 0,
      last = '',
      io = null;

    /* ----- static / mobile / reduced motion ----- */
    function buildPreviews() {
      chs.forEach((c, i) => {
        const box = c.querySelector('.xp-prev');
        if (box.firstChild) return;
        const d = dev.cloneNode(true);
        d.querySelectorAll('[data-src]').forEach((e) => {
          e.dataset.focus = e.dataset.src;
          e.removeAttribute('data-src');
        });
        d.querySelectorAll(`.xp-scr[data-s="${i}"]`).forEach((e) => e.classList.add('cur'));
        d.querySelectorAll('[data-nav]').forEach((e) => {
          if (e.dataset.nav.split(',').includes(String(i))) e.classList.add('cur');
        });
        box.appendChild(d);
      });
    }
    function off(el, root) {
      let x = 0,
        y = 0;
      while (el && el !== root) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
      }
      return [x, y];
    }
    function sizePreviews() {
      chs.forEach((c, i) => {
        const box = c.querySelector('.xp-prev'),
          w = box.clientWidth,
          d = box.firstChild;
        box.classList.remove('xp-crop', 'xp-cap');
        if (phone) {
          let k = Math.min(1, (w - 8) / AW, innerWidth < 820 ? 1 : 640 / AH);
          if (innerWidth < 820) {
            k = Math.min(1, (w - 8) / AW);
            box.classList.add('xp-cap');
            box.style.height = Math.min(AH * k, 560) + 'px';
          } else box.style.height = AH * k + 'px';
          box.style.setProperty('--k', k.toFixed(4));
        } else if (w >= 700) {
          const k = w / AW;
          box.style.setProperty('--k', k.toFixed(4));
          box.style.height = AH * k + 'px';
        } else {
          const k = 0.58,
            bh = 300;
          box.classList.add('xp-crop');
          box.style.height = bh + 'px';
          box.style.setProperty('--k', k);
          const f = d.querySelector(`.xp-scr[data-s="${i}"] [data-focus]`);
          let fx = AW / 2,
            fy = AH / 2;
          if (f) {
            const [x, y] = off(f, d);
            fx = x + f.offsetWidth / 2;
            fy = y + f.offsetHeight / 2;
          }
          const tx = cl(w / 2 - fx * k, w - AW * k, 0),
            ty = cl(bh / 2 - fy * k, bh - AH * k, 0);
          box.style.setProperty('--tx', tx.toFixed(1) + 'px');
          box.style.setProperty('--ty', ty.toFixed(1) + 'px');
        }
      });
    }
    function enterStatic() {
      sec.classList.remove('xp-pin');
      sec.classList.add('xp-static');
      track.style.height = '';
      intro.style.cssText = '';
      [...frags.flat(), ...heads, devW].forEach((e) => {
        e.style.transform = '';
        e.style.opacity = '';
      });
      buildPreviews();
      sizePreviews();
      if (!reduce() && 'IntersectionObserver' in window && !io) {
        sec.classList.add('xp-anim');
        io = new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
              }
            }),
          { threshold: 0.12 },
        );
        chs.forEach((c) => io.observe(c));
      }
    }

    /* ----- pinned: measured layout ----- */
    function layout() {
      const W = stage.clientWidth,
        H = stage.clientHeight,
        top = navH() + 14;
      const hw = Math.min(phone ? 760 : 900, W - 80);
      heads.forEach((h) => h.style.setProperty('--hw', hw + 'px'));
      const hh = Math.max(...heads.map((h) => h.offsetHeight));
      const progH = prog.length ? 44 : 0;
      const aTop = top + hh + 18,
        aH = H - aTop - 16 - progH;
      const gap = 28,
        pad = 24;
      let m = W >= 1100 ? 'wide' : 'mid',
        fw,
        k,
        cx;
      const maxK = phone ? 1 : 1.1;
      if (m === 'wide') {
        fw = phone ? cl(W * 0.2, 240, 300) : cl(W * 0.175, 220, 278);
        k = Math.min((W - 2 * (fw + gap + pad)) / SX / AW, aH / AH, maxK);
        if (!phone && k * SX * AW < 540) m = 'mid';
      }
      if (m === 'mid') {
        fw = cl(W * 0.3, 230, 290);
        k = Math.min((W - fw - gap - 2 * pad) / AW, aH / AH, maxK);
        cx = phone ? Math.max(pad + (AW * k) / 2, (W - fw - gap) / 2) : pad + (AW * k) / 2;
      } else cx = W / 2;
      // short screens: a phone gets the full height and its headline moves beside it
      let side = false,
        cyO = null;
      if (phone && m === 'wide' && k * AH < 600 && W >= 1100) {
        const fullH = H - top - 16 - progH,
          k2 = Math.min(fullH / AH, maxK);
        if (k2 > k * 1.12) {
          side = true;
          k = k2;
          cyO = top + fullH / 2;
        }
      }
      const cy = cyO ?? aTop + aH / 2,
        s = m === 'wide' ? SX : 1,
        S = k * s;
      const fx0 = cx - (AW * S) / 2,
        fy0 = cy - (AH * S) / 2,
        fx1 = cx + (AW * S) / 2;
      let hx = Math.max(pad, Math.min(W - pad - hw, cx - hw / 2)),
        hy = top,
        hwS = hw;
      const sideHead = side;
      if (side) {
        hwS = Math.max(220, Math.min(420, fx0 - gap - pad));
        heads.forEach((h) => {
          h.style.setProperty('--hw', hwS + 'px');
          h.style.textAlign = 'left';
        });
        const hh2 = Math.max(...heads.map((h) => h.offsetHeight));
        hx = fx0 - gap - hwS;
        hy = cy - hh2 / 2;
      } else
        heads.forEach((h) => {
          h.style.textAlign = '';
        });
      const yMin = top,
        yMax = H - 12 - progH,
        fitH = yMax - yMin;
      const out = chs.map((c, ci) => {
        frags[ci].forEach((f) => f.style.setProperty('--fw', fw + 'px'));
        const items = frags[ci].map((f, i) => {
          const src = dev.querySelector(`.xp-scr[data-s="${ci}"] [data-src="${f.dataset.src}"]`);
          const [ox, oy] = off(src, dev);
          return { f, i, src, ox: fx0 + S * (ox + src.offsetWidth / 2), oy: fy0 + S * (oy + src.offsetHeight / 2), h: f.offsetHeight };
        });
        const fitC = !side && m === 'mid' ? yMax - aTop : fitH;
        const chunk = (list) => {
          const g = [],
            G = 14,
            fitH = fitC;
          let cur = [],
            h = 0;
          list
            .sort((a, b) => a.oy - b.oy)
            .forEach((it) => {
              if (cur.length && h + G + it.h > fitH) {
                g.push(cur);
                cur = [];
                h = 0;
              }
              h += (cur.length ? G : 0) + it.h;
              cur.push(it);
            });
          if (cur.length) g.push(cur);
          return g;
        };
        const place = (list, x, side) => {
          const G = 14,
            tot = list.reduce((a, b) => a + b.h, 0) + G * (list.length - 1);
          const y0 = !sideHead && x < hx + hwS && x + fw > hx ? aTop : yMin;
          let y = cl(cy - tot / 2, y0, yMax - tot);
          list.forEach((it) => {
            it.tx = x;
            it.ty = y;
            it.side = side;
            y += it.h + G;
          });
        };
        let groups;
        if (side) {
          groups = chunk([...items]);
          groups.forEach((g) => place(g, fx1 + gap, 1));
        } else if (m === 'wide') {
          const byX = [...items].sort((a, b) => a.ox - b.ox),
            n = byX.length;
          let nl = byX.filter((it) => it.ox < cx).length;
          nl = cl(nl, Math.floor(n / 2), Math.ceil(n / 2));
          const lg = chunk(byX.slice(0, nl)),
            rg = chunk(byX.slice(nl));
          lg.forEach((g) => place(g, fx0 - gap - fw, -1));
          rg.forEach((g) => place(g, fx1 + gap, 1));
          groups = [];
          for (let g = 0; g < Math.max(lg.length, rg.length); g++) groups.push([...(lg[g] || []), ...(rg[g] || [])]);
        } else {
          const x = Math.min(W - pad - fw, fx1 + gap);
          groups = chunk([...items]);
          groups.forEach((g) => place(g, x, 1));
        }
        // windows in scroll-progress space
        const G = groups.length,
          a0 = 0.12,
          a1 = 0.9,
          len = (a1 - a0) / G;
        groups.forEach((g, gi) => {
          const r0 = a0 + gi * len;
          g.sort((a, b) => a.i - b.i);
          g.forEach((it, j) => {
            const ia = r0 + j * 0.06 * len,
              ib = ia + 0.26 * len,
              oa = r0 + 0.76 * len + (g.length - 1 - j) * 0.025 * len,
              ob = Math.min(r0 + len, oa + 0.16 * len);
            it.w = [U(ci, ia), U(ci, ib), U(ci, oa), U(ci, ob)];
          });
        });
        items.forEach((it) => {
          const ex = it.side < 0 ? it.tx + fw : it.tx,
            ey = it.ty + it.h / 2;
          it.cx = (it.ox + ex) / 2;
          it.cy = (it.oy + ey) / 2 - Math.min(56, Math.abs(ex - it.ox) * 0.16);
          it.d = `M${it.ox.toFixed(1)} ${it.oy.toFixed(1)} Q${it.cx.toFixed(1)} ${it.cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
        });
        const ws = items.map((it) => it.w);
        return { items, open: [Math.min(...ws.map((w) => w[0])), Math.max(...ws.map((w) => w[3]))] };
      });
      svg.querySelectorAll('g').forEach((g) => g.remove());
      out.forEach((ch) =>
        ch.items.forEach((it) => {
          const g = document.createElementNS(NS, 'g'),
            pth = document.createElementNS(NS, 'path'),
            dot = document.createElementNS(NS, 'circle');
          pth.setAttribute('d', it.d);
          pth.setAttribute('stroke', 'url(#' + svg.querySelector('linearGradient').id + ')');
          dot.setAttribute('r', '2.6');
          g.append(pth, dot);
          g.style.opacity = 0;
          svg.appendChild(g);
          it.g = g;
          it.p = pth;
          it.dot = dot;
          it.len = pth.getTotalLength();
          pth.style.strokeDasharray = it.len;
          pth.style.strokeDashoffset = it.len;
        }),
      );
      svg.querySelector('linearGradient').setAttribute('x2', W);
      heads.forEach((h) => {
        h.style.left = hx + 'px';
        h.style.top = hy + 'px';
      });
      L = { W, H, k, cx, cy, m, fw, out };
      track.style.height = Math.round(T * VH) + 'vh';
      last = '';
      render();
    }

    function render() {
      raf = 0;
      if (mode !== 'pin' || !L) return;
      const r = track.getBoundingClientRect(),
        span = track.offsetHeight - L.H;
      const p = cl(-r.top / span),
        pre = cl((innerHeight - r.top) / (innerHeight * 0.95));
      const ir = intro.getBoundingClientRect(),
        fi = cl((ir.bottom - navH()) / (ir.height * 0.9));
      intro.style.opacity = (fi * fi).toFixed(3);
      intro.style.transform = `translateY(${(-(1 - fi) * 40).toFixed(1)}px)`;
      const key = p.toFixed(4) + '|' + pre.toFixed(3);
      if (key === last) return;
      last = key;
      const n = chs.length;
      const fin = chs.map((_, i) => (i === 0 ? 1 : seg(p, U(i, -0.05), U(i, 0.09))));
      const w = fin.map((f, i) => f * (1 - (i + 1 < n ? fin[i + 1] : 0)));
      scrs.forEach((e) => e.style.setProperty('--o', w[+e.dataset.s].toFixed(3)));
      navs.forEach((e) =>
        e.style.setProperty(
          '--o',
          Math.min(
            1,
            e.dataset.nav.split(',').reduce((a, x) => a + w[+x], 0),
          ).toFixed(3),
        ),
      );
      let ci = 0;
      w.forEach((v, i) => {
        if (v > w[ci]) ci = i;
      });
      prog.forEach((e, i) => {
        e.style.setProperty('--o', w[i].toFixed(3));
        e.classList.toggle('cur', i === ci);
      });
      const ent = ease(pre);
      let open = 0;
      L.out.forEach((ch, c) => {
        open = Math.max(open, seg(p, ch.open[0] - 0.012, ch.open[0] + 0.012) * (1 - seg(p, ch.open[1] - 0.01, ch.open[1] + 0.012)));
        ch.items.forEach((it) => {
          const [a, b, c2, d] = it.w,
            ein = seg(p, a, b),
            eout = seg(p, c2, d),
            e = ein * (1 - eout),
            f = it.f;
          if (e <= 0.001) {
            if (f.style.opacity !== '0') {
              f.style.opacity = 0;
              f.style.transform = 'translate3d(-9999px,0,0)';
              it.g.style.opacity = 0;
              it.src.style.setProperty('--hl', 0);
            }
            return;
          }
          const ex = it.tx + L.fw / 2,
            ey = it.ty + it.h / 2,
            q = 1 - e;
          const px = q * q * it.ox + 2 * q * e * it.cx + e * e * ex,
            py = q * q * it.oy + 2 * q * e * it.cy + e * e * ey;
          const sc = 0.22 + 0.78 * e,
            ry = it.side * -16 * (1 - e),
            z = -140 * (1 - e);
          f.style.opacity = cl((e - 0.12) * 1.5).toFixed(3);
          f.style.transform = `translate3d(${(px - L.fw / 2).toFixed(1)}px,${(py - it.h / 2).toFixed(1)}px,${z.toFixed(0)}px) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
          it.p.style.strokeDashoffset = (it.len * (1 - e)).toFixed(1);
          it.g.style.opacity = ((0.32 + 2.4 * ein * (1 - ein)) * (1 - eout)).toFixed(3);
          const pt = it.p.getPointAtLength(it.len * e);
          it.dot.setAttribute('cx', pt.x.toFixed(1));
          it.dot.setAttribute('cy', pt.y.toFixed(1));
          it.src.style.setProperty('--hl', (cl(ein * 3) * (1 - eout) * (0.45 + 2.2 * ein * (1 - ein))).toFixed(3));
        });
      });
      const bump = fin.slice(1).reduce((a, f) => a + Math.sin(Math.PI * f), 0);
      const shrink = L.m === 'wide' ? (1 - SX) * open : 0;
      const sc = L.k * (1 - shrink) * (1 + 0.025 * bump) * (0.9 + 0.1 * ent);
      const cy = L.cy + (1 - ent) * 60;
      devW.style.transform = `translate3d(${(L.cx - (AW * sc) / 2).toFixed(1)}px,${(cy - (AH * sc) / 2).toFixed(1)}px,0) rotateX(${(10 * (1 - ent)).toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      devW.style.opacity = ent.toFixed(3);
      stage.style.setProperty('--ga', (0.2 + 0.08 * open).toFixed(3));
      heads.forEach((h, i) => {
        let o = w[i],
          y = (1 - fin[i]) * 24 - (i + 1 < n ? fin[i + 1] : 0) * 24;
        if (i === 0) o *= ent;
        h.style.opacity = o.toFixed(3);
        h.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
      });
    }
    const onScroll = () => {
      if (mode === 'pin' && !raf) raf = requestAnimationFrame(render);
    };
    function setMode() {
      const want = mqStatic.matches || innerHeight < 540 ? 'static' : 'pin';
      if (want === 'static') {
        mode = 'static';
        enterStatic();
        return;
      }
      mode = 'pin';
      sec.classList.remove('xp-static', 'xp-anim');
      sec.classList.add('xp-pin');
      [...frags.flat()].forEach((f) => {
        f.style.opacity = 0;
      });
      layout();
    }
    addEventListener('scroll', onScroll, { passive: true });
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        const want = mqStatic.matches || innerHeight < 540 ? 'static' : 'pin';
        if (want !== mode) setMode();
        else if (mode === 'pin') layout();
        else sizePreviews();
      }, 140);
    };
    addEventListener('resize', onResize);
    cleanups.push(() => {
      mode = 'dead';
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      clearTimeout(rt);
      cancelAnimationFrame(raf);
      io && io.disconnect();
      mqStatic.removeEventListener?.('change', setMode);
      sec.classList.remove('xp-pin', 'xp-static', 'xp-anim');
    });
    mqStatic.addEventListener?.('change', setMode);
    setMode();
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(() => {
        if (mode === 'pin') layout();
        else sizePreviews();
      });
  }
  Stage(sec);
  return () => cleanups.forEach((f) => f());
}

function initMobileShowcase(sec) {
  const cleanups = [];
  const $ = (id) => sec.querySelector('#' + id);
  const track = $('ms-track'),
    stage = $('ms-stage');
  const phone = $('ms-phone'),
    screen = $('ms-screen'),
    dev = $('ms-dev'),
    glass = $('ms-glass');
  const sweep = $('ms-sweep'),
    shadow = $('ms-shadow'),
    atmo = $('ms-atmo'),
    svg = $('ms-trails');
  const close = $('ms-close'),
    intro = sec.querySelector('.ms-intro'),
    closeLines = [...close.querySelectorAll('.li')];
  const header = document.querySelector('.site-header, header');
  const navH = () => (header ? header.getBoundingClientRect().height : 72);
  const mqStatic = matchMedia('(max-width: 819px), (prefers-reduced-motion: reduce)');
  const cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const NS = 'http://www.w3.org/2000/svg';

  /* ---- configuration read once from the list (the single source) ---- */
  const items = [...sec.querySelectorAll('#ms-list > .ms-it')];
  const SCREENS = items.map((li) => {
    const img = li.querySelector('.ms-fig img'),
      tx = li.querySelector('.ms-txt'),
      h = tx.querySelector('h3');
    h.dataset.t = h.textContent;
    return {
      label: li.dataset.label,
      src: img.getAttribute('src'),
      w: img.width,
      h: img.height,
      tx,
      hd: h,
      num: tx.querySelector('.ms-num'),
      eb: tx.querySelector('.ms-eb'),
      desc: tx.querySelector('.ms-desc'),
      lines: [],
      feats: [...li.querySelectorAll('.ms-ft')].map((el, k) => ({
        el,
        k,
        r: el.dataset.r.split(',').map(Number),
        crop: el.querySelector('.ms-crop'),
        bg: el.querySelector('.ms-bgc'),
        tl: [...el.querySelectorAll('h4 .li')],
        p: el.querySelector('p'),
      })),
    };
  });
  const N = SCREENS.length;
  // scroll budget: each screen gets time for arrival, staggered extraction, a reading hold and retraction
  const VH_PER = 54,
    END_W = 0.75;
  const WT = SCREENS.map((s) => 0.9 + 0.24 * s.feats.length);
  const TOT = WT.reduce((a, b) => a + b, 0) + END_W;
  let acc = 0;
  const SPAN = WT.map((w) => {
    const a = acc / TOT;
    acc += w;
    return [a, acc / TOT];
  });
  const U = (i, x) => SPAN[i][0] + x * (SPAN[i][1] - SPAN[i][0]);
  const CLOSE_A = acc / TOT;

  /* ---- stage screenshots + source highlights (decorative copies) ---- */
  const imgs = SCREENS.map((s) => {
    const im = new Image();
    im.alt = '';
    im.decoding = 'async';
    im.width = s.w;
    im.height = s.h;
    im.dataset.src = s.src;
    screen.insertBefore(im, glass);
    return im;
  });
  const ensure = (i) => {
    for (let j = i - 1; j <= i + 2; j++) {
      const im = imgs[j];
      if (im && !im.src) im.src = im.dataset.src;
    }
  };
  SCREENS.forEach((s) =>
    s.feats.forEach((f) => {
      f.hl = document.createElement('span');
      f.hl.className = 'ms-hl';
      screen.appendChild(f.hl);
    }),
  );

  let mode = '',
    L = null,
    raf = 0,
    last = '',
    io = null;

  function splitHeadline(s) {
    const h = s.hd,
      words = h.dataset.t.split(' ');
    h.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    const lines = [];
    let top = null;
    h.querySelectorAll('.w').forEach((w) => {
      if (w.offsetTop !== top) {
        lines.push([]);
        top = w.offsetTop;
      }
      lines[lines.length - 1].push(w.textContent);
    });
    h.innerHTML = lines.map((l) => `<span class="ln"><span class="li">${l.join(' ')}</span></span>`).join('');
    s.lines = [...h.querySelectorAll('.li')];
  }
  function headIn(s, e) {
    const a = ease(cl(e / 0.4));
    s.num.style.opacity = s.eb.style.opacity = cl(e / 0.35).toFixed(3);
    s.num.style.transform = s.eb.style.transform = `translate3d(${((1 - a) * 18).toFixed(1)}px,0,0)`;
    s.lines.forEach((l, k) => {
      const ek = ease(cl((e - 0.14 - 0.12 * k) / 0.46));
      l.style.transform = `translate3d(0,${((1 - ek) * 108).toFixed(1)}%,0)`;
    });
    const ed = ease(cl((e - 0.46) / 0.54));
    s.desc.style.opacity = ed.toFixed(3);
    s.desc.style.transform = `translate3d(0,${((1 - ed) * 14).toFixed(1)}px,0)`;
  }
  function headOut(s, e) {
    const d = ease(cl(e / 0.32));
    s.desc.style.opacity = (1 - d).toFixed(3);
    s.desc.style.transform = `translate3d(0,${(-10 * d).toFixed(1)}px,0)`;
    s.lines.forEach((l, k) => {
      const ek = ease(cl((e - 0.16 - 0.07 * k) / 0.5));
      l.style.transform = `translate3d(0,${(-108 * ek).toFixed(1)}%,0)`;
    });
    const n = ease(cl((e - 0.12) / 0.45));
    s.num.style.opacity = s.eb.style.opacity = (1 - n).toFixed(3);
    s.num.style.transform = s.eb.style.transform = `translate3d(${(-14 * n).toFixed(1)}px,0,0)`;
  }

  /* ---- measured layout: phone, columns, source rectangles, fragment targets, timing windows ---- */
  function layout() {
    const W = stage.clientWidth,
      H = stage.clientHeight,
      top = navH();
    const sh = Math.max(380, Math.min(H - top - 120, 760)),
      sw = (sh * 660) / 1530,
      pw = sw + 18;
    const py = top + 28,
      pcy = py + (sh + 18) / 2,
      progH = 48;
    const gap = W >= 1280 ? 44 : 30,
      pad = 24;
    const colW = (W - pw) / 2 - gap - pad,
      fw = cl(colW, 220, 350);
    const lx = W / 2 - pw / 2 - gap - fw,
      rx = W / 2 + pw / 2 + gap;
    const mh = cl(H * 0.17, 96, 168);
    sec.style.setProperty('--pw', pw + 'px');
    sec.style.setProperty('--cw', fw + 'px');
    sec.style.setProperty('--fw', fw + 'px');
    sec.style.setProperty('--mh', mh + 'px');
    stage.style.setProperty('--gy', (pcy / H) * 100 + '%');
    phone.style.top = py + 'px';
    shadow.style.top = py + sh + 18 - 26 + 'px';
    shadow.style.width = pw * 0.92 + 'px';
    const scrL = W / 2 - pw / 2 + 9,
      scrT = py + 9,
      yMax = H - 12 - progH;
    svg.querySelectorAll('g').forEach((g) => g.remove());
    svg.querySelector('linearGradient').setAttribute('x2', W);
    SCREENS.forEach((s, i) => {
      s.tx.classList.add('r');
      s.tx.classList.remove('l');
      s.tx.style.left = lx + 'px';
      s.tx.style.top = py + 'px';
      splitHeadline(s);
      const headBottom = py + s.tx.offsetHeight + 22;
      const k = Math.max(sw / s.w, sh / s.h),
        offX = (sw - s.w * k) / 2;
      s.feats.forEach((f) => {
        const [rx0, ry0, rw0, rh0] = f.r;
        f.src = { x: scrL + offX + rx0 * s.w * k, y: scrT + ry0 * s.h * k, w: rw0 * s.w * k, h: rh0 * s.h * k };
        f.hl.style.cssText = `left:${(f.src.x - scrL).toFixed(1)}px;top:${(f.src.y - scrT).toFixed(1)}px;width:${f.src.w.toFixed(1)}px;height:${f.src.h.toFixed(1)}px`;
        f.el.style.visibility = 'hidden';
        f.h = f.el.offsetHeight;
        f.ox = f.crop.offsetLeft;
        f.oy = f.crop.offsetTop;
        f.cw = f.crop.offsetWidth;
        f.ch = f.crop.offsetHeight;
      });
      // balanced composition: alternate right / left (left sits below the headline); overflow becomes a second wave
      const R = [],
        Lf = [],
        leftCap = yMax - headBottom,
        rightCap = yMax - (top + 16);
      s.feats.forEach((f, j) => {
        (j % 2 === 0 || f.h > leftCap ? R : Lf).push(f);
      });
      const chunk = (list, cap) => {
        const g = [];
        let cur = [],
          h = 0;
        list.forEach((f) => {
          if (cur.length && h + 14 + f.h > cap) {
            g.push(cur);
            cur = [];
            h = 0;
          }
          h += (cur.length ? 14 : 0) + f.h;
          cur.push(f);
        });
        if (cur.length) g.push(cur);
        return g;
      };
      const rg = chunk(R, rightCap),
        lg = chunk(Lf, leftCap);
      rg.forEach((g) => {
        const tot = g.reduce((a, f) => a + f.h, 0) + 14 * (g.length - 1);
        let y = cl(pcy - tot / 2, top + 16, yMax - tot);
        g.forEach((f) => {
          f.tx = rx;
          f.ty = y;
          f.side = 1;
          y += f.h + 14;
        });
      });
      lg.forEach((g) => {
        const tot = g.reduce((a, f) => a + f.h, 0) + 14 * (g.length - 1);
        let y = cl(headBottom + (leftCap - tot) * 0.35, headBottom, yMax - tot);
        g.forEach((f) => {
          f.tx = lx;
          f.ty = y;
          f.side = -1;
          y += f.h + 14;
        });
      });
      const groups = [];
      for (let g = 0; g < Math.max(rg.length, lg.length); g++) groups.push([...(rg[g] || []), ...(lg[g] || [])].sort((a, b) => a.k - b.k));
      const a0 = 0.15,
        a1 = 0.9,
        len = (a1 - a0) / groups.length;
      groups.forEach((g, gi) => {
        const r0 = a0 + gi * len,
          n = g.length;
        g.forEach((f, j) => {
          const ia = r0 + j * 0.085 * len,
            ib = ia + 0.3 * len,
            oa = r0 + 0.8 * len + (n - 1 - j) * 0.025 * len,
            ob = Math.min(r0 + len, oa + 0.13 * len);
          f.w = [U(i, ia), U(i, ib), U(i, oa), U(i, ob)];
        });
      });
      // light trail from the source component to the card
      s.feats.forEach((f) => {
        f.ex = f.tx + f.ox + f.cw / 2;
        f.ey = f.ty + f.oy + f.ch / 2;
        const sx = f.src.x + f.src.w / 2,
          sy = f.src.y + f.src.h / 2;
        f.cx = (sx + f.ex) / 2;
        f.cy = (sy + f.ey) / 2 - Math.min(48, Math.abs(f.ex - sx) * 0.14);
        const g = document.createElementNS(NS, 'g'),
          pth = document.createElementNS(NS, 'path'),
          dot = document.createElementNS(NS, 'circle');
        pth.setAttribute(
          'd',
          `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${f.cx.toFixed(1)} ${f.cy.toFixed(1)} ${f.ex.toFixed(1)} ${f.ey.toFixed(1)}`,
        );
        pth.setAttribute('stroke', 'url(#ms-tg)');
        dot.setAttribute('r', '2.6');
        g.append(pth, dot);
        g.style.opacity = 0;
        svg.appendChild(g);
        f.g = g;
        f.path = pth;
        f.dot = dot;
        f.len = pth.getTotalLength();
        pth.style.strokeDasharray = f.len;
        pth.style.strokeDashoffset = f.len;
        f.sx = sx;
        f.sy = sy;
        f.el.style.left = f.tx + 'px';
        f.el.style.top = f.ty + 'px';
        f.el.style.transformOrigin = `${f.ox}px ${f.oy}px`;
      });
    });
    close.style.left = lx + 'px';
    close.style.top = py + 'px';
    close.style.textAlign = 'left';
    $('ms-pt').textContent = String(N).padStart(2, '0');
    track.style.height = Math.round(TOT * VH_PER + 100) + 'vh';
    L = { W, H, soft: W < 1100 ? 0.55 : 1 };
    last = '';
    render();
  }

  /* ---- one scroll-scrubbed timeline ---- */
  function render() {
    raf = 0;
    if (mode !== 'pin' || !L) return;
    const r = track.getBoundingClientRect(),
      span = track.offsetHeight - L.H;
    const p = cl(-r.top / span),
      pre = cl((innerHeight - r.top) / (innerHeight * 0.95));
    const ir = intro.getBoundingClientRect(),
      fi = cl((ir.bottom - navH()) / (ir.height * 0.9));
    intro.style.opacity = (fi * fi).toFixed(3);
    intro.style.transform = `translateY(${(-(1 - fi) * 40).toFixed(1)}px)`;
    const key = p.toFixed(4) + '|' + pre.toFixed(3);
    if (key === last) return;
    last = key;
    const soft = L.soft,
      ent = ease(pre),
      clo = ease(cl((p - CLOSE_A) / 0.045));

    // screen arrivals (each screen arrives only after the previous screen's fragments have retracted)
    const q = SCREENS.map((_, i) => (i === 0 ? 1 : cl((p - U(i, -0.05)) / (U(i, 0.07) - U(i, -0.05)))));
    let cur = 0;
    q.forEach((v, i) => {
      if (v >= 0.5) cur = i;
    });
    ensure(cur);
    let tr = 0,
      dir = 1;
    imgs.forEach((im, j) => {
      const qin = q[j],
        qout = j < N - 1 ? q[j + 1] : 0;
      if (qin > 0 && qin < 1) {
        tr = qin;
      }
      const oIn = ease(cl(qin / 0.55)),
        oOut = 1 - ease(cl((qout - 0.3) / 0.62)),
        o = qin > 0 ? oIn * oOut : 0;
      let tf = 'none',
        fl = 'none';
      if (qin < 1 && qin > 0) {
        const e = ease(cl((qin - 0.08) / 0.92));
        tf = `translate3d(0,${(3.2 * (1 - e)).toFixed(2)}%,0) scale(${(1.03 - 0.03 * e).toFixed(4)})`;
        fl = `blur(${(5 * (1 - e) * soft).toFixed(2)}px) brightness(${(0.86 + 0.14 * e).toFixed(3)})`;
      } else if (qout > 0) {
        const e = ease(cl(qout / 0.85));
        tf = `translate3d(0,${(-2.4 * e).toFixed(2)}%,0) scale(${(1 - 0.028 * e).toFixed(4)})`;
        fl = `blur(${(4.5 * e * soft).toFixed(2)}px) brightness(${(1 - 0.32 * e).toFixed(3)})`;
      }
      im.style.opacity = o.toFixed(3);
      im.style.zIndex = j + 1;
      if (o > 0) {
        im.style.transform = tf;
        im.style.filter = fl;
      }
    });
    const bump = Math.sin(Math.PI * tr);

    // screen headlines (left column)
    SCREENS.forEach((s, i) => {
      const eIn = i === 0 ? cl((pre - 0.45) / 0.55) : cl((p - U(i, 0)) / (U(i, 0.14) - U(i, 0)));
      const eOut = i === N - 1 ? cl(clo / 0.7) : cl((p - U(i, 0.9)) / (U(i, 1) - U(i, 0.9)));
      const vis = eIn > 0 && eOut < 1;
      s.tx.style.visibility = vis ? 'visible' : 'hidden';
      s.tx.style.opacity = vis ? '1' : '0';
      if (!vis) return;
      if (eOut > 0) headOut(s, eOut);
      else headIn(s, eIn);
    });

    // feature extraction: crop copies leave their exact source rectangle, grow into readable cards, then return
    let open = 0,
      flight = 0;
    SCREENS.forEach((s, i) =>
      s.feats.forEach((f) => {
        const [a, b, c2, d] = f.w,
          ein = ease(cl((p - a) / (b - a))),
          eout = ease(cl((p - c2) / (d - c2))),
          e = ein * (1 - eout),
          el = f.el;
        if (e <= 0.001) {
          if (el.style.visibility !== 'hidden') {
            el.style.visibility = 'hidden';
            f.g.style.opacity = 0;
            f.hl.style.opacity = 0;
          }
          return;
        }
        open = Math.max(open, e);
        flight = Math.max(flight, 4 * e * (1 - e));
        const s0 = f.src.w / f.cw,
          sc = s0 + (1 - s0) * e;
        const bx = (f.src.x - (f.tx + f.ox)) * (1 - e),
          by = (f.src.y - (f.ty + f.oy)) * (1 - e);
        const arc = Math.sin(Math.PI * e) * (f.cy - (f.sy + f.ey) / 2) * 0.6;
        const ry = f.side * -10 * (1 - e) * soft;
        el.style.visibility = 'visible';
        el.style.opacity = '1';
        el.style.transform = `translate3d(${bx.toFixed(1)}px,${(by + arc).toFixed(1)}px,0) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
        f.crop.style.opacity = cl(e * 10).toFixed(3);
        el.style.setProperty('--cg', (0.25 * e + 0.9 * Math.sin(Math.PI * e)).toFixed(3));
        f.bg.style.opacity = ease(cl((e - 0.55) / 0.35)).toFixed(3);
        f.tl.forEach((l) => {
          const ek = ease(cl((e - 0.68) / 0.26));
          l.style.transform = `translate3d(0,${((1 - ek) * 108).toFixed(1)}%,0)`;
        });
        const ep = ease(cl((e - 0.78) / 0.22));
        f.p.style.opacity = ep.toFixed(3);
        f.p.style.transform = `translate3d(0,${((1 - ep) * 8).toFixed(1)}px,0)`;
        f.hl.style.opacity = (Math.sin(Math.PI * e) * 0.95 + 0.12 * e).toFixed(3);
        f.g.style.opacity = ((0.3 + 2.4 * ein * (1 - ein)) * (1 - eout)).toFixed(3);
        const path = f.path;
        path.style.strokeDashoffset = (f.len * (1 - e)).toFixed(1);
        const pt = path.getPointAtLength(f.len * e);
        f.dot.setAttribute('cx', pt.x.toFixed(1));
        f.dot.setAttribute('cy', pt.y.toFixed(1));
      }),
    );

    // closing message
    const ce = cl((clo - 0.25) / 0.75);
    close.style.opacity = clo > 0 ? '1' : '0';
    closeLines.forEach((l, k) => {
      const ek = ease(cl((ce - 0.12 * k) / 0.7));
      l.style.transform = `translate3d(0,${((1 - ek) * 108).toFixed(1)}%,0)`;
    });
    close.lastElementChild.style.opacity = ease(cl((ce - 0.45) / 0.55)).toFixed(3);

    // phone: perspective entrance, then fixed
    phone.style.transform = `translateX(-50%) translate3d(0,${((1 - ent) * 90).toFixed(1)}px,0) rotateX(${(14 * (1 - ent)).toFixed(2)}deg) scale(${(0.9 + 0.1 * ent).toFixed(4)})`;
    phone.style.opacity = ent.toFixed(3);

    // studio lighting: brighter while features are out or a screen changes; calm while reading
    dev.style.setProperty('--rim', (0.12 + 0.45 * Math.max(bump, flight) + 0.12 * open).toFixed(3));
    stage.style.setProperty('--ga', (0.22 + 0.1 * open + 0.12 * bump + 0.1 * clo).toFixed(3));
    stage.style.setProperty('--gs', (1 + 0.05 * open * soft + 0.04 * clo).toFixed(3));
    stage.style.setProperty('--gox', (dir * 20 * bump * soft).toFixed(1) + 'px');
    stage.style.setProperty('--goy', (-8 * flight * soft).toFixed(1) + 'px');
    atmo.style.transform = `translate3d(0,${(10 * bump * soft).toFixed(1)}px,0) scale(${(1 + 0.015 * Math.max(bump, open * 0.6) * soft).toFixed(4)})`;
    shadow.style.transform = `translateX(-50%) translate3d(0,${((1 - ent) * 90).toFixed(1)}px,0)`;
    shadow.style.opacity = (ent * (0.55 + 0.15 * open)).toFixed(3);
    const sw = ease(cl((tr - 0.1) / 0.7));
    sweep.style.setProperty('--swo', (Math.sin(Math.PI * sw) * 0.85 * (soft < 1 ? 0.6 : 1)).toFixed(3));
    sweep.style.setProperty('--swx', (120 - 140 * sw).toFixed(1) + '%');
    glass.style.setProperty('--glx', (70 - 40 * sw).toFixed(1) + '%');

    // progress
    $('ms-pn').textContent = String(cur + 1).padStart(2, '0');
    $('ms-pl').textContent = clo > 0.5 ? 'Done' : SCREENS[cur].label;
    const within = cl((p - SPAN[cur][0]) / (SPAN[cur][1] - SPAN[cur][0]));
    $('ms-pb').style.setProperty('--f', ((cur + within) / N).toFixed(3));
  }
  const onScroll = () => {
    if (mode === 'pin' && !raf) raf = requestAnimationFrame(render);
  };

  function toStatic() {
    mode = 'static';
    sec.classList.remove('ms-pin');
    track.style.height = '';
    intro.style.cssText = '';
    SCREENS.forEach((s) => {
      s.tx.style.cssText = '';
      s.hd.textContent = s.hd.dataset.t;
      s.lines = [];
      [s.num, s.eb, s.desc].forEach((e) => (e.style.cssText = ''));
      s.feats.forEach((f) => {
        f.el.style.cssText = '';
        f.crop.style.opacity = '';
        f.bg.style.opacity = '';
        f.p.style.cssText = '';
        f.tl.forEach((l) => (l.style.transform = ''));
      });
    });
    close.style.cssText = '';
    closeLines.forEach((l) => (l.style.cssText = ''));
    close.lastElementChild.style.cssText = '';
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window && !io) {
      sec.classList.add('ms-anim');
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('seen');
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.08 },
      );
      items.forEach((li) => io.observe(li));
    }
  }
  function toPin() {
    mode = 'pin';
    sec.classList.remove('ms-anim');
    items.forEach((li) => li.classList.add('seen'));
    sec.classList.add('ms-pin');
    ensure(0);
    layout();
  }
  const pick = () => (mqStatic.matches || innerHeight < 560 ? 'static' : 'pin');
  function setMode() {
    if (pick() === 'static') toStatic();
    else toPin();
  }
  addEventListener('scroll', onScroll, { passive: true });
  let rt = 0;
  const onResize = () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (pick() !== mode) setMode();
      else if (mode === 'pin') layout();
    }, 140);
  };
  addEventListener('resize', onResize);
  cleanups.push(() => {
    mode = 'dead';
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onResize);
    clearTimeout(rt);
    cancelAnimationFrame(raf);
    io && io.disconnect();
    mqStatic.removeEventListener?.('change', setMode);
    sec.classList.remove('ms-pin', 'ms-anim');
    sec.removeAttribute('style');
  });
  mqStatic.addEventListener?.('change', setMode);
  setMode();
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(() => {
      if (mode === 'pin') layout();
    });
  return () => cleanups.forEach((f) => f());
}

/* ═══════════ Section markup ═══════════ */
const WebMarkup = memo(function WebMarkup() {
  return (
    <>
      <div className="xp-intro">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
          The Seek People Web Experience
        </span>
        <h2 className="xp-h2" id="wa-title">
          <span>Your Entire Workforce.</span>
          <span>
            <em>One Powerful Workspace.</em>
          </span>
        </h2>
        <p className="xp-lede">
          Manage employee information, attendance, payroll, assets, workforce activity and reporting through Seek People's central
          administration platform.
        </p>
      </div>
      <div className="xp-track">
        <div className="xp-stage">
          <div className="xp-glow" aria-hidden="true" />
          <svg className="xp-trails" aria-hidden="true">
            <defs>
              <linearGradient id="wa-tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#8660F8" stopOpacity=".2" />
                <stop offset="1" stopColor="#E3D6FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="xp-devw" aria-hidden="true">
            <div className="xp-dev wa">
              <div className="wa-br">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="wa-url">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  os.seeknow.in/
                  <span className="wa-path">
                    <span data-nav="0">dashboard</span>
                    <span data-nav="1">employee</span>
                    <span data-nav="2">assets</span>
                    <span data-nav="3">attendance</span>
                    <span data-nav="4">payroll</span>
                    <span data-nav="5">tracking</span>
                    <span data-nav="6">reports</span>
                    <span data-nav="7">audit-logs</span>
                  </span>
                </span>
              </div>
              <div className="wa-nav">
                <span className="wa-logo">
                  seek
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M8.5 12.5a3.5 3.5 0 0 0 7 0" />
                  </svg>
                  now
                </span>
                <span className="wa-tabs">
                  <span className="wa-tab" data-nav="0">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
                    </svg>
                    <span>Dashboard</span>
                  </span>
                  <span className="wa-tab" data-nav="1">
                    <svg viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="3.5" />
                      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5a3.5 3.5 0 0 1 0 6.5M21 20c0-2.6-1.6-4.8-4-5.6" />
                    </svg>
                    <span>Employee</span>
                  </span>
                  <span className="wa-tab" data-nav="2">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l9 5-9 5-9-5z" />
                      <path d="M3 13l9 5 9-5" />
                    </svg>
                    <span>Assets</span>
                  </span>
                  <span className="wa-tab" data-nav="3">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M3 10h18M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
                    </svg>
                    <span>Attendance</span>
                  </span>
                  <span className="wa-tab" data-nav="4">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="6" width="18" height="13" rx="2" />
                      <path d="M3 10h18M16 15h2" />
                    </svg>
                    <span>Payroll</span>
                  </span>
                  <span className="wa-tab" data-nav="5">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>Tracking</span>
                  </span>
                  <span className="wa-tab" data-nav="6">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" />
                    </svg>
                    <span>Reports</span>
                  </span>
                  <span className="wa-tab" data-nav="7">
                    <svg viewBox="0 0 24 24">
                      <rect x="5" y="4" width="14" height="17" rx="2" />
                      <path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
                    </svg>
                    <span>Audit Logs</span>
                  </span>
                </span>
                <span className="wa-icons">
                  <span className="wa-ib">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
                      <path d="M10 21h4" />
                    </svg>
                    <b>12</b>
                  </span>
                  <span className="wa-ib">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
                    </svg>
                  </span>
                  <span className="wa-me">HR</span>
                </span>
              </div>
              <div className="wa-scrs">
                <div className="xp-scr" data-s="0">
                  <div className="wa-h">
                    <div>
                      <h5>Good Afternoon 👋</h5>
                      <small>Here's what's happening in your organization today.</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-chip">23 Oct 2026</span>
                      <span className="wa-btn">✦ Make Workplaces Happier Together</span>
                    </div>
                  </div>
                  <div className="wa-stats" data-src="d0">
                    <div className="wa-st" style={{ '--c': '#8B6CF6' }}>
                      <span className="tt">
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3" />
                            <circle cx="5" cy="10" r="2" />
                            <circle cx="19" cy="10" r="2" />
                            <path d="M7 19c0-3 2.2-5 5-5s5 2 5 5" />
                          </svg>
                        </i>
                        Total Employees
                      </span>
                      <span className="v">
                        148/
                        <span>148</span>
                      </span>
                      <span className="d">
                        ↑ +6% from last month
                        <svg viewBox="0 0 46 16">
                          <path d="M1 14 L12 10 L22 11 L33 6 L45 2" />
                        </svg>
                      </span>
                    </div>
                    <div className="wa-st" style={{ '--c': '#4C7DFF' }}>
                      <span className="tt">
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="9" cy="8" r="3" />
                            <circle cx="16" cy="8" r="3" />
                            <path d="M3 19c0-3 2.7-5 6-5M21 19c0-3-2.7-5-6-5" />
                          </svg>
                        </i>
                        Active Employees
                      </span>
                      <span className="v">
                        131/
                        <span>148</span>
                      </span>
                      <span className="d">
                        ↑ +2% from yesterday
                        <svg viewBox="0 0 46 16">
                          <path d="M1 12 L12 12 L22 9 L33 10 L45 4" />
                        </svg>
                      </span>
                    </div>
                    <div className="wa-st" style={{ '--c': '#3FBF6F' }}>
                      <span className="tt">
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="10" cy="8" r="3.5" />
                            <path d="M3 20c0-3.5 3-6 7-6M17 12v6M14 15h6" />
                          </svg>
                        </i>
                        Present Employees
                      </span>
                      <span className="v">
                        118/
                        <span>131</span>
                      </span>
                      <span className="d">
                        ↑ +4% from yesterday
                        <svg viewBox="0 0 46 16">
                          <path d="M1 8 L10 12 L18 7 L27 13 L36 5 L45 3" />
                        </svg>
                      </span>
                    </div>
                    <div className="wa-st" style={{ '--c': '#F0643C', '--dc': '#FF8A7A' }}>
                      <span className="tt">
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="10" cy="8" r="3.5" />
                            <path d="M3 20c0-3.5 3-6 7-6M14 16h6" />
                          </svg>
                        </i>
                        Absent Employees
                      </span>
                      <span className="v">
                        13/
                        <span>131</span>
                      </span>
                      <span className="d">
                        ↓ −3% from yesterday
                        <svg viewBox="0 0 46 16">
                          <path d="M1 12 L14 12 L22 4 L30 12 L45 13" />
                        </svg>
                      </span>
                    </div>
                    <div className="wa-st" style={{ '--c': '#F2C230' }}>
                      <span className="tt">
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="10" cy="8" r="3.5" />
                            <path d="M3 20c0-3.5 3-6 7-6M17 12v6M14 15h6" />
                          </svg>
                        </i>
                        New Joinee
                      </span>
                      <span className="v">
                        6/
                        <span>131</span>
                      </span>
                      <span className="d">↑ +2 since yesterday</span>
                    </div>
                  </div>
                  <div className="wa-pend" data-src="d2">
                    <h6>
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v6M12 16.5v.5" />
                      </svg>
                      Pending employee setup
                    </h6>
                    <p>These employees are missing configuration. Tap a card to assign now.</p>
                    <div className="wa-pi">
                      <div>
                        <i>
                          <svg viewBox="0 0 24 24">
                            <circle cx="9" cy="9" r="3" />
                            <path d="M4 19c0-3 2.2-5 5-5M15 9h5M15 13h5" />
                          </svg>
                        </i>
                        <span>
                          <b>Onboarding incomplete</b>1 employee
                        </span>
                        <a>View &amp; resend →</a>
                      </div>
                      <div>
                        <i>
                          <svg viewBox="0 0 24 24">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M4 10h16M9 3v4M15 3v4" />
                          </svg>
                        </i>
                        <span>
                          <b>Holiday calendar not assigned</b>2 employees
                        </span>
                        <a>Assign now →</a>
                      </div>
                    </div>
                  </div>
                  <div className="wa-bot">
                    <div className="wa-card" data-src="d1">
                      <p className="wa-ct">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="tag">
                            <svg viewBox="0 0 24 24">
                              <rect x="4" y="5" width="16" height="15" rx="2" />
                              <path d="M4 10h16" />
                            </svg>
                          </span>
                          Employee Attendance Overview
                        </span>
                        <span className="wa-seg">
                          <span>Daily</span>
                          <span>Weekly</span>
                          <span className="on">Monthly</span>
                        </span>
                      </p>
                      <p className="wa-leg">
                        <span>
                          <i style={{ '--c': '#3FBF7F' }} />
                          On Time
                        </span>
                        <span>
                          <i style={{ '--c': '#F5C542' }} />
                          Late Arrival
                        </span>
                        <span>
                          <i style={{ '--c': '#E5484D' }} />
                          Absent
                        </span>
                      </p>
                      <div className="wa-bars">
                        <span style={{ height: '92%' }}>
                          <i className="g" style={{ height: '80%' }} />
                          <i className="y" style={{ height: '12%' }} />
                          <i className="r" style={{ height: '8%' }} />
                        </span>
                        <span style={{ height: '88%' }}>
                          <i className="g" style={{ height: '78%' }} />
                          <i className="y" style={{ height: '13%' }} />
                          <i className="r" style={{ height: '9%' }} />
                        </span>
                        <span style={{ height: '95%' }}>
                          <i className="g" style={{ height: '84%' }} />
                          <i className="y" style={{ height: '9%' }} />
                          <i className="r" style={{ height: '7%' }} />
                        </span>
                        <span style={{ height: '90%' }}>
                          <i className="g" style={{ height: '76%' }} />
                          <i className="y" style={{ height: '15%' }} />
                          <i className="r" style={{ height: '9%' }} />
                        </span>
                        <span style={{ height: '93%' }}>
                          <i className="g" style={{ height: '82%' }} />
                          <i className="y" style={{ height: '10%' }} />
                          <i className="r" style={{ height: '8%' }} />
                        </span>
                        <span style={{ height: '60%' }}>
                          <i className="g" style={{ height: '70%' }} />
                          <i className="y" style={{ height: '14%' }} />
                          <i className="r" style={{ height: '16%' }} />
                        </span>
                        <span style={{ height: '94%' }}>
                          <i className="g" style={{ height: '85%' }} />
                          <i className="y" style={{ height: '9%' }} />
                          <i className="r" style={{ height: '6%' }} />
                        </span>
                        <span style={{ height: '91%' }}>
                          <i className="g" style={{ height: '80%' }} />
                          <i className="y" style={{ height: '11%' }} />
                          <i className="r" style={{ height: '9%' }} />
                        </span>
                        <span style={{ height: '89%' }}>
                          <i className="g" style={{ height: '77%' }} />
                          <i className="y" style={{ height: '14%' }} />
                          <i className="r" style={{ height: '9%' }} />
                        </span>
                        <span style={{ height: '96%' }}>
                          <i className="g" style={{ height: '86%' }} />
                          <i className="y" style={{ height: '8%' }} />
                          <i className="r" style={{ height: '6%' }} />
                        </span>
                        <span style={{ height: '92%' }}>
                          <i className="g" style={{ height: '81%' }} />
                          <i className="y" style={{ height: '11%' }} />
                          <i className="r" style={{ height: '8%' }} />
                        </span>
                        <span style={{ height: '58%' }}>
                          <i className="g" style={{ height: '72%' }} />
                          <i className="y" style={{ height: '12%' }} />
                          <i className="r" style={{ height: '16%' }} />
                        </span>
                        <span style={{ height: '93%' }}>
                          <i className="g" style={{ height: '83%' }} />
                          <i className="y" style={{ height: '10%' }} />
                          <i className="r" style={{ height: '7%' }} />
                        </span>
                        <span style={{ height: '90%' }}>
                          <i className="g" style={{ height: '79%' }} />
                          <i className="y" style={{ height: '12%' }} />
                          <i className="r" style={{ height: '9%' }} />
                        </span>
                        <span style={{ height: '94%' }}>
                          <i className="g" style={{ height: '84%' }} />
                          <i className="y" style={{ height: '9%' }} />
                          <i className="r" style={{ height: '7%' }} />
                        </span>
                        <span style={{ height: '91%' }}>
                          <i className="g" style={{ height: '80%' }} />
                          <i className="y" style={{ height: '12%' }} />
                          <i className="r" style={{ height: '8%' }} />
                        </span>
                        <span style={{ height: '95%' }}>
                          <i className="g" style={{ height: '86%' }} />
                          <i className="y" style={{ height: '8%' }} />
                          <i className="r" style={{ height: '6%' }} />
                        </span>
                        <span style={{ height: '62%' }}>
                          <i className="g" style={{ height: '71%' }} />
                          <i className="y" style={{ height: '13%' }} />
                          <i className="r" style={{ height: '16%' }} />
                        </span>
                      </div>
                    </div>
                    <div className="wa-card">
                      <p className="wa-ct">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="tag">
                            <svg viewBox="0 0 24 24">
                              <rect x="4" y="5" width="16" height="15" rx="2" />
                              <path d="M4 10h16" />
                            </svg>
                          </span>
                          Attendance Summary
                        </span>
                      </p>
                      <div className="wa-donut">
                        <svg viewBox="0 0 42 42">
                          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2A2450" strokeWidth="5" />
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            fill="none"
                            stroke="#3FBF7F"
                            strokeWidth="5"
                            strokeDasharray="58 42"
                            strokeDashoffset="25"
                          />
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            fill="none"
                            stroke="#4C7DFF"
                            strokeWidth="5"
                            strokeDasharray="18 82"
                            strokeDashoffset="-33"
                          />
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            fill="none"
                            stroke="#F5C542"
                            strokeWidth="5"
                            strokeDasharray="14 86"
                            strokeDashoffset="-51"
                          />
                          <circle
                            cx="21"
                            cy="21"
                            r="15.9"
                            fill="none"
                            stroke="#E5687F"
                            strokeWidth="5"
                            strokeDasharray="10 90"
                            strokeDashoffset="-65"
                          />
                          <text x="21" y="23.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">
                            148
                          </text>
                        </svg>
                        <ul>
                          <li>
                            <i style={{ '--c': '#3FBF7F' }} />
                            Operations
                            <b>58%</b>
                          </li>
                          <li>
                            <i style={{ '--c': '#4C7DFF' }} />
                            Technician
                            <b>18%</b>
                          </li>
                          <li>
                            <i style={{ '--c': '#F5C542' }} />
                            Team Leader
                            <b>14%</b>
                          </li>
                          <li>
                            <i style={{ '--c': '#E5687F' }} />
                            Admin
                            <b>10%</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="1">
                  <div className="wa-h">
                    <div>
                      <h5>Employees</h5>
                      <small>148 employees · 6 departments</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-chip">
                        <svg viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="7" />
                          <path d="M20 20l-3.5-3.5" />
                        </svg>
                        Search employees
                      </span>
                      <span className="wa-chip">Department ▾</span>
                      <span className="wa-chip">Status ▾</span>
                      <span className="wa-btn">+ Add Employee</span>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="e0">
                      <table className="wa-tbl">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>ID</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="sel">
                            <td className="nm">
                              <span className="wa-av">AR</span>
                              Ananya Rao
                            </td>
                            <td>EMP-1042</td>
                            <td>Operations</td>
                            <td>Team Leader</td>
                            <td>
                              <span className="wa-pl g">Active</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av b">KM</span>
                              Karthik Menon
                            </td>
                            <td>EMP-1038</td>
                            <td>Engineering</td>
                            <td>Technician</td>
                            <td>
                              <span className="wa-pl g">Active</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av c">FK</span>
                              Farah Khan
                            </td>
                            <td>EMP-1051</td>
                            <td>Human Resources</td>
                            <td>HR Executive</td>
                            <td>
                              <span className="wa-pl g">Active</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av d">RD</span>
                              Rohan Das
                            </td>
                            <td>EMP-1063</td>
                            <td>Operations</td>
                            <td>Associate</td>
                            <td>
                              <span className="wa-pl v">Onboarding</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av e">MP</span>
                              Meera Pillai
                            </td>
                            <td>EMP-1017</td>
                            <td>Finance</td>
                            <td>Accountant</td>
                            <td>
                              <span className="wa-pl g">Active</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av b">VS</span>
                              Vivek Shetty
                            </td>
                            <td>EMP-1009</td>
                            <td>Operations</td>
                            <td>Supervisor</td>
                            <td>
                              <span className="wa-pl y">On notice</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av c">NJ</span>
                              Nisha Joseph
                            </td>
                            <td>EMP-1070</td>
                            <td>Administration</td>
                            <td>Coordinator</td>
                            <td>
                              <span className="wa-pl g">Active</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
                      <div className="wa-card" data-src="e1">
                        <div className="wa-prof">
                          <span className="wa-av">AR</span>
                          <span>
                            <b>Ananya Rao</b>
                            <small>Team Leader · Operations</small>
                          </span>
                        </div>
                        <div className="wa-kv">
                          <div>
                            <span>Employee ID</span>
                            <b>EMP-1042</b>
                          </div>
                          <div>
                            <span>Reporting to</span>
                            <b>Vivek Shetty</b>
                          </div>
                          <div>
                            <span>Work location</span>
                            <b>Bengaluru</b>
                          </div>
                        </div>
                      </div>
                      <div className="wa-card" data-src="e2">
                        <p className="wa-ct">Joining details</p>
                        <div className="wa-kv">
                          <div>
                            <span>Date of joining</span>
                            <b>14 Mar 2024</b>
                          </div>
                          <div>
                            <span>Employment type</span>
                            <b>Full-time</b>
                          </div>
                          <div>
                            <span>Status</span>
                            <b>
                              <span className="wa-pl g">Active</span>
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="2">
                  <div className="wa-h">
                    <div>
                      <h5>Assets</h5>
                      <small>Company assets and their assignments</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-chip">
                        <svg viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="7" />
                          <path d="M20 20l-3.5-3.5" />
                        </svg>
                        Search assets
                      </span>
                      <span className="wa-chip">Category ▾</span>
                      <span className="wa-btn">+ Add Asset</span>
                    </div>
                  </div>
                  <div className="wa-sum" data-src="a2">
                    <div>
                      <span>
                        <i style={{ '--c': '#8B6CF6' }} />
                        Total assets
                      </span>
                      <b>64</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#3FBF7F' }} />
                        Assigned
                      </span>
                      <b>51</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#4C7DFF' }} />
                        Available
                      </span>
                      <b>13</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#F5C542' }} />
                        Categories
                      </span>
                      <b>5</b>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="a0">
                      <table className="wa-tbl">
                        <thead>
                          <tr>
                            <th>Asset ID</th>
                            <th>Asset</th>
                            <th>Category</th>
                            <th>Assigned to</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="sel">
                            <td>AST-0142</td>
                            <td>
                              <b>Laptop 14-inch</b>
                            </td>
                            <td>IT equipment</td>
                            <td className="nm">
                              <span className="wa-av">AR</span>
                              Ananya Rao
                            </td>
                            <td>
                              <span className="wa-pl g">Assigned</span>
                            </td>
                          </tr>
                          <tr>
                            <td>AST-0137</td>
                            <td>
                              <b>Mobile phone</b>
                            </td>
                            <td>IT equipment</td>
                            <td className="nm">
                              <span className="wa-av b">KM</span>
                              Karthik Menon
                            </td>
                            <td>
                              <span className="wa-pl g">Assigned</span>
                            </td>
                          </tr>
                          <tr>
                            <td>AST-0151</td>
                            <td>
                              <b>Monitor 24-inch</b>
                            </td>
                            <td>IT equipment</td>
                            <td style={{ color: '#8F88B0' }}>—</td>
                            <td>
                              <span className="wa-pl v">Available</span>
                            </td>
                          </tr>
                          <tr>
                            <td>AST-0119</td>
                            <td>
                              <b>Access card</b>
                            </td>
                            <td>Facilities</td>
                            <td className="nm">
                              <span className="wa-av c">FK</span>
                              Farah Khan
                            </td>
                            <td>
                              <span className="wa-pl g">Assigned</span>
                            </td>
                          </tr>
                          <tr>
                            <td>AST-0163</td>
                            <td>
                              <b>Headset</b>
                            </td>
                            <td>Accessories</td>
                            <td style={{ color: '#8F88B0' }}>—</td>
                            <td>
                              <span className="wa-pl v">Available</span>
                            </td>
                          </tr>
                          <tr>
                            <td>AST-0108</td>
                            <td>
                              <b>Safety kit</b>
                            </td>
                            <td>Field equipment</td>
                            <td className="nm">
                              <span className="wa-av d">RD</span>
                              Rohan Das
                            </td>
                            <td>
                              <span className="wa-pl g">Assigned</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="wa-card" data-src="a1">
                      <p className="wa-ct">Asset assignment</p>
                      <div className="wa-prof">
                        <span
                          className="wa-av"
                          style={{ borderRadius: '10px', '--a': 'linear-gradient(135deg,#3B2FA8,#7C5CF6)', color: '#fff' }}
                        >
                          LP
                        </span>
                        <span>
                          <b>Laptop 14-inch</b>
                          <small>AST-0142 · IT equipment</small>
                        </span>
                      </div>
                      <div className="wa-kv">
                        <div>
                          <span>Assigned to</span>
                          <b>Ananya Rao</b>
                        </div>
                        <div>
                          <span>Assigned on</span>
                          <b>18 Mar 2024</b>
                        </div>
                        <div>
                          <span>Status</span>
                          <b>
                            <span className="wa-pl g">Assigned</span>
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="3">
                  <div className="wa-h">
                    <div>
                      <h5>Attendance</h5>
                      <small>Daily attendance · 131 active employees</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-chip">‹ Fri, 23 Oct 2026 ›</span>
                      <span className="wa-seg">
                        <span className="on">Daily</span>
                        <span>Weekly</span>
                        <span>Monthly</span>
                      </span>
                    </div>
                  </div>
                  <div className="wa-sum" data-src="t1">
                    <div>
                      <span>
                        <i style={{ '--c': '#3FBF7F' }} />
                        Present
                      </span>
                      <b>118</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#F5C542' }} />
                        Late arrival
                      </span>
                      <b>9</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#E5484D' }} />
                        Absent
                      </span>
                      <b>13</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#4C7DFF' }} />
                        On leave
                      </span>
                      <b>4</b>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="t3">
                      <table className="wa-tbl">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Shift</th>
                            <th>Check in</th>
                            <th>Check out</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="nm">
                              <span className="wa-av">AR</span>
                              Ananya Rao
                            </td>
                            <td>General</td>
                            <td>09:02</td>
                            <td>—</td>
                            <td>
                              <span className="wa-pl g">On time</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av b">KM</span>
                              Karthik Menon
                            </td>
                            <td>Morning</td>
                            <td>06:11</td>
                            <td>14:04</td>
                            <td>
                              <span className="wa-pl g">On time</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av c">FK</span>
                              Farah Khan
                            </td>
                            <td>General</td>
                            <td>09:24</td>
                            <td>—</td>
                            <td>
                              <span className="wa-pl y">Late arrival</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av d">RD</span>
                              Rohan Das
                            </td>
                            <td>Morning</td>
                            <td>—</td>
                            <td>—</td>
                            <td>
                              <span className="wa-pl r">Absent</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av e">MP</span>
                              Meera Pillai
                            </td>
                            <td>General</td>
                            <td>—</td>
                            <td>—</td>
                            <td>
                              <span className="wa-pl v">On leave</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av b">VS</span>
                              Vivek Shetty
                            </td>
                            <td>Evening</td>
                            <td>13:56</td>
                            <td>—</td>
                            <td>
                              <span className="wa-pl g">On time</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
                      <div className="wa-card" data-src="t0">
                        <p className="wa-ct">October 2026</p>
                        <div className="wa-cal">
                          <span className="h">M</span>
                          <span className="h">T</span>
                          <span className="h">W</span>
                          <span className="h">T</span>
                          <span className="h">F</span>
                          <span className="h">S</span>
                          <span className="h">S</span>
                          <span className="d x">29</span>
                          <span className="d x">30</span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            1
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            2
                          </span>
                          <span className="d" style={{ '--c': '#F5C542' }}>
                            3
                          </span>
                          <span className="d">4</span>
                          <span className="d">5</span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            6
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            7
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            8
                          </span>
                          <span className="d" style={{ '--c': '#E5484D' }}>
                            9
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            10
                          </span>
                          <span className="d">11</span>
                          <span className="d">12</span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            13
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            14
                          </span>
                          <span className="d" style={{ '--c': '#F5C542' }}>
                            15
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            16
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            17
                          </span>
                          <span className="d">18</span>
                          <span className="d">19</span>
                          <span className="d" style={{ '--c': '#4C7DFF' }}>
                            20
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            21
                          </span>
                          <span className="d" style={{ '--c': '#3FBF7F' }}>
                            22
                          </span>
                          <span className="d td">23</span>
                          <span className="d">24</span>
                          <span className="d">25</span>
                          <span className="d">26</span>
                        </div>
                      </div>
                      <div className="wa-card" data-src="t2" style={{ display: 'grid', gap: '6px' }}>
                        <p className="wa-ct" style={{ margin: '0 0 3px' }}>
                          Shifts today
                        </p>
                        <div className="wa-shift">
                          <span>
                            <b>General</b>
                            <small>09:00 – 18:00</small>
                          </span>
                          <span className="wa-pl v">84 employees</span>
                        </div>
                        <div className="wa-shift">
                          <span>
                            <b>Morning</b>
                            <small>06:00 – 14:00</small>
                          </span>
                          <span className="wa-pl v">29 employees</span>
                        </div>
                        <div className="wa-shift">
                          <span>
                            <b>Evening</b>
                            <small>14:00 – 22:00</small>
                          </span>
                          <span className="wa-pl v">18 employees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="4">
                  <div className="wa-h">
                    <div>
                      <h5>Payroll · October 2026</h5>
                      <small>Pay period 1 – 31 Oct 2026 · sample figures</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-pl y" style={{ height: '26px', padding: '0 12px' }}>
                        In review
                      </span>
                      <span className="wa-chip">‹ Oct 2026 ›</span>
                    </div>
                  </div>
                  <div className="wa-sum" data-src="p1">
                    <div>
                      <span>
                        <i style={{ '--c': '#8B6CF6' }} />
                        Employees
                      </span>
                      <b>142</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#3FBF7F' }} />
                        Gross pay
                      </span>
                      <b>₹48,62,400</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#E5484D' }} />
                        Deductions
                      </span>
                      <b>₹5,11,800</b>
                    </div>
                    <div>
                      <span>
                        <i style={{ '--c': '#4C7DFF' }} />
                        Net pay
                      </span>
                      <b>₹43,50,600</b>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="p3">
                      <table className="wa-tbl">
                        <thead>
                          <tr>
                            <th>Employee</th>
                            <th>Gross</th>
                            <th>Deductions</th>
                            <th>Net pay</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="sel">
                            <td className="nm">
                              <span className="wa-av">AR</span>
                              Ananya Rao
                            </td>
                            <td>₹62,000</td>
                            <td>₹6,940</td>
                            <td>
                              <b>₹55,060</b>
                            </td>
                            <td>
                              <span className="wa-pl g">Processed</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av b">KM</span>
                              Karthik Menon
                            </td>
                            <td>₹48,500</td>
                            <td>₹5,620</td>
                            <td>
                              <b>₹42,880</b>
                            </td>
                            <td>
                              <span className="wa-pl g">Processed</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av c">FK</span>
                              Farah Khan
                            </td>
                            <td>₹36,000</td>
                            <td>₹4,120</td>
                            <td>
                              <b>₹31,880</b>
                            </td>
                            <td>
                              <span className="wa-pl g">Processed</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av d">RD</span>
                              Rohan Das
                            </td>
                            <td>₹29,500</td>
                            <td>₹3,540</td>
                            <td>
                              <b>₹25,960</b>
                            </td>
                            <td>
                              <span className="wa-pl y">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="nm">
                              <span className="wa-av e">MP</span>
                              Meera Pillai
                            </td>
                            <td>₹54,000</td>
                            <td>₹6,180</td>
                            <td>
                              <b>₹47,820</b>
                            </td>
                            <td>
                              <span className="wa-pl y">Pending</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
                      <div className="wa-card" data-src="p0">
                        <p className="wa-ct">Earnings · Ananya Rao</p>
                        <div className="wa-kv">
                          <div>
                            <span>Basic</span>
                            <b>₹31,000</b>
                          </div>
                          <div>
                            <span>HRA</span>
                            <b>₹12,400</b>
                          </div>
                          <div>
                            <span>Special allowance</span>
                            <b>₹14,600</b>
                          </div>
                          <div>
                            <span>Conveyance</span>
                            <b>₹4,000</b>
                          </div>
                        </div>
                      </div>
                      <div className="wa-card" data-src="p2">
                        <p className="wa-ct">Deductions</p>
                        <div className="wa-kv">
                          <div>
                            <span>Provident fund</span>
                            <b>₹3,720</b>
                          </div>
                          <div>
                            <span>Professional tax</span>
                            <b>₹200</b>
                          </div>
                          <div>
                            <span>Income tax (TDS)</span>
                            <b>₹3,020</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="5">
                  <div className="wa-h">
                    <div>
                      <h5>Tracking</h5>
                      <small>Tracking workspace</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-pl y" style={{ height: '26px', padding: '0 12px' }}>
                        Conceptual preview
                      </span>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="k0" style={{ display: 'grid', gap: '14px', alignContent: 'start' }}>
                      <p className="wa-ct" style={{ margin: '0' }}>
                        Tracking overview
                      </p>
                      <div className="wa-skel">
                        <i style={{ width: '82%' }} />
                        <i style={{ width: '64%' }} />
                        <i style={{ width: '74%' }} />
                        <i style={{ width: '52%' }} />
                        <i style={{ width: '68%' }} />
                      </div>
                      <div className="wa-skel">
                        <i style={{ width: '58%' }} />
                        <i style={{ width: '77%' }} />
                        <i style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div className="wa-cp" data-src="k1">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      <b>Tracking is a Seek People module</b>
                      <small>
                        This illustration is a conceptual preview. The exact tracking capabilities are shown during a product demo.
                      </small>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="6">
                  <div className="wa-h">
                    <div>
                      <h5>Reports</h5>
                      <small>Workforce reports · sample data</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-chip">‹ Oct 2026 ›</span>
                    </div>
                  </div>
                  <div className="wa-g2" style={{ gridTemplateColumns: '240px minmax(0,1fr)' }}>
                    <div className="wa-cats" data-src="r0" style={{ alignContent: 'start', padding: '4px', borderRadius: '14px' }}>
                      <div>
                        <i style={{ '--c': '#8B6CF6' }}>
                          <svg viewBox="0 0 24 24">
                            <circle cx="9" cy="8" r="3.5" />
                            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                          </svg>
                        </i>
                        <span>
                          Employee reports
                          <small>Headcount and employee details</small>
                        </span>
                      </div>
                      <div className="on">
                        <i style={{ '--c': '#3FBF6F' }}>
                          <svg viewBox="0 0 24 24">
                            <rect x="4" y="5" width="16" height="15" rx="2" />
                            <path d="M4 10h16" />
                          </svg>
                        </i>
                        <span>
                          Attendance reports
                          <small>Presence, late arrivals, absence</small>
                        </span>
                      </div>
                      <div>
                        <i style={{ '--c': '#F0643C' }}>
                          <svg viewBox="0 0 24 24">
                            <rect x="3" y="6" width="18" height="13" rx="2" />
                            <path d="M3 10h18" />
                          </svg>
                        </i>
                        <span>
                          Payroll reports
                          <small>Earnings and deductions</small>
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '0' }}>
                      <div className="wa-card" data-src="r1">
                        <p className="wa-ct">
                          Monthly attendance report · Oct 2026
                          <span className="wa-leg" style={{ margin: '0' }}>
                            <span>
                              <i style={{ '--c': '#3FBF7F' }} />
                              Present %
                            </span>
                            <span>
                              <i style={{ '--c': '#F5C542' }} />
                              Late %
                            </span>
                          </span>
                        </p>
                        <svg className="wa-line" viewBox="0 0 600 120" preserveAspectRatio="none">
                          <path
                            d="M0 30 L60 26 L120 32 L180 22 L240 28 L300 20 L360 24 L420 18 L480 26 L540 21 L600 19"
                            fill="none"
                            stroke="#3FBF7F"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M0 98 L60 94 L120 100 L180 92 L240 96 L300 90 L360 95 L420 88 L480 93 L540 91 L600 89"
                            fill="none"
                            stroke="#F5C542"
                            strokeWidth="2.5"
                          />
                          <path d="M0 60H600M0 90H600" stroke="rgba(255,255,255,.06)" />
                        </svg>
                      </div>
                      <div className="wa-card" data-src="r2">
                        <p className="wa-ct">Payroll summary report · Oct 2026</p>
                        <table className="wa-tbl">
                          <thead>
                            <tr>
                              <th>Department</th>
                              <th>Employees</th>
                              <th>Gross</th>
                              <th>Net pay</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Operations</td>
                              <td>78</td>
                              <td>₹24,18,600</td>
                              <td>₹21,62,300</td>
                            </tr>
                            <tr>
                              <td>Engineering</td>
                              <td>31</td>
                              <td>₹13,02,500</td>
                              <td>₹11,66,900</td>
                            </tr>
                            <tr>
                              <td>Other departments</td>
                              <td>33</td>
                              <td>₹11,41,300</td>
                              <td>₹10,21,400</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xp-scr" data-s="7">
                  <div className="wa-h">
                    <div>
                      <h5>Audit Logs</h5>
                      <small>Recorded activity · sample entries</small>
                    </div>
                    <div className="wa-acts">
                      <span className="wa-seg" data-src="l2">
                        <span className="on">All</span>
                        <span>Success</span>
                        <span>Failed</span>
                      </span>
                      <span className="wa-chip">Module ▾</span>
                      <span className="wa-chip">Last 7 days ▾</span>
                    </div>
                  </div>
                  <div className="wa-g2">
                    <div className="wa-card" data-src="l0">
                      <table className="wa-tbl">
                        <thead>
                          <tr>
                            <th>Activity</th>
                            <th>Module</th>
                            <th>User</th>
                            <th>Date &amp; time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="sel">
                            <td>
                              <b>Employee record updated</b>
                            </td>
                            <td>Employee</td>
                            <td>HR Admin</td>
                            <td>23 Oct, 14:32</td>
                            <td>
                              <span className="wa-pl g">Success</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Asset assigned</b>
                            </td>
                            <td>Assets</td>
                            <td>HR Admin</td>
                            <td>23 Oct, 12:05</td>
                            <td>
                              <span className="wa-pl g">Success</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Attendance record edited</b>
                            </td>
                            <td>Attendance</td>
                            <td>Supervisor</td>
                            <td>23 Oct, 10:47</td>
                            <td>
                              <span className="wa-pl g">Success</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Payroll record updated</b>
                            </td>
                            <td>Payroll</td>
                            <td>Finance</td>
                            <td>22 Oct, 18:20</td>
                            <td>
                              <span className="wa-pl r">Failed</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>User signed in</b>
                            </td>
                            <td>System</td>
                            <td>HR Admin</td>
                            <td>22 Oct, 09:01</td>
                            <td>
                              <span className="wa-pl g">Success</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Employee added</b>
                            </td>
                            <td>Employee</td>
                            <td>HR Admin</td>
                            <td>21 Oct, 16:12</td>
                            <td>
                              <span className="wa-pl g">Success</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="wa-card" data-src="l1">
                      <p className="wa-ct">Activity details</p>
                      <div className="wa-kv">
                        <div>
                          <span>Activity</span>
                          <b>Employee record updated</b>
                        </div>
                        <div>
                          <span>Performed by</span>
                          <b>HR Admin</b>
                        </div>
                        <div>
                          <span>Record</span>
                          <b>EMP-1042</b>
                        </div>
                        <div>
                          <span>Date &amp; time</span>
                          <b>23 Oct 2026, 14:32</b>
                        </div>
                        <div>
                          <span>Status</span>
                          <b>
                            <span className="wa-pl g">Success</span>
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ol className="xp-prog" aria-hidden="true">
            <li>
              <i />
              <span>Dashboard</span>
            </li>
            <li>
              <i />
              <span>Employee</span>
            </li>
            <li>
              <i />
              <span>Assets</span>
            </li>
            <li>
              <i />
              <span>Attendance</span>
            </li>
            <li>
              <i />
              <span>Payroll</span>
            </li>
            <li>
              <i />
              <span>Tracking</span>
            </li>
            <li>
              <i />
              <span>Reports</span>
            </li>
            <li>
              <i />
              <span>Audit Logs</span>
            </li>
          </ol>
          <article className="xp-ch" data-w="1.1" aria-labelledby="wa-h-0">
            <div className="xp-head">
              <p className="xp-num">
                <b>01</b> / WORKFORCE OVERVIEW
              </p>
              <h3 id="wa-h-0">See Your Workforce at a Glance.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="d0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Total employees</span>
                    <b>148</b>
                  </div>
                  <div className="r">
                    <span>Present today</span>
                    <b>118 / 131</b>
                  </div>
                </div>
                <h4>Workforce Overview</h4>
                <p>Understand your workforce through clear employee summaries.</p>
              </li>
              <li className="xp-f" data-src="d1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>On time</span>
                    <span className="wa-pl g">80%</span>
                  </div>
                  <div className="r">
                    <span>Late arrival · Absent</span>
                    <span>
                      <span className="wa-pl y">12%</span> <span className="wa-pl r">8%</span>
                    </span>
                  </div>
                </div>
                <h4>Attendance Visibility</h4>
                <p>Review employee presence and attendance information.</p>
              </li>
              <li className="xp-f" data-src="d2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Onboarding incomplete · 1 employee</span>
                    <small style={{ color: '#A68BFF' }}>View →</small>
                  </div>
                </div>
                <h4>Important Actions</h4>
                <p>Identify workforce activities that need attention.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" aria-labelledby="wa-h-1">
            <div className="xp-head">
              <p className="xp-num">
                <b>02</b> / EMPLOYEE MANAGEMENT
              </p>
              <h3 id="wa-h-1">Every Employee. Organised.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="e0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <span className="wa-av" style={{ width: '22px', height: '22px', fontSize: '9px' }}>
                        AR
                      </span>
                      Ananya Rao
                    </span>
                    <small>Operations</small>
                  </div>
                  <div className="r">
                    <span>
                      <span className="wa-av b" style={{ width: '22px', height: '22px', fontSize: '9px' }}>
                        KM
                      </span>
                      Karthik Menon
                    </span>
                    <small>Engineering</small>
                  </div>
                </div>
                <h4>Employee Directory</h4>
                <p>Find every employee and their department in one list.</p>
              </li>
              <li className="xp-f" data-src="e1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <b>Ananya Rao</b>
                    </span>
                    <small>EMP-1042</small>
                  </div>
                  <div className="r">
                    <small>Team Leader · reports to Vivek Shetty</small>
                  </div>
                </div>
                <h4>Employee Profiles</h4>
                <p>Keep employee information and organisational details together.</p>
              </li>
              <li className="xp-f" data-src="e2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Joined 14 Mar 2024</span>
                    <span className="wa-pl g">Active</span>
                  </div>
                </div>
                <h4>Joining Details &amp; Status</h4>
                <p>Record joining information and current employee status.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" aria-labelledby="wa-h-2">
            <div className="xp-head">
              <p className="xp-num">
                <b>03</b> / ASSET MANAGEMENT
              </p>
              <h3 id="wa-h-2">Keep Track of What Your Team Uses.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="a0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <b>AST-0142</b> Laptop 14-inch
                    </span>
                    <small>IT equipment</small>
                  </div>
                </div>
                <h4>Asset Records</h4>
                <p>Maintain a record of the assets your organisation provides.</p>
              </li>
              <li className="xp-f" data-src="a1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <span className="wa-av" style={{ width: '22px', height: '22px', fontSize: '9px' }}>
                        AR
                      </span>
                      Ananya Rao
                    </span>
                    <small>since 18 Mar 2024</small>
                  </div>
                </div>
                <h4>Asset Assignment</h4>
                <p>See which employee each asset is assigned to.</p>
              </li>
              <li className="xp-f" data-src="a2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span className="wa-pl g">51 Assigned</span>
                    <span className="wa-pl v">13 Available</span>
                  </div>
                </div>
                <h4>Asset Status</h4>
                <p>Know which assets are assigned and which are available.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" data-w="1.15" aria-labelledby="wa-h-3">
            <div className="xp-head">
              <p className="xp-num">
                <b>04</b> / ATTENDANCE MANAGEMENT
              </p>
              <h3 id="wa-h-3">Every Workday. Clearly Recorded.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="t0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>October 2026</span>
                    <span>
                      <span className="wa-pl g">On time</span> <span className="wa-pl y">Late</span>
                    </span>
                  </div>
                </div>
                <h4>Attendance Calendar</h4>
                <p>Review attendance day by day across the month.</p>
              </li>
              <li className="xp-f" data-src="t1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Present 118</span>
                    <span>Late 9</span>
                    <span>Absent 13</span>
                  </div>
                </div>
                <h4>Attendance Summary</h4>
                <p>See presence, late arrivals and absences at a glance.</p>
              </li>
              <li className="xp-f" data-src="t2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <b>General</b> 09:00 – 18:00
                    </span>
                    <small>84 employees</small>
                  </div>
                </div>
                <h4>Shift Information</h4>
                <p>Keep shift timings alongside attendance records.</p>
              </li>
              <li className="xp-f" data-src="t3" style={{ '--i': '3' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Farah Khan · in 09:24</span>
                    <span className="wa-pl y">Late arrival</span>
                  </div>
                </div>
                <h4>Daily Attendance Records</h4>
                <p>Check-in, check-out and status for every employee.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" data-w="1.15" aria-labelledby="wa-h-4">
            <div className="xp-head">
              <p className="xp-num">
                <b>05</b> / PAYROLL MANAGEMENT
              </p>
              <h3 id="wa-h-4">Payroll, Made More Manageable.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="p0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Basic</span>
                    <b>₹31,000</b>
                  </div>
                  <div className="r">
                    <span>HRA</span>
                    <b>₹12,400</b>
                  </div>
                </div>
                <h4>Salary Components</h4>
                <p>Organise earnings for each employee.</p>
              </li>
              <li className="xp-f" data-src="p1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Net pay · Oct 2026</span>
                    <b>₹43,50,600</b>
                  </div>
                </div>
                <h4>Payroll Summary</h4>
                <p>See gross pay, deductions and net pay for the period.</p>
              </li>
              <li className="xp-f" data-src="p2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Provident fund</span>
                    <b>₹3,720</b>
                  </div>
                  <div className="r">
                    <span>Professional tax</span>
                    <b>₹200</b>
                  </div>
                </div>
                <h4>Deduction Details</h4>
                <p>Review the deductions applied to each salary.</p>
              </li>
              <li className="xp-f" data-src="p3" style={{ '--i': '3' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Ananya Rao · ₹55,060</span>
                    <span className="wa-pl g">Processed</span>
                  </div>
                </div>
                <h4>Payroll Records</h4>
                <p>Track payroll status employee by employee.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" data-w=".6" aria-labelledby="wa-h-5">
            <div className="xp-head">
              <p className="xp-num">
                <b>06</b> / WORKFORCE TRACKING
              </p>
              <h3 id="wa-h-5">Stay Informed. Wherever Work Happens.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="k0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Tracking workspace</span>
                    <span className="wa-pl y">Preview</span>
                  </div>
                </div>
                <h4>A Dedicated Tracking Module</h4>
                <p>Tracking has its own workspace inside Seek People.</p>
              </li>
              <li className="xp-f" data-src="k1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Conceptual preview</span>
                  </div>
                </div>
                <h4>See It in Your Demo</h4>
                <p>We'll walk you through how Tracking works for your teams.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" aria-labelledby="wa-h-6">
            <div className="xp-head">
              <p className="xp-num">
                <b>07</b> / REPORTS
              </p>
              <h3 id="wa-h-6">Turn Workforce Information Into Clarity.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="r0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Employee reports</span>
                    <small>Headcount · details</small>
                  </div>
                </div>
                <h4>Employee Reports</h4>
                <p>Summaries of your workforce and employee information.</p>
              </li>
              <li className="xp-f" data-src="r1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Monthly attendance · Oct 2026</span>
                  </div>
                  <svg viewBox="0 0 200 30" style={{ width: '100%', height: '26px' }}>
                    <path d="M0 12 L30 10 L60 14 L90 8 L120 11 L150 6 L200 7" fill="none" stroke="#3FBF7F" strokeWidth="2" />
                  </svg>
                </div>
                <h4>Attendance Reports</h4>
                <p>Follow attendance patterns over time.</p>
              </li>
              <li className="xp-f" data-src="r2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>Operations · 78 employees</span>
                    <b>₹21,62,300</b>
                  </div>
                </div>
                <h4>Payroll Reports</h4>
                <p>Review payroll totals by department and period.</p>
              </li>
            </ul>
          </article>
          <article className="xp-ch" aria-labelledby="wa-h-7">
            <div className="xp-head">
              <p className="xp-num">
                <b>08</b> / AUDIT LOGS
              </p>
              <h3 id="wa-h-7">Keep Important Activities Accountable.</h3>
            </div>
            <div className="xp-prev" aria-hidden="true" />
            <ul className="xp-frags">
              <li className="xp-f" data-src="l0" style={{ '--i': '0' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>
                      <b>Employee record updated</b>
                    </span>
                    <small>Employee</small>
                  </div>
                </div>
                <h4>Activity Records</h4>
                <p>A log of important actions taken in Seek People.</p>
              </li>
              <li className="xp-f" data-src="l1" style={{ '--i': '1' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span>HR Admin</span>
                    <small>23 Oct 2026, 14:32</small>
                  </div>
                </div>
                <h4>Who and When</h4>
                <p>See who performed an activity, and at what time.</p>
              </li>
              <li className="xp-f" data-src="l2" style={{ '--i': '2' }}>
                <div className="xp-sn" aria-hidden="true">
                  <div className="r">
                    <span className="wa-pl g">Success</span>
                    <span className="wa-pl r">Failed</span>
                  </div>
                </div>
                <h4>Record Status</h4>
                <p>Check whether each recorded activity succeeded.</p>
              </li>
            </ul>
          </article>
        </div>
      </div>
      <p className="xp-seo">
        Seek People is employee management software and HR software for businesses: its web application brings attendance management
        software, payroll management software, asset records, workforce reports and audit logs into one HRMS for administrators. Interfaces
        shown use fictional sample data.
      </p>
    </>
  );
});

const MobileMarkup = memo(function MobileMarkup() {
  return (
    <>
      <div className="xp-intro ms-intro">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
          The Seek People Mobile Experience
        </span>
        <h2 className="xp-h2" id="mo-title">
          <span>Your Workday.</span>
          <span>
            <em>Right in Your Hands.</em>
          </span>
        </h2>
        <p className="xp-lede">
          From clocking in and checking attendance to applying for leave, viewing payslips and managing everyday requests, Seek People helps
          employees stay connected to their work.
        </p>
      </div>
      <div className="ms-track" id="ms-track">
        <div className="ms-stage" id="ms-stage">
          <div className="ms-atmo" id="ms-atmo" aria-hidden="true" />
          <div className="ms-glow" aria-hidden="true" />
          <div className="ms-shadow" id="ms-shadow" aria-hidden="true" />
          <svg className="ms-trails" id="ms-trails" aria-hidden="true">
            <defs>
              <linearGradient id="ms-tg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#8660F8" stopOpacity=".25" />
                <stop offset="1" stopColor="#E3D6FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="ms-phone" id="ms-phone" aria-hidden="true">
            <div className="ms-dev" id="ms-dev">
              <span className="ms-btn a" />
              <span className="ms-btn b" />
              <span className="ms-btn c" />
              <span className="ms-island" />
              <div className="ms-scr" id="ms-screen">
                <span className="ms-glass" id="ms-glass" />
              </div>
              <span className="ms-sweep" id="ms-sweep" />
            </div>
          </div>
          <ol className="ms-list" id="ms-list">
            <li className="ms-it" data-id="home" data-label="Home">
              <div className="ms-txt">
                <p className="ms-num">01</p>
                <p className="ms-eb">Home dashboard</p>
                <h3>Your Workday. At a Glance.</h3>
                <p className="ms-desc">
                  Clock in or out, record a break, and see today's hours and announcements from your personalised Seek People dashboard.
                </p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['01-home']}
                      width="660"
                      height="1530"
                      alt="Seek People home screen with a Clock Out button, a Break button, check-in time, total hours and announcement categories"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Home dashboard features">
                <li className="ms-ft" data-r="0.2841,0.1562,0.4319,0.2188">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.8517',
                      '--sw': '285',
                      backgroundImage: `url(${SHOTS['01-home']})`,
                      backgroundSize: '231.544% auto',
                      backgroundPosition: '50.000% 20.000%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Clock In / Clock Out</span>
                    </span>
                  </h4>
                  <p>Start and end your workday from the home screen.</p>
                </li>
                <li className="ms-ft" data-r="0.0522,0.4188,0.8522,0.0650">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '5.6555',
                      '--sw': '562',
                      backgroundImage: `url(${SHOTS['01-home']})`,
                      backgroundSize: '117.347% auto',
                      backgroundPosition: '35.294% 44.786%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Break</span>
                    </span>
                  </h4>
                  <p>Record breaks during your working day.</p>
                </li>
                <li className="ms-ft" data-r="0.0522,0.5050,0.8957,0.1138">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '3.3966',
                      '--sw': '591',
                      backgroundImage: `url(${SHOTS['01-home']})`,
                      backgroundSize: '111.650% auto',
                      backgroundPosition: '50.000% 56.982%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Working Hours</span>
                    </span>
                  </h4>
                  <p>See your check-in time and hours worked today.</p>
                </li>
                <li className="ms-ft" data-r="0.0232,0.6825,0.9536,0.1250">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '3.2909',
                      '--sw': '629',
                      backgroundImage: `url(${SHOTS['01-home']})`,
                      backgroundSize: '104.863% auto',
                      backgroundPosition: '50.000% 78.000%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Announcements</span>
                    </span>
                  </h4>
                  <p>Jump to posts, birthdays, appreciations and HR notices.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="attendance" data-label="Attendance">
              <div className="ms-txt">
                <p className="ms-num">02</p>
                <p className="ms-eb">Attendance</p>
                <h3>Your Attendance. Always Within Reach.</h3>
                <p className="ms-desc">View attendance information, working hours and relevant attendance history.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['02-attendance']}
                      width="660"
                      height="1535"
                      alt="Attendance screen with a monthly calendar, date range filters, present, absent, half day and late-in counts, and today's clock-in record"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Attendance features">
                <li className="ms-ft" data-r="0.0872,0.2162,0.8256,0.3806">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.9326',
                      '--sw': '545',
                      backgroundImage: `url(${SHOTS['02-attendance']})`,
                      backgroundSize: '121.127% auto',
                      backgroundPosition: '50.000% 34.914%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Attendance Calendar</span>
                    </span>
                  </h4>
                  <p>Pick a date range and review each day at a glance.</p>
                </li>
                <li className="ms-ft" data-r="0.0407,0.6813,0.9186,0.0488">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '8.1020',
                      '--sw': '606',
                      backgroundImage: `url(${SHOTS['02-attendance']})`,
                      backgroundSize: '108.861% auto',
                      backgroundPosition: '50.000% 71.616%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Attendance Summary</span>
                    </span>
                  </h4>
                  <p>Present, absent, half-day and late-in counts.</p>
                </li>
                <li className="ms-ft" data-r="0.0436,0.7531,0.9128,0.1469">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.6721',
                      '--sw': '602',
                      backgroundImage: `url(${SHOTS['02-attendance']})`,
                      backgroundSize: '109.554% auto',
                      backgroundPosition: '50.000% 88.278%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Daily Record</span>
                    </span>
                  </h4>
                  <p>Clock-in time and status for each day.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="regularisation" data-label="Regularisation">
              <div className="ms-txt">
                <p className="ms-num">03</p>
                <p className="ms-eb">Regularisation</p>
                <h3>Missed a Punch? Put It Right.</h3>
                <p className="ms-desc">
                  Request attendance corrections and follow your regularisation balance, requests and approval status.
                </p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['03-regularisation']}
                      width="660"
                      height="1564"
                      alt="Regularisation screen with allocated, utilised and remaining requests, the latest approved request and request history"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Regularisation features">
                <li className="ms-ft" data-r="0.0237,0.1700,0.9363,0.2275">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.7368',
                      '--sw': '618',
                      backgroundImage: `url(${SHOTS['03-regularisation']})`,
                      backgroundSize: '106.804% auto',
                      backgroundPosition: '37.209% 22.006%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Regularisation Summary</span>
                    </span>
                  </h4>
                  <p>Allocated, used and remaining requests.</p>
                </li>
                <li className="ms-ft" data-r="0.0237,0.4200,0.9363,0.2325">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.6994',
                      '--sw': '618',
                      backgroundImage: `url(${SHOTS['03-regularisation']})`,
                      backgroundSize: '106.804% auto',
                      backgroundPosition: '37.209% 54.723%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Latest Request</span>
                    </span>
                  </h4>
                  <p>Date, requested times, reason and approval status.</p>
                </li>
                <li className="ms-ft" data-r="0.0207,0.6737,0.9422,0.2637">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.5075',
                      '--sw': '622',
                      backgroundImage: `url(${SHOTS['03-regularisation']})`,
                      backgroundSize: '106.132% auto',
                      backgroundPosition: '35.897% 91.511%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Request History</span>
                    </span>
                  </h4>
                  <p>Filter requests and review past corrections.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="leave" data-label="Leave">
              <div className="ms-txt">
                <p className="ms-num">04</p>
                <p className="ms-eb">Leave management</p>
                <h3>Time Off, Made Simpler.</h3>
                <p className="ms-desc">View leave information, submit requests and follow their status through the employee application.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['04-leave']}
                      width="660"
                      height="1526"
                      alt="Leave Management screen with remaining leave days, the next holiday, annual, sick and other balances, and an approved casual leave request"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Leave management features">
                <li className="ms-ft" data-r="0.0434,0.1313,0.9133,0.1512">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.6116',
                      '--sw': '603',
                      backgroundImage: `url(${SHOTS['04-leave']})`,
                      backgroundSize: '109.494% auto',
                      backgroundPosition: '50.000% 15.464%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Leave Balance</span>
                    </span>
                  </h4>
                  <p>Days remaining and the next holiday.</p>
                </li>
                <li className="ms-ft" data-r="0.8555,0.0500,0.1156,0.0512">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.9756',
                      '--sw': '76',
                      backgroundImage: `url(${SHOTS['04-leave']})`,
                      backgroundSize: '865.000% auto',
                      backgroundPosition: '96.732% 5.270%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Apply for Leave</span>
                    </span>
                  </h4>
                  <p>Start a new leave request from the + button.</p>
                </li>
                <li className="ms-ft" data-r="0.0405,0.3387,0.9191,0.2200">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.8068',
                      '--sw': '607',
                      backgroundImage: `url(${SHOTS['04-leave']})`,
                      backgroundSize: '108.805% auto',
                      backgroundPosition: '50.000% 43.429%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Balances by Type</span>
                    </span>
                  </h4>
                  <p>Annual, sick and other leave, used and allocated.</p>
                </li>
                <li className="ms-ft" data-r="0.0434,0.6475,0.9133,0.2350">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.6809',
                      '--sw': '603',
                      backgroundImage: `url(${SHOTS['04-leave']})`,
                      backgroundSize: '109.494% auto',
                      backgroundPosition: '50.000% 84.641%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Leave History</span>
                    </span>
                  </h4>
                  <p>Past requests with dates, duration and status.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="reimbursements" data-label="Reimbursements">
              <div className="ms-txt">
                <p className="ms-num">05</p>
                <p className="ms-eb">Reimbursements</p>
                <h3>Your Claims. Easier to Manage.</h3>
                <p className="ms-desc">Submit and track supported reimbursement requests through the app.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['05-reimbursements']}
                      width="660"
                      height="1524"
                      alt="Reimbursements screen with approved, pending and rejected totals, a breakdown by category and petty cash entries"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Reimbursements features">
                <li className="ms-ft" data-r="0.8543,0.0488,0.1154,0.0500">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.9999',
                      '--sw': '76',
                      backgroundImage: `url(${SHOTS['05-reimbursements']})`,
                      backgroundSize: '866.250% auto',
                      backgroundPosition: '96.574% 5.132%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">New Claim</span>
                    </span>
                  </h4>
                  <p>Raise a reimbursement request with the + button.</p>
                </li>
                <li className="ms-ft" data-r="0.0433,0.1300,0.9149,0.2737">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.4473',
                      '--sw': '604',
                      backgroundImage: `url(${SHOTS['05-reimbursements']})`,
                      backgroundSize: '109.306% auto',
                      backgroundPosition: '50.847% 17.900%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Claim Overview</span>
                    </span>
                  </h4>
                  <p>Approved, pending and rejected amounts this month.</p>
                </li>
                <li className="ms-ft" data-r="0.0404,0.5175,0.9177,0.1919">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.0714',
                      '--sw': '606',
                      backgroundImage: `url(${SHOTS['05-reimbursements']})`,
                      backgroundSize: '108.962% auto',
                      backgroundPosition: '49.123% 64.037%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">By Category</span>
                    </span>
                  </h4>
                  <p>Travel, fuel, food and other expenses.</p>
                </li>
                <li className="ms-ft" data-r="0.0433,0.7675,0.9149,0.1338">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.9622',
                      '--sw': '604',
                      backgroundImage: `url(${SHOTS['05-reimbursements']})`,
                      backgroundSize: '109.306% auto',
                      backgroundPosition: '50.847% 88.600%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Petty Cash Entries</span>
                    </span>
                  </h4>
                  <p>Each entry with its amount and status.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="overtime" data-label="Overtime">
              <div className="ms-txt">
                <p className="ms-num">06</p>
                <p className="ms-eb">Overtime</p>
                <h3>Keep Track of Your Overtime.</h3>
                <p className="ms-desc">View supported overtime information and related employee records.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['06-overtime']}
                      width="660"
                      height="1498"
                      alt="Overtime screen with a monthly overview for working days, holidays and week offs, total overtime pay and overtime requests"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Overtime features">
                <li className="ms-ft" data-r="0.8539,0.0238,0.1163,0.0512">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.9999',
                      '--sw': '77',
                      backgroundImage: `url(${SHOTS['06-overtime']})`,
                      backgroundSize: '859.756% auto',
                      backgroundPosition: '96.629% 2.503%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Log Overtime</span>
                    </span>
                  </h4>
                  <p>Add an overtime request from the + button.</p>
                </li>
                <li className="ms-ft" data-r="0.0340,0.1775,0.9220,0.2725">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.4907',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['06-overtime']})`,
                      backgroundSize: '108.462% auto',
                      backgroundPosition: '43.636% 24.399%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Overtime Overview</span>
                    </span>
                  </h4>
                  <p>Working-day, holiday and week-off overtime pay.</p>
                </li>
                <li className="ms-ft" data-r="0.0340,0.4738,0.9220,0.1313">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '3.0950',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['06-overtime']})`,
                      backgroundSize: '108.462% auto',
                      backgroundPosition: '43.636% 54.532%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Overtime Requests</span>
                    </span>
                  </h4>
                  <p>Your requests for the selected month.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="payslip" data-label="Payslip">
              <div className="ms-txt">
                <p className="ms-num">07</p>
                <p className="ms-eb">Payslip</p>
                <h3>Your Payslip. When You Need It.</h3>
                <p className="ms-desc">Access relevant payroll and payslip information through employee self-service.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['07-payslip']}
                      width="660"
                      height="1533"
                      alt="Payslip screen for the month showing payroll status, net pay (hidden), total, present, holiday and paid days"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Payslip features">
                <li className="ms-ft" data-r="0.0593,0.1200,0.8830,0.0813">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6787',
                      '--sw': '583',
                      backgroundImage: `url(${SHOTS['07-payslip']})`,
                      backgroundSize: '113.255% auto',
                      backgroundPosition: '50.633% 13.061%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Pay Period</span>
                    </span>
                  </h4>
                  <p>Move between months and see payroll status.</p>
                </li>
                <li className="ms-ft" data-r="0.0356,0.2238,0.9304,0.2150">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.8630',
                      '--sw': '614',
                      backgroundImage: `url(${SHOTS['07-payslip']})`,
                      backgroundSize: '107.484% auto',
                      backgroundPosition: '51.064% 28.503%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Net Pay</span>
                    </span>
                  </h4>
                  <p>Your net pay and whether payroll is processed.</p>
                </li>
                <li className="ms-ft" data-r="0.0830,0.4675,0.8356,0.2200">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.6351',
                      '--sw': '551',
                      backgroundImage: `url(${SHOTS['07-payslip']})`,
                      backgroundSize: '119.681% auto',
                      backgroundPosition: '50.450% 59.936%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Paid Days</span>
                    </span>
                  </h4>
                  <p>Present days, week offs, holidays, paid leave and LOP.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="pulses" data-label="Pulses">
              <div className="ms-txt">
                <p className="ms-num">08</p>
                <p className="ms-eb">Pulses</p>
                <h3>Stay Connected to Your Workplace.</h3>
                <p className="ms-desc">Access relevant company announcements, updates and employee communications.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['08-pulses']}
                      width="660"
                      height="1564"
                      alt="Pulses screen with post categories, hashtags and a company announcement about a Learn and Lead session"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Pulses features">
                <li className="ms-ft" data-r="0.0203,0.1237,0.9797,0.0475">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '8.7036',
                      '--sw': '647',
                      backgroundImage: `url(${SHOTS['08-pulses']})`,
                      backgroundSize: '102.074% auto',
                      backgroundPosition: '100.000% 12.992%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Post Categories</span>
                    </span>
                  </h4>
                  <p>All posts, birthdays and appreciations.</p>
                </li>
                <li className="ms-ft" data-r="0.0203,0.1850,0.9797,0.0400">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '10.3355',
                      '--sw': '647',
                      backgroundImage: `url(${SHOTS['08-pulses']})`,
                      backgroundSize: '102.074% auto',
                      backgroundPosition: '100.000% 19.271%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Hashtags</span>
                    </span>
                  </h4>
                  <p>Browse posts by topic.</p>
                </li>
                <li className="ms-ft" data-r="0.0145,0.2412,0.9666,0.4412">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '0.9244',
                      '--sw': '638',
                      backgroundImage: `url(${SHOTS['08-pulses']})`,
                      backgroundSize: '103.453% auto',
                      backgroundPosition: '43.478% 43.177%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Company Posts</span>
                    </span>
                  </h4>
                  <p>Announcements shared with everyone.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="inbox" data-label="Inbox">
              <div className="ms-txt">
                <p className="ms-num">09</p>
                <p className="ms-eb">Inbox</p>
                <h3>Updates the Moment They Happen.</h3>
                <p className="ms-desc">
                  Follow workplace updates and notifications, including attendance activity and announcements, in one inbox.
                </p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['09-inbox']}
                      width="660"
                      height="1522"
                      alt="Inbox feed with clock-in and clock-out notifications and an announcement; names are hidden"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Inbox features">
                <li className="ms-ft" data-r="0.0865,0.1113,0.8386,0.0462">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '7.8629',
                      '--sw': '553',
                      backgroundImage: `url(${SHOTS['09-inbox']})`,
                      backgroundSize: '119.244% auto',
                      backgroundPosition: '53.571% 11.664%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Feeds &amp; Chats</span>
                    </span>
                  </h4>
                  <p>Notifications and conversations in one inbox.</p>
                </li>
                <li className="ms-ft" data-r="0.0519,0.1800,0.8963,0.0375">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '10.3640',
                      '--sw': '592',
                      backgroundImage: `url(${SHOTS['09-inbox']})`,
                      backgroundSize: '111.576% auto',
                      backgroundPosition: '50.000% 18.701%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Unread Filter</span>
                    </span>
                  </h4>
                  <p>See everything or just what you haven't read.</p>
                </li>
                <li className="ms-ft" data-r="0.0403,0.2662,0.9164,0.0850">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6753',
                      '--sw': '605',
                      backgroundImage: `url(${SHOTS['09-inbox']})`,
                      backgroundSize: '109.119% auto',
                      backgroundPosition: '48.276% 29.098%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Attendance Updates</span>
                    </span>
                  </h4>
                  <p>Clock-in and clock-out notifications.</p>
                </li>
                <li className="ms-ft" data-r="0.0403,0.4569,0.9164,0.0919">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.3254',
                      '--sw': '605',
                      backgroundImage: `url(${SHOTS['09-inbox']})`,
                      backgroundSize: '109.119% auto',
                      backgroundPosition: '48.276% 50.310%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Announcements</span>
                    </span>
                  </h4>
                  <p>Company announcements as they arrive.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="compliance" data-label="Compliance">
              <div className="ms-txt">
                <p className="ms-num">10</p>
                <p className="ms-eb">Compliance</p>
                <h3>Your Compliance Details, Organised.</h3>
                <p className="ms-desc">
                  View your statutory details, tax regime and investment declaration status, with access to form and TDS records.
                </p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['10-compliance']}
                      width="660"
                      height="1578"
                      alt="Compliance screen with statutory details (numbers hidden), declared tax regime, investment declaration status and a button for form and TDS records"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Compliance features">
                <li className="ms-ft" data-r="0.0508,0.1175,0.9268,0.3350">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '1.1571',
                      '--sw': '612',
                      backgroundImage: `url(${SHOTS['10-compliance']})`,
                      backgroundSize: '107.903% auto',
                      backgroundPosition: '69.388% 17.669%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Statutory Details</span>
                    </span>
                  </h4>
                  <p>PAN, Aadhaar, UAN, PF and bank status, masked.</p>
                </li>
                <li className="ms-ft" data-r="0.0359,0.5400,0.9567,0.1313">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '3.0485',
                      '--sw': '631',
                      backgroundImage: `url(${SHOTS['10-compliance']})`,
                      backgroundSize: '104.531% auto',
                      backgroundPosition: '82.759% 62.158%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Tax Regime &amp; Declaration</span>
                    </span>
                  </h4>
                  <p>Your declared regime and investment proofs.</p>
                </li>
                <li className="ms-ft" data-r="0.0359,0.6937,0.6517,0.1037">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.6273',
                      '--sw': '430',
                      backgroundImage: `url(${SHOTS['10-compliance']})`,
                      backgroundSize: '153.440% auto',
                      backgroundPosition: '10.300% 77.406%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Form &amp; TDS Records</span>
                    </span>
                  </h4>
                  <p>Open your forms and TDS records.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="menu" data-label="Menu">
              <div className="ms-txt">
                <p className="ms-num">11</p>
                <p className="ms-eb">Employee menu</p>
                <h3>Everything Else. One Place.</h3>
                <p className="ms-desc">Access your profile and additional workplace tools through the Seek People mobile menu.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['11-menu']}
                      width="660"
                      height="1522"
                      alt="Menu screen with Profile, Overtime, Payslip, Audit Trail, Compliance, Regularization and Settings"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Employee menu features">
                <li className="ms-ft" data-r="0.0403,0.1975,0.9222,0.0862">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6365',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['11-menu']})`,
                      backgroundSize: '108.438% auto',
                      backgroundPosition: '51.852% 21.614%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Profile</span>
                    </span>
                  </h4>
                  <p>Your personal and employment details.</p>
                </li>
                <li className="ms-ft" data-r="0.0403,0.5181,0.9222,0.0862">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6365',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['11-menu']})`,
                      backgroundSize: '108.438% auto',
                      backgroundPosition: '51.852% 56.703%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Audit Trail</span>
                    </span>
                  </h4>
                  <p>A record of activity on your account.</p>
                </li>
                <li className="ms-ft" data-r="0.0403,0.6156,0.9222,0.0862">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6365',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['11-menu']})`,
                      backgroundSize: '108.438% auto',
                      backgroundPosition: '51.852% 67.373%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Compliance</span>
                    </span>
                  </h4>
                  <p>Statutory and tax declaration details.</p>
                </li>
                <li className="ms-ft" data-r="0.0403,0.7125,0.9222,0.0862">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.6365',
                      '--sw': '609',
                      backgroundImage: `url(${SHOTS['11-menu']})`,
                      backgroundSize: '108.438% auto',
                      backgroundPosition: '51.852% 77.975%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Regularization</span>
                    </span>
                  </h4>
                  <p>Request corrections to attendance.</p>
                </li>
              </ul>
            </li>
            <li className="ms-it" data-id="settings" data-label="Settings" data-fx="fade">
              <div className="ms-txt">
                <p className="ms-num">12</p>
                <p className="ms-eb">Settings</p>
                <h3>Make It Yours.</h3>
                <p className="ms-desc">Switch between dark and light mode, and find the privacy policy and terms whenever you need them.</p>
              </div>
              <figure className="ms-fig">
                <div className="ms-dev">
                  <div className="ms-scr">
                    <img
                      src={SHOTS['12-settings']}
                      width="660"
                      height="1509"
                      alt="Settings screen with a dark mode toggle, privacy policy and terms and conditions"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </figure>
              <ul className="ms-feats" aria-label="Settings features">
                <li className="ms-ft" data-r="0.0200,0.0963,0.9543,0.0944">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '4.4226',
                      '--sw': '630',
                      backgroundImage: `url(${SHOTS['12-settings']})`,
                      backgroundSize: '104.790% auto',
                      backgroundPosition: '43.750% 10.628%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Dark Mode</span>
                    </span>
                  </h4>
                  <p>Switch between dark and light themes.</p>
                </li>
                <li className="ms-ft" data-r="0.0200,0.2144,0.9543,0.1800">
                  <span className="ms-bgc" aria-hidden="true" />
                  <span
                    className="ms-crop"
                    aria-hidden="true"
                    style={{
                      '--ar': '2.3188',
                      '--sw': '630',
                      backgroundImage: `url(${SHOTS['12-settings']})`,
                      backgroundSize: '104.790% auto',
                      backgroundPosition: '43.750% 26.143%',
                    }}
                  />
                  <h4>
                    <span className="ln">
                      <span className="li">Privacy &amp; Terms</span>
                    </span>
                  </h4>
                  <p>Read the privacy policy and terms.</p>
                </li>
              </ul>
            </li>
          </ol>
          <div className="ms-close" id="ms-close">
            <p className="ms-close-t">
              <span className="ln">
                <span className="li">One App.</span>
              </span>
              <span className="ln">
                <span className="li">Every Workday Essential.</span>
              </span>
            </p>
            <p>The Seek People mobile app, made for every employee.</p>
          </div>
          <p className="ms-prog" id="ms-prog" aria-hidden="true">
            <b id="ms-pn">01</b>
            <span>
              / <span id="ms-pt">12</span>
            </span>
            <span className="ms-bar">
              <i id="ms-pb" />
            </span>
            <span className="lab" id="ms-pl">
              Home
            </span>
          </p>
        </div>
      </div>
      <p className="ms-note">Actual Seek People app screens. Personal details have been hidden.</p>
    </>
  );
});

/* The engines build on top of the DOM (split headlines, stage images, SVG trails),
   so each mount snapshots the markup and restores it on cleanup (StrictMode-safe). */
function Cinematic({ init, children, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const snapshot = el.innerHTML;
    const stop = init(el);
    return () => {
      stop();
      el.innerHTML = snapshot;
    };
  }, [init]);
  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
const Chars = ({ word, from }) =>
  [...word].map((c, i) => (
    <span className="ch" style={{ '--i': from + i }} key={i}>
      {c}
    </span>
  ));

function Hero() {
  const ref = useRef(null);
  // ambient light drifts gently toward the pointer
  useEffect(() => {
    const hero = ref.current;
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    if (!hero || prefersReduced()) return undefined;
    const move = (e) => {
      if (!fine.matches) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--gx', (50 + ((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2) + '%');
      hero.style.setProperty('--gy', (44 + ((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2) + '%');
    };
    const leave = () => {
      hero.style.setProperty('--gx', '50%');
      hero.style.setProperty('--gy', '44%');
    };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    return () => {
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
    };
  }, []);

  const explore = (e) => {
    const web = document.getElementById('web-app');
    if (!web) return;
    e.preventDefault();
    web.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#web-app');
  };

  return (
    <section className="cx wrap" id="people-hero" aria-labelledby="cx-h1" ref={ref}>
      <div className="cx-bg" aria-hidden="true" />
      <div className="cx-glow" aria-hidden="true" />
      <div className="cx-in">
        <p className="cx-eb">Introducing Seek People</p>
        <ul className="cx-tags" aria-label="Seek People covers">
          <li>Employee Management</li>
          <li>
            <abbr title="Human Resource Management System" style={{ textDecoration: 'none' }}>
              HRMS
            </abbr>
          </li>
          <li>Payroll</li>
          <li>Attendance</li>
        </ul>
        <h1 className="cx-h1" id="cx-h1">
          <span className="sr">People Management. Reimagined.</span>
          <span className="vis" aria-hidden="true">
            <span className="ln ln1">
              <span style={{ whiteSpace: 'nowrap' }}>
                <Chars word="People" from={0} />
              </span>{' '}
              <span style={{ whiteSpace: 'nowrap' }}>
                <Chars word="Management." from={7} />
              </span>
            </span>
            <span className="ln ln2">
              <span className="wd" data-t="Reimagined.">
                Reimagined.
              </span>
            </span>
          </span>
        </h1>
        <p className="cx-sub2" style={{ maxWidth: '60ch', fontSize: 'clamp(1.02rem,1.35vw,1.2rem)', marginTop: 'clamp(22px,3.2vh,32px)' }}>
          From attendance and payroll to everyday employee experiences, Seek People brings your workforce operations together in one
          powerful HRMS platform.
        </p>
        <p className="cx-line">Built for your HR team. Made for your people.</p>
        <div className="cx-ctas">
          <a className="btn btn-primary" href="/#site-footer">
            Book a Seek People Demo{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-ghost" href="#web-app" onClick={explore}>
            Explore Seek People{' '}
            <span className="arr" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
      <a className="cx-scroll" href="#web-app" onClick={explore}>
        SCROLL TO EXPLORE
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

/* ───────────────────────── A day with Seek People ───────────────────────── */
const INITIAL = { inn: false, leave: false, brk: 0, out: false };

function DayDemo() {
  const secRef = useRef(null);
  const tlRef = useRef(null);
  const [S, setS] = useState(INITIAL);
  const [live, setLive] = useState('');
  const say = (m) => {
    setLive('');
    setTimeout(() => setLive(m), 30);
  };

  // timeline fill + stop highlights follow scroll
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return undefined;
    const fill = tl.querySelector('.dy-fill'),
      sts = [...tl.querySelectorAll('.dy-st')];
    let raf = 0;
    const upd = () => {
      raf = 0;
      const r = tl.getBoundingClientRect(),
        mid = innerHeight * 0.55;
      fill.style.setProperty('--f', Math.max(0, Math.min(1, (mid - r.top) / r.height)).toFixed(3));
      sts.forEach((s) => s.classList.toggle('dy-on', s.getBoundingClientRect().top < mid));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(upd);
    };
    addEventListener('scroll', onScroll, { passive: true });
    upd();
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  useReveal(secRef, { items: '.dy-st', threshold: 0.2, early: 0.9, enable: 'anim' });

  const total = S.brk === 2 ? '08:23' : '08:55';
  const t = S.out ? total : '--:--';
  return (
    <section className="dy wrap" id="day-with-seek-people" aria-labelledby="dy-title" ref={secRef}>
      <div className="dy-intro">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
          A Day with Seek People
        </span>
        <h2 className="dy-h2" id="dy-title">
          <span>From Clock-In to Clock-Out.</span>
          <span>Everyday Work, Made Simpler.</span>
        </h2>
      </div>
      <div className="dy-tl" id="dy-tl" ref={tlRef}>
        <span className="dy-fill" aria-hidden="true" />
        <ol className="dy-ol">
          <li className="dy-st">
            <p className="dy-when">
              <b>Morning</b>
              <span>09:12</span>
            </p>
            <span className="dy-dot" aria-hidden="true" />
            <div className="dy-txt">
              <h3>Start the day with a check-in.</h3>
              <p>Clock in from the Seek People app and your attendance status for the day updates.</p>
            </div>
            <div className="dy-ui">
              <div className="row">
                <button
                  type="button"
                  className="dy-orb"
                  aria-describedby="dy-in-st"
                  aria-label={S.inn ? 'Checked in at 09:12 AM (demo)' : 'Clock in (demo)'}
                  onClick={() => {
                    const v = !S.inn;
                    setS({ ...S, inn: v });
                    say(v ? 'Demo: checked in at 9:12 AM. Status Present.' : 'Demo: check-in cleared.');
                  }}
                >
                  <svg viewBox="0 0 24 24">
                    <path d={S.inn ? 'M10 4H5v16h5M14 12h8M19 9l3 3-3 3' : 'M14 4h5v16h-5M3 12h11M10 8l4 4-4 4'} />
                  </svg>
                  <span>{S.inn ? 'Checked In' : 'Clock In'}</span>
                </button>
                <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
                  <small>Today's attendance</small>
                  <span className={`dy-pl ${S.inn ? 'g' : 'v'}`} id="dy-in-st">
                    {S.inn ? 'Present · in at 09:12 AM' : 'Not checked in'}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li className="dy-st">
            <p className="dy-when">
              <b>During the day</b>
              <span>11:30</span>
            </p>
            <span className="dy-dot" aria-hidden="true" />
            <div className="dy-txt">
              <h3>Stay up to date, and plan time off.</h3>
              <p>Read HR notices from your team, check your leave balance and send a leave request when you need one.</p>
            </div>
            <div className="dy-ui">
              <div className="dy-notice">
                <span className="dy-pl" style={{ borderColor: '#C42B2B', color: '#FFB3B3', marginBottom: 6 }}>
                  HR Notice
                </span>
                <b>November holiday calendar is available</b>
              </div>
              <div className="row">
                <small>Casual leave · 6 days left</small>
                <button
                  type="button"
                  className="dy-btn"
                  disabled={S.leave}
                  onClick={() => {
                    setS({ ...S, leave: true });
                    say('Demo: leave request sent. Status pending approval.');
                  }}
                >
                  {S.leave ? 'Request sent' : 'Apply Leave'}
                </button>
              </div>
              <p style={{ margin: '8px 0 0', minHeight: 22 }}>
                {S.leave && <span className="dy-pl y">Casual leave · 3 Nov · Pending approval</span>}
              </p>
            </div>
          </li>
          <li className="dy-st">
            <p className="dy-when">
              <b>Midday</b>
              <span>13:05</span>
            </p>
            <span className="dy-dot" aria-hidden="true" />
            <div className="dy-txt">
              <h3>Take a break, on record.</h3>
              <p>Where your organisation uses breaks, record when one starts and when it ends.</p>
            </div>
            <div className="dy-ui">
              <div className="row">
                <button
                  type="button"
                  className="dy-btn brk"
                  aria-pressed={S.brk === 1}
                  onClick={() => {
                    const v = S.brk === 1 ? 2 : 1;
                    setS({ ...S, brk: v });
                    say(v === 1 ? 'Demo: break started at 1:05 PM.' : 'Demo: break ended. 32 minutes recorded.');
                  }}
                >
                  ☕ {S.brk === 1 ? 'End Break' : 'Start Break'}
                </button>
                <span className={`dy-pl ${S.brk === 1 ? 'y' : S.brk === 2 ? 'g' : 'v'}`}>
                  {S.brk === 1 ? 'On break · from 13:05' : S.brk === 2 ? 'Break recorded · 32 min' : 'Working'}
                </span>
              </div>
            </div>
          </li>
          <li className="dy-st">
            <p className="dy-when">
              <b>End of day</b>
              <span>18:07</span>
            </p>
            <span className="dy-dot" aria-hidden="true" />
            <div className="dy-txt">
              <h3>Check out and see your hours.</h3>
              <p>Clock out at the end of your shift and review your check-in, check-out and total working time.</p>
            </div>
            <div className="dy-ui">
              <div className="row">
                <small>Shift · General 09:00 – 18:00</small>
                <button
                  type="button"
                  className="dy-btn"
                  disabled={S.out}
                  onClick={() => {
                    setS({ ...S, out: true, inn: true });
                    say(`Demo: checked out at 6:07 PM. Total working time ${S.brk === 2 ? '8 hours 23 minutes' : '8 hours 55 minutes'}.`);
                  }}
                >
                  {S.out ? 'Checked out' : 'Clock Out'}
                </button>
              </div>
              <div className="dy-times">
                <div>
                  <b>{S.inn || S.out ? '09:12' : '--:--'}</b>
                  <small>Check In</small>
                </div>
                <div>
                  <b>{t}</b>
                  <small>Total Hours</small>
                </div>
                <div>
                  <b>{S.out ? '18:07' : '--:--'}</b>
                  <small>Check Out</small>
                </div>
              </div>
            </div>
          </li>
          <li className="dy-st">
            <p className="dy-when">
              <b>Whenever needed</b>
              <span>Anytime</span>
            </p>
            <span className="dy-dot" aria-hidden="true" />
            <div className="dy-txt">
              <h3>Your HR details, always within reach.</h3>
              <p>Open your payslip, follow a reimbursement request or update your profile through employee self-service.</p>
            </div>
            <div className="dy-ui">
              <div className="dy-tiles">
                <span>
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="6" width="18" height="13" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  Payslip
                </span>
                <span>
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
                    <path d="M9 8h6M9 12h6" />
                  </svg>
                  Reimbursement
                </span>
                <span>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                  Profile
                </span>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div className="dy-foot">
        <span>
          Illustrative demo with sample times. Nothing is recorded or sent, and real approval and processing times depend on your
          organisation.
        </span>
        <button
          type="button"
          onClick={() => {
            setS(INITIAL);
            say('Demo reset.');
          }}
        >
          Reset demo
        </button>
      </div>
      <p className="dy-live" role="status" aria-live="polite">
        {live}
      </p>
    </section>
  );
}

/* ───────────────────────── Built for everyone ───────────────────────── */
function Audience() {
  const ref = useRef(null);
  useReveal(ref, { items: '.au-it', threshold: 0.25, early: 0.85 });
  const chips = [
    ['Attendance', '#3B2E8F', '#9C8CFF'],
    ['Leave', '#5E1A33', '#D23C78'],
    ['Payslips', '#0F4F49', '#17A598'],
    ['Reimbursements', '#5A4100', '#D99A12'],
    ['Self-service', '#5A2800', '#D96A1E'],
  ];
  return (
    <section className="au wrap" id="built-for-everyone" aria-labelledby="au-title" ref={ref}>
      <div className="au-intro">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
          Designed Around People
        </span>
        <h2 className="au-h2" id="au-title">
          <span>For the People Who Manage Work.</span>
          <span>And the People Who Make It Happen.</span>
        </h2>
      </div>
      <ul className="au-list">
        <li className="au-it au-hr">
          <span className="au-n" aria-hidden="true">
            01
          </span>
          <div>
            <p className="au-k">
              <b>01</b> HR Teams <i>Web application</i>
            </p>
            <h3>More Control Over Everyday HR.</h3>
            <p className="d">
              Organise employee information, attendance, payroll and essential workforce administration through the Seek People web
              application.
            </p>
          </div>
          <ul className="au-words" aria-label="HR teams work with">
            <li>Employee information</li>
            <li>Attendance</li>
            <li>Payroll</li>
            <li>Administration</li>
          </ul>
        </li>
        <li className="au-it au-mg">
          <span className="au-n" aria-hidden="true">
            02
          </span>
          <div>
            <p className="au-k">
              <b>02</b> Managers
            </p>
            <h3>Stay Closer to Your Team.</h3>
            <p className="d">
              Access relevant workforce information and support everyday team coordination through permitted management workflows.
            </p>
          </div>
          <p className="au-rule" aria-hidden="true">
            YOUR TEAM · YOUR WORKFLOWS
          </p>
        </li>
        <li className="au-it au-em">
          <span className="au-n" aria-hidden="true">
            03
          </span>
          <div>
            <p className="au-k">
              <i>Mobile application</i> Employees <b>03</b>
            </p>
            <h3>Everything You Need for Your Workday.</h3>
            <p className="d">
              Access attendance, leave, payslips, reimbursements and employee self-service features through the Seek People mobile
              application.
            </p>
          </div>
          <ul className="au-chips" aria-label="Employees use">
            {chips.map(([c, b, l]) => (
              <li key={c} style={{ '--cb': b, '--cl': l }}>
                {c}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <p className="au-seo">
        Seek People is HR software for businesses that serves HR administrators through the web application and employees through an
        employee self-service app, including leave management and employee reimbursement management.
      </p>
    </section>
  );
}

/* ───────────────────────── Final CTA ───────────────────────── */
function FinalCta() {
  const ref = useRef(null);
  useEffect(() => {
    const s = ref.current;
    if (!s || prefersReduced() || !('IntersectionObserver' in window) || s.getBoundingClientRect().top < innerHeight * 0.8)
      return undefined;
    s.classList.add('wait');
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          s.classList.remove('wait');
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(s.querySelector('.spf-in'));
    return () => {
      io.disconnect();
      s.classList.remove('wait');
    };
  }, []);
  return (
    <section className="spf wrap" id="seek-people-demo" aria-labelledby="spf-title" ref={ref}>
      <div className="spf-bg" aria-hidden="true">
        <i />
      </div>
      <div className="spf-in">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>
          The Future of People Management
        </span>
        <h2 className="spf-h2" id="spf-title">
          <span className="ln">
            <span>Your People Deserve Better.</span>
          </span>
          <span className="ln">
            <span>Your HR Technology Should Deliver.</span>
          </span>
        </h2>
        <p className="spf-p">
          Discover how Seek People can support your organisation's employee management, attendance, payroll and everyday HR operations.
        </p>
        <div className="spf-cta">
          <a className="btn btn-primary" href="/#site-footer">
            Book a Seek People Demo{' '}
            <span className="arr" aria-hidden="true">
              →
            </span>
          </a>
          <a className="btn btn-ghost" href="/#site-footer">
            Talk to Our Team{' '}
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Page ───────────────────────── */
export default function SeekPeoplePage() {
  useEffect(() => {
    const oldTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const oldDescription = description?.content;
    document.title = 'Seek People — HRMS & Employee Management Software | Seek Now';
    if (description)
      description.content =
        'Explore Seek People, HRMS and employee management software for attendance, payroll, leave, shifts and employee self-service, with web and mobile experiences.';
    return () => {
      document.title = oldTitle;
      if (description && oldDescription !== undefined) description.content = oldDescription;
    };
  }, []);

  return (
    <div className="people-page">
      <Header />
      <main id="top">
        <Hero />
        <Cinematic
          className="xp"
          id="web-app"
          data-kind="web"
          data-aw="1120"
          data-ah="700"
          data-sx=".84"
          data-vh="78"
          aria-labelledby="wa-title"
          init={initCinematicStage}
        >
          <WebMarkup />
        </Cinematic>
        <Cinematic className="ms" id="mobile-app" aria-labelledby="mo-title" init={initMobileShowcase}>
          <MobileMarkup />
        </Cinematic>
        <DayDemo />
        <Audience />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}