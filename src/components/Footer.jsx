import useInit from '../hooks/useInit';
import init from '../scripts/site-footer.js';
import logo from '../assets/seek-now-logo.png';

export default function Footer() {
  useInit(init);
  return (
    <footer className="ft wrap" id="site-footer">
      <div className="ft-top">
        <div className="ft-brand">

          <a className="logo" href="#top" aria-label="Seek Now home"> <img className="logo-img" src={logo} alt="Seek Now" width="136" height="34" /></a>
          <p className="ft-tag">Seek Now — The Workforce Operating System</p>
          <p>Technology for discovering talent, managing recruitment and supporting people at work.</p>
          <ul className="ft-soc" id="ft-soc" aria-label="Seek Now on social media" hidden />
        </div>
        <div className="ft-cols">
          <nav aria-labelledby="ft-h-products">
            <details open>
              <summary id="ft-h-products">
                Products
                <i aria-hidden="true" />
              </summary>
              <ul>
                <li>
                  <a data-link="referNow">Refer Now</a>
                </li>
                <li>
                  <a data-link="console">Console</a>
                </li>
                <li>
                  <a data-link="seekPeople">Seek People</a>
                </li>
                <li>
                  <a data-link="pricing">Pricing</a>
                </li>
              </ul>
            </details>
          </nav>
          <nav aria-labelledby="ft-h-platform">
            <details open>
              <summary id="ft-h-platform">
                Platform
                {' '}
                &amp;
                {' '}
                Solutions
                <i aria-hidden="true" />
              </summary>
              <ul>
                <li>
                  <a data-link="wos">Workforce Operating System</a>
                </li>
                <li>
                  <a data-link="recruitment">Recruitment Management</a>
                </li>
                <li>
                  <a data-link="employee">Employee Management</a>
                </li>
                <li>
                  <a data-link="hrms">HRMS</a>
                </li>
                <li>
                  <a data-link="solutions">Solutions</a>
                </li>
              </ul>
            </details>
          </nav>
          <nav aria-labelledby="ft-h-company">
            <details open>
              <summary id="ft-h-company">
                Company
                <i aria-hidden="true" />
              </summary>
              <ul>
                <li>
                  <a data-link="about">About Us</a>
                </li>
                <li>
                  <a data-link="contact">Contact Us</a>
                </li>
                <li>
                  <a data-link="careers">Careers</a>
                </li>
                <li>
                  <a data-link="demo">Book a Demo</a>
                </li>
              </ul>
            </details>
          </nav>
          <nav aria-labelledby="ft-h-res">
            <details open>
              <summary id="ft-h-res">
                Resources
                {' '}
                &amp;
                {' '}
                Legal
                <i aria-hidden="true" />
              </summary>
              <ul>
                <li>
                  <a data-link="resources">Resources</a>
                </li>
                <li>
                  <a data-link="support">
                    Help
                    {' '}
                    &amp;
                    {' '}
                    Support
                  </a>
                </li>
                <li>
                  <a data-link="privacy">Privacy Policy</a>
                </li>
                <li>
                  <a data-link="terms">Terms of Service</a>
                </li>
                <li>
                  <a data-link="cookies">Cookie Policy</a>
                </li>
              </ul>
            </details>
          </nav>
        </div>
      </div>
      <p className="ft-dev" id="ft-dev" hidden>
        <span className="s7-dev">Dev preview</span>
        Dotted items have no route yet and are omitted when showPending is false.
      </p>
      <div className="ft-bot">
        <p style={{ margin: "0" }}>
          ©
          {' '}
          <span id="ft-year">2026</span>
          {' '}
          Seek Now. All rights reserved.
          <span id="ft-entity" />
        </p>
        <nav aria-label="Legal"> <ul id="ft-legal" /></nav>
      </div>
    </footer>
  );
}
