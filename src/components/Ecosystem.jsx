import ReferWindow from './ReferWindow.jsx';
import ConsoleWindow from './ConsoleWindow.jsx';
import PeopleWindow from './PeopleWindow.jsx';

export default function Ecosystem() {
  return (
    <section className="s4 wrap" id="ecosystem" aria-labelledby="s4-title">
      <div className="inner">

        {/* Heading block */}
        <div className="s4-intro">
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

        <div className="s4-tabsw" data-e="" style={{ "--i": "3" }}>
          <div className="ptabs" role="tablist" aria-label="Seek Now products">
            <button
              className="ptab ptab--refer"
              role="tab"
              type="button"
              aria-selected="false"
              style={{ "--acc": "#B991FF", "--acc-rgb": "185,145,255" }}
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
              style={{ "--acc": "#7C95FF", "--acc-rgb": "124,149,255" }}
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
              style={{ "--acc": "#5ED3C8", "--acc-rgb": "94,211,200" }}
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

        {/* ── Orbit preview — exact Story orbit animations ── */}
        <div className="s4-orbit-preview" aria-label="Three product windows: Refer Now, Console and Seek People">
          <svg className="s4-op-orbit" id="s4-orbit-svg" aria-hidden="true">
            <defs>
              <linearGradient id="s4OrbitGrad" x1="0" x2="1">
                <stop offset="0"   stopColor="#8660F8" />
                <stop offset=".5"  stopColor="#B991FF" />
                <stop offset="1"   stopColor="#8660F8" />
              </linearGradient>
            </defs>
            <ellipse className="s4-op-ring2" id="s4-ring2" />
            <ellipse className="s4-op-ring"  id="s4-ring"  />
            <path    className="s4-op-link"  id="s4-link"  />
            <circle className="s4-op-node" r="5" id="s4-n0" />
            <circle className="s4-op-node" r="5" id="s4-n1" />
            <circle className="s4-op-node" r="5" id="s4-n2" />
            <text textAnchor="middle" id="s4-t0">Discover</text>
            <text textAnchor="middle" id="s4-t1">Recruit</text>
            <text textAnchor="middle" id="s4-t2">Manage</text>
            <circle className="s4-op-spark-halo" r="9"  id="s4-halo"  />
            <circle className="s4-op-spark"      r="3"  id="s4-spark" />
          </svg>
          <div className="s4-op-windows">
            <div className="s4-op-win s4-op-win--left"   data-win="0"><ReferWindow   /></div>
            <div className="s4-op-win s4-op-win--center" data-win="1"><ConsoleWindow /></div>
            <div className="s4-op-win s4-op-win--right"  data-win="2"><PeopleWindow  /></div>
          </div>
          <p className="s4-op-note">Interfaces shown with illustrative sample data</p>
        </div>

        <div className="s4-strip" data-e="">
          <ul>
            <li>
              <span className="si" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
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
                  <path d="M12 3l9 5-9 5-9-5z" />
                  <path d="M3 13l9 5 9-5" />
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
                  <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                </svg>
              </span>
              <div>
                <strong>Designed for Growing Businesses</strong>
                <p>Flexible workforce solutions built around expanding teams.</p>
              </div>
            </li>
          </ul>
          <a className="btn btn-primary" href="#platform" data-route="platform">
            Explore the Platform{' '}
            <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>

        <p className="s4-seo">
          Seek Now is workforce management software made of three connected products: Refer Now for
          employee referral software and talent discovery, Console for recruitment management software
          with an applicant tracking system and recruitment CRM, and Seek People for HRMS software
          covering attendance, payroll and employee management.
        </p>
      </div>
    </section>
  );
}
