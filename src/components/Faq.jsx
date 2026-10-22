import useInit from '../hooks/useInit';
import init from '../scripts/s8-faq.js';

export default function Faq() {
  useInit(init);
  return (
    <section className="s8 wrap" id="faq" aria-labelledby="s8-title">
      <div className="s8-grid">
        <div className="s8-left">
          <div className="s8-glow" aria-hidden="true" />
          <span className="eyebrow">Everything You Need to Know</span>
          <h2 className="s8-h2" id="s8-title">
            <span>Questions?</span>
            <span>We've Got <em>Answers.</em></span>
          </h2>
          <p className="s8-lede">Explore the most common questions about Seek Now, our workforce software and how our products support your organisation.</p>
          <div className="s8-help">
            <div className="s8-help-h">
              <span className="ic" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.1-3.6A8 8 0 0 1 4 12z" />
                  <path d="M9 10h6M9 13.5h4" />
                </svg>
              </span>
              <div>
                <b>Talk to a specialist</b>
                <span>Get help choosing the right products for your team.</span>
              </div>
            </div>
            <a className="s8-link" href="#" data-route="contact">
              Talk to Our Team <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="s8-right">
          <div className="s8-tabsw">
            <div className="s8-tabs" role="tablist" aria-label="FAQ categories">
              <span className="s8-ind" aria-hidden="true" />
              {' '}
              <button className="s8-tab" role="tab" type="button" id="ft-general" aria-controls="fp-general" aria-selected="true" tabIndex="0">General</button>
              {' '}
              <button className="s8-tab" role="tab" type="button" id="ft-refer" aria-controls="fp-refer" aria-selected="false" tabIndex="-1">Refer Now</button>
              {' '}
              <button className="s8-tab" role="tab" type="button" id="ft-console" aria-controls="fp-console" aria-selected="false" tabIndex="-1">Console</button>
              {' '}
              <button className="s8-tab" role="tab" type="button" id="ft-people" aria-controls="fp-people" aria-selected="false" tabIndex="-1">Seek People</button>
            </div>
          </div>
          <div className="s8-panel" id="fp-general" role="tabpanel" aria-labelledby="ft-general" tabIndex="0">
            <details className="s8-q" name="faq-general" open>
              <summary>
                <h3>What is Seek Now?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Seek Now is a Workforce Operating System that brings together talent discovery, recruitment management and employee management through three purpose-built applications: Refer Now, Console and Seek People.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-general">
              <summary>
                <h3>What are the three products in Seek Now?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  <a href="#" data-route="referNow">Refer Now</a>
                  {' '}
                  supports talent discovery and employee referrals.
                  {' '}
                  <a href="#" data-route="console">Console</a>
                  {' '}
                  helps recruitment teams manage candidates, interviews and hiring workflows.
                  {' '}
                  <a href="#" data-route="seekPeople">Seek People</a>
                  {' '}
                  supports everyday HR and employee management, including attendance, leave and payroll processes.
                </p>
              </div>
            </details>
            <details className="s8-q" name="faq-general">
              <summary>
                <h3>Who can use Seek Now?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Seek Now is designed for businesses, HR teams, recruiters and organisations looking to organise recruitment and workforce management. Employees can also access relevant self-service features through Seek People.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-general">
              <summary>
                <h3>Can businesses use individual Seek Now products?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  Product availability, standalone subscriptions and bundled access depend on Seek Now's commercial offering.
                  {' '}
                  <a href="#" data-route="contact">Contact our team</a>
                  {' '}
                  to discuss the most suitable product configuration for your organisation.
                </p>
              </div>
            </details>
          </div>
          <div className="s8-panel" id="fp-refer" role="tabpanel" aria-labelledby="ft-refer" tabIndex="0" hidden>
            <details className="s8-q" name="faq-refer">
              <summary>
                <h3>What is Refer Now?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  <a href="#" data-route="referNow">Refer Now</a>
                  {' '}
                  is Seek Now's talent discovery and referral application, designed to help connect job opportunities with potential candidates through referral-driven hiring.
                </p>
              </div>
            </details>
            <details className="s8-q" name="faq-refer">
              <summary>
                <h3>How does employee referral software help recruitment?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Employee referral software provides a structured way to recommend potential candidates, share job opportunities and track referrals through the recruitment process.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-refer">
              <summary>
                <h3>Is Refer Now suitable for different types of hiring?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  Refer Now is designed to support referral-driven talent discovery.
                  {' '}
                  <a href="#" data-route="contact">Contact Seek Now</a>
                  {' '}
                  to discuss specific hiring categories, eligibility requirements and available workflows.
                </p>
              </div>
            </details>
          </div>
          <div className="s8-panel" id="fp-console" role="tabpanel" aria-labelledby="ft-console" tabIndex="0" hidden>
            <details className="s8-q" name="faq-console">
              <summary>
                <h3>What is Seek Now Console?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  <a href="#" data-route="console">Console</a>
                  {' '}
                  is a recruitment management platform designed to help recruiters and HR teams organise candidate information, manage hiring pipelines, coordinate interviews and track recruitment activities.
                </p>
              </div>
            </details>
            <details className="s8-q" name="faq-console">
              <summary>
                <h3>Does Console include an applicant tracking system (ATS)?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Console includes applicant tracking capabilities for organising candidates and managing their progress across recruitment stages.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-console">
              <summary>
                <h3>Can recruitment teams manage interviews through Console?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Console is designed to support interview coordination and candidate progression through hiring workflows. The availability of specific scheduling and integration capabilities should be confirmed with Seek Now.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-console">
              <summary>
                <h3>Can Console support multiple job openings?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  Console is intended to support structured recruitment workflows involving job requirements and candidate pipelines.
                  {' '}
                  <a href="#" data-route="contact">Contact the team</a>
                  {' '}
                  to confirm configuration and plan-specific limits.
                </p>
              </div>
            </details>
          </div>
          <div className="s8-panel" id="fp-people" role="tabpanel" aria-labelledby="ft-people" tabIndex="0" hidden>
            <details className="s8-q" name="faq-people">
              <summary>
                <h3>What is Seek People?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>
                  <a href="#" data-route="seekPeople">Seek People</a>
                  {' '}
                  is Seek Now's HRMS and employee management application, designed to support employee records, attendance, shifts, leave, payroll and everyday people operations.
                </p>
              </div>
            </details>
            <details className="s8-q" name="faq-people">
              <summary>
                <h3>Does Seek People support attendance management?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Seek People includes attendance management capabilities such as shift-based tracking, with supported face-recognition and location-aware attendance workflows depending on configuration.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-people">
              <summary>
                <h3>Can Seek People manage payroll and statutory deductions?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Seek People supports payroll administration and relevant statutory components. Applicable calculations and compliance requirements depend on employee eligibility, jurisdiction and configuration.</p>
              </div>
            </details>
            <details className="s8-q" name="faq-people">
              <summary>
                <h3>Can employees apply for leave through Seek People?</h3>
                <span className="s8-pm" aria-hidden="true" />
              </summary>
              <div className="s8-a">
                <p>Seek People includes leave management and employee self-service capabilities that can support leave requests and related approval workflows.</p>
              </div>
            </details>
          </div>
          <div className="s8-still">
            <div>
              <h3>Still Have Questions?</h3>
              <p>Our team can help you understand which Seek Now solutions fit your business.</p>
            </div>
            <div className="ctas">
              <a className="btn btn-primary" href="#" data-route="contact">
                Talk to Our Team
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </a>
              {' '}
              <a className="btn btn-ghost" href="#" data-route="demo">
                Book a Demo
                {' '}
                <span className="arr" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
