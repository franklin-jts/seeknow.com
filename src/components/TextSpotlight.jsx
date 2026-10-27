import { useEffect } from 'react';

/**
 * TextSpotlight — text-only opacity + colour spotlight.
 *
 * Rest  : every targeted text char sits at 85% opacity with grey tint
 * Hover : inside the 350px circle → 100% opacity + full brand purple colour
 *
 * Images / SVG / logos / nav / buttons are NEVER touched.
 */
export default function TextSpotlight({ radius = 350, unit = 'char' }) {
  useEffect(() => {
    const doc  = document;
    const root = doc.documentElement;

    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /* ── Colours ── */
    // Rest: grey at 85% opacity
    // Lit : white at 100% opacity inside spotlight
    const WHITE = [255, 255, 255]; // #ffffff — spotlight reveal
    const GREY  = [100, 98,  120]; // #646478 — rest tint

    function lerpColor(g, o, f) {
      return 'rgb(' +
        ((g[0]+(o[0]-g[0])*f)|0) + ',' +
        ((g[1]+(o[1]-g[1])*f)|0) + ',' +
        ((g[2]+(o[2]-g[2])*f)|0) + ')';
    }

    /* ── Skip rules ── */
    const SKIP_SEL = [
      'img','svg','canvas','video','picture','figure','iframe','object','embed',
      '[class*="logo"]',
      'button','input','select','textarea','label',
      '[role="tab"]','[role="tablist"]','[role="button"]','[contenteditable]',
      '.btn','.ctas','.pp-cta','.m-book-demo','.m-login',
      '.ptab','.ptabs','.pc-tab','.pc-tabs',
      '.pw','.win','.frame','.scr','.mock','.space','.handoff','.orbit',
      '.m-bar','.m-body','.m-box','.bar','.aux','.app','.tabs','.s4-op-win',
      '[class*="chip"]','[class*="pill"]','.fl-t',
      'nav','header','.site-header','.m-panel','.m-nav','.burger',
    ].join(',');

    const inSkip         = (el) => !!(el.closest && el.closest(SKIP_SEL));
    const isLiveOrHidden = (el) => {
      let n = el;
      while (n && n.getAttribute) {
        if (n.getAttribute('aria-hidden') === 'true') return true;
        const live = n.getAttribute('aria-live');
        if (live && live !== 'off') return true;
        const role = n.getAttribute('role');
        if (['status','alert','log','timer','marquee'].includes(role)) return true;
        n = n.parentNode;
      }
      return false;
    };
    const isGradText = (el) => {
      const cs = getComputedStyle(el);
      return cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text';
    };
    const hasActiveBlurAnim = (el) => {
      const check = (e) => {
        if (!e) return false;
        if (typeof e.getAnimations === 'function') {
          for (const a of e.getAnimations()) {
            const n = a.animationName;
            if ((n==='focusIn'||n==='lit') &&
                a.playState!=='finished' && a.playState!=='idle') return true;
          }
          return false;
        }
        const cs = getComputedStyle(e);
        return /focusIn|lit/.test(cs.animationName||'') && cs.animationPlayState==='running';
      };
      if (check(el)) return true;
      for (const c of el.children) if (check(c)) return true;
      return false;
    };

    /* ── Targets ── */
    const TARGET = [
      'h1','h2','h3','h4','h5','h6',
      'p','li','blockquote','figcaption','summary','dt','dd',
      '.eyebrow','.pc-eyebrow',
      '.cap-h','.cap-p',
      '.s4-h2','.s4-lede','.s4-seo','.fine',
      '.story-h2','.story-sub',
      '.v-h2','.v-h3','.v-p','.v-sub','.v-seo',
      '.s5-h2','.s5-lede','.s6-h2','.s6-lede','.s7-h2','.s7-lede',
      '.s8-h2','.s8-lede','.s9-h2','.s9-lede','.s10-h2',
      '.pc-h2','.pc-sub',
    ].join(',');

    const INLINE = new Set([
      'SPAN','EM','STRONG','B','I','U','A','SMALL','MARK','SUB','SUP',
      'TIME','CODE','ABBR','CITE','Q','KBD','SAMP','VAR','DEL','INS','FONT',
    ]);

    /* ── Inject CSS ──
       .ts-ch at rest = grey tint colour + 85% opacity
       Inside spotlight JS drives both colour → purple + opacity → 1
    ── */
    const styleEl = doc.createElement('style');
    styleEl.id = 'ts-style';
    styleEl.textContent = `
.ts-ch{
  display:inline !important;
  color:rgb(100,98,120) !important;
  opacity:0.85;
  transition:none;
}
html:not(.ts-on) .ts-ch{
  color:rgb(100,98,120) !important;
  opacity:0.85;
  transition:none;
}
@media(prefers-reduced-motion:reduce){
  .ts-ch{color:inherit!important;opacity:1!important;transition:none!important}
}
@media(hover:none),(pointer:coarse){
  .ts-ch{color:inherit!important;opacity:1!important;transition:none!important}
}
`;
    doc.head.appendChild(styleEl);

    /* ── Split helpers ── */
    const containerUnits = new Map();
    const visible = new Set();
    let io, mo, mounted = true;

    const splitTextNode = (textNode) => {
      const parts  = textNode.textContent.split(/(\s+)/);
      const frag   = doc.createDocumentFragment();
      const leaves = [];
      for (const part of parts) {
        if (part === '') continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(doc.createTextNode(part));
        } else if (unit === 'char') {
          for (const ch of part) {
            const s = doc.createElement('span');
            s.className = 'ts-ch';
            s.textContent = ch;
            frag.appendChild(s);
            leaves.push(s);
          }
        } else {
          const s = doc.createElement('span');
          s.className = 'ts-ch';
          s.textContent = part;
          frag.appendChild(s);
          leaves.push(s);
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
      return leaves;
    };

    const splitEl = (el) => {
      const created = [];
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (!node.textContent.trim()) return;
          for (const l of splitTextNode(node)) { l._el = el; created.push(l); }
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.classList.contains('ts-ch')) return;
        if (inSkip(node) || isLiveOrHidden(node) || isGradText(node)) return;
        if (!INLINE.has(node.tagName)) return;
        for (const c of Array.from(node.childNodes)) walk(c);
      };
      for (const c of Array.from(el.childNodes)) walk(c);
      return created;
    };

    /* ── Measure ── */
    const measureContainer = (el) => {
      const list = containerUnits.get(el);
      if (!list?.length) return;
      const r = el.getBoundingClientRect();
      for (const u of list) {
        const ur = u.getBoundingClientRect();
        u._rx = ur.left + ur.width  / 2 - r.left;
        u._ry = ur.top  + ur.height / 2 - r.top;
      }
    };
    const measureAll = () => { if (!mounted) return; for (const el of containerUnits.keys()) measureContainer(el); };
    const prune = () => {
      for (const el of Array.from(containerUnits.keys())) {
        if (!el.isConnected) { containerUnits.delete(el); visible.delete(el); io.unobserve(el); }
      }
    };

    /* ── Scan ── */
    const scan = () => {
      if (!mounted) return;
      prune();
      for (const el of doc.querySelectorAll(TARGET)) {
        if (el.hasAttribute('data-tspot')) continue;
        if (inSkip(el) || isLiveOrHidden(el) || isGradText(el)) { el.setAttribute('data-tspot','skip'); continue; }
        if (hasActiveBlurAnim(el)) continue;
        const leaves = splitEl(el);
        if (leaves.length) {
          el.setAttribute('data-tspot','1');
          containerUnits.set(el, leaves);
          io.observe(el);
        }
      }
      requestAnimationFrame(measureAll);
    };

    /* ── Pointer torch ── */
    let cx = -1e9, cy = -1e9, rafId = 0, active = false;
    const R  = radius;
    const R2 = R * R;
    const STEPS = 200; // finer quantisation → smoother gradient

    const update = () => {
      rafId = 0;
      if (!active || !mounted) return;
      for (const el of visible) {
        const list = containerUnits.get(el);
        if (!list?.length) continue;
        const rect = el.getBoundingClientRect();
        const ox = rect.left, oy = rect.top;
        for (let i = 0; i < list.length; i++) {
          const u = list[i];
          if (u._rx == null) continue;
          const dx = cx - (ox + u._rx);
          const dy = cy - (oy + u._ry);
          const d2 = dx*dx + dy*dy;

          // Full smoothstep: f=1 at centre, f=0 at radius — no hard flat zone
          // This gives the widest, most natural smooth gradient edge
          let f = 0;
          if (d2 < R2) {
            const t = Math.sqrt(d2) / R;        // 0 at centre → 1 at edge
            const s = t * t * (3 - 2 * t);      // classic smoothstep
            f = 1 - s;                           // 1 centre → 0 edge, smooth curve
          }

          const fb = Math.round(f * STEPS) / STEPS;
          if (fb === u._fb) continue;
          u._fb = fb;

          // colour: grey → white
          u.style.setProperty('color', lerpColor(GREY, WHITE, fb), 'important');
          // opacity: 0.85 → 1.0 (smooth)
          u.style.opacity = (0.85 + 0.15 * fb).toFixed(3);
        }
      }
    };
    const schedule = () => { if (!rafId) rafId = requestAnimationFrame(update); };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      cx = e.clientX; cy = e.clientY;
      if (!active) { active = true; root.classList.add('ts-on'); }
      schedule();
    };
    const onLeave = () => {
      active = false;
      root.classList.remove('ts-on');
    };
    const onScroll = () => { if (active) schedule(); };

    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
      }
    }, { rootMargin: '120px 0px' });

    let moT = 0;
    const onMutate = () => {
      clearTimeout(moT);
      moT = setTimeout(() => {
        if (!mounted) return;
        mo.disconnect();
        scan();
        if (mounted) mo.observe(doc.body, { childList:true, subtree:true, characterData:true });
      }, 250);
    };
    mo = new MutationObserver(onMutate);
    mo.observe(doc.body, { childList:true, subtree:true, characterData:true });

    let resizeT = 0;
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(measureAll, 150); };

    doc.addEventListener('pointermove', onMove, { passive:true });
    doc.addEventListener('mouseleave',  onLeave);
    window.addEventListener('scroll',  onScroll, { passive:true });
    window.addEventListener('resize',  onResize);

    scan();
    const timers = [setTimeout(scan,500), setTimeout(scan,1800), setTimeout(scan,4000)];
    window.addEventListener('load', scan, { once:true });
    if (doc.fonts?.ready) doc.fonts.ready.then(() => { if (mounted) { scan(); requestAnimationFrame(measureAll); } });

    return () => {
      mounted = false;
      clearTimeout(resizeT); clearTimeout(moT);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      io.disconnect(); mo.disconnect();
      doc.removeEventListener('pointermove', onMove);
      doc.removeEventListener('mouseleave',  onLeave);
      window.removeEventListener('scroll',   onScroll);
      window.removeEventListener('resize',   onResize);
      root.classList.remove('ts-on');
      const parents = new Set();
      doc.querySelectorAll('.ts-ch').forEach((s) => {
        const p = s.parentNode;
        if (p) { p.replaceChild(doc.createTextNode(s.textContent), s); parents.add(p); }
      });
      parents.forEach((p) => { try { p.normalize(); } catch(_){} });
      doc.querySelectorAll('[data-tspot]').forEach((el) => el.removeAttribute('data-tspot'));
      styleEl.remove();
    };
  }, [radius, unit]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
