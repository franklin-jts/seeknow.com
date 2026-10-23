import { useEffect } from 'react';

/**
 * TextSpotlight — a cursor-following torch over the copy.
 *
 * Text near the pointer is fully bright (opacity 1); text farther away fades
 * smoothly down to `dim`. The fade is gradual, even inside a single word.
 * Nothing happens until the mouse moves; when it leaves the page, all text
 * returns to normal. TEXT ONLY.
 *
 * Props:
 *   radius  torch radius in px        (default 240)
 *   dim     opacity at the edge       (default 0.18)
 *   unit    'char' per-letter fade    (default) | 'word' whole-word fade
 *
 * Never touches: img / svg / canvas / video / logos, mockup windows &
 * orbit previews, buttons / tabs / inputs / nav / header, aria-hidden /
 * aria-live text, gradient text (background-clip:text), or the hero blur-in
 * (focusIn / lit) while it is running. No blur, glow, overlays or filters —
 * only opacity changes. Renders null; all logic lives in a useEffect.
 */
export default function TextSpotlight({ radius = 240, dim = 0.18, unit = 'char' }) {
  useEffect(() => {
    const doc = document;
    const root = doc.documentElement;

    /* ── Fully disabled on touch / coarse pointers / reduced-motion ── */
    const fineHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fineHover || reducedMotion) return;

    /* ── Inject CSS (one style tag, removed on unmount) ── */
    const styleEl = doc.createElement('style');
    styleEl.id = 'ts-style';
    styleEl.textContent = `
.ts-word,.ts-ch{display:inline;transition:opacity .14s ease;color:inherit}
html:not(.ts-on) .ts-word,html:not(.ts-on) .ts-ch{opacity:1 !important;transition:opacity .4s ease}
@media (prefers-reduced-motion:reduce){.ts-word,.ts-ch{opacity:1 !important;transition:none !important}}
@media (hover:none),(pointer:coarse){.ts-word,.ts-ch{opacity:1 !important;transition:none !important}}
`;
    doc.head.appendChild(styleEl);

    /* ── NEVER list: element or any ancestor matching this is never split ── */
    const SKIP = [
      // media & logos
      'img', 'svg', 'canvas', 'video', 'picture', 'figure', 'iframe', 'object', 'embed',
      '[class*="logo"]',
      // interactive UI
      'button', 'input', 'select', 'textarea', 'label',
      '[role="tab"]', '[role="tablist"]', '[role="button"]', '[contenteditable]',
      '.btn', '.ctas', '.pp-cta', '.m-book-demo', '.m-login',
      '.ptab', '.ptabs', '.pc-tab', '.pc-tabs',
      // product / app mockup windows, orbit previews & inner chrome
      '.pw', '.win', '.frame', '.scr', '.mock', '.space', '.handoff', '.orbit',
      '.m-bar', '.m-body', '.m-box', '.bar', '.aux', '.app', '.tabs', '.s4-op-win',
      // chips / pills
      '[class*="chip"]', '[class*="pill"]', '.fl-t',
      // nav / header / menu
      'nav', 'header', '.site-header', '.m-panel', '.m-nav', '.burger',
    ].join(',');

    const inSkip = (el) => !!(el.closest && el.closest(SKIP));

    // aria-hidden / aria-live / live-region roles, walking up the tree.
    const isLiveOrHidden = (el) => {
      let n = el;
      while (n && n.getAttribute) {
        if (n.getAttribute('aria-hidden') === 'true') return true;
        const live = n.getAttribute('aria-live');
        if (live && live !== 'off') return true;
        const role = n.getAttribute('role');
        if (role === 'status' || role === 'alert' || role === 'log' || role === 'timer' || role === 'marquee') return true;
        n = n.parentNode;
      }
      return false;
    };

    // gradient text — opacity layers make it vanish, so leave it untouched.
    const isGradText = (el) => {
      const cs = getComputedStyle(el);
      return cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text';
    };

    // Hero blur-in (focusIn / lit) — skip only while the animation is running.
    const hasActiveBlurAnim = (el) => {
      const check = (e) => {
        if (!e) return false;
        if (typeof e.getAnimations === 'function') {
          for (const a of e.getAnimations()) {
            const name = a.animationName;
            if ((name === 'focusIn' || name === 'lit') &&
                a.playState !== 'finished' && a.playState !== 'idle') return true;
          }
          return false; // getAnimations available → trust it
        }
        const cs = getComputedStyle(e);
        return /focusIn|lit/.test(cs.animationName || '') && cs.animationPlayState === 'running';
      };
      if (check(el)) return true;
      for (const c of el.children) if (check(c)) return true;
      return false;
    };

    /* ── Text containers we light ── */
    const TARGET = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'li', 'blockquote', 'figcaption', 'summary', 'dt', 'dd',
      '.eyebrow', '.pc-eyebrow',
      '.cap-h', '.cap-p',
      // named section headings / ledes (harmless if already tags or absent)
      '.s4-h2', '.s4-lede', '.s4-seo', '.fine',
      '.story-h2', '.story-sub',
      '.v-h2', '.v-h3', '.v-p', '.v-sub', '.v-seo',
      '.s5-h2', '.s5-lede', '.s6-h2', '.s6-lede', '.s7-h2', '.s7-lede',
      '.s8-h2', '.s8-lede', '.s9-h2', '.s9-lede', '.s10-h2',
      '.pc-h2', '.pc-sub',
    ].join(',');

    /* ── Inline wrappers we recurse through while splitting ── */
    const INLINE = new Set([
      'SPAN', 'EM', 'STRONG', 'B', 'I', 'U', 'A', 'SMALL', 'MARK', 'SUB', 'SUP',
      'TIME', 'CODE', 'ABBR', 'CITE', 'Q', 'KBD', 'SAMP', 'VAR', 'DEL', 'INS', 'FONT',
    ]);

    /* ── State ── */
    const containerUnits = new Map(); // target el -> [leaf units]
    const visible = new Set();        // on-screen target els
    let io, mo;
    let mounted = true;

    /* ── Split one text node into word/char spans; return the leaf units ── */
    const splitTextNode = (textNode) => {
      const parts = textNode.textContent.split(/(\s+)/); // keep whitespace
      const frag = doc.createDocumentFragment();
      const leaves = [];
      for (const part of parts) {
        if (part === '') continue;
        if (/^\s+$/.test(part)) {
          frag.appendChild(doc.createTextNode(part));   // preserve whitespace
        } else if (unit === 'char') {
          const word = doc.createElement('span');
          word.className = 'ts-word';
          for (const ch of part) {
            const c = doc.createElement('span');
            c.className = 'ts-ch';
            c.textContent = ch;
            word.appendChild(c);
            leaves.push(c);
          }
          frag.appendChild(word);
        } else {
          const word = doc.createElement('span');
          word.className = 'ts-word';
          word.textContent = part;
          frag.appendChild(word);
          leaves.push(word);
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
      return leaves;
    };

    /* ── Walk a container, splitting text inside inline wrappers ── */
    const splitEl = (el) => {
      const created = [];
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            for (const l of splitTextNode(node)) { l._el = el; created.push(l); }
          }
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.classList.contains('ts-word') || node.classList.contains('ts-ch')) return;
        if (inSkip(node) || isLiveOrHidden(node) || isGradText(node) || hasActiveBlurAnim(node)) return;
        if (!INLINE.has(node.tagName)) return; // only recurse through inline wrappers
        for (const c of Array.from(node.childNodes)) walk(c);
      };
      for (const c of Array.from(el.childNodes)) walk(c);
      return created;
    };

    /* ── Cache each unit's centre relative to its container (arithmetic/frame) ── */
    const measureContainer = (el) => {
      const list = containerUnits.get(el);
      if (!list || !list.length) return;
      const r = el.getBoundingClientRect();
      for (const u of list) {
        const ur = u.getBoundingClientRect();
        u._rx = ur.left + ur.width / 2 - r.left;
        u._ry = ur.top + ur.height / 2 - r.top;
      }
    };
    const measureAll = () => {
      if (!mounted) return;
      for (const el of containerUnits.keys()) measureContainer(el);
    };

    /* ── Drop containers that have left the DOM ── */
    const prune = () => {
      for (const el of Array.from(containerUnits.keys())) {
        if (!el.isConnected) { containerUnits.delete(el); visible.delete(el); io.unobserve(el); }
      }
    };

    /* ── Scan: split every unprocessed target text container ── */
    const scan = () => {
      if (!mounted) return;
      prune();
      for (const el of doc.querySelectorAll(TARGET)) {
        if (el.hasAttribute('data-tspot')) continue;          // already handled
        if (inSkip(el) || isLiveOrHidden(el) || isGradText(el)) {
          el.setAttribute('data-tspot', 'skip'); continue;     // never split
        }
        if (hasActiveBlurAnim(el)) continue;                   // try again on next scan
        const leaves = splitEl(el);
        el.setAttribute('data-tspot', '1');
        if (leaves.length) { containerUnits.set(el, leaves); io.observe(el); }
      }
      requestAnimationFrame(measureAll);
    };

    /* ── Pointer torch ── */
    let cx = -1e9, cy = -1e9, rafId = 0, active = false;
    const R = radius, R2 = R * R;

    const update = () => {
      rafId = 0;
      if (!active || !mounted) return;
      for (const el of visible) {
        const list = containerUnits.get(el);
        if (!list || !list.length) continue;
        const r = el.getBoundingClientRect();
        const ox = r.left, oy = r.top;
        for (let i = 0; i < list.length; i++) {
          const u = list[i];
          if (u._rx == null) continue;
          const ux = ox + u._rx, uy = oy + u._ry;
          const dx = cx - ux, dy = cy - uy;
          const d2 = dx * dx + dy * dy;
          let op;
          if (d2 >= R2) {
            op = dim;
          } else {
            const t = Math.sqrt(d2) / R;     // 0 at centre → 1 at radius
            const s = t * t * (3 - 2 * t);   // smoothstep 0..1
            op = 1 - s * (1 - dim);
          }
          const opR = Math.round(op * 1000) / 1000;
          if (opR !== u._op) { u._op = opR; u.style.opacity = String(opR); }
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
      root.classList.remove('ts-on'); // CSS fades everything back to 1
    };
    const onScroll = () => { if (active) schedule(); };

    /* ── IntersectionObserver: only update on-screen containers ── */
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
    }, { rootMargin: '120px 0px' });

    /* ── Debounced rescan when new content appears ── */
    let moT = 0;
    const onMutate = () => {
      clearTimeout(moT);
      moT = setTimeout(() => {
        if (!mounted) return;
        mo.disconnect();
        scan();
        if (mounted) mo.observe(doc.body, { childList: true, subtree: true, characterData: true });
      }, 250);
    };
    mo = new MutationObserver(onMutate);
    mo.observe(doc.body, { childList: true, subtree: true, characterData: true });

    /* ── Debounced re-measure on resize ── */
    let resizeT = 0;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(measureAll, 150);
    };

    /* ── Wire up + initial scan (and re-scans as animations/fonts settle) ── */
    doc.addEventListener('pointermove', onMove, { passive: true });
    doc.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    scan();
    const timers = [
      setTimeout(scan, 500),
      setTimeout(scan, 1800),
      setTimeout(scan, 4000),
    ];
    const onLoad = () => scan();
    window.addEventListener('load', onLoad, { once: true });
    if (doc.fonts && doc.fonts.ready) {
      doc.fonts.ready.then(() => {
        if (!mounted) return;
        scan();
        requestAnimationFrame(measureAll);
      });
    }

    /* ── Cleanup: restore the page to exactly how it was ── */
    return () => {
      mounted = false;
      clearTimeout(resizeT);
      clearTimeout(moT);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      io.disconnect();
      mo.disconnect();
      doc.removeEventListener('pointermove', onMove);
      doc.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      root.classList.remove('ts-on');

      // unwrap every span we added → back to plain text
      const parents = new Set();
      doc.querySelectorAll('.ts-word').forEach((w) => {
        const p = w.parentNode;
        if (p) { p.replaceChild(doc.createTextNode(w.textContent), w); parents.add(p); }
      });
      parents.forEach((p) => { try { p.normalize(); } catch (e) { /* ignore */ } });
      doc.querySelectorAll('[data-tspot]').forEach((el) => el.removeAttribute('data-tspot'));
      styleEl.remove();
    };
  }, [radius, dim, unit]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
