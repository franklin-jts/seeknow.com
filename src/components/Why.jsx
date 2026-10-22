import { useEffect, useRef } from 'react';
import useInit from '../hooks/useInit';
import init from '../scripts/s3-why.js';
import logo from '../assets/seek-now-logo.png';

// Space (px) kept between the CTA button and the SEO paragraph
const KEEP_GAP = 48;
// Must match the final lift in s3-why.js:  translateY(-q * H * .05)
const LIFT_RATIO = 0.05;

// Layout position of an element (ignores transforms, so it is not affected by the animation)
const pageTop = (el) => {
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
};

export default function Why() {
  useInit(init);

  const secRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const ctaRef = useRef(null);
  const seoRef = useRef(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    const cta = ctaRef.current;
    const seo = seoRef.current;
    if (!sec || !track || !stage || !cta || !seo) return undefined;

    const fixGap = () => {
      seo.style.removeProperty('margin-top');
      if (!sec.classList.contains('v-pinned')) return;

      const H = stage.clientHeight;
      const ctaBottom = pageTop(cta) - pageTop(stage) + cta.offsetHeight - H * LIFT_RATIO;
      const gapBelowCta = H - ctaBottom;
      const gapToSeoBox = pageTop(seo) - (pageTop(track) + track.offsetHeight);
      const padTop = parseFloat(getComputedStyle(seo).paddingTop) || 0;
      const marginTop = parseFloat(getComputedStyle(seo).marginTop) || 0;

      const visualGap = gapBelowCta + gapToSeoBox + padTop;
      const delta = visualGap - KEEP_GAP;
      if (delta > 1) seo.style.setProperty('margin-top', `${Math.round(marginTop - delta)}px`, 'important');
    };

    fixGap();
    const t1 = setTimeout(fixGap, 300);
    const t2 = setTimeout(fixGap, 1200);
    window.addEventListener('resize', fixGap);
    window.addEventListener('load', fixGap);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fixGap);
    const mo = new MutationObserver(fixGap);
    mo.observe(sec, { attributes: true, attributeFilter: ['class'] });

    let io;
    const show = () => {
      seo.style.opacity = '1';
      seo.style.transform = 'none';
    };
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { show(); io.disconnect(); }
      }, { threshold: 0.1 });
      io.observe(seo);
    } else {
      show();
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', fixGap);
      window.removeEventListener('load', fixGap);
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);

  return (
    <section className="s3 wrap" id="why-seek-now" aria-labelledby="v-title" ref={secRef}>
      <div className="v-track" ref={trackRef}>
        <div className="v-stage" ref={stageRef}>
          <canvas className="v-canvas" aria-hidden="true" />
          <div className="v-glow" aria-hidden="true" />
          <div className="v-ring" aria-hidden="true" />
          <div className="v-s1">
            <h2 className="v-h2" id="v-title">
              Managing Your Workforce Shouldn't Require
              {' '}
              <span className="v-lav">So Many Tools.</span>
            </h2>
            <p className="v-sub">Recruitment, employee referrals, attendance, payroll and HR management — scattered across different systems.</p>
          </div>
          {/* Fictional products, for illustration only */}
          <ul className="fl-cloud" aria-label="Examples of separate fictional tools">
            <li className="fl-logo" style={{ "--n": "0", "--h": "#7FB6E8", "--r": "999px", "--x": "11%", "--y": "31%" }} data-x="11" data-y="31" data-z=".9">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M4 6l8 5 8-5v3l-8 5-8-5zM4 12l8 5 8-5v3l-8 5-8-5z" /></svg>
              </span>
              <span className="fl-t">
                <b>Huntharbor</b>
                <small>Recruitment CRM</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "1", "--h": "#6FC7B8", "--r": "10px", "--x": "22%", "--y": "60%" }} data-x="22" data-y="60" data-z="1.1">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" opacity=".55" />
                </svg>
              </span>
              <span className="fl-t">
                <b>Pipewren</b>
                <small>ATS</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "2", "--h": "#E39AB8", "--r": "16px", "--x": "61%", "--y": "60%" }} data-x="61" data-y="60" data-z="1.15">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M7 7a5 5 0 1 0 0 10c2.2 0 3.4-1.6 5-5s2.8-5 5-5a5 5 0 1 1 0 10c-2.2 0-3.4-1.6-5-5S9.2 7 7 7zm0 2.5a2.5 2.5 0 1 0 0 5c1 0 1.8-.8 3-2.5-1.2-1.7-2-2.5-3-2.5zm10 0c-1 0-1.8.8-3 2.5 1.2 1.7 2 2.5 3 2.5a2.5 2.5 0 1 0 0-5z" /></svg>
              </span>
              <span className="fl-t">
                <b>Referloom</b>
                <small>Referrals</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "3", "--h": "#9CC98A", "--r": "6px", "--x": "42%", "--y": "72%" }} data-x="42" data-y="72" data-z="1">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15zm2.5-2.5L15 9" /></svg>
              </span>
              <span className="fl-t">
                <b>Deskfern</b>
                <small>HRMS</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "4", "--h": "#E2B56C", "--r": "999px", "--x": "84%", "--y": "62%" }} data-x="84" data-y="62" data-z="1">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M11 2h2v4h-2zM11 18h2v4h-2zM2 11h4v2H2zM18 11h4v2h-4zM4.2 5.6l1.4-1.4 2.8 2.8L7 8.4zM15.6 17l1.4-1.4 2.8 2.8-1.4 1.4zM4.2 18.4l2.8-2.8 1.4 1.4-2.8 2.8zM15.6 7l2.8-2.8 1.4 1.4L17 8.4z" />
                </svg>
              </span>
              <span className="fl-t">
                <b>Rosterlark</b>
                <small>Attendance</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "5", "--h": "#E58C86", "--r": "12px", "--x": "74%", "--y": "86%" }} data-x="74" data-y="86" data-z=".9">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M12 2l8.7 5v10L12 22l-8.7-5V7zM8 11h8v2H8z" /></svg>
              </span>
              <span className="fl-t">
                <b>Paybarrow</b>
                <small>Payroll</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "6", "--h": "#9AA4F0", "--r": "18px", "--x": "89%", "--y": "29%" }} data-x="89" data-y="29" data-z=".85">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M12 3l9 8h-3v9H6v-9H3z" /></svg>
              </span>
              <span className="fl-t">
                <b>Leavenest</b>
                <small>Leave Management</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "7", "--h": "#CDB48F", "--r": "4px", "--x": "10%", "--y": "84%" }} data-x="10" data-y="84" data-z=".85">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M4 4h16v16H4zM14 4v6h6" /></svg>
              </span>
              <span className="fl-t">
                <b>Staffmoor</b>
                <small>Employee Records</small>
              </span>
            </li>
            <li className="fl-logo" style={{ "--n": "8", "--h": "#74C7E0", "--r": "999px", "--x": "31%", "--y": "88%" }} data-x="31" data-y="88" data-z=".95">
              <span className="fl-ic">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M12 2l7 9-7 11-7-11z" /></svg>
              </span>
              <span className="fl-t">
                <b>Panelkite</b>
                <small>Interviews</small>
              </span>
            </li>
          </ul>
          <div className="v-funnel" aria-hidden="true">
            <i />
            <b />
          </div>
          <div className="v-reveal">
            <div className="v-lift">
              <div className="v-mark" role="img" aria-label="Seek Now"> <img className="logo-img" src={logo} alt="" width="136" height="34" /></div>
              <h3 className="v-h3" data-v=".72,.8">
                One Platform.
                {' '}
                <span className="v-grad">One Workforce Operating System.</span>
              </h3>
              <p className="v-p" data-v=".75,.83">Discover talent, manage recruitment and simplify employee operations with Seek Now.</p>
              <a className="btn btn-primary v-cta" ref={ctaRef} href="#ecosystem" data-route="ecosystem" data-v=".84,.9">
                Explore the Seek Now Ecosystem
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p
        className="v-seo"
        ref={seoRef}
        style={{
          position: 'relative',
          zIndex: 2,
          opacity: 0,
          transform: 'translateY(14px)',
          transition: 'opacity .6s ease, transform .6s ease',
        }}
      >
        Seek Now is workforce management software that brings employee referral software, recruitment management, applicant tracking and HRMS capabilities together. Simplify hiring, leave, payroll and attendance management and everyday employee administration through one connected ecosystem.
      </p>
    </section>
  );
}
