import { useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import './refer-now.css';

const ROLES = [
  { value: 'job_seeker', title: 'Job Seeker', description: 'Find opportunities', icon: 'search' },
  { value: 'referrer', title: 'Referrer', description: 'Recommend people you know', icon: 'network' },
  { value: 'employer', title: 'Employer / Recruiter', description: 'Hire through referrals', icon: 'case' },
];

function RoleIcon({ type }) {
  if (type === 'search') {
    return <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></>;
  }
  if (type === 'network') {
    return <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.3 11 7.4-3.8M8.3 13l7.4 3.8" /></>;
  }
  return <><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 12h16" /></>;
}

function RoleChoice({ role, value, onChange }) {
  return (
    <label className="rn-role">
      <input type="radio" name="interest" value={role.value} checked={value === role.value} onChange={onChange} required />
      <span className="rn-role-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><RoleIcon type={role.icon} /></svg></span>
      <b>{role.title}</b>
      <small>{role.description}</small>
    </label>
  );
}

function EarlyAccessForm() {
  const [form, setForm] = useState({ fullName: '', email: '', interest: '', company: '', productUpdates: false });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('');
  const errors = {
    fullName: form.fullName.trim().length >= 2 ? '' : 'Enter your full name.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? '' : 'Enter a valid email address, like name@example.com.',
    interest: form.interest ? '' : 'Choose how you’re interested in Refer Now.',
  };

  function update(event) {
    const { name, value, type, checked } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setStatus('');
  }

  function submit(event) {
    event.preventDefault();
    setTouched({ fullName: true, email: true, interest: true });
    const firstInvalid = Object.keys(errors).find((field) => errors[field]);
    if (firstInvalid) {
      const target = firstInvalid === 'interest'
        ? event.currentTarget.querySelector('input[name="interest"]')
        : event.currentTarget.elements.namedItem(firstInvalid);
      target?.focus();
      setStatus('');
      return;
    }
    setStatus('This preview isn’t connected to a sign-up service yet, so your details were not sent or saved.');
  }

  return (
    <div className="rn-card">
      <form className="rn-form" noValidate onSubmit={submit}>
        <div className="rn-field">
          <label htmlFor="rn-name">Full name<span className="rn-required">Required</span></label>
          <input
            id="rn-name" className="rn-input" name="fullName" type="text" autoComplete="name"
            maxLength="100" placeholder="Your full name" required
            aria-describedby="rn-name-error" aria-invalid={touched.fullName && !!errors.fullName}
            value={form.fullName} onChange={update}
            onBlur={() => setTouched((current) => ({ ...current, fullName: true }))}
          />
          <p className="rn-error" id="rn-name-error">{touched.fullName ? errors.fullName : ''}</p>
        </div>
        <div className="rn-field">
          <label htmlFor="rn-email">Email address<span className="rn-required">Required</span></label>
          <input
            id="rn-email" className="rn-input" name="email" type="email" autoComplete="email"
            inputMode="email" maxLength="160" placeholder="name@example.com" required
            aria-describedby="rn-email-error" aria-invalid={touched.email && !!errors.email}
            value={form.email} onChange={update}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          />
          <p className="rn-error" id="rn-email-error">{touched.email ? errors.email : ''}</p>
        </div>
        <fieldset className="rn-roles" aria-describedby="rn-role-error" aria-invalid={touched.interest && !!errors.interest}>
          <legend>Interested as<span className="rn-required">Required</span></legend>
          <div className="rn-roles-grid">
            {ROLES.map((role) => <RoleChoice key={role.value} role={role} value={form.interest} onChange={update} />)}
          </div>
          <p className="rn-error" id="rn-role-error">{touched.interest ? errors.interest : ''}</p>
        </fieldset>
        {form.interest === 'employer' && (
          <div className="rn-field">
            <label htmlFor="rn-company">Company name<span className="rn-optional">Optional</span></label>
            <input id="rn-company" className="rn-input" name="company" type="text" autoComplete="organization" maxLength="120" placeholder="Your company" value={form.company} onChange={update} />
          </div>
        )}
        <div className="rn-honeypot" aria-hidden="true">
          <label htmlFor="rn-website">Leave this field empty</label>
          <input id="rn-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
        </div>
        <p className="rn-purpose">By joining, you’ll receive emails about Refer Now’s launch and availability.</p>
        <label className="rn-checkbox">
          <input type="checkbox" name="productUpdates" checked={form.productUpdates} onChange={update} />
          <span>Also send me occasional Seek Now product updates. <span className="rn-optional">Optional</span></span>
        </label>
        <p className="rn-dev"><span className="rn-dev-pill">Not connected</span><span>This form isn’t linked to a sign-up service yet, so nothing is sent or saved.</span></p>
        <p className={`rn-status${status ? ' rn-status-info' : ''}`} role="status" aria-live="polite">{status}</p>
        <button type="submit" className="btn btn-primary rn-submit">Join the Early Access List <span className="arr" aria-hidden="true">→</span></button>
        <p className="rn-legal">We’ll only use your details to share Refer Now launch updates. Product updates are optional.</p>
      </form>
    </div>
  );
}

function ReferralDiagram({ reducedMotion }) {
  const [pulsesStarted, setPulsesStarted] = useState(false);
  const diagramRef = useRef(null);
  const pulsePaths = [
    ['referrer', '0s'], ['talent-one', '.9s'], ['talent-two', '1.3s'],
    ['talent-three', '1.7s'], ['talent-four', '2.1s'],
  ];
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || reducedMotion) return undefined;
    if (!('IntersectionObserver' in window)) {
      setPulsesStarted(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPulsesStarted(true);
        observer.disconnect();
      }
    }, { threshold: .25 });
    observer.observe(diagram);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <figure className="rn-diagram" ref={diagramRef} aria-label="Conceptual illustration of a referral network">
      <svg viewBox="0 0 600 420" role="img" aria-labelledby="rn-diagram-title">
        <title id="rn-diagram-title">A referrer connects an opportunity to potential talent.</title>
        <defs>
          <linearGradient id="rn-line" x1="0" x2="1"><stop offset="0" stopColor="#8660F8" /><stop offset="1" stopColor="#C9B0FF" /></linearGradient>
          <radialGradient id="rn-node" cx=".35" cy=".3"><stop offset="0" stopColor="#D9C6FF" /><stop offset="1" stopColor="#6E48EA" /></radialGradient>
          <radialGradient id="rn-soft" cx=".35" cy=".3"><stop offset="0" stopColor="#3B2463" /><stop offset="1" stopColor="#1E0F38" /></radialGradient>
        </defs>
        <path id="referrer" className="rn-link" pathLength="1" style={{ '--delay': '.35s' }} d="M112 204C150 176 168 232 200 210" />
        <path id="talent-one" className="rn-link" pathLength="1" style={{ '--delay': '1.15s' }} d="M376 198C432 198 446 84 484 84" />
        <path id="talent-two" className="rn-link" pathLength="1" style={{ '--delay': '1.25s' }} d="M376 205C440 205 456 172 502 172" />
        <path id="talent-three" className="rn-link" pathLength="1" style={{ '--delay': '1.35s' }} d="M376 215C440 215 456 252 502 252" />
        <path id="talent-four" className="rn-link" pathLength="1" style={{ '--delay': '1.45s' }} d="M376 222C432 222 446 340 484 340" />
        <path className="rn-link rn-link-thin" pathLength="1" style={{ '--delay': '2s' }} d="M516 80C540 72 548 52 566 48" />
        <path className="rn-link rn-link-thin" pathLength="1" style={{ '--delay': '2.05s' }} d="M516 88C540 96 552 112 570 116" />
        <path className="rn-link rn-link-thin" pathLength="1" style={{ '--delay': '2.1s' }} d="M516 336C540 326 550 310 568 306" />
        <path className="rn-link rn-link-thin" pathLength="1" style={{ '--delay': '2.15s' }} d="M516 344C540 352 552 368 570 372" />
        <g className="rn-node" style={{ '--delay': '0s' }}>
          <circle cx="80" cy="210" r="31" fill="url(#rn-node)" stroke="rgba(225,210,255,.6)" />
          <circle cx="80" cy="201" r="7.5" fill="#1A0B2C" /><path d="M65 226c3-8 8.5-11.5 15-11.5s12 3.5 15 11.5" fill="#1A0B2C" />
          <text x="80" y="266" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">Referrer</text>
        </g>
        <g className="rn-node" style={{ '--delay': '.8s' }}>
          <rect x="200" y="164" width="176" height="92" rx="16" fill="#1C0D33" stroke="rgba(185,145,255,.55)" />
          <text className="rn-mono" x="218" y="190" fontSize="9.5" fill="#B991FF">OPPORTUNITY</text>
          <text x="218" y="215" fontSize="15.5" fontWeight="700" fill="#fff">Product Designer</text>
          <text x="218" y="237" fontSize="12" fill="#AA98C8">Sample role · Full-time</text>
          <circle cx="356" cy="186" r="5" fill="#B991FF" />
        </g>
        {[[500,84],[518,172],[518,252],[500,340]].map(([x,y], index) => (
          <g className="rn-node" style={{ '--delay': `${1.6 + index * .1}s` }} key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="16" fill="url(#rn-node)" /><circle cx={x} cy={y - 5} r="4.5" fill="#1A0B2C" />
            <path d={`M${x - 9} ${y + 10}c2-5 5-7 9-7s7 2 9 7`} fill="#1A0B2C" />
          </g>
        ))}
        <g className="rn-node" style={{ '--delay': '2.3s' }}>
          <circle cx="570" cy="46" r="7" fill="url(#rn-soft)" stroke="#B991FF" /><circle cx="574" cy="118" r="7" fill="url(#rn-soft)" stroke="#B991FF" />
          <circle cx="572" cy="304" r="7" fill="url(#rn-soft)" stroke="#B991FF" /><circle cx="574" cy="374" r="7" fill="url(#rn-soft)" stroke="#B991FF" />
        </g>
        <g className="rn-node" style={{ '--delay': '2.4s' }}>
          <text x="540" y="214" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#D6C8E8">Potential</text>
          <text x="540" y="230" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#D6C8E8">talent</text>
        </g>
        {!reducedMotion && pulsesStarted && <g aria-hidden="true">{pulsePaths.map(([id, delay]) => (
          <circle key={id} className="rn-pulse" r="3.5" opacity="0">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin={`2.4s + ${delay}`}><mpath href={`#${id}`} /></animateMotion>
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="3.2s" repeatCount="indefinite" begin={`2.4s + ${delay}`} />
          </circle>
        ))}</g>}
      </svg>
      <figcaption>Conceptual illustration · no real people or data</figcaption>
    </figure>
  );
}

