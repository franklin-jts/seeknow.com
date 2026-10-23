import { useEffect } from 'react';

/*
  TextSpotlight — word-level cursor spotlight.

  Each eligible text node is split into individual word <span>s.
  On pointermove, each word's opacity is set based on how far its
  centre is from the cursor:
    • within radius     → opacity 1   (fully lit, white-ish)
    • at radius edge    → opacity dim (base colour, readable)
  Smooth falloff in between using a cosine curve.

  NEVER touches: images, SVGs, canvas, mockup windows, cards,
  buttons, aria-hidden elements, or gradient-text spans.
*/
export default function TextSpotlight({ radius = 250, dim = 0.25 }) {
  useEffect(() => {
    /* ── Guards ── */
    if (matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;

    /* ── Containers whose content is never touched ── */
    const SKIP = [
      /* Mockup windows, orbit stages */
      '.pw', '.win', '.frame', '.scr', '.space',
      '.story-static', '.stage-static',
      '.eco-story', '.stage',
      /* Interactive */
      'button', 'input', 'select', 'textarea',
      '[role="tab"]', '[role="tablist"]',
      '.ptabs', '.s8-tabs',
      /* Cards / chips */
      '.pp', '.pp-in', '.fl-logo', '.fl-t',
      '.role', '.cand', '.m-box', '.cr', '.kc', '.col',
      '.pill', '.prod', '.pc-card',
      /* Nav / header */
      '.site-header', '.m-panel', '.nav',
      /* Mockup inner bars */
      '.bar', '.aux', '.m-bar', '.m-body',
    ].join(', ');

    const inSkip      = (el) => !!el.closest(SKIP);
    const isAriaHide  = (el) => { let n = el; while (n) { if (n.getAttribute?.('aria-hidden') === 'true') return true; n = n.parentElement; } return false; };
    const isGradText  = (el) => { const cs = getComputedStyle(el); return (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') && cs.color === 'transparent'; };
    const hasBg       = (el) => { const cs = getComputedStyle(el); const bg = cs.backgroundColor; if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return true; if (cs.backgroundImage && cs.backgroundImage !== 'none' && cs.webkitBackgroundClip !== 'text' && cs.backgroundClip !== 'text') return true; return false; };
    const hasBlurAnim = (el) => { const cs = getComputedStyle(el); if (/focusIn|lit\b/.test(cs.animationName) || (cs.filter && cs.filter !== 'none')) return true; for (const c of el.children) { const cc = getComputedStyle(c); if (/focusIn|lit\b/.test(cc.animationName) || (cc.filter && cc.filter !== 'none')) return true; } return false; };

    /* ── Target block elements to split ── */
    const TARGET_SEL = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'li', 'blockquote', 'figcaption',
      '.eyebrow', '.cap-h', '.cap-p',
      '.sub', '.s4-lede', '.v-sub', '.v-h2', '.v-h3', '.v-p',
      '.story-h2', '.story-sub',
      '.s8-lede',
      '.s4-h2 .l',
      '.s6-h2', '.s6-lede',
      '.s5-h2', '.s5-lede',
      '.s7-h2', '.s7-lede',
      '.s9-h2', '.s9-lede',
      '.s10-h2',
      '.fine',
      'footer p', 'footer li',
    ].join(', ');

    /* ── State ── */
    /** @type {HTMLElement[]} all word spans created */
    let words = [];
    /** @type {HTMLElement[]} original elements we split */
    let splitEls = [];

    /* ── Split a text node into word spans ── */
    const splitTextNode = (textNode, baseColor) => {
      const text = textNode.textContent;
      // Split on spaces, preserve them as separate text nodes
      const parts = text.split(/(\s+)/);
      if (parts.length <= 1) return false; // single token, don't bother
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (/^\s+$/.test(part)) {
          // whitespace — plain text node, never lit
          frag.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          const span = document.createElement('span');
          span.textContent = part;
          span.className = 'ts-word';
          span.style.setProperty('--ts-base', baseColor);
          span.style.opacity = dim.toString();
          frag.appendChild(span);
          words.push(span);
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
      return true;
    };

    /* ── Walk an element and split its direct text nodes ── */
    const splitEl = (el) => {
      const baseColor = getComputedStyle(el).color;
      // Walk child nodes; only split raw text nodes (not inside child elements)
      const nodes = [...el.childNodes];
      let didSplit = false;
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
          if (splitTextNode(node, baseColor)) didSplit = true;
        }
        // For child elements that are simple inline spans (not gradient, not special),
        // recurse one level so we catch text inside <em>, <strong>, <b>, etc.
        else if (
          node.nodeType === Node.ELEMENT_NODE &&
          ['SPAN', 'EM', 'STRONG', 'B', 'I', 'U'].includes(node.tagName) &&
          !node.classList.contains('ts-word') &&
          !isGradText(node) &&
          !hasBg(node) &&
          !inSkip(node) &&
          !isAriaHide(node)
        ) {
          const innerBase = getComputedStyle(node).color;
          const innerNodes = [...node.childNodes];
          innerNodes.forEach(n => {
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0) {
              if (splitTextNode(n, innerBase)) didSplit = true;
            }
          });
        }
      });
      return didSplit;
    };

    /* ── Unsplit: restore original text ── */
    const unsplit = () => {
      splitEls.forEach(el => {
        // Collect all ts-word spans and text nodes, merge back to plain text
        el.querySelectorAll('.ts-word').forEach(span => {
          span.parentNode.replaceChild(document.createTextNode(span.textContent), span);
        });
        // Normalise merges adjacent text nodes
        el.normalize();
      });
      splitEls = [];
      words = [];
    };

    /* ── Full scan ── */
    const scan = () => {
      // Clean previous state first
      unsplit();

      document.querySelectorAll(TARGET_SEL).forEach(el => {
        if (inSkip(el))      return;
        if (isAriaHide(el))  return;
        if (isGradText(el))  return;
        if (hasBg(el))       return;
        if (hasBlurAnim(el)) return;
        // Don't double-process
        if (el.querySelector('.ts-word')) return;

        const did = splitEl(el);
        if (did) splitEls.push(el);
      });
    };

    scan();
    const t1 = setTimeout(scan, 350);
    const t2 = setTimeout(scan, 4600);
    window.addEventListener('load', scan, { once: true });

    /* ── IntersectionObserver — only animate on-screen words ── */
    const visible = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) visible.add(e.target);
        else { visible.delete(e.target); e.target.style.opacity = dim.toString(); }
      });
    }, { rootMargin: '80px 0px' });

    const observeAll = () => {
      io.disconnect();
      visible.clear();
      words.forEach(w => io.observe(w));
    };
    observeAll();

    /* ── Pointer tracking ── */
    let cx = -99999, cy = -99999;
    let rafId = 0;
    let active = false;
    const R = radius;
    const R2 = R * R;

    const update = () => {
      rafId = 0;
      if (!active) return;

      visible.forEach(word => {
        const rect = word.getBoundingClientRect();
        // Use word centre
        const wx = rect.left + rect.width  / 2;
        const wy = rect.top  + rect.height / 2;
        const dx = cx - wx;
        const dy = cy - wy;
        const dist2 = dx * dx + dy * dy;

        let opacity;
        if (dist2 >= R2) {
          opacity = dim;
        } else {
          // Smooth cosine falloff: 1 at centre → dim at radius
          const t = Math.sqrt(dist2) / R;
          const ease = 0.5 - 0.5 * Math.cos(Math.PI * t); // 0 at centre, 1 at edge
          opacity = 1 - ease * (1 - dim);
        }
        word.style.opacity = opacity.toFixed(3);
      });
    };

    const schedule = () => { if (!rafId) rafId = requestAnimationFrame(update); };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      cx = e.clientX;
      cy = e.clientY;
      if (!active) {
        active = true;
        root.classList.add('ts-on');
      }
      schedule();
    };

    const onLeave = () => {
      active = false;
      root.classList.remove('ts-on');
      // Reset all visible words to dim
      visible.forEach(w => { w.style.opacity = dim.toString(); });
    };

    const onScroll = () => { if (active) schedule(); };

    document.addEventListener('pointermove', onMove,  { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Cleanup ── */
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', scan);
      root.classList.remove('ts-on');
      unsplit();
    };
  }, [radius, dim]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
