import React, { useEffect, useRef, useState } from 'react';
import './solution.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

/* ======================================================================
   ROUTES — null = destination not connected yet (link is inert, no invented URLs)
   ====================================================================== */
const ROUTES = {
  demo: null, contact: null, resources: null, company: null,
  pricing: '/#pricing', products: '/#platform',
  referNow: '/refer-now', console: '/console', seekPeople: '/#ecosystem',
};

/* ======================================================================
   Scroll-scene engine (React port of window.SV)
   Scenes pin (sticky) on desktop; on phones / reduced motion they show the
   finished state in normal flow. Each scene's render(p) is a pure function
   of scroll progress.
   ====================================================================== */
const cl = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (p, a, b) => ease(cl((p - a) / (b - a)));

const SV = (() => {
  const scenes = [];
  let raf = 0, rt = 0, mq = null, bound = false, queued = false;
  const isStatic = () => (mq ? mq.matches : false) || window.innerHeight < 560;

  function tick() {
    raf = 0;
    scenes.forEach(s => {
      if (s.static) return;
      const r = s.track.getBoundingClientRect(), span = s.track.offsetHeight - window.innerHeight;
      if (r.bottom < -50 || r.top > window.innerHeight + 50) {
        if (s.last !== null && (r.top > 0 ? s.last !== 0 : s.last !== 1)) { s.last = r.top > 0 ? 0 : 1; s.render(s.last, false); }
        return;
      }
      const p = cl(-r.top / span);
      if (p === s.last) return;
      s.last = p; s.render(p, false);
    });
  }
  function setup() {
    if (!mq) return;
    const st = isStatic();
    scenes.forEach(s => {
      s.static = st;
      s.track.classList.toggle('sv-pinned', !st);
      s.track.style.setProperty('--th', s.th + 'vh');
      s.layout && s.layout(st);
      s.last = null;
      if (st) s.render(1, true);
    });
    tick();
  }
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const onResize = () => { clearTimeout(rt); rt = setTimeout(setup, 140); };
  function bind() {
    if (bound) return;
    bound = true;
    mq = window.matchMedia('(max-width: 819px), (prefers-reduced-motion: reduce)');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    mq.addEventListener && mq.addEventListener('change', setup);
  }
  function unbind() {
    if (!bound) return;
    bound = false;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    mq && mq.removeEventListener && mq.removeEventListener('change', setup);
    clearTimeout(rt);
  }
  return {
    scene(track, opts) {
      bind();
      const s = { track, th: opts.th || 200, render: opts.render, layout: opts.layout, last: null, static: false };
      scenes.push(s);
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => { queued = false; setup(); if (document.fonts) document.fonts.ready.then(setup); });
      }
      return () => {
        const i = scenes.indexOf(s); if (i > -1) scenes.splice(i, 1);
        track.classList.remove('sv-pinned');
        if (!scenes.length) unbind();
      };
    },
  };
})();

