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

      {/* ── Mobile / tablet / reduced-motion: cinematic card showcase ── */}
      <section className="story-list wrap" id="story-list" aria-label="Three products of Seek Now">
        <div className="inner">

          {/* Section heading */}
          <div className="pc-head" id="pc-head">
            <p className="eyebrow pc-eyebrow">Meet the seek now ecosystem</p>
            <h2 className="pc-h2">
              Three Powerful Products.<br />
              One Complete <span className="pc-accent">Workforce Journey.</span>
            </h2>
            <p className="pc-sub">From discovering the right talent and streamlining recruitment to managing employees every day, Seek Now brings essential workforce operations together in one connected ecosystem.</p>
          </div>

          {/* Tab switcher */}
          <div className="pc-tabs" id="pc-tabs" role="tablist" aria-label="Products">
            <button className="pc-tab active" data-tab="0" role="tab" aria-selected="true">
              <span className="pc-tab-dot" aria-hidden="true" />
              Refer Now
            </button>
            <button className="pc-tab" data-tab="1" role="tab" aria-selected="false">
              <span className="pc-tab-dot" aria-hidden="true" />
              Console
            </button>
            <button className="pc-tab" data-tab="2" role="tab" aria-selected="false">
              <span className="pc-tab-dot" aria-hidden="true" />
              Seek People
            </button>
          </div>

          {/* 3-card fan */}
          <div className="pc-stage" id="pc-stage">

            {/* Card 0 — Refer Now */}
            <div className="pc-card" data-card="0">
              <div className="pc-card-inner">
                <div className="pc-win-wrap">
                  <ReferWindow />
                </div>
                <div className="pc-card-body">
                  <h3 className="pc-card-h">Great Talent Starts With Great Connections.</h3>
                  <p className="pc-card-p">Discover candidates, encourage employee referrals and connect job opportunities with potential talent through one intuitive application.</p>
                  <div className="pc-tags">
                    <span className="pc-tag">Employee Referrals</span>
                    <span className="pc-tag">Talent Discovery</span>
                    <span className="pc-tag">Job Applications</span>
                  </div>
                  <a className="pc-cta" href="#" data-route="products">
                    Explore Refer Now <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 1 — Console (center / hero) */}
            <div className="pc-card pc-card--center" data-card="1">
              <div className="pc-card-inner">
                <div className="pc-win-wrap">
                  <ConsoleWindow />
                </div>
                <div className="pc-card-body">
                  <h3 className="pc-card-h">Every Hire. One Command Centre.</h3>
                  <p className="pc-card-p">Organise candidate pipelines, manage interviews and streamline recruitment workflows with Seek Now Console.</p>
                  <div className="pc-tags">
                    <span className="pc-tag">Recruitment CRM &amp; ATS</span>
                    <span className="pc-tag">Candidate Pipeline</span>
                    <span className="pc-tag">Interview Management</span>
                  </div>
                  <a className="pc-cta" href="#" data-route="products">
                    Explore Console <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 — Seek People */}
            <div className="pc-card" data-card="2">
              <div className="pc-card-inner">
                <div className="pc-win-wrap">
                  <PeopleWindow />
                </div>
                <div className="pc-card-body">
                  <h3 className="pc-card-h">Everything Your People Need to Thrive.</h3>
                  <p className="pc-card-p">Manage attendance, shifts, leave, payroll, employee records and everyday HR operations through one powerful employee management platform.</p>
                  <div className="pc-tags">
                    <span className="pc-tag">Attendance &amp; Shifts</span>
                    <span className="pc-tag">Payroll &amp; Leave</span>
                    <span className="pc-tag">Employee Records</span>
                  </div>
                  <a className="pc-cta" href="#" data-route="products">
                    Explore Seek People <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

          </div>{/* /pc-stage */}

          {/* Bottom "one platform" strip */}
          <div className="pc-strip" id="pc-strip">
            <div className="pc-strip-items">
              <div className="pc-strip-item">
                <span className="pc-strip-icon" aria-hidden="true">⬡</span>
                <div>
                  <b>Connected Workforce Journey</b>
                  <p>From talent discovery to full workforce management in one ecosystem.</p>
                </div>
              </div>
              <div className="pc-strip-item">
                <span className="pc-strip-icon" aria-hidden="true">⬡</span>
                <div>
                  <b>Structured People Operations</b>
                  <p>Scalable HR, payroll and performance management within a single platform.</p>
                </div>
              </div>
              <div className="pc-strip-item">
                <span className="pc-strip-icon" aria-hidden="true">⬡</span>
                <div>
                  <b>Designed for Growing Teams</b>
                  <p>Flexible and extensible across industries, departments and team sizes.</p>
                </div>
              </div>
            </div>
            <a className="btn btn-primary pc-strip-cta" href="#" data-route="demo">
              Explore the Platform <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>

          <p className="note" style={{ fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
            Interfaces shown with illustrative sample data
          </p>

        </div>
      </section>
    </div>
  );
}
