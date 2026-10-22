import { useEffect, useRef } from 'react';

/*
  GlobalSpotlight
  ───────────────
  Page-wide cinematic torch — VEIL ONLY, no blend modes.

  How the "text-only" effect works:
  A single dark overlay covers the whole page with a transparent radial
  hole at the cursor.  Because the overlay sits above everything, the hole
  reveals the original page content — text, which is light-coloured, pops
  visibly while dark backgrounds, images and cards barely change (they
  were dark to begin with).

  NO screen / color-dodge / multiply layers — those blend modes cannot be
  scoped to text; they affect images too.  A pure veil with a hole is the
  only approach that looks text-selective without duplicating DOM nodes.

  Skipped on touch / coarse pointer / prefers-reduced-motion.
*/
export default function GlobalSpotlight({ radius = 260 }) {
  const veilRef = useRef(null);

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const calm = matchMedia('(prefers-reduced-motion: reduce)');

    if (!fine.matches) return;

    const veil = veilRef.current;
    if (!veil) return;

    let raf = 0;
    let cx = 0, cy = 0, active = false;

    // Outer radius: wider dark surround so edges fade convincingly
    const R  = radius;
    const RO = R * 1.7;

    const paint = () => {
      raf = 0;
      veil.style.background = `radial-gradient(
        circle ${RO}px at ${cx}px ${cy}px,
        transparent                      0%,
        rgba(5, 2, 14, 0.10)            28%,
        rgba(5, 2, 14, 0.62)            58%,
        rgba(5, 2, 14, 0.86)            80%,
        rgba(5, 2, 14, 0.94)           100%
      )`;
    };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      cx = e.clientX;
      cy = e.clientY;

      if (!active) {
        active = true;
        veil.style.opacity = '1';
        veil.style.transitionDuration = calm.matches ? '0s' : '.4s';
      }

      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      active = false;
      veil.style.opacity = '0';
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    const onFineChange = () => { if (!fine.matches) onLeave(); };
    fine.addEventListener('change', onFineChange);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      fine.removeEventListener('change', onFineChange);
    };
  }, [radius]);

  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        9997,
        pointerEvents: 'none',
        opacity:       0,
        transition:    'opacity .4s ease',
        willChange:    'background',
      }}
    />
  );
}