/* registers a scroll scene; `factory` runs after mount and returns { render, layout?, cleanup? } */
function useScene(trackRef, th, factory) {
  useEffect(() => {
    const h = factory();
    const off = SV.scene(trackRef.current, { th, render: h.render, layout: h.layout });
    return () => { off(); h.cleanup && h.cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ======================================================================
   Small shared pieces
   ====================================================================== */
function SolSvLink({ route, className, children, ...rest }) {
  const href = ROUTES[route];
  if (href) return <a className={className} href={href} {...rest}>{children}</a>;
  return (
    <a className={className} href="#" data-pending="true" title="Destination not connected yet" onClick={e => e.preventDefault()} {...rest}>
      {children}
    </a>
  );
}

const ICONS = {
  refer: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  console: <><rect x="4" y="4" width="4.5" height="16" rx="1.5" /><rect x="10" y="4" width="4.5" height="11" rx="1.5" /><rect x="16" y="4" width="4" height="7" rx="1.5" /></>,
  people: <><circle cx="9" cy="8" r="3.2" /><circle cx="17" cy="9" r="2.5" /><path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" /></>,
};
const SolIcon = ({ type }) => <svg viewBox="0 0 24 24">{ICONS[type]}</svg>;

function SolProdPill({ icon, name, status, small }) {
  const live = status === 'Available';
  return (
    <span className="sv-prod">
      <i aria-hidden="true"><SolIcon type={icon} /></i>
      <span><b>{name}<span className={live ? 'sv-live' : 'sv-soon'}>{status}</span></b><small>{small}</small></span>
    </span>
  );
}

/* ======================================================================
   Hero
   ====================================================================== */
function SolHero() {
  const heroRef = useRef(null);

  // ambient light drifts gently toward the pointer
  useEffect(() => {
    const hero = heroRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reduce) return;
    const move = e => {
      if (!fine.matches) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--gx', (50 + ((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(2) + '%');
      hero.style.setProperty('--gy', (44 + ((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2) + '%');
    };
    const leave = () => { hero.style.setProperty('--gx', '50%'); hero.style.setProperty('--gy', '44%'); };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); };
  }, []);

  const words = [['Every', 0], ['Business', 3], ['Is', 6], ['Different.', 9]];
  return (
    <section className="cx wrap" id="solutions-hero" aria-labelledby="cx-h1" ref={heroRef}>
      <div className="cx-bg" aria-hidden="true" />
      <div className="cx-glow" aria-hidden="true" />
      <div className="cx-in">
        <p className="cx-eb">Solutions by Seek Now</p>
        <h1 className="cx-h1" id="cx-h1">
          <span className="sr">Every Business Is Different. Your Workforce Solution Should Be Too.</span>
          <span className="cx-visual" aria-hidden="true">
            <span className="ln ln1">{words.map(([w, i]) => <span key={w} className="ch" style={{ '--i': i }}>{w}</span>)}</span>
            <span className="ln ln2"><span className="wd" data-t="Your Workforce Solution Should Be Too.">Your Workforce Solution Should Be Too.</span></span>
          </span>
        </h1>
        <p className="cx-sub2" style={{ maxWidth: '62ch', fontSize: 'clamp(1.02rem,1.35vw,1.2rem)', marginTop: 'clamp(22px,3.2vh,32px)' }}>
          From finding talent and managing recruitment to simplifying HR operations and shift-based workforce management, explore solutions designed around the way your business works.
        </p>
        <div className="cx-ctas">
          <a className="btn btn-primary" href="#challenges">Explore Solutions <span className="arr" aria-hidden="true">↓</span></a>
          <SolSvLink route="demo" className="btn btn-ghost">Book a Demo <span className="arr" aria-hidden="true">↗</span></SolSvLink>
        </div>
      </div>
      <a className="cx-scroll" href="#challenges">SCROLL TO EXPLORE<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg></a>
    </section>
  );
}

/* ======================================================================
   02 · Choose your workforce challenge (tabs with 3D panel swap)
   ====================================================================== */
const CHALLENGES = [
  { n: '01', title: 'Finding Talent', short: 'We need a better way to discover candidates through referrals.', kicker: 'Finding talent',
    quote: 'We need a better way to discover candidates through referrals.',
    body: 'Open roles need more relevant candidates, and the people around your team often know who would be a great fit. Referral-led hiring can carry your opportunities further through professional and employee networks.',
    prod: { icon: 'refer', name: 'Refer Now', status: 'Launching soon', small: 'Talent discovery & employee referrals' }, href: '#talent-discovery' },
  { n: '02', title: 'Recruitment Operations', short: 'Our hiring activities need better organisation.', kicker: 'Recruitment operations',
    quote: 'Our hiring activities need better organisation.',
    body: 'Requirements, recruiters, candidates and interviews sit in different places, so follow-ups slip and progress is hard to see. One shared recruitment workspace keeps every hiring activity organised.',
    prod: { icon: 'console', name: 'Console', status: 'Available', small: 'Recruitment CRM, ATS & Auto Dialler' }, href: '#recruitment-management' },
  { n: '03', title: 'Employee Management', short: 'Our HR processes need to be simpler.', kicker: 'Employee management',
    quote: 'Our HR processes need to be simpler.',
    body: 'Employee records, attendance, leave and payroll are spread across spreadsheets and separate tools. Bringing them together reduces repetitive administration for your HR team.',
    prod: { icon: 'people', name: 'Seek People', status: 'Available', small: 'HRMS & employee management' }, href: '#employee-management' },
  { n: '04', title: 'Shift-Based Workforce', short: 'We manage employees across changing shifts and locations.', kicker: 'Shift-based workforce',
    quote: 'We manage employees across changing shifts and locations.',
    body: 'Teams work morning, general, evening and rotational shifts, sometimes at more than one location. Keeping schedules and attendance organised needs one clear, shared view.',
    prod: { icon: 'people', name: 'Seek People', status: 'Available', small: 'Attendance, shifts & workforce administration' }, href: '#shift-workforce' },
];

function SolChallenges() {
  const [cur, setCur] = useState(0);
  const [live, setLive] = useState('');
  const curRef = useRef(0);
  const tabRefs = useRef([]);
  const panelRefs = useRef([]);
  const reduce = useRef(false);
  useEffect(() => { reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }, []);

  // panel visibility + enter/leave classes are driven imperatively (same as the original) so the 3D transition is identical
  function show(i, focus) {
    if (focus && tabRefs.current[i]) tabRefs.current[i].focus();
    if (i === curRef.current) return;
    const from = panelRefs.current[curRef.current], to = panelRefs.current[i];
    curRef.current = i;
    setCur(i);
    setLive(CHALLENGES[i].title + ' selected.');
    if (reduce.current) { from.hidden = true; to.hidden = false; return; }
    from.classList.add('leave'); from.hidden = true;
    to.classList.add('enter'); to.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => to.classList.remove('enter')));
    setTimeout(() => from.classList.remove('leave'), 650);
  }
  function onKey(e) {
    const k = e.key, n = CHALLENGES.length, c = curRef.current;
    let i = null;
    if (k === 'ArrowDown' || k === 'ArrowRight') i = (c + 1) % n;
    else if (k === 'ArrowUp' || k === 'ArrowLeft') i = (c + n - 1) % n;
    else if (k === 'Home') i = 0;
    else if (k === 'End') i = n - 1;
    if (i !== null) { e.preventDefault(); show(i, true); }
  }

  return (
    <section className="sv cg wrap" id="challenges" aria-labelledby="cg-title">
      <div className="sv-head">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>What Challenge Are You Solving?</span>
        <h2 className="sv-h2" id="cg-title"><span>Start With the Challenge.</span><span>Discover the Solution.</span></h2>
      </div>
      <div className="cg-wrap">
        <div className="cg-list" role="tablist" aria-label="Workforce challenges" aria-orientation="vertical" onKeyDown={onKey}>
          {CHALLENGES.map((c, i) => (
            <button key={c.n} type="button" className="cg-opt" role="tab" id={`cg-t${i}`} aria-controls={`cg-p${i}`}
              aria-selected={i === cur} tabIndex={i === cur ? 0 : -1} ref={el => (tabRefs.current[i] = el)} onClick={() => show(i)}>
              <span className="n">{c.n}</span><b>{c.title}</b><span>{c.short}</span>
            </button>
          ))}
        </div>
        <div className="cg-stage">
          {CHALLENGES.map((c, i) => (
            <div key={c.n} className="cg-panel" id={`cg-p${i}`} role="tabpanel" aria-labelledby={`cg-t${i}`}
              hidden={i !== 0} ref={el => (panelRefs.current[i] = el)}>
              <span className="cg-big" aria-hidden="true">{c.n}</span>
              <div><p className="sv-num reveal">{c.kicker}</p><p className="cg-q reveal">{c.quote}</p><p className="reveal">{c.body}</p></div>
              <div className="cg-foot reveal">
                <SolProdPill {...c.prod} />
                <a className="btn btn-ghost" href={c.href}>Explore Solution <span className="arr" aria-hidden="true">↓</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="cg-live" id="cg-live" role="status" aria-live="polite">{live}</p>
    </section>
  );
}

/* ======================================================================
   03 · Talent discovery & referrals (connected network)
   ====================================================================== */
const TN_J = [500, 400];
const TN_R = [
  [230, 200, 'AR', 'Ananya R.', 'linear-gradient(135deg,#E2D4FF,#9E84F5)'],
  [770, 180, 'KM', 'Karthik M.', 'linear-gradient(135deg,#B5A3F3,#8660F8)'],
  [215, 610, 'FK', 'Farah K.', 'linear-gradient(135deg,#F3E2C4,#D9B26A)'],
  [790, 625, 'VS', 'Vivek S.', 'linear-gradient(135deg,#FFD1DC,#E5687F)'],
];
const TN_C = [[0, 70, 55, 'NJ'], [0, 360, 40, 'RD'], [1, 640, 40, 'TB'], [1, 935, 90, 'IS'], [2, 60, 760, 'DM'], [2, 370, 770, 'SP'], [3, 940, 760, 'KS']];
const TN_HOT = 2; // highlighted path: role → Karthik M. → candidate TB
const tnCurve = (a, b, bend) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
  return `M${a[0]} ${a[1]} Q${mx - dy * bend} ${my + dx * bend} ${b[0]} ${b[1]}`;
};
const TN_PATHS = [
  ...TN_R.map((r, i) => ({ d: tnCurve(TN_J, r, i % 2 ? 0.12 : -0.12) })),
  ...TN_C.map(c => ({ d: tnCurve(TN_R[c[0]], [c[1], c[2]], 0.1) })),
  { d: tnCurve(TN_J, TN_R[1], 0.12), hot: true },
  { d: tnCurve(TN_R[1], [TN_C[TN_HOT][1], TN_C[TN_HOT][2]], 0.1), hot: true },
];
const TN_CAPS = ['One opportunity', 'Shared through people you trust', 'Reaching new talent', 'A connected path to the right person'];

function SolTalentDiscovery() {
  const trackRef = useRef(null), netRef = useRef(null), ptsRef = useRef(null);

  useScene(trackRef, 210, () => {
    const net = netRef.current;
    const paths = [...net.querySelectorAll('svg path')];
    const jr = paths.slice(0, 4), rc = paths.slice(4, 11), hot = paths.slice(11);
    const job = net.querySelector('.tn-job');
    const rn = [...net.querySelectorAll('.tn-n:not(.c)')], cn = [...net.querySelectorAll('.tn-n.c')];
    const caps = [...net.querySelectorAll('.tn-cap span')];
    const pts = [...ptsRef.current.children];
    const pop = (el, e) => { el.style.setProperty('--o', cl(e * 1.6).toFixed(3)); el.style.setProperty('--s', (0.6 + 0.4 * e).toFixed(3)); };
    function render(p) {
      pop(job, seg(p, 0, 0.12));
      jr.forEach((l, i) => { const a = 0.12 + i * 0.06, e = seg(p, a, a + 0.14); l.style.strokeDashoffset = (1 - e).toFixed(3); pop(rn[i], seg(p, a + 0.1, a + 0.18)); });
      rc.forEach((l, i) => { const a = 0.44 + i * 0.035, e = seg(p, a, a + 0.12); l.style.strokeDashoffset = (1 - e).toFixed(3); pop(cn[i], seg(p, a + 0.09, a + 0.15)); });
      const h = seg(p, 0.8, 0.93);
      hot.forEach((l, i) => { const e = seg(p, 0.8 + i * 0.06, 0.87 + i * 0.06); l.style.strokeDashoffset = (1 - e).toFixed(3); });
      cn[TN_HOT].classList.toggle('hot', h > 0.9);
      const stage = p < 0.12 ? 0 : p < 0.44 ? 1 : p < 0.78 ? 2 : 3;
      pts.forEach((li, i) => li.classList.toggle('on', i <= stage));
      caps.forEach((c, i) => (c.style.opacity = i === stage ? 1 : 0));
    }
    return { render };
  });

  return (
    <section className="sv tn wrap" id="talent-discovery" aria-labelledby="tn-title">
      <div className="sv-track" id="tn-track" ref={trackRef}>
        <div className="sv-sticky">
          <div className="tn-grid">
            <div className="tn-copy">
              <span className="sv-num">Solution 01 / Talent Discovery</span>
              <h2 id="tn-title">Great Opportunities Start With <em>Great Connections.</em></h2>
              <p>Discover the potential of referral-driven hiring, where job opportunities can reach talent through professional and employee networks.</p>
              <h3>The challenges it addresses</h3>
              <ul className="sv-pts" id="tn-pts" ref={ptsRef}>
                <li>Discovering relevant candidates</li>
                <li>Expanding recruitment reach</li>
                <li>Encouraging employee referrals</li>
                <li>Connecting opportunities with potential talent</li>
              </ul>
              <div className="sv-acts">
                <SolProdPill icon="refer" name="Refer Now" status="Launching soon" small="Talent discovery & employee referrals" />
                <SolSvLink route="referNow" className="btn btn-primary">Explore Refer Now <span className="arr" aria-hidden="true">→</span></SolSvLink>
              </div>
            </div>
            <div className="tn-net" id="tn-net" ref={netRef} role="img"
              aria-label="Illustration: one open role is shared with four employees, who each refer candidates from their networks, forming a connected path from opportunity to talent. Fictional names.">
              <svg viewBox="0 0 1000 800" preserveAspectRatio="none" aria-hidden="true" id="tn-svg">
                {TN_PATHS.map((p, i) => (
                  <path key={i} d={p.d} className={p.hot ? 'hot' : undefined} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 }} />
                ))}
              </svg>
              <div className="tn-job" aria-hidden="true"><small>OPEN ROLE</small><b>Product Designer</b><span>Bengaluru · sample</span></div>
              {TN_R.map(r => (
                <div key={r[2]} className="tn-n" aria-hidden="true" style={{ '--x': r[0] / 10 + '%', '--y': r[1] / 8 + '%' }}>
                  <i style={{ '--a': r[4] }}>{r[2]}</i><span><b>{r[3]}</b><small>Shared the role</small></span>
                </div>
              ))}
              {TN_C.map(c => (
                <div key={c[3]} className="tn-n c" aria-hidden="true" style={{ '--x': c[1] / 10 + '%', '--y': c[2] / 8 + '%' }}><i>{c[3]}</i></div>
              ))}
              <p className="sv-cap tn-cap" aria-hidden="true">{TN_CAPS.map(t => <span key={t}>{t}</span>)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   04 · Recruitment management (scattered cards → one workflow)
   ====================================================================== */
const RW_COLS = [
  { n: '01', t: 'Requirement', cards: [['#E5687F', 'Open requirement', 'Software Engineer', '3 openings · Bengaluru'], ['#E5687F', 'Open requirement', 'Sales Executive', '4 openings · Mumbai']] },
  { n: '02', t: 'Screening', cards: [['#B991FF', 'Candidate profile', 'Priya Sharma', 'Screening call completed'], ['#E7C77A', 'Recruiter follow-up', 'Call back Rohit Kumar', 'Today · 4:00 PM']] },
  { n: '03', t: 'Interview', cards: [['#5ED3C8', 'Interview schedule', 'Tue 28 Oct · 11:00', 'Technical round']] },
  { n: '04', t: 'Selection', cards: [['#8AF2BD', 'Selection', 'Priya Sharma', 'Selected']] },
  { n: '05', t: 'Onboarding', cards: [['#C9B0FF', 'Onboarding', 'Joining 17 Nov', 'Documents 2 of 4 received']] },
];

function SolRecruitment() {
  const trackRef = useRef(null), boardRef = useRef(null), railRef = useRef(null), flowRef = useRef(null), c0Ref = useRef(null), c1Ref = useRef(null);

  useScene(trackRef, 210, () => {
    const board = boardRef.current, cards = [...board.querySelectorAll('.rw-card')], heads = [...board.querySelectorAll('h3')];
    const rail = railRef.current, flow = flowRef.current, c0 = c0Ref.current, c1 = c1Ref.current;
    // where each card starts: scattered across the stage (fractions of board width / height) with a slight tilt
    const SCATTER = [[0.58, 0.62, -7], [0.08, 0.9, 5], [0.86, 0.08, 6], [0.3, 0.02, -4], [0.66, 1.0, 4], [0.02, 0.32, -6], [0.44, 0.4, 3]];
    let F = [];
    function layout() {
      cards.forEach(c => (c.style.transform = ''));
      const b = board.getBoundingClientRect();
      F = cards.map((c, k) => {
        const r = c.getBoundingClientRect(), [sx, sy, rot] = SCATTER[k];
        return { dx: sx * (b.width - r.width) - (r.left - b.left), dy: sy * Math.max(b.height, 300) - (r.top - b.top) - 20, rot };
      });
    }
    function render(p, st) {
      cards.forEach((c, k) => {
        const e = st ? 1 : seg(p, 0.16 + 0.055 * k, 0.52 + 0.055 * k), f = F[k] || { dx: 0, dy: 0, rot: 0 };
        c.style.transform = e >= 1 ? '' : `translate3d(${(f.dx * (1 - e)).toFixed(1)}px,${(f.dy * (1 - e)).toFixed(1)}px,0) rotate(${(f.rot * (1 - e)).toFixed(2)}deg)`;
        c.style.setProperty('--k', e.toFixed(3));
      });
      const h = st ? 1 : seg(p, 0.58, 0.82);
      heads.forEach((hd, i) => hd.style.setProperty('--ho', (st ? 1 : seg(p, 0.58 + i * 0.04, 0.72 + i * 0.04)).toFixed(3)));
      rail.style.setProperty('--rl', h.toFixed(3));
      flow.style.setProperty('--fo', (st ? 1 : seg(p, 0.82, 0.95)).toFixed(3));
      c0.style.opacity = st ? 0 : p < 0.5 ? 1 : 0;
      c1.style.opacity = st || p >= 0.5 ? 1 : 0;
    }
    return { render, layout };
  });

  return (
    <section className="sv rw wrap" id="recruitment-management" aria-labelledby="rw-title">
      <div className="sv-head">
        <span className="sv-num">Solution 02 / Recruitment Management</span>
        <h2 className="sv-h2" id="rw-title"><span>Make Every Hiring Activity Count.</span></h2>
        <p className="sv-lede">Bring structure to recruitment requirements, recruiter coordination, candidate screening, interviews and onboarding.</p>
        <p className="rw-scn">Picture a company or recruitment consultancy handling several hiring requirements at once: open positions, recruiters, candidates, screening calls, interviews, selections and joining dates, all needing to move together.</p>
        <div className="sv-acts">
          <SolProdPill icon="console" name="Console" status="Available" small="Recruitment CRM, ATS & Auto Dialler" />
          <SolSvLink route="console" className="btn btn-primary">Explore Console <span className="arr" aria-hidden="true">→</span></SolSvLink>
        </div>
      </div>
      <div className="sv-track" id="rw-track" ref={trackRef}>
        <div className="sv-sticky">
          <div className="rw-stagew">
            <p className="sv-cap" aria-hidden="true"><span ref={c0Ref}>Before · Disconnected hiring activities</span><span ref={c1Ref}>After · One connected hiring process</span></p>
            <div className="rw-boardw"><span className="rw-rail" aria-hidden="true" ref={railRef} />
              <ol className="rw-board" id="rw-board" ref={boardRef} aria-label="Recruitment workflow with sample activities">
                {RW_COLS.map(col => (
                  <li className="rw-col" key={col.n}>
                    <h3><b>{col.n}</b>{col.t}</h3>
                    {col.cards.map(([c, s, b, sp]) => (
                      <div className="rw-card" key={s + b} style={{ '--c': c }}><small>{s}</small><b>{b}</b><span>{sp}</span></div>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
            <p className="rw-flow" id="rw-flow" ref={flowRef}>
              Requirement<i aria-hidden="true">→</i>Screening<i aria-hidden="true">→</i>Interview<i aria-hidden="true">→</i>Selection<i aria-hidden="true">→</i>Onboarding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   05 · Employee management (panels converge on a hub)
   ====================================================================== */
const HP = [
  { id: 'info', dir: '-1,-1', c: 'linear-gradient(140deg,#8B6CF6,#5B3BD1)', t: 'Employee Information', p: 'Records, roles and joining details in one place.',
    ic: <><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M8 17c.8-2 2.2-3 4-3s3.2 1 4 3" /></> },
  { id: 'att', dir: '-1,0', c: 'linear-gradient(140deg,#3FBF7F,#1F8A5B)', t: 'Attendance Administration', p: 'Check-ins, working hours and attendance records.',
    ic: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></> },
  { id: 'leave', dir: '-1,1', c: 'linear-gradient(140deg,#E5687F,#B23A55)', t: 'Leave Requests', p: 'Balances, applications and approval status.',
    ic: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></> },
  { id: 'pay', dir: '1,-1', c: 'linear-gradient(140deg,#F0643C,#B8431F)', t: 'Payroll Coordination', p: 'Salary components, deductions and payroll records.',
    ic: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 15h2" /></> },
  { id: 'reimb', dir: '1,0', c: 'linear-gradient(140deg,#F2C230,#B88F14)', t: 'Reimbursements', p: 'Employee claims and their status.',
    ic: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></> },
  { id: 'ess', dir: '1,1', c: 'linear-gradient(140deg,#4C7DFF,#2F55C4)', t: 'Employee Self-Service', p: 'Payslips, leave and attendance on the mobile app.',
    ic: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></> },
];

function SolEmployeeManagement() {
  const trackRef = useRef(null), gridRef = useRef(null), svgRef = useRef(null), hubRef = useRef(null), outRef = useRef(null);

  useScene(trackRef, 200, () => {
    const grid = gridRef.current, svg = svgRef.current, hub = hubRef.current, out = outRef.current;
    const panels = [...grid.querySelectorAll('.hp-p')];
    const NS = 'http://www.w3.org/2000/svg';
    let spokes = [], cross = [];
    function mk(d, cls) {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d); if (cls) p.setAttribute('class', cls);
      p.setAttribute('pathLength', 1);
      p.style.strokeDasharray = cls ? '' : 1; p.style.strokeDashoffset = cls ? '' : 1;
      svg.appendChild(p); return p;
    }
    function layout(st) {
      panels.forEach(p => (p.style.transform = ''));
      svg.innerHTML = ''; spokes = []; cross = [];
      if (st) return;
      const g = grid.getBoundingClientRect(), h = hub.getBoundingClientRect();
      const hc = [h.left - g.left + h.width / 2, h.top - g.top + h.height / 2], hr = h.width / 2;
      spokes = panels.map(p => {
        const r = p.getBoundingClientRect(), side = +p.dataset.dir.split(',')[0];
        const ex = side < 0 ? r.right - g.left : r.left - g.left, ey = r.top - g.top + r.height / 2;
        const ang = Math.atan2(ey - hc[1], ex - hc[0]), sx = hc[0] + Math.cos(ang) * hr, sy = hc[1] + Math.sin(ang) * hr;
        return mk(`M${sx.toFixed(1)} ${sy.toFixed(1)} C${((sx + ex) / 2).toFixed(1)} ${sy.toFixed(1)} ${((sx + ex) / 2).toFixed(1)} ${ey.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
      });
      // a ring around the hub: every panel is now part of one connected structure
      cross.push(mk(`M${(hc[0] + hr + 16).toFixed(1)} ${hc[1].toFixed(1)} a${(hr + 16).toFixed(1)} ${(hr + 16).toFixed(1)} 0 1 0 ${(-2 * (hr + 16)).toFixed(1)} 0 a${(hr + 16).toFixed(1)} ${(hr + 16).toFixed(1)} 0 1 0 ${(2 * (hr + 16)).toFixed(1)} 0`, 'x'));
    }
    function render(p, st) {
      panels.forEach((el, k) => {
        const [dx, dy] = el.dataset.dir.split(',').map(Number), e = st ? 1 : seg(p, 0.1 + 0.05 * (k % 3), 0.48 + 0.05 * (k % 3)), q = 1 - e;
        el.style.transform = e >= 1 ? '' : `translate3d(${(dx * 120 * q).toFixed(1)}px,${(dy * 70 * q).toFixed(1)}px,${(-260 * q).toFixed(0)}px) rotateY(${(dx * -16 * q).toFixed(2)}deg)`;
        el.style.setProperty('--o', (st ? 1 : 0.35 + 0.65 * e).toFixed(3)); el.style.setProperty('--k', e.toFixed(3));
      });
      spokes.forEach((s, k) => { const e = seg(p, 0.5 + 0.03 * k, 0.7 + 0.03 * k); s.style.strokeDashoffset = (1 - e).toFixed(3); });
      cross.forEach(c => {
        const e = seg(p, 0.72, 0.9);
        c.style.opacity = e.toFixed(3); c.style.transform = `rotate(${(-40 * (1 - e)).toFixed(1)}deg)`;
        c.style.transformOrigin = 'center'; c.style.transformBox = 'fill-box';
      });
      hub.style.setProperty('--hg', (st ? 1 : seg(p, 0.55, 0.9)).toFixed(3));
      hub.style.setProperty('--hs', (st ? 1 : 0.86 + 0.14 * seg(p, 0, 0.4)).toFixed(3));
      out.style.setProperty('--fo', (st ? 1 : seg(p, 0.85, 0.97)).toFixed(3));
    }
    return { render, layout, cleanup: () => { svg.innerHTML = ''; } };
  });

  const panel = d => (
    <li key={d.id} className="hp-p" data-dir={d.dir} data-id={d.id}>
      <i style={{ '--c': d.c }} aria-hidden="true"><svg viewBox="0 0 24 24">{d.ic}</svg></i>
      <div><h3>{d.t}</h3><p>{d.p}</p></div>
    </li>
  );

  return (
    <section className="sv hp wrap" id="employee-management" aria-labelledby="hp-title">
      <div className="sv-head">
        <span className="sv-num">Solution 03 / Employee Management</span>
        <h2 className="sv-h2" id="hp-title"><span>Less Administration.</span><span>More Room for People.</span></h2>
        <p className="sv-lede">Bring everyday HR activities together with organised employee records, attendance, leave, payroll and employee self-service.</p>
        <p className="hp-scn">An HR team supports employees across departments and different work schedules, and every one of these responsibilities depends on the others.</p>
        <div className="sv-acts">
          <SolProdPill icon="people" name="Seek People" status="Available" small="HRMS & employee management" />
          <SolSvLink route="seekPeople" className="btn btn-primary">Explore Seek People <span className="arr" aria-hidden="true">→</span></SolSvLink>
        </div>
      </div>
      <div className="sv-track" id="hp-track" ref={trackRef}>
        <div className="sv-sticky">
          <div className="hp-stage">
            <div className="hp-grid" id="hp-grid" ref={gridRef}>
              <svg className="hp-links" id="hp-links" ref={svgRef} aria-hidden="true" />
              <ul className="hp-col">{HP.slice(0, 3).map(panel)}</ul>
              <div className="hp-hub" id="hp-hub" ref={hubRef}>
                <i aria-hidden="true"><SolIcon type="people" /></i><b>Seek People</b><small>One place for people operations</small>
              </div>
              <ul className="hp-col">{HP.slice(3).map(panel)}</ul>
            </div>
            <p className="hp-out" id="hp-out" ref={outRef}>Employee data, attendance, leave and payroll, connected</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   06 · Distributed & shift-based workforce (shift timeline)
   ====================================================================== */
const G = { amber: 'linear-gradient(135deg,#FFE3B8,#F5A04A)', lav: 'linear-gradient(135deg,#E2D4FF,#9E84F5)', teal: 'linear-gradient(135deg,#C9F0EA,#5ED3C8)', rose: 'linear-gradient(135deg,#FFD1DC,#E5687F)' };
const SH_ROWS = [
  { g: 0, was: 4, i: 'NK', n: 'Neha K.', a: G.amber, bars: [['25%', '33.333%', '#F5C542', 'Morning 06–14']] },
  { g: 0, was: 1, i: 'IS', n: 'Imran S.', a: G.amber, bars: [['25%', '33.333%', '#F5C542', 'Morning 06–14']] },
  { g: 1, was: 6, i: 'AR', n: 'Ananya R.', a: G.lav, bars: [['37.5%', '37.5%', '#B991FF', 'General 09–18']] },
  { g: 1, was: 0, i: 'DM', n: 'Divya M.', a: G.lav, bars: [['37.5%', '37.5%', '#B991FF', 'General 09–18']] },
  { g: 1, was: 3, i: 'RD', n: 'Rohan D.', a: G.lav, bars: [['37.5%', '37.5%', '#B991FF', 'General 09–18']] },
  { g: 2, was: 7, i: 'KS', n: 'Kabir S.', a: G.teal, bars: [['58.333%', '33.333%', '#5ED3C8', 'Evening 14–22']] },
  { g: 2, was: 2, i: 'TB', n: 'Tara B.', a: G.teal, bars: [['58.333%', '33.333%', '#5ED3C8', 'Evening 14–22']] },
  { g: 3, was: 5, i: 'VS', n: 'Vivek S.', a: G.rose, bars: [['0%', '25%', '#E5687F', 'Rotational'], ['91.667%', '8.333%', '#E5687F', '']] },
];
const SH_SUM = [
  ['#F5C542', 'Morning shift', '06:00 – 14:00 · ', '2 employees', ' · 2 checked in'],
  ['#B991FF', 'General shift', '09:00 – 18:00 · ', '3 employees', ' · 2 checked in, 1 on leave'],
  ['#5ED3C8', 'Evening shift', '14:00 – 22:00 · ', '2 employees', ' · starts later today'],
  ['#E5687F', 'Rotational shift', '22:00 – 06:00 this week · ', '1 employee', ' · checked out'],
];
const SH_HOURS = [0, 3, 6, 9, 12, 15, 18, 21, 24];

function SolShiftWorkforce() {
  const trackRef = useRef(null), rowsRef = useRef(null), sumRef = useRef(null);

  useScene(trackRef, 210, () => {
    const rowsEl = rowsRef.current, rows = [...rowsEl.querySelectorAll('.sh-row')], sums = [...sumRef.current.children];
    const NAMES = ['Morning', 'General', 'Evening', 'Rotational'];
    let bands = [], H = 40;
    const clearBands = () => { bands.forEach(b => b.remove()); bands = []; };
    function layout() {
      clearBands();
      H = rows[0].offsetHeight;
      // group bands behind the final (grouped) order
      const groups = {};
      rows.forEach((r, i) => { const g = r.dataset.g; (groups[g] = groups[g] || []).push(i); });
      Object.entries(groups).forEach(([g, idx]) => {
        const b = document.createElement('li');
        b.className = 'sh-band'; b.setAttribute('aria-hidden', 'true');
        b.style.top = 6 + idx[0] * H + 2 + 'px'; b.style.height = idx.length * H - 4 + 'px';
        b.innerHTML = `<em>${NAMES[g]}</em>`;
        rowsEl.insertBefore(b, rowsEl.firstChild); bands.push(b);
      });
    }
    function render(p, st) {
      rows.forEach((r, i) => {
        const g = st ? 1 : seg(p, 0.1 + 0.035 * i, 0.36 + 0.035 * i);
        r.querySelectorAll('.sh-b').forEach(b => b.style.setProperty('--g', g.toFixed(3)));
        const m = st ? 1 : seg(p, 0.5, 0.7), was = +r.dataset.was;
        r.style.transform = m >= 1 ? '' : `translate3d(0,${((was - i) * H * (1 - m)).toFixed(1)}px,0)`;
      });
      bands.forEach(b => b.style.setProperty('--bo', (st ? 1 : seg(p, 0.64, 0.78)).toFixed(3)));
      sums.forEach((s, k) => s.style.setProperty('--o', (st ? 1 : seg(p, 0.76 + 0.04 * k, 0.88 + 0.04 * k)).toFixed(3)));
    }
    return { render, layout, cleanup: clearBands };
  });

  return (
    <section className="sv sh wrap" id="shift-workforce" aria-labelledby="sh-title">
      <div className="sv-head">
        <span className="sv-num">Solution 04 / Shift Workforce</span>
        <h2 className="sv-h2" id="sh-title"><span>Different Shifts.</span><span>One Clearer Way to Work.</span></h2>
        <p className="sv-lede">Support the administration of employees working across different schedules, shifts and locations.</p>
        <div className="sv-acts">
          <SolProdPill icon="people" name="Seek People" status="Available" small="Attendance, shifts & workforce administration" />
          <SolSvLink route="seekPeople" className="btn btn-primary">Explore Workforce Management <span className="arr" aria-hidden="true">→</span></SolSvLink>
        </div>
        <p className="sh-also">Also hiring for these shifts? <SolSvLink route="console">Console</SolSvLink> can support your recruitment management alongside Seek People.</p>
      </div>
      <div className="sv-track" id="sh-track" ref={trackRef}>
        <div className="sv-sticky">
          <div className="sh-card">
            <div className="sh-top"><b>Today’s shift schedule</b><small>Illustrative example · fictional employees · Bengaluru &amp; Pune sites</small></div>
            <div className="sh-tl" id="sh-tl">
              <div className="sh-hours" aria-hidden="true">
                {SH_HOURS.map((h, i) => <span key={h} style={{ '--x': i * 12.5 + '%' }}>{String(h).padStart(2, '0')}</span>)}
              </div>
              <span className="sh-grid" aria-hidden="true" />
              <ol className="sh-rows" id="sh-rows" ref={rowsRef} aria-label="Sample schedule grouped by shift">
                {SH_ROWS.map(r => (
                  <li className="sh-row" key={r.n} data-g={r.g} data-was={r.was}>
                    <span><i style={{ '--a': r.a }} aria-hidden="true">{r.i}</i>{r.n}</span>
                    <div className="sh-bar">
                      {r.bars.map((b, k) => <span key={k} className="sh-b" style={{ '--x': b[0], '--w': b[1], '--c': b[2] }}>{b[3]}</span>)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <ul className="sh-sum" id="sh-sum" ref={sumRef} aria-label="Shift summary for the sample day">
              {SH_SUM.map(s => (
                <li key={s[1]} style={{ '--c': s[0] }}><h3>{s[1]}</h3><p>{s[2]}<b>{s[3]}</b>{s[4]}</p></li>
              ))}
            </ul>
            <p className="sh-note">Shift times and attendance shown together for illustration. Schedules are set up by your team.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   07 · Find your Seek Now setup (needs → applications)
   ====================================================================== */
const FS_APPS = {
  referNow: { name: 'Refer Now', href: ROUTES.referNow, status: 'Launching soon', reason: () => 'Referral-led talent discovery, so your open roles can reach candidates through professional and employee networks.' },
  console: { name: 'Console', href: ROUTES.console, status: 'Available', reason: () => 'One workspace for hiring requirements, recruiters, screening, interviews and onboarding.' },
  seekPeople: { name: 'Seek People', href: ROUTES.seekPeople, status: 'Available', reason: w => `Covers ${w.length > 1 ? w.slice(0, -1).join(', ') + ', plus ' + w[w.length - 1] : w[0]} for your HR team and employees.` },
};
const FS_ORDER = ['referNow', 'console', 'seekPeople'];
const FS_NEEDS = [
  { app: 'referNow', label: 'Employee Referrals & Talent Discovery' },
  { app: 'console', label: 'Recruitment Management' },
  { app: 'seekPeople', what: 'attendance and leave', label: 'Attendance & Leave' },
  { app: 'seekPeople', what: 'payroll and employee administration', label: 'Payroll & Employee Administration' },
  { app: 'seekPeople', what: 'shift-based workforce management', label: 'Shift-Based Workforce Management' },
];
const FS_APP_VIEW = [
  { key: 'referNow', icon: 'refer', name: 'Refer Now', small: <>Talent discovery · <span className="sv-soon" style={{ margin: 0 }}>Launching soon</span></> },
  { key: 'console', icon: 'console', name: 'Console', small: 'Recruitment management' },
  { key: 'seekPeople', icon: 'people', name: 'Seek People', small: 'Employee management & HRMS' },
];

function SolFindSetup() {
  const [sel, setSel] = useState(() => FS_NEEDS.map(() => false));
  const [ver, setVer] = useState(0);
  const boardRef = useRef(null), svgRef = useRef(null), needRefs = useRef([]), appRefs = useRef({}), pathRefs = useRef([]);

  const picked = FS_ORDER.filter(k => FS_NEEDS.some((n, i) => sel[i] && n.app === k));
  const what = FS_NEEDS.filter((n, i) => sel[i] && n.app === 'seekPeople').map(n => n.what);

  // connector curves are measured from the DOM and re-measured on resize / font load
  useEffect(() => {
    function geo() {
      const board = boardRef.current, svg = svgRef.current; if (!board || !svg) return;
      const b = board.getBoundingClientRect();
      svg.querySelector('linearGradient').setAttribute('x2', b.width);
      FS_NEEDS.forEach((n, i) => {
        const r = needRefs.current[i].getBoundingClientRect(), a = appRefs.current[n.app].getBoundingClientRect();
        const x1 = r.right - b.left, y1 = r.top - b.top + r.height / 2, x2 = a.left - b.left + 6, y2 = a.top - b.top + a.height / 2, mx = (x1 + x2) / 2;
        pathRefs.current[i].setAttribute('d', `M${x1.toFixed(1)} ${y1.toFixed(1)} C${mx.toFixed(1)} ${y1.toFixed(1)} ${mx.toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
      });
    }
    geo();
    let rt = 0;
    const onR = () => { clearTimeout(rt); rt = setTimeout(geo, 120); };
    window.addEventListener('resize', onR);
    if (document.fonts) document.fonts.ready.then(geo);
    return () => { window.removeEventListener('resize', onR); clearTimeout(rt); };
  }, []);

  const toggle = i => { setSel(s => s.map((v, j) => (j === i ? !v : v))); setVer(v => v + 1); };
  const goHref = !picked.length ? '#' : picked.length === 1 ? FS_APPS[picked[0]].href : ROUTES.pricing;

  return (
    <section className="sv fs wrap" id="find-your-solution" aria-labelledby="fs-title">
      <div className="sv-head">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>Your Business. Your Setup.</span>
        <h2 className="sv-h2" id="fs-title"><span>Build the Workforce Setup</span><span>That Fits You.</span></h2>
        <p className="sv-lede">Choose what your business needs. We’ll show you the Seek Now applications that can support it.</p>
      </div>
      <div className="fs-board" id="fs-board" ref={boardRef}>
        <svg className="fs-lines" id="fs-lines" ref={svgRef} aria-hidden="true">
          <defs><linearGradient id="fs-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0"><stop offset="0" stopColor="#8660F8" /><stop offset="1" stopColor="#E3D6FF" /></linearGradient></defs>
          {FS_NEEDS.map((n, i) => (
            <path key={i} ref={el => (pathRefs.current[i] = el)} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: sel[i] ? 0 : 1 }} />
          ))}
        </svg>
        <ul className="fs-needs" aria-label="Select your needs">
          {FS_NEEDS.map((n, i) => (
            <li key={n.label}>
              <button type="button" className="fs-need" aria-pressed={sel[i]} ref={el => (needRefs.current[i] = el)} onClick={() => toggle(i)}>
                <span className="bx" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>{n.label}
              </button>
            </li>
          ))}
        </ul>
        <ul className="fs-apps" aria-label="Seek Now applications">
          {FS_APP_VIEW.map(a => (
            <li key={a.key} className={'fs-app' + (picked.includes(a.key) ? ' on' : '')} ref={el => (appRefs.current[a.key] = el)}>
              <i aria-hidden="true"><SolIcon type={a.icon} /></i>
              <span><b>{a.name}</b><small>{a.small}</small></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="fs-rec" aria-live="polite">
        <h3 id="fs-rt">{picked.length ? (picked.length === 1 ? 'Your recommended application' : `Your recommended setup: ${picked.length} applications`) : 'Select one or more needs to see your setup.'}</h3>
        <p id="fs-rs">{picked.length ? (picked.includes('referNow') ? 'Refer Now is launching soon. The others are available today.' : 'Pricing is per user for each application, with every standard feature included.') : 'Each need maps to the Seek Now application built for it.'}</p>
        <ul className="fs-list" id="fs-list">
          {picked.map(k => {
            const A = FS_APPS[k];
            return (
              <li key={k + ver}>
                <b>{A.name}</b> <span className={A.status === 'Available' ? 'sv-live' : 'sv-soon'}>{A.status}</span>
                <p>{A.reason(what)}</p>
                <a href={A.href}>Explore {A.name} →</a>
              </li>
            );
          })}
        </ul>
        <div className="fs-cta">
          <a className="btn btn-primary" id="fs-go" href={goHref} aria-disabled={picked.length ? undefined : 'true'} tabIndex={picked.length ? 0 : -1}
            onClick={e => { if (!picked.length) e.preventDefault(); }}>Explore Your Setup <span className="arr" aria-hidden="true">→</span></a>
          <SolSvLink route="demo" className="btn btn-ghost">Book a Demo <span className="arr" aria-hidden="true">↗</span></SolSvLink>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   08 · Cinematic final CTA
   ====================================================================== */
function SolFinalCta() {
  const ref = useRef(null);
  useEffect(() => {
    const s = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || s.getBoundingClientRect().top < window.innerHeight * 0.8) return;
    s.classList.add('wait');
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { s.classList.remove('wait'); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(s.querySelector('.svf-in'));
    return () => io.disconnect();
  }, []);

  return (
    <section className="svf wrap" id="solutions-demo" aria-labelledby="svf-title" ref={ref}>
      <div className="svf-bg" aria-hidden="true"><i /></div>
      <div className="svf-in">
        <span className="eyebrow" style={{ display: 'flex', justifyContent: 'center' }}>Let’s Build a Better Way to Work</span>
        <h2 className="svf-h2" id="svf-title"><span className="ln"><span>Your Workforce Challenges.</span></span><span className="ln"><span>Our Next Conversation.</span></span></h2>
        <p className="svf-p">Explore how Seek Now can support your organisation’s talent discovery, recruitment and people management needs.</p>
        <div className="svf-cta">
          <SolSvLink route="demo" className="btn btn-primary">Book a Demo <span className="arr" aria-hidden="true">→</span></SolSvLink>
          <SolSvLink route="products" className="btn btn-ghost">Explore Our Products <span className="arr" aria-hidden="true">↗</span></SolSvLink>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   Page
   ====================================================================== */
export default function Solution() {
  useEffect(() => {
    document.title = 'Workforce Management Solutions | Seek Now';
    // same-page anchors scroll smoothly
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onClick = e => {
      const a = e.target.closest && e.target.closest('a[href^="#"]:not([href="#"])'); if (!a) return;
      const t = document.getElementById(a.getAttribute('href').slice(1)); if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', a.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <SolHero />
        <SolChallenges />
        <SolTalentDiscovery />
        <SolRecruitment />
        <SolEmployeeManagement />
        <SolShiftWorkforce />
        <SolFindSetup />
        <SolFinalCta />
      </main>
      <Footer />
    </>
  );
}