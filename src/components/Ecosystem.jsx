import ReferWindow from './ReferWindow.jsx';
import ConsoleWindow from './ConsoleWindow.jsx';
import PeopleWindow from './PeopleWindow.jsx';

export default function Ecosystem() {
  return (
    <section className="s4 wrap" id="ecosystem" aria-labelledby="s4-title">
      <div className="inner">

        {/* ── Heading block ── */}
        <div className="s4-intro">
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

        {/* ── Value strip ── */}
        <div className="s4-strip" data-e="" style={{ '--i': '4' }}>
          <ul>
            <li>
              <span className="si" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </span>
              <div>
                <strong>Connected Workforce Journey</strong>
                <p>From talent discovery and recruitment to everyday people operations.</p>
              </div>
            </li>
            <li>
              <span className="si" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </span>
              <div>
                <strong>Structured People Operations</strong>
                <p>Organise hiring and employee management within one ecosystem.</p>
              </div>
            </li>
            <li>
              <span className="si" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </span>
              <div>
                <strong>Designed for Growing Businesses</strong>
                <p>Flexible workforce solutions built around expanding teams.</p>
              </div>
            </li>
          </ul>
          <a className="btn btn-primary" href="#platform" data-route="platform">
            Explore the Platform <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── SEO paragraph ── */}
        <p className="s4-seo">
          Seek Now is workforce management software made of three connected products: Refer Now for
          employee referral software and talent discovery, Console for recruitment management software with
          an applicant tracking system and recruitment CRM, and Seek People for HRMS software covering
          attendance, payroll and employee management.
        </p>

      </div>
    </section>
  );
}
