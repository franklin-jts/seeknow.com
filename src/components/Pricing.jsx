import useInit from '../hooks/useInit';
import init from '../scripts/s9-pricing.js';

export default function Pricing() {
  useInit(init);
  return (
    <section className="s9" id="pricing" aria-labelledby="s9-title">
      <div className="s9-track">
        <div className="s9-stage wrap">
          <div className="s9-glow" aria-hidden="true" />
          <div className="s9-tiers" aria-hidden="true">
            <span className="s9-tier" style={{ "--x": "20%", "--y": "32%" }}>BASIC</span>
            {' '}
            <span className="s9-tier" style={{ "--x": "52%", "--y": "22%" }}>PRO</span>
            {' '}
            <span className="s9-tier" style={{ "--x": "76%", "--y": "64%" }}>ENTERPRISE</span>
          </div>
          <div className="s9-parts" aria-hidden="true" />
          <div className="s9-copy">
            <span className="s9-name" data-st=".7,.8">Pricing, Reimagined</span>
            <h2 className="s9-h2" id="s9-title">
              <span className="ln" data-st=".44,.54">No Tiers.</span>
              <span className="ln" data-st=".52,.62">No Feature Locks.</span>
              <span className="ln g" data-st=".6,.71">Just Pay Per User.</span>
            </h2>
            <p className="s9-desc" data-st=".68,.78">Choose the Seek Now applications your business needs, select your user count and unlock every included feature. Simple, flexible pricing without complicated packages.</p>
            <ul className="s9-assure" data-st=".72,.82">
              <li>One Price Per Application</li>
              <li>Every Included Feature</li>
              <li>Pay Per User</li>
            </ul>
            <div className="s9-syms" aria-hidden="true">
              <span className="s9-sym" data-sym="0">
                <i>
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6" />
                    <path d="M20 20l-4.5-4.5" />
                  </svg>
                </i>
                Refer Now
              </span>
              {' '}
              <span className="s9-sym" data-sym="1">
                <i>
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                    <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                    <rect x="16" y="4" width="4" height="7" rx="1.5" />
                  </svg>
                </i>
                Console
              </span>
              {' '}
              <span className="s9-sym" data-sym="2">
                <i>
                  <svg viewBox="0 0 24 24">
                    <circle cx="9" cy="8" r="3.2" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                  </svg>
                </i>
                Seek People
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="s9-builder" id="s9-builder">
          {/* LEFT · application selection */}
          <div className="s9-left">
            <h3>Build Your Seek Now Plan</h3>
            <p>Select the applications you need and the number of users for each.</p>
            <div className="s9-apps">
              <article className="s9-app" data-id="referNow">
                <div className="s9-head">
                  <input className="s9-cb" type="checkbox" id="s9-cb-referNow" aria-describedby="s9-d-referNow" />
                  {' '}
                  <span className="s9-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="6" />
                      <path d="M20 20l-4.5-4.5" />
                    </svg>
                  </span>
                  <div className="s9-nm">
                    <h4>
                      <label htmlFor="s9-cb-referNow">Refer Now</label>
                    </h4>
                    <p id="s9-d-referNow">
                      Employee Referral
                      {' '}
                      &amp;
                      {' '}
                      Talent Discovery.
                    </p>
                  </div>
                  <div className="s9-rate">
                    <b data-rate="">Price on Request</b>
                    <small>per user / month</small>
                  </div>
                </div>
                <ul className="s9-tags" aria-label="Refer Now highlights">
                  <li>Job Opportunities</li>
                  <li>Employee Referrals</li>
                  <li>Candidate Discovery</li>
                </ul>
                <div className="s9-qbox">
                  <div className="s9-qin">
                    <div className="s9-qrow">
                      <span className="s9-qlabel" id="s9-ql-referNow">Number of users</span>
                      <div className="s9-step" role="group" aria-labelledby="s9-ql-referNow">
                        <button type="button" data-dec="" aria-label="Remove one Refer Now user">−</button>
                        <input type="number" inputMode="numeric" min="1" max="100000" step="1" defaultValue="1" data-qty="" aria-labelledby="s9-ql-referNow" aria-describedby="s9-err-referNow" />
                        <button type="button" data-inc="" aria-label="Add one Refer Now user">+</button>
                      </div>
                      <span className="s9-sub" data-sub="" />
                      <p className="s9-err" id="s9-err-referNow" data-err="" aria-live="polite" />
                    </div>
                  </div>
                </div>
                <details className="s9-feat">
                  <summary>
                    View Included Features
                    {' '}
                    <span aria-hidden="true">↓</span>
                  </summary>
                  <ul>
                    <li>Job Opportunities</li>
                    <li>Employee Referrals</li>
                    <li>Candidate Discovery</li>
                    <li>Job Applications</li>
                    <li>Referral Tracking</li>
                    <li className="note">All standard features are included with every Refer Now user.</li>
                  </ul>
                </details>
              </article>
              <article className="s9-app" data-id="console">
                <div className="s9-head">
                  <input className="s9-cb" type="checkbox" id="s9-cb-console" aria-describedby="s9-d-console" />
                  {' '}
                  <span className="s9-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                      <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                      <rect x="16" y="4" width="4" height="7" rx="1.5" />
                    </svg>
                  </span>
                  <div className="s9-nm">
                    <h4>
                      <label htmlFor="s9-cb-console">Console</label>
                    </h4>
                    <p id="s9-d-console">
                      Recruitment CRM
                      {' '}
                      &amp;
                      {' '}
                      Applicant Tracking System.
                    </p>
                  </div>
                  <div className="s9-rate">
                    <b data-rate="">Price on Request</b>
                    <small>per user / month</small>
                  </div>
                </div>
                <ul className="s9-tags" aria-label="Console highlights">
                  <li>Recruitment CRM</li>
                  <li>Applicant Tracking</li>
                  <li>Candidate Pipeline</li>
                </ul>
                <div className="s9-qbox">
                  <div className="s9-qin">
                    <div className="s9-qrow">
                      <span className="s9-qlabel" id="s9-ql-console">Number of users</span>
                      <div className="s9-step" role="group" aria-labelledby="s9-ql-console">
                        <button type="button" data-dec="" aria-label="Remove one Console user">−</button>
                        <input type="number" inputMode="numeric" min="1" max="100000" step="1" defaultValue="1" data-qty="" aria-labelledby="s9-ql-console" aria-describedby="s9-err-console" />
                        <button type="button" data-inc="" aria-label="Add one Console user">+</button>
                      </div>
                      <span className="s9-sub" data-sub="" />
                      <p className="s9-err" id="s9-err-console" data-err="" aria-live="polite" />
                    </div>
                  </div>
                </div>
                <details className="s9-feat">
                  <summary>
                    View Included Features
                    {' '}
                    <span aria-hidden="true">↓</span>
                  </summary>
                  <ul>
                    <li>Recruitment CRM</li>
                    <li>Applicant Tracking</li>
                    <li>Candidate Pipeline</li>
                    <li>Interview Management</li>
                    <li>Hiring Workflows</li>
                    <li>Onboarding Support</li>
                    <li className="note">All standard features are included with every Console user.</li>
                  </ul>
                </details>
              </article>
              <article className="s9-app" data-id="seekPeople">
                <div className="s9-head">
                  <input className="s9-cb" type="checkbox" id="s9-cb-seekPeople" aria-describedby="s9-d-seekPeople" />
                  {' '}
                  <span className="s9-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="3.2" />
                      <circle cx="17" cy="9" r="2.5" />
                      <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                    </svg>
                  </span>
                  <div className="s9-nm">
                    <h4>
                      <label htmlFor="s9-cb-seekPeople">Seek People</label>
                    </h4>
                    <p id="s9-d-seekPeople">
                      HRMS
                      {' '}
                      &amp;
                      {' '}
                      Employee Management.
                    </p>
                  </div>
                  <div className="s9-rate">
                    <b data-rate="">Price on Request</b>
                    <small>per user / month</small>
                  </div>
                </div>
                <ul className="s9-tags" aria-label="Seek People highlights">
                  <li>Employee Management</li>
                  <li>
                    Attendance
                    {' '}
                    &amp;
                    {' '}
                    Shifts
                  </li>
                  <li>Payroll Administration</li>
                </ul>
                <div className="s9-qbox">
                  <div className="s9-qin">
                    <div className="s9-qrow">
                      <span className="s9-qlabel" id="s9-ql-seekPeople">Number of users</span>
                      <div className="s9-step" role="group" aria-labelledby="s9-ql-seekPeople">
                        <button type="button" data-dec="" aria-label="Remove one Seek People user">−</button>
                        <input type="number" inputMode="numeric" min="1" max="100000" step="1" defaultValue="1" data-qty="" aria-labelledby="s9-ql-seekPeople" aria-describedby="s9-err-seekPeople" />
                        <button type="button" data-inc="" aria-label="Add one Seek People user">+</button>
                      </div>
                      <span className="s9-sub" data-sub="" />
                      <p className="s9-err" id="s9-err-seekPeople" data-err="" aria-live="polite" />
                    </div>
                  </div>
                </div>
                <details className="s9-feat">
                  <summary>
                    View Included Features
                    {' '}
                    <span aria-hidden="true">↓</span>
                  </summary>
                  <ul>
                    <li>Employee Management</li>
                    <li>
                      Attendance
                      {' '}
                      &amp;
                      {' '}
                      Shifts
                    </li>
                    <li>Leave Management</li>
                    <li>Payroll Administration</li>
                    <li>Employee Self-Service</li>
                    <li>Performance Management</li>
                    <li>Reimbursements</li>
                    <li className="note">All standard features are included with every Seek People user.</li>
                  </ul>
                </details>
              </article>
            </div>
          </div>
          {/* RIGHT · live summary */}
          <div className="s9-right">
            <div className="s9-sum">
              <h3>Your Seek Now Subscription</h3>
              <span className="s9-unit">Billed per user / month</span>
              <div className="s9-orbit" id="s9-orbit" aria-hidden="true">
                <svg className="tr">
                  <line id="s9-l01" />
                  <line id="s9-l12" />
                  <line id="s9-l02" />
                </svg>
                {' '}
                <span className="s9-ring" />
                {' '}
                <span className="s9-orb" data-o="referNow">
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6" />
                    <path d="M20 20l-4.5-4.5" />
                  </svg>
                </span>
                {' '}
                <span className="s9-orb" data-o="console">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                    <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                    <rect x="16" y="4" width="4" height="7" rx="1.5" />
                  </svg>
                </span>
                {' '}
                <span className="s9-orb" data-o="seekPeople">
                  <svg viewBox="0 0 24 24">
                    <circle cx="9" cy="8" r="3.2" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                  </svg>
                </span>
              </div>
              <span className="s9-suite" id="s9-suite">Complete Seek Now Suite</span>
              <p className="s9-qlabel" style={{ margin: "14px 0 0" }}>Your selected applications</p>
              <div className="s9-empty" id="s9-empty">Select at least one application to build your subscription.</div>
              <ul className="s9-lines" id="s9-lines" />
              <div className="s9-tot" id="s9-tot" hidden />
              <button type="button" className="btn btn-primary s9-cta" id="s9-cta" disabled>
                Request My Quote
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </button>
              <div className="s9-done" id="s9-done" hidden /> <p className="s9-sr" id="s9-live" aria-live="polite" /></div>
          </div>
        </div>
        <div className="s9-trans">
          <h3>Every Application. Every Included Feature. No Feature Tiers.</h3>
          <p>Whether you choose Refer Now, Console, Seek People or all three, you receive access to the standard included features of every application you subscribe to.</p>
          <ul className="s9-assure">
            <li>Full Included Feature Access</li>
            <li>Flexible Application Selection</li>
            <li>Simple Per-User Pricing</li>
          </ul>
          <p className="s9-seo">Seek Now uses per-user subscription pricing for its workforce management software. Employee referral software pricing for Refer Now, recruitment management software and applicant tracking system pricing for Console, and HRMS pricing for Seek People are each set per user, per month, so you only pay for the applications and users you need.</p>
        </div>
      </div>
      <div className="s9-bar" id="s9-bar" aria-hidden="true">
        <div>
          <span>Monthly subscription</span>
          <b id="s9-bar-t">—</b>
        </div>
        <a href="#s9-builder" tabIndex="-1">View summary</a>
      </div>
    </section>
  );
}
