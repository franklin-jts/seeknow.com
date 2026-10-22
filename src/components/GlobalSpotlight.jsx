import { useEffect, useRef } from 'react';

/*
  GlobalSpotlight
  ───────────────
  Page-wide cinematic torch effect covering ALL sections and images.

  Three fixed layers stacked above everything:
  1. veil    — dark radial mask with hole at cursor (dims surrounding content)
  2. screen  — white/lavender glow at cursor via screen blend (brightens content + images)
  3. color   — subtle purple hue at cursor via color-dodge (adds brand tint)

  No content duplication. Zero layout impact. Works on images, cards, text, everything.
  Skipped on touch / coarse pointer / prefers-reduced-motion.
*/
export default function GlobalSpotlight({ radius = 300 }) {
  const veilRef   = useRef(null);
  const screenRef = useRef(null);
  const colorRef  = useRef(null);

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const calm = matchMedia('(prefers-reduced-motion: reduce)');

    if (!fine.matches) return;

    const veil   = veilRef.current;
    const screen = screenRef.current;
    const color  = colorRef.current;
    if (!veil || !screen || !color) return;

    let raf = 0;
    let cx = 0, cy = 0, active = false;

    const R  = radius;
    const RV = R * 1.5;   // veil outer radius — larger for a wider dark surround

    const paint = () => {
      raf = 0;

      // ── Veil: dark surround with transparent hole at cursor ──
      veil.style.background = `radial-gradient(
        circle ${RV}px at ${cx}px ${cy}px,
        transparent                      0%,
        rgba(5, 2, 14, 0.04)            25%,
        rgba(5, 2, 14, 0.45)            58%,
        rgba(5, 2, 14, 0.78)            80%,
        rgba(5, 2, 14, 0.90)           100%
      )`;

      // ── Screen blend: brightens everything under cursor (works on images!) ──
      screen.style.background = `radial-gradient(
        circle ${R}px at ${cx}px ${cy}px,
        rgba(255,255,255,0.18)   0%,
        rgba(255,255,255,0.10)  35%,
        rgba(255,255,255,0.04)  65%,
        transparent             100%
      )`;

      // ── Color-dodge: adds lavender brand tint in beam center ──
      color.style.background = `radial-gradient(
        circle ${R * 0.6}px at ${cx}px ${cy}px,
        rgba(185,145,255,0.12)   0%,
        rgba(134, 96,248,0.06)  50%,
        transparent             100%
      )`;
    };

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      cx = e.clientX;
      cy = e.clientY;

      if (!active) {
        active = true;
        const dur = calm.matches ? '0s' : '.4s';
        veil.style.opacity   = '1';
        veil.style.transitionDuration   = dur;
        screen.style.opacity = '1';
        screen.style.transitionDuration = dur;
        color.style.opacity  = '1';
        color.style.transitionDuration  = dur;
      }

      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      active = false;
      veil.style.opacity   = '0';
      screen.style.opacity = '0';
      color.style.opacity  = '0';
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

  const base = {
    position:      'fixed',
    inset:         0,
    pointerEvents: 'none',
    opacity:       0,
    transition:    'opacity .4s ease',
    willChange:    'background',
  };

  return (
    <>
      {/* 1. Dark veil — dims everything outside the beam */}
      <div
        ref={veilRef}
        aria-hidden="true"
        style={{ ...base, zIndex: 9997 }}
      />

      {/* 2. Bright screen — illuminates content + images via screen blend */}
      <div
        ref={screenRef}
        aria-hidden="true"
        style={{ ...base, zIndex: 9998, mixBlendMode: 'screen' }}
      />

      {/* 3. Lavender color-dodge — adds brand glow tint */}
      <div
        ref={colorRef}
        aria-hidden="true"
        style={{ ...base, zIndex: 9999, mixBlendMode: 'color-dodge' }}
      />
    </>
  );
}
