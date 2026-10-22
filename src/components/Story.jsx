import ReferWindow from './ReferWindow.jsx';
import ConsoleWindow from './ConsoleWindow.jsx';
import PeopleWindow from './PeopleWindow.jsx';

export default function Story() {
  return (
    <div id="platform" style={{ scrollMarginTop: '0' }}>

      {/* ── Desktop: pinned cinematic story ── */}
      <section className="story" id="story" aria-label="How Seek Now connects Refer Now, Console and Seek People">
        <div className="stage">
          <div className="space">
            <svg className="orbit" id="orbit" aria-hidden="true">
              <defs>
                <linearGradient id="linkGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#8660F8" />
                  <stop offset=".5" stopColor="#B991FF" />
                  <stop offset="1" stopColor="#8660F8" />
                </linearGradient>
              </defs>
              <ellipse className="ring2" id="o-ring2" />
              <ellipse className="ring"  id="o-ring"  />
              <path    className="link"  id="o-link"  />
              <circle className="node" r="5" id="o-n0" />
              <circle className="node" r="5" id="o-n1" />
              <circle className="node" r="5" id="o-n2" />
              <text textAnchor="middle" id="o-t0">Discover</text>
              <text textAnchor="middle" id="o-t1">Recruit</text>
              <text textAnchor="middle" id="o-t2">Manage</text>
              <circle className="spark-halo" r="9" id="o-halo" />
              <circle className="spark"      r="3" id="o-spark" />
            </svg>
            <div className="pw" data-slot="refer"   data-key="refer">  <ReferWindow   /></div>
            <div className="pw" data-slot="console" data-key="console"><ConsoleWindow /></div>
            <div className="pw" data-slot="people"  data-key="people"> <PeopleWindow  /></div>
            <div className="handoff" id="handoff" aria-hidden="true">
              <span className="av">AR</span>
              <span><b>Ananya Rao</b>{' '}<small id="handoff-t">to Console</small></span>
            </div>
          </div>
          <div className="cap" data-cap="1">
            <span className="eyebrow">01 — Discover</span>
            <h2 className="cap-h">Great teams begin with the right people.</h2>
            <p className="cap-p">Refer Now gathers employee and community referrals alongside open roles, so strong candidates surface first.</p>
            <span className="prod"><b>REFER NOW</b>Discover the right talent.</span>
          </div>
          <div className="cap" data-cap="2">
            <span className="eyebrow">02 — Recruit</span>
            <h2 className="cap-h">From application to onboarding, every step organised.</h2>
            <p className="cap-p">Console tracks every candidate through screening, interviews and offers, with schedules and progress in one pipeline.</p>
            <span className="prod"><b>CONSOLE</b>Turn candidates into hires.</span>
          </div>
          <div className="cap" data-cap="3">
            <span className="eyebrow">03 — Manage</span>
            <h2 className="cap-h">Everything your people need. Everything your team needs to run.</h2>
            <p className="cap-p">Seek People handles attendance, leave, payroll and compliance from the day a new hire joins.</p>
            <span className="prod"><b>SEEK PEOPLE</b>Manage your people, effortlessly.</span>
          </div>
          <div className="cap cap-u" data-cap="4">
            <h2 className="cap-h">Three products. One Workforce Operating System.</h2>
            <p className="cap-p">One connected journey, from talent discovery to everyday workforce management.</p>
            <a className="btn btn-primary" href="#top" data-route="discover">
              Discover Seek Now{' '}<span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hint" id="hint" aria-hidden="true">Scroll to follow one hire<i /></div>
          <p className="fine">Interfaces shown with illustrative sample data</p>
        </div>
      </section>

      {/* ── Non-pinned fallback: hidden (pinned story covers all breakpoints) ── */}
    </div>
  );
}
