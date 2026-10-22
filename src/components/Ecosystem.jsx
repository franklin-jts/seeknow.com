import ReferWindow from './ReferWindow.jsx';
import ConsoleWindow from './ConsoleWindow.jsx';
import PeopleWindow from './PeopleWindow.jsx';

export default function Ecosystem() {
  return (
    <section className="s4 wrap" id="ecosystem" aria-labelledby="s4-title">
      <div className="inner">

        {/* ── Heading block — spotlight zone ── */}
        <div className="s4-intro spot-zone" id="s4-spot-zone">
          {/* Veil overlay (fixed, viewport-sized) */}
          <div className="spot-dim" aria-hidden="true" />

          {/* Base (always visible) layer */}
          <span className="eyebrow">Meet the Seek Now Ecosystem</span>
          <h2 className="s4-h2" id="s4-title">
            <span className="l">Three Powerful Products.</span>
            <span className="l">
              One Complete{' '}
              <span className="s4-grad">Workforce Journey.</span>
            </span>
          </h2>
          <p className="s4-lede">
            From discovering the right talent and streamlining recruitment to managing employees
            every day, Seek Now brings essential workforce operations together in one connected ecosystem.
          </p>

          {/* Lit (bright, masked to torch beam) duplicate */}
          <div className="spot-lit" aria-hidden="true">
            <span className="eyebrow">Meet the Seek Now Ecosystem</span>
            <h2 className="s4-h2">
              <span className="l">Three Powerful Products.</span>
              <span className="l">
                One Complete{' '}
                <span className="s4-grad">Workforce Journey.</span>
              </span>
            </h2>
            <p className="s4-lede">
              From discovering the right talent and streamlining recruitment to managing employees
              every day, Seek Now brings essential workforce operations together in one connected ecosystem.
            </p>
          </div>
        </div>

        {/* ── Tab switcher ── */}
        <div className="s4-tabsw" data-e="" style={{ '--i': '3' }}>
          <div className="ptabs" role="tablist" aria-label="Seek Now products">
            <button
              className="ptab ptab--refer"
              role="tab"
              type="button"
              aria-selected="false"
              data-tab="refer"
              style={{ '--acc': '#B991FF', '--acc-rgb': '185,145,255' }}
            >
              <span className="ti" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-4.5-4.5" />
                </svg>
              </span>
              Refer Now
            </button>
            <button
              className="ptab ptab--console ptab--active"
              role="tab"
              type="button"
              aria-selected="true"
              data-tab="console"
              style={{ '--acc': '#7C95FF', '--acc-rgb': '124,149,255' }}
            >
              <span className="ti" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                  <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                  <rect x="16" y="4" width="4" height="7" rx="1.5" />
                </svg>
              </span>
              Console
            </button>
            <button
              className="ptab ptab--people"
              role="tab"
              type="button"
              aria-selected="false"
              data-tab="people"
              style={{ '--acc': '#5ED3C8', '--acc-rgb': '94,211,200' }}
            >
              <span className="ti" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8" r="3.2" />
                  <circle cx="17" cy="9" r="2.5" />
                  <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                </svg>
              </span>
              Seek People
            </button>
          </div>
        </div>

        {/* ── Pinned cinematic 3-window animation ── */}
        <section
          className="story eco-story"
          id="eco-story"
          aria-label="How Seek Now connects Refer Now, Console and Seek People"
        >
          <div className="stage">
            <div className="space">

              <div className="pw" data-slot="refer"   data-key="eco-refer">  <ReferWindow   /></div>
              <div className="pw" data-slot="console" data-key="eco-console"><ConsoleWindow /></div>
              <div className="pw" data-slot="people"  data-key="eco-people"> <PeopleWindow  /></div>

              <div className="handoff" id="eco-handoff" aria-hidden="true">
                <span className="av">AR</span>
                <span><b>Ananya Rao</b>{' '}<small id="eco-handoff-t">to Console</small></span>
              </div>
            </div>

            {/* Caption 1 — Discover */}
            <div className="cap" data-cap="1">
              <span className="eyebrow">01 — Discover</span>
              <h3 className="cap-h">Great teams begin with the right people.</h3>
              <p className="cap-p">Refer Now gathers employee and community referrals alongside open roles, so strong candidates surface first.</p>
              <span className="prod"><b>REFER NOW</b>Discover the right talent.</span>
            </div>

            {/* Caption 2 — Recruit */}
            <div className="cap" data-cap="2">
              <span className="eyebrow">02 — Recruit</span>
              <h3 className="cap-h">From application to onboarding, every step organised.</h3>
              <p className="cap-p">Console tracks every candidate through screening, interviews and offers, with schedules and progress in one pipeline.</p>
              <span className="prod"><b>CONSOLE</b>Turn candidates into hires.</span>
            </div>

            {/* Caption 3 — Manage */}
            <div className="cap" data-cap="3">
              <span className="eyebrow">03 — Manage</span>
              <h3 className="cap-h">Everything your people need. Everything your team needs to run.</h3>
              <p className="cap-p">Seek People handles attendance, leave, payroll and compliance from the day a new hire joins.</p>
              <span className="prod"><b>SEEK PEOPLE</b>Manage your people, effortlessly.</span>
            </div>

            <div className="hint" id="eco-hint" aria-hidden="true">Scroll to explore<i /></div>
            <p className="fine">Interfaces shown with illustrative sample data</p>
          </div>
        </section>

      </div>
    </section>
  );
}