function ReferralCanvas({ paused, reducedMotion, onToggle }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const hubRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const hubElement = hubRef.current;
    const copy = copyRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !hubElement || !copy || !ctx) return undefined;

    let width = 0, height = 0, nodes = [], edges = [], hub = { x: 0, y: 0 };
    let raf = 0, startTime = null, offset = 0, visible = true, resizeTimer;
    const clamp = (value) => Math.min(1, Math.max(0, value));
    const random = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    function build() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rect = canvas.getBoundingClientRect();
      const mark = hubElement.getBoundingClientRect();
      const text = copy.getBoundingClientRect();
      hub = { x: mark.left - rect.left + mark.width / 2, y: mark.top - rect.top + mark.height / 2 };
      const exclusion = { left: text.left - rect.left - 24, right: text.right - rect.left + 24, top: mark.bottom - rect.top + 6, bottom: text.bottom - rect.top + 12 };
      const rand = random(11), count = width < 640 ? 20 : width < 1024 ? 30 : 44;
      nodes = [];
      let tries = 0;
      while (nodes.length < count && tries++ < 4000) {
        const node = { x: 16 + rand() * (width - 32), y: 80 + rand() * (height - 110), opportunity: rand() < .26, size: 1.4 + rand() * 2.2, born: .2 + rand() * .8, phase: rand() * 6.28 };
        if (node.x > exclusion.left && node.x < exclusion.right && node.y > exclusion.top && node.y < exclusion.bottom) continue;
        if (Math.hypot(node.x - hub.x, node.y - hub.y) < 90) continue;
        if (nodes.some((other) => Math.hypot(other.x - node.x, other.y - node.y) < (width < 640 ? 46 : 70))) continue;
        nodes.push(node);
      }
      edges = [];
      const seen = new Set();
      const addEdge = (from, to, isHub) => {
        const key = isHub ? `hub-${nodes.indexOf(from)}` : [nodes.indexOf(from), nodes.indexOf(to)].sort().join('-');
        if (seen.has(key)) return;
        seen.add(key);
        const dx = to.x - from.x, dy = to.y - from.y, length = Math.hypot(dx, dy) || 1, bend = (rand() - .5) * .45 * length;
        edges.push({ from, to, control: { x: (from.x + to.x) / 2 - dy / length * bend, y: (from.y + to.y) / 2 + dx / length * bend }, start: (isHub ? 1.05 : .55) + rand() * .6, duration: isHub ? .8 : .6, isHub });
      };
      nodes.forEach((node) => {
        const nearest = nodes.filter((other) => other !== node).sort((a,b) => Math.hypot(a.x-node.x,a.y-node.y) - Math.hypot(b.x-node.x,b.y-node.y));
        const limit = rand() < .55 ? 1 : 2;
        for (let i = 0; i < limit && i < nearest.length; i += 1) {
          if (Math.hypot(nearest[i].x-node.x,nearest[i].y-node.y) < width * .22) addEdge(node,nearest[i],false);
        }
      });
      nodes.slice().sort((a,b) => Math.hypot(a.x-hub.x,a.y-hub.y) - Math.hypot(b.x-hub.x,b.y-hub.y)).slice(0,width<640?6:12).forEach((node) => addEdge(node,hub,true));
    }

    function point(edge, progress) {
      const inverse = 1 - progress;
      return { x: inverse*inverse*edge.from.x + 2*inverse*progress*edge.control.x + progress*progress*edge.to.x, y: inverse*inverse*edge.from.y + 2*inverse*progress*edge.control.y + progress*progress*edge.to.y };
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const glow = clamp((time - 1.1) / .8);
      if (glow) {
        const gradient = ctx.createRadialGradient(hub.x,hub.y,0,hub.x,hub.y,160);
        gradient.addColorStop(0,`rgba(134,96,248,${(.35*glow).toFixed(3)})`);
        gradient.addColorStop(1,'rgba(134,96,248,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(hub.x-160,hub.y-160,320,320);
      }
      edges.forEach((edge) => {
        const progress = clamp((time-edge.start)/edge.duration);
        if (!progress) return;
        ctx.strokeStyle = edge.isHub ? 'rgba(185,145,255,.32)' : 'rgba(185,145,255,.18)';
        ctx.lineWidth = edge.isHub ? 1.2 : 1;
        ctx.beginPath();
        ctx.moveTo(edge.from.x,edge.from.y);
        for (let step=1;step<=24;step+=1) {
          const p=point(edge,Math.min(step/24,progress));
          ctx.lineTo(p.x,p.y);
          if (step/24>=progress) break;
        }
        ctx.stroke();
      });
      nodes.forEach((node) => {
        const alpha=clamp((time-node.born)/.5);
        if (!alpha) return;
        const twinkle=time>2?.75+.25*Math.sin(time*1.3+node.phase):1;
        const radius=node.size*6*alpha;
        ctx.globalAlpha=alpha*twinkle*.9;
        ctx.fillStyle='#C9B0FF';
        ctx.shadowColor='#B991FF';
        ctx.shadowBlur=12;
        ctx.beginPath();
        ctx.arc(node.x,node.y,radius,0,Math.PI*2);
        ctx.fill();
        ctx.globalAlpha=1;
        ctx.shadowBlur=0;
        if (node.opportunity) {
          ctx.save(); ctx.translate(node.x,node.y); ctx.rotate(Math.PI/4);
          ctx.strokeStyle=`rgba(225,210,255,${(.85*alpha).toFixed(3)})`;
          ctx.lineWidth=1.2; const size=node.size+2.2; ctx.strokeRect(-size,-size,size*2,size*2); ctx.restore();
        } else {
          ctx.fillStyle=`rgba(240,232,255,${(.95*alpha).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(node.x,node.y,node.size*.7,0,Math.PI*2); ctx.fill();
        }
      });
    }

    function animate(timestamp) {
      raf=0;
      if (startTime===null) startTime=timestamp;
      draw((timestamp-startTime)/1000+offset);
      if (!paused && visible && !reducedMotion) raf=window.requestAnimationFrame(animate);
    }
    function start() { if (!raf && !paused && visible && !reducedMotion) raf=window.requestAnimationFrame(animate); }
    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer=window.setTimeout(() => {
        const elapsed=startTime===null?0:(performance.now()-startTime)/1000+offset;
        build(); startTime=null; offset=Math.max(elapsed,10);
        if (paused || reducedMotion) draw(99); else start();
      },150);
    }
    build();
    if (paused || reducedMotion) draw(99); else start();
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; start(); }) : null;
    observer?.observe(hero);
    window.addEventListener('resize',resize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize',resize);
      observer?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [paused, reducedMotion]);

  return (
    <section className="rn-hero wrap" ref={heroRef} aria-labelledby="rn-title">
      <div className="rn-atmosphere" aria-hidden="true" />
      <canvas ref={canvasRef} className="rn-network" aria-hidden="true" />
      <div className="rn-copy inner" ref={copyRef}>
        <p className="rn-brand" ref={hubRef}>
          <span className="rn-brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></svg></span>
          <b>Refer Now</b><em>Launching soon</em>
        </p>
        <span className="eyebrow rn-eyebrow">Something New Is Coming</span>
        <h1 className="rn-title" id="rn-title"><span>Great Talent.</span><span>Great Connections.</span><span>Coming Soon.</span></h1>
        <p className="rn-subtitle">Introducing Refer Now — a new way to discover opportunities, connect talent and make referrals count.</p>
        <div className="rn-actions">
          <a className="btn btn-primary" href="#early-access">Get Early Access <span className="arr" aria-hidden="true">→</span></a>
          <a className="btn btn-ghost" href="/">Explore Seek Now <span className="arr" aria-hidden="true">→</span></a>
        </div>
      </div>
      {!reducedMotion && (
        <button className="rn-pause" type="button" aria-pressed={paused} aria-label={paused ? 'Play network animation' : 'Pause network animation'} onClick={onToggle}>
          <svg viewBox="0 0 12 12" aria-hidden="true">{paused ? <path d="M3 1.5v9L10.5 6z" /> : <><rect x="2" y="1.5" width="2.6" height="9" rx="1" /><rect x="7.4" y="1.5" width="2.6" height="9" rx="1" /></>}</svg>
          <span>{paused ? 'Play animation' : 'Pause animation'}</span>
        </button>
      )}
    </section>
  );
}

export default function ReferNowPage() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [paused, setPaused] = useState(reducedMotion);
  const pageRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const oldDescription = metaDescription?.content;
    document.title = 'Refer Now — Employee Referral App | Coming Soon';
    if (metaDescription) metaDescription.content = 'Refer Now is coming soon. Discover an upcoming employee referral and talent discovery app from Seek Now. Register for launch updates and early access.';
    return () => {
      document.title = oldTitle;
      if (metaDescription && oldDescription !== undefined) metaDescription.content = oldDescription;
    };
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || reducedMotion || !('IntersectionObserver' in window)) return undefined;
    const targets = [...root.querySelectorAll('[data-fade]'), root.querySelector('.rn-diagram')].filter(Boolean);
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top > window.innerHeight * .9) target.classList.add('pre');
    });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pre');
        observer.unobserve(entry.target);
      }
    }), { threshold: .25 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className="refer-page" ref={pageRef}>
      <Header />
      <main id="top">
        <ReferralCanvas paused={paused} reducedMotion={reducedMotion} onToggle={() => setPaused((value) => !value)} />
        <section className="rn-idea wrap" aria-labelledby="rn-idea-title">
          <div className="rn-idea-grid">
            <div className="rn-fade" data-fade>
              <span className="eyebrow">The Idea Behind Refer Now</span>
              <h2 className="rn-heading" id="rn-idea-title">The Right Connection Can Change Everything.</h2>
              <p className="rn-paragraph">Great opportunities often begin with a recommendation. Refer Now is being developed to make discovering opportunities and connecting potential candidates through referrals more accessible.</p>
              <p className="rn-planned">What we’re building toward · subject to change</p>
              <ul className="rn-pillars">
                <li><span className="rn-pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><RoleIcon type="search" /></svg></span><div><h3>Discover Opportunities</h3><p>Explore job opportunities and relevant hiring requirements.</p></div></li>
                <li><span className="rn-pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><RoleIcon type="network" /></svg></span><div><h3>Connect Talent</h3><p>Help opportunities reach potential candidates through referral networks.</p></div></li>
                <li><span className="rn-pillar-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19V9M10 19V5M16 19v-6M22 19H2" /></svg></span><div><h3>Make Referrals Count</h3><p>Bring more structure and visibility to referral-driven hiring.</p></div></li>
              </ul>
            </div>
            <ReferralDiagram reducedMotion={reducedMotion} />
          </div>
        </section>
        <section className="rn-join wrap" id="early-access" aria-labelledby="rn-join-title">
          <div className="rn-join-grid">
            <div className="rn-join-copy rn-fade" data-fade>
              <span className="eyebrow">Be Among the First</span>
              <h2 className="rn-heading" id="rn-join-title">Your Invitation Starts Here.</h2>
              <p className="rn-paragraph">Interested in Refer Now? Join our early-access list to hear about launch updates and future availability.</p>
              <p className="rn-note">Joining the list doesn’t create an account or commit you to anything. Whether you’re looking for job opportunities, want to refer people you know, or hire through referral-based hiring, tell us which fits you best.</p>
            </div>
            <EarlyAccessForm />
          </div>
        </section>
        <section className="rn-finale wrap" aria-labelledby="rn-finale-title">
          <div className="rn-fade" data-fade>
            <span className="eyebrow rn-eyebrow">The Next Connection Starts Here</span>
            <h2 id="rn-finale-title">Something Great Is <em>Taking Shape.</em></h2>
            <p>Refer Now is on its way. Discover more about the Seek Now Workforce Operating System while we prepare for launch.</p>
            <div className="rn-actions">
              <a className="btn btn-primary" href="/">Explore Seek Now <span className="arr" aria-hidden="true">→</span></a>
              <a className="btn btn-ghost" href="#early-access">Get Launch Updates <span className="arr" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
