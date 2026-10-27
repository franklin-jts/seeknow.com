import { useEffect, useRef } from 'react';

/**
 * Torch / spotlight hover effect.
 *
 * Renders children twice:
 *   1. Normal layer (base content)
 *   2. Bright lit copy — aria-hidden, inert — masked to a soft
 *      radial circle that follows the cursor.
 *
 * `children` is a render function: (lit: boolean) => ReactNode
 * so the lit copy can suppress duplicate ids.
 *
 * Props:
 *   className  — applied to both zone wrapper and lit copy
 *   radius     — beam radius in px (default 220)
 *   scope      — CSS selector for the element that owns the pointer
 *                events (defaults to the zone itself)
 */
export default function Spotlight({
  className = '',
  radius = 180,
  scope,
  children,
}) {
  const zone = useRef(null);

  useEffect(() => {
    const el = zone.current;
    if (!el) return;

    const host = (scope && el.closest(scope)) || el;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    let raf = 0;
    let cx = 0, cy = 0;

    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (cx - r.left) + 'px');
      el.style.setProperty('--my', (cy - r.top)  + 'px');
      el.style.setProperty('--cx', cx + 'px');
      el.style.setProperty('--cy', cy + 'px');
    };

    const onMove = (e) => {
      if (!fine.matches || e.pointerType === 'touch') return;
      cx = e.clientX;
      cy = e.clientY;
      el.classList.add('is-lit');
      if (calm.matches) el.classList.add('is-calm');
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => el.classList.remove('is-lit');

    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);

    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scope]);

  return (
    <div
      ref={zone}
      className={`${className} spot-zone`}
      style={{ '--spot-r': radius + 'px' }}
    >
      {children(false)}
      <div className="spot-dim" aria-hidden="true" />
      <div className={`${className} spot-lit`} aria-hidden="true" inert="">
        {children(true)}
      </div>
    </div>
  );
}
