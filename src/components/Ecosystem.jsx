import useInit from '../hooks/useInit';
import init from '../scripts/s4-ecosystem.js';

export default function Ecosystem() {
  useInit(init);
  return (
    <section className="s4 wrap" id="ecosystem" aria-labelledby="s4-title">
      <div className="inner">
        <div className="s4-intro">
          <span className="eyebrow" data-e="">Meet the Seek Now Ecosystem</span>
          <h2 className="s4-h2" id="s4-title" data-e="" style={{ "--i": "1" }}>
            <span className="l">Three Powerful Products.</span>
            <span className="l">
              One Complete
              {' '}
              <span className="s4-grad">Workforce Journey.</span>
            </span>
          </h2>
          <p className="s4-lede" data-e="" style={{ "--i": "2" }}>From discovering the right talent and streamlining recruitment to managing employees every day, Seek Now brings essential workforce operations together in one connected ecosystem.</p>
        </div>
        <div className="s4-tabsw" data-e="" style={{ "--i": "3" }}>
          <div className="ptabs" role="tablist" aria-label="Seek Now products">
            <span className="pind" aria-hidden="true" />
            {' '}
            <button className="ptab" role="tab" id="tab-refer" aria-controls="pp-refer" aria-selected="false" tabIndex="-1" type="button" style={{ "--acc": "#B991FF", "--acc-rgb": "185,145,255" }}>
              <span className="ti" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-4.5-4.5" />
                </svg>
              </span>
              Refer Now
            </button>
            {' '}
            <button className="ptab" role="tab" id="tab-console" aria-controls="pp-console" aria-selected="true" tabIndex="0" type="button" style={{ "--acc": "#7C95FF", "--acc-rgb": "124,149,255" }}>
              <span className="ti" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                  <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                  <rect x="16" y="4" width="4" height="7" rx="1.5" />
                </svg>
              </span>
              Console
            </button>
            {' '}
            <button className="ptab" role="tab" id="tab-people" aria-controls="pp-people" aria-selected="false" tabIndex="-1" type="button" style={{ "--acc": "#5ED3C8", "--acc-rgb": "94,211,200" }}>
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
        <div className="sc" id="s4-sc">
          {/* REFER NOW */}
          <article className="pp" id="pp-refer" role="tabpanel" aria-labelledby="tab-refer" data-e="" style={{ "--i": "0", "--acc": "#B991FF", "--acc-rgb": "185,145,255" }}>
            <div className="pp-in">
              <header className="pp-h">
                <span className="pp-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6" />
                    <path d="M20 20l-4.5-4.5" />
                  </svg>
                </span>
                <div>
                  <h3>Refer Now</h3>
                  <p className="pp-cat">
                    Employee Referral
                    {' '}
                    &amp;
                    {' '}
                    Talent Discovery Software
                  </p>
                </div>
              </header>
              <figure className="mock">
                <div className="scr" role="img" aria-label="Illustrative Refer Now screen with open jobs, referral and application counts, recommended candidates with referral status, and a weekly activity summary">
                  <div className="m-bar">
                    <span className="m-dot" />
                    <b>Refer Now</b>
                    <span className="m-srch">Search jobs or people</span>
                  </div>
                  <div className="m-body">
                    <div className="m-2">
                      <div className="m-box job">
                        <span className="m-h">Open job</span>
                        <b>Senior Product Designer</b>
                        <span className="m-mut">Bengaluru · Design</span>
                        <div className="jf">
                          <span>
                            <b data-count="3">3</b>
                            referrals
                          </span>
                          <span>
                            <b data-count="18">18</b>
                            applied
                          </span>
                        </div>
                      </div>
                      <div className="m-box job">
                        <span className="m-h">Open job</span>
                        <b>Backend Engineer, Node.js</b>
                        <span className="m-mut">Remote · Engineering</span>
                        <div className="jf">
                          <span>
                            <b data-count="5">5</b>
                            referrals
                          </span>
                          <span>
                            <b data-count="26">26</b>
                            applied
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="m-h">Recommended candidates</span>
                    <div className="cl">
                      <div className="cr">
                        <span className="m-av" data-tip="Referred by Karthik S.">AR</span>
                        <div>
                          <b>Ananya Rao</b>
                          <span>Product Designer · 6 yrs · Bengaluru</span>
                        </div>
                        <span className="m-st a">Referred</span>
                      </div>
                      <div className="cr">
                        <span className="m-av b" data-tip="Community referral · Priya N.">VK</span>
                        <div>
                          <b>Vikram Kulkarni</b>
                          <span>UX Designer · 4 yrs · Mumbai</span>
                        </div>
                        <span className="m-st b">In review</span>
                      </div>
                      <div className="cr">
                        <span className="m-av c" data-tip="Applied via careers page">SM</span>
                        <div>
                          <b>Sana Mirza</b>
                          <span>Interaction Designer · 5 yrs</span>
                        </div>
                        <span className="m-st">Applied</span>
                      </div>
                    </div>
                    <div className="sum">
                      <span>
                        <i className="pulse" />
                        This week
                      </span>
                      <span>
                        <b data-count="6">6</b>
                        {' '}
                        referrals
                      </span>
                      <span>
                        <b data-count="14">14</b>
                        {' '}
                        applications
                      </span>
                      <span>
                        <b data-count="3">3</b>
                        {' '}
                        shortlisted
                      </span>
                    </div>
                  </div>
                </div>
              </figure>
              <p className="pp-hl">Great Talent Starts With Great Connections.</p>
              <p className="pp-d">Discover candidates, encourage employee referrals and connect job opportunities with potential talent through one intuitive application.</p>
              <ul className="pp-chips" aria-label="Refer Now features">
                <li>Employee Referrals</li>
                <li>Talent Discovery</li>
                <li>Job Applications</li>
              </ul>
              <a className="pp-cta" href="#" data-route="referNow">
                Explore Refer Now
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
          {/* CONSOLE */}
          <article className="pp is-active" id="pp-console" role="tabpanel" aria-labelledby="tab-console" data-e="" style={{ "--i": "1", "--acc": "#7C95FF", "--acc-rgb": "124,149,255" }}>
            <div className="pp-in">
              <header className="pp-h">
                <span className="pp-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="4" width="4.5" height="16" rx="1.5" />
                    <rect x="10" y="4" width="4.5" height="11" rx="1.5" />
                    <rect x="16" y="4" width="4" height="7" rx="1.5" />
                  </svg>
                </span>
                <div>
                  <h3>Console</h3>
                  <p className="pp-cat">
                    Recruitment Management Software
                    {' '}
                    &amp;
                    {' '}
                    ATS
                  </p>
                </div>
              </header>
              <figure className="mock">
                <div className="scr" role="img" aria-label="Illustrative Console applicant tracking screen with a five-stage hiring pipeline from applied to hired, upcoming interviews and recent recruitment activity">
                  <div className="m-bar">
                    <span className="m-dot" />
                    <b>Console</b>
                    <span className="m-mut">Senior Product Designer ▾</span>
                    <span className="m-btn">Schedule interview</span>
                  </div>
                  <div className="m-body">
                    <div className="pl">
                      <div className="pc">
                        <div className="pc-h">
                          Applied
                          <em>9</em>
                        </div>
                        <div className="mc">
                          <span className="m-av b">RM</span>
                          <span>Rohan M.</span>
                        </div>
                        <div className="mc">
                          <span className="m-av c">IK</span>
                          <span>Isha K.</span>
                        </div>
                      </div>
                      <div className="pc">
                        <div className="pc-h">
                          Screen
                          <em>6</em>
                        </div>
                        <div className="mc">
                          <span className="m-av">DM</span>
                          <span>Dev M.</span>
                        </div>
                        <div className="mc">
                          <span className="m-av b">NJ</span>
                          <span>Neha J.</span>
                        </div>
                      </div>
                      <div className="pc">
                        <div className="pc-h">
                          Interview
                          <em>4</em>
                        </div>
                        <div className="mc shift">
                          <span className="m-av" data-tip="Portfolio review today">AR</span>
                          <span>Ananya R.</span>
                        </div>
                        <div className="mc">
                          <span className="m-av c">AN</span>
                          <span>Arjun N.</span>
                        </div>
                      </div>
                      <div className="pc">
                        <div className="pc-h">
                          Offer
                          <em>2</em>
                        </div>
                        <div className="mc">
                          <span className="m-av b">KS</span>
                          <span>Kabir S.</span>
                        </div>
                      </div>
                      <div className="pc pc-hired">
                        <div className="pc-h">
                          Hired
                          <em>1</em>
                        </div>
                        <div className="mc">
                          <span className="m-av">TB</span>
                          <span>Tara B.</span>
                        </div>
                      </div>
                    </div>
                    <div className="m-2" style={{ flex: "1", minHeight: "0" }}>
                      <div className="m-box">
                        <span className="m-h">Interviews today</span>
                        <div className="iv2">
                          <time>11:30</time>
                          <span>
                            <b style={{ color: "#fff", fontWeight: "600" }}>Ananya Rao</b>
                            {' '}
                            · Portfolio
                          </span>
                        </div>
                        <div className="iv2">
                          <time>15:00</time>
                          <span>
                            <b style={{ color: "#fff", fontWeight: "600" }}>Rohan Mehta</b>
                            {' '}
                            · Intro call
                          </span>
                        </div>
                        <div className="iv2">
                          <time>17:15</time>
                          <span>
                            <b style={{ color: "#fff", fontWeight: "600" }}>Neha Joshi</b>
                            {' '}
                            · Assessment
                          </span>
                        </div>
                      </div>
                      <div className="m-box">
                        <span className="m-h">
                          <i className="pulse" />
                          Activity
                        </span>
                        <div className="act2">Kabir moved to Offer</div>
                        <div className="act2">Panel feedback added for Arjun</div>
                        <div className="act2">2 new applicants from Refer Now</div>
                      </div>
                    </div>
                    <div className="m-2">
                      <div className="m-box" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="m-mut">Open jobs</span>
                        <b data-count="7">7</b>
                      </div>
                      <div className="m-box" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="m-mut">In pipeline</span>
                        <b data-count="22">22</b>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
              <p className="pp-hl">Every Hire. One Command Centre.</p>
              <p className="pp-d">Organise candidate pipelines, manage interviews and streamline recruitment workflows with Seek Now Console.</p>
              <ul className="pp-chips" aria-label="Console features">
                <li>
                  Recruitment CRM
                  {' '}
                  &amp;
                  {' '}
                  ATS
                </li>
                <li>Candidate Pipeline</li>
                <li>Interview Management</li>
              </ul>
              <a className="pp-cta" href="#" data-route="console">
                Explore Console
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
          {/* SEEK PEOPLE */}
          <article className="pp" id="pp-people" role="tabpanel" aria-labelledby="tab-people" data-e="" style={{ "--i": "2", "--acc": "#5ED3C8", "--acc-rgb": "94,211,200" }}>
            <div className="pp-in">
              <header className="pp-h">
                <span className="pp-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="9" cy="8" r="3.2" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                  </svg>
                </span>
                <div>
                  <h3>Seek People</h3>
                  <p className="pp-cat">
                    HRMS
                    {' '}
                    &amp;
                    {' '}
                    Employee Management Software
                  </p>
                </div>
              </header>
              <figure className="mock">
                <div className="scr" role="img" aria-label="Illustrative Seek People HRMS dashboard with employee overview, weekly attendance chart, leave requests, department distribution, payroll schedule and employee self-service shortcuts">
                  <div className="m-bar">
                    <span className="m-dot" />
                    <b>Seek People</b>
                    <span className="m-mut">Good morning, Priya</span>
                    <span className="m-srch">Directory</span>
                  </div>
                  <div className="m-body">
                    <div className="st3">
                      <div className="m-box">
                        <span className="m-mut">Employees</span>
                        <b data-count="142">142</b>
                      </div>
                      <div className="m-box">
                        <span className="m-mut">Present today</span>
                        <b data-count="131">131</b>
                      </div>
                      <div className="m-box">
                        <span className="m-mut">On leave</span>
                        <b data-count="8">8</b>
                      </div>
                    </div>
                    <div className="m-2" style={{ flex: "1", minHeight: "0" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: ".55em", minWidth: "0" }}>
                        <div className="m-box">
                          <span className="m-h">Attendance this week</span>
                          <div className="bars">
                            <span>
                              <i style={{ "--n": "0", height: "88%" }} />
                              M
                            </span>
                            <span>
                              <i style={{ "--n": "1", height: "92%" }} />
                              T
                            </span>
                            <span>
                              <i style={{ "--n": "2", height: "84%" }} />
                              W
                            </span>
                            <span>
                              <i style={{ "--n": "3", height: "95%" }} />
                              T
                            </span>
                            <span>
                              <i style={{ "--n": "4", height: "90%" }} />
                              F
                            </span>
                          </div>
                        </div>
                        <div className="m-box">
                          <span className="m-h">Leave requests</span>
                          <div className="lv2">
                            <span className="m-av b" data-tip="Design">NJ</span>
                            <div>
                              <b>Neha Joshi</b>
                              <span>2 days · Casual</span>
                            </div>
                            <span className="ok">Approve</span>
                          </div>
                          <div className="lv2">
                            <span className="m-av c" data-tip="Engineering">AN</span>
                            <div>
                              <b>Arjun Nair</b>
                              <span>1 day · Sick</span>
                            </div>
                            <span className="ok">Approve</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: ".55em", minWidth: "0" }}>
                        <div className="m-box">
                          <span className="m-h">Departments</span>
                          <div className="donut">
                            <span className="ring" />
                            <ul>
                              <li>
                                <i style={{ background: "var(--acc)" }} />
                                Engineering
                              </li>
                              <li>
                                <i style={{ background: "#8660F8" }} />
                                Operations
                              </li>
                              <li>
                                <i style={{ background: "#B991FF" }} />
                                Sales
                              </li>
                              <li>
                                <i style={{ background: "#5B4A86" }} />
                                People
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="m-box">
                          <span className="m-h">Payroll</span>
                          <b style={{ fontSize: ".86em" }}>November cycle</b>
                          <span className="m-mut">Scheduled for 28 Nov</span>
                        </div>
                        <div className="m-box">
                          <span className="m-h">Self-service</span>
                          <div className="ss">
                            <span>Payslips</span>
                            <span>Apply leave</span>
                            <span>Shift swap</span>
                          </div>
                          <div className="stk">
                            <span className="m-av">AR</span>
                            <span className="m-av b">KS</span>
                            <span className="m-av c">PN</span>
                            <span className="m-mut" style={{ marginLeft: ".5em" }}>Directory</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
              <p className="pp-hl">Everything Your People Need to Thrive.</p>
              <p className="pp-d">Manage attendance, shifts, leave, payroll, employee records and everyday HR operations through one powerful employee management platform.</p>
              <ul className="pp-chips" aria-label="Seek People features">
                <li>
                  Attendance
                  {' '}
                  &amp;
                  {' '}
                  Shifts
                </li>
                <li>
                  Payroll
                  {' '}
                  &amp;
                  {' '}
                  Leave
                </li>
                <li>Employee Records</li>
              </ul>
              <a className="pp-cta" href="#" data-route="seekPeople">
                Explore Seek People
                {' '}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
        <div className="s4-strip" data-e="">
          <ul>
            <li>
              <span className="si" aria-hidden="true">
                <svg viewBox="0 0 24 24"> <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
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
                <svg viewBox="0 0 24 24"> <path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>
              </span>
              <div>
                <strong>Designed for Growing Businesses</strong>
                <p>Flexible workforce solutions built around expanding teams.</p>
              </div>
            </li>
          </ul>
          <a className="btn btn-primary" href="#platform" data-route="platform">
            Explore the Platform
            {' '}
            <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
        <p className="s4-seo">Seek Now is workforce management software made of three connected products: Refer Now for employee referral software and talent discovery, Console for recruitment management software with an applicant tracking system and recruitment CRM, and Seek People for HRMS software covering attendance, payroll and employee management.</p>
      </div>
    </section>
  );
}
