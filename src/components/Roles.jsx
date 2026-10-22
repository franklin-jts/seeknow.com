import useInit from '../hooks/useInit';
import init from '../scripts/s5-roles.js';

export default function Roles() {
  useInit(init);
  return (
    <section className="s5 wrap" id="roles" aria-labelledby="s5-title">
      <div className="inner">
        <div className="s5-intro">
          <div className="s5-spot" aria-hidden="true" />
          <span className="eyebrow">Built Around Your Business</span>
          <h2 className="s5-h2" id="s5-title">
            <span className="hl">Different Roles.</span>
            <span className="hl">Different Challenges.</span>
            <span className="hl">One Seek Now.</span>
          </h2>
          <p className="s5-lede">Whether you're growing a company, managing people, hiring talent or managing your workday, Seek Now helps you work smarter.</p>
        </div>
        <div className="s5-emerge">
          <div className="rsel">
            <div className="rtabs" role="tablist" aria-label="Choose a role">
              <span className="rind" aria-hidden="true" />
              {' '}
              <button className="rtab" role="tab" type="button" id="rt-founders" aria-controls="rc-founders" aria-selected="true" tabIndex="0">
                <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
                Founders
              </button>
              {' '}
              <button className="rtab" role="tab" type="button" id="rt-hr" aria-controls="rc-hr" aria-selected="false" tabIndex="-1">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="9" cy="8" r="3.2" />
                  <circle cx="17" cy="9" r="2.5" />
                  <path d="M3 19c.7-3 3-4.5 6-4.5s5.3 1.5 6 4.5M15.5 14.3c2.6-.4 4.6.9 5.5 3.7" />
                </svg>
                HR Teams
              </button>
              {' '}
              <button className="rtab" role="tab" type="button" id="rt-recruiters" aria-controls="rc-recruiters" aria-selected="false" tabIndex="-1">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M20 20l-4.5-4.5M11 8.5v5M8.5 11h5" />
                </svg>
                Recruiters
              </button>
              {' '}
              <button className="rtab" role="tab" type="button" id="rt-employees" aria-controls="rc-employees" aria-selected="false" tabIndex="-1">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                  <path d="M11 18.5h2" />
                </svg>
                Employees
              </button>
            </div>
          </div>
          <div className="stage5" data-role="founders">
            <div className="amb" aria-hidden="true" />
            <div className="rcopy">
              <div className="rc is-on" id="rc-founders" role="tabpanel" aria-labelledby="rt-founders">
                <p className="rlabel" style={{ "--n": "0" }}>
                  01
                  {' '}
                  <span>/</span>
                  {' '}
                  BUSINESS OWNERS
                </p>
                <h3 style={{ "--n": "1" }}>Build Your Business. Not More Processes.</h3>
                <p className="rd" style={{ "--n": "2" }}>Keep hiring and workforce operations organised as your business grows, with a clearer view of recruitment activities and employee management.</p>
                <ul className="rcaps" style={{ "--n": "3" }}>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Workforce Visibility</strong>
                    <span className="cd">Headcount, attendance and departments at a glance</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Hiring Oversight</strong>
                    <span className="cd">Open roles and where each hire stands</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Organised Operations</strong>
                    <span className="cd">Workforce management software that keeps HR and hiring structured</span>
                  </li>
                </ul>
              </div>
              <div className="rc" id="rc-hr" role="tabpanel" aria-labelledby="rt-hr">
                <p className="rlabel" style={{ "--n": "0" }}>
                  02
                  {' '}
                  <span>/</span>
                  {' '}
                  HR TEAMS
                </p>
                <h3 style={{ "--n": "1" }}>More Time for People. Less Time on Admin.</h3>
                <p className="rd" style={{ "--n": "2" }}>Manage employee records, attendance, shifts, leave, payroll and everyday HR processes with Seek People.</p>
                <ul className="rcaps" style={{ "--n": "3" }}>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>
                      Attendance
                      {' '}
                      &amp;
                      {' '}
                      Leave
                    </strong>
                    <span className="cd">Employee attendance management, shifts and leave approvals</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Payroll Administration</strong>
                    <span className="cd">Payroll management, from locked attendance to disbursement</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Employee Management</strong>
                    <span className="cd">Records and documents kept in one HRMS software</span>
                  </li>
                </ul>
              </div>
              <div className="rc" id="rc-recruiters" role="tabpanel" aria-labelledby="rt-recruiters">
                <p className="rlabel" style={{ "--n": "0" }}>
                  03
                  {' '}
                  <span>/</span>
                  {' '}
                  RECRUITERS
                </p>
                <h3 style={{ "--n": "1" }}>Every Candidate. Every Stage. Under Control.</h3>
                <p className="rd" style={{ "--n": "2" }}>Organise candidate pipelines, manage interviews and simplify recruitment workflows using Console.</p>
                <ul className="rcaps" style={{ "--n": "3" }}>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>
                      Recruitment CRM
                      {' '}
                      &amp;
                      {' '}
                      ATS
                    </strong>
                    <span className="cd">Recruitment management software with an applicant tracking system</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Candidate Pipeline Management</strong>
                    <span className="cd">From applied to hired, one stage at a time</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Interview Coordination</strong>
                    <span className="cd">Schedules, panels and feedback together</span>
                  </li>
                </ul>
              </div>
              <div className="rc" id="rc-employees" role="tabpanel" aria-labelledby="rt-employees">
                <p className="rlabel" style={{ "--n": "0" }}>
                  04
                  {' '}
                  <span>/</span>
                  {' '}
                  EMPLOYEES
                </p>
                <h3 style={{ "--n": "1" }}>Your Workday. Made Simpler.</h3>
                <p className="rd" style={{ "--n": "2" }}>Access attendance, leave, shift information and relevant employee self-service features from one convenient application.</p>
                <ul className="rcaps" style={{ "--n": "3" }}>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>
                      Attendance
                      {' '}
                      &amp;
                      {' '}
                      Shifts
                    </strong>
                    <span className="cd">See today's shift and attendance status</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>
                      Leave
                      {' '}
                      &amp;
                      {' '}
                      Requests
                    </strong>
                    <span className="cd">Check balances and apply for leave</span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <strong>Employee Self-Service</strong>
                    <span className="cd">Employee self-service software for payslips and profile</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="vis">
              <div className="orbs" aria-hidden="true">
                <div className="orb o1"> <div className="spin" /></div>
                <div className="orb o2"> <div className="spin" /></div>
                <div className="orb o3"> <div className="spin" /></div>
                <span className="olab l1">Refer Now</span>
                <span className="olab l2">Console</span>
                <span className="olab l3">Seek People</span>
              </div>
              {/* Founders: conceptual executive view */}
              <div className="lay is-on" data-role="founders" role="img" aria-label="Conceptual executive workforce dashboard with headcount trend, attendance today, hiring pipeline, recruitment status and department breakdown, using sample data" style={{ "--wrgb": "185,145,255" }}>
                <div className="w5 fd">
                  <div className="w5-bar">
                    <i />
                    <i />
                    <i />
                    <b>Workforce overview</b>
                    <span className="tag">Executive view · concept</span>
                  </div>
                  <div className="w5-body">
                    <div className="mod ov" style={{ "--n": "0" }}>
                      <div className="mh5">
                        Headcount
                        {' '}
                        <em>This quarter</em>
                      </div>
                      <div className="ov-r">
                        <div className="big5">
                          142
                          <small>employees</small>
                        </div>
                        <span className="pill5 on">+6 this month</span>
                      </div>
                      <svg className="spark5" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points="0,30 0,22 12,21 25,19 37,19 50,15 62,14 75,11 87,9 100,6 100,30" />
                        <polyline points="0,22 12,21 25,19 37,19 50,15 62,14 75,11 87,9 100,6" />
                      </svg>
                    </div>
                    <div className="mod at" style={{ "--n": "1" }}>
                      <div className="mh5">Attendance today</div>
                      <div className="ring5">
                        <span className="r">
                          <b>92%</b>
                        </span>
                        <ul className="lg5">
                          <li>
                            Present
                            <b>131</b>
                          </li>
                          <li>
                            On leave
                            <b>8</b>
                          </li>
                          <li>
                            Not in
                            <b>3</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mod pi" style={{ "--n": "2" }}>
                      <div className="mh5">
                        Hiring pipeline
                        {' '}
                        <em>7 open roles</em>
                      </div>
                      <div className="stk5">
                        <i style={{ width: "49%", background: "rgba(185,145,255,.35)" }} />
                        <i style={{ width: "27%", background: "rgba(185,145,255,.55)" }} />
                        <i style={{ width: "15%", background: "rgba(185,145,255,.75)" }} />
                        <i style={{ width: "5%", background: "#B991FF" }} />
                        <i style={{ width: "4%", background: "#fff" }} />
                      </div>
                      <div className="stk-l">
                        <span>
                          <b>38</b>
                          Applied
                        </span>
                        <span>
                          <b>21</b>
                          Screen
                        </span>
                        <span>
                          <b>12</b>
                          Interview
                        </span>
                        <span>
                          <b>4</b>
                          Offer
                        </span>
                        <span>
                          <b>3</b>
                          Hired
                        </span>
                      </div>
                    </div>
                    <div className="mod dp sec5" style={{ "--n": "3" }}>
                      <div className="mh5">Departments</div>
                      <div className="dl5">
                        <div>
                          Engineering
                          <span className="trk"> <i style={{ width: "100%" }} /></span>
                          <em>46</em>
                        </div>
                        <div>
                          Operations
                          <span className="trk"> <i style={{ width: "83%" }} /></span>
                          <em>38</em>
                        </div>
                        <div>
                          Sales
                          <span className="trk"> <i style={{ width: "67%" }} /></span>
                          <em>31</em>
                        </div>
                        <div>
                          People
                          <span className="trk"> <i style={{ width: "30%" }} /></span>
                          <em>14</em>
                        </div>
                        <div>
                          Finance
                          <span className="trk"> <i style={{ width: "28%" }} /></span>
                          <em>13</em>
                        </div>
                      </div>
                    </div>
                    <div className="mod rs sec5" style={{ "--n": "4" }}>
                      <div className="mh5">Recruitment status</div>
                      <div className="rs5">
                        <span>Senior Product Designer</span>
                        <span className="pill5 on">Interview</span>
                      </div>
                      <div className="rs5">
                        <span>Backend Engineer</span>
                        <span className="pill5">Screening</span>
                      </div>
                      <div className="rs5">
                        <span>HR Business Partner</span>
                        <span className="pill5 on">Offer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* HR Teams: Seek People */}
              <div className="lay" data-role="hr" role="img" aria-hidden="true" aria-label="Seek People HRMS screen with today's attendance, employee directory, shift roster, leave requests and payroll progress, using sample data" style={{ "--wrgb": "94,211,200" }}>
                <div className="w5 hrd">
                  <div className="w5-bar">
                    <i />
                    <i />
                    <i />
                    <b>Seek People</b>
                    <span className="tag">Tue, 21 Oct</span>
                  </div>
                  <div className="w5-body">
                    <nav className="hnav" aria-hidden="true">
                      <span>Overview</span>
                      <span className="on">Employees</span>
                      <span>Attendance</span>
                      <span>Shifts</span>
                      <span>Leave</span>
                      <span>Payroll</span>
                      <span>Records</span>
                    </nav>
                    <div className="hmain">
                      <div className="hstat">
                        <div className="mod" style={{ "--n": "0" }}>
                          <span className="mut5">Present</span>
                          <span className="big5" style={{ fontSize: "1.5em" }}>131</span>
                        </div>
                        <div className="mod" style={{ "--n": "1" }}>
                          <span className="mut5">On leave</span>
                          <span className="big5" style={{ fontSize: "1.5em" }}>8</span>
                        </div>
                        <div className="mod" style={{ "--n": "2" }}>
                          <span className="mut5">Not checked in</span>
                          <span className="big5" style={{ fontSize: "1.5em" }}>3</span>
                        </div>
                      </div>
                      <div className="hgrid">
                        <div className="hcol">
                          <div className="mod" style={{ "--n": "3" }}>
                            <div className="mh5">
                              Employee directory
                              {' '}
                              <em>142</em>
                            </div>
                            <div className="tbl">
                              <div className="tr th">
                                <span>Name</span>
                                <span>Department</span>
                                <span>Shift</span>
                                <span>Status</span>
                              </div>
                              <div className="tr">
                                <span className="nm">
                                  <span className="av5">AR</span>
                                  Ananya Rao
                                </span>
                                <span>Design</span>
                                <span>General</span>
                                <span className="dotst">In</span>
                              </div>
                              <div className="tr">
                                <span className="nm">
                                  <span className="av5 b">KS</span>
                                  Karthik S.
                                </span>
                                <span>Design</span>
                                <span>General</span>
                                <span className="dotst">In</span>
                              </div>
                              <div className="tr">
                                <span className="nm">
                                  <span className="av5">NJ</span>
                                  Neha Joshi
                                </span>
                                <span>Operations</span>
                                <span>Morning</span>
                                <span className="dotst lv">Leave</span>
                              </div>
                              <div className="tr">
                                <span className="nm">
                                  <span className="av5 b">RM</span>
                                  Ravi Menon
                                </span>
                                <span>Engineering</span>
                                <span>Night</span>
                                <span className="dotst">In</span>
                              </div>
                            </div>
                          </div>
                          <div className="mod sec5" style={{ "--n": "4" }}>
                            <div className="mh5">Shift roster</div>
                            <div className="shifts">
                              <div>
                                <b>34</b>
                                <span>Morning</span>
                              </div>
                              <div>
                                <b>88</b>
                                <span>General</span>
                              </div>
                              <div>
                                <b>9</b>
                                <span>Night</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hcol">
                          <div className="mod" style={{ "--n": "5" }}>
                            <div className="mh5">
                              Leave requests
                              {' '}
                              <em>2 pending</em>
                            </div>
                            <div className="lvq">
                              <span className="av5">PN</span>
                              <div>
                                <b>Priya N.</b>
                                <span>2 days · Casual</span>
                              </div>
                              <span className="pill5 on">Review</span>
                            </div>
                            <div className="lvq">
                              <span className="av5 b">AN</span>
                              <div>
                                <b>Arjun Nair</b>
                                <span>1 day · Sick</span>
                              </div>
                              <span className="pill5 on">Review</span>
                            </div>
                          </div>
                          <div className="mod" style={{ "--n": "6" }}>
                            <div className="mh5">
                              Payroll
                              {' '}
                              <em>November</em>
                            </div>
                            <div className="steps">
                              <div className="dn">Attendance locked</div>
                              <div className="dn">Salary review</div>
                              <div>Approval</div>
                              <div>Disbursement · 30 Nov</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Recruiters: Console */}
              <div className="lay" data-role="recruiters" role="img" aria-hidden="true" aria-label="Console applicant tracking screen with open requirements, a five-stage pipeline where one sample candidate moves from applied to hired, today's interviews and recruitment activity" style={{ "--wrgb": "124,149,255" }}>
                <div className="w5 rd5">
                  <div className="w5-bar">
                    <i />
                    <i />
                    <i />
                    <b>Console</b>
                    <span className="tag">Recruitment</span>
                  </div>
                  <div className="w5-body">
                    <div className="mod" style={{ "--n": "0", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <span className="mh5">Open requirements</span>
                      <div className="rq">
                        <span className="pill5 on">Senior Product Designer</span>
                        <span className="pill5">Backend Engineer</span>
                        <span className="pill5 sec5">HR Business Partner</span>
                      </div>
                    </div>
                    <div className="kb5" style={{ "--n": "1" }}>
                      <div className="kc5">
                        <div className="kh5">
                          Applied
                          <em>9</em>
                        </div>
                        <div className="ks5" />
                        <div className="kd5">
                          <span className="av5 b">RM</span>
                          <span>Rohan M.</span>
                        </div>
                        <div className="kd5">
                          <span className="av5">IK</span>
                          <span>Isha K.</span>
                        </div>
                      </div>
                      <div className="kc5">
                        <div className="kh5">
                          Screening
                          <em>6</em>
                        </div>
                        <div className="ks5" />
                        <div className="kd5">
                          <span className="av5">DM</span>
                          <span>Dev M.</span>
                        </div>
                        <div className="kd5">
                          <span className="av5 b">SM</span>
                          <span>Sana M.</span>
                        </div>
                      </div>
                      <div className="kc5">
                        <div className="kh5">
                          Interview
                          <em>4</em>
                        </div>
                        <div className="ks5" />
                        <div className="kd5">
                          <span className="av5 b">AN</span>
                          <span>Arjun N.</span>
                        </div>
                        <div className="kd5">
                          <span className="av5">MI</span>
                          <span>Meera I.</span>
                        </div>
                      </div>
                      <div className="kc5">
                        <div className="kh5">
                          Offer
                          <em>2</em>
                        </div>
                        <div className="ks5" />
                        <div className="kd5">
                          <span className="av5">KS</span>
                          <span>Kabir S.</span>
                        </div>
                      </div>
                      <div className="kc5">
                        <div className="kh5">
                          Hired
                          <em>1</em>
                        </div>
                        <div className="ks5" />
                        <div className="kd5">
                          <span className="av5 b">TB</span>
                          <span>Tara B.</span>
                        </div>
                      </div>
                      <div className="ktr">
                        <span className="av5">AR</span>
                        <span>Ananya Rao</span>
                      </div>
                    </div>
                    <div className="rbot">
                      <div className="mod" style={{ "--n": "2" }}>
                        <div className="mh5">Interviews today</div>
                        <div className="ivr">
                          <time>11:30</time>
                          <span>
                            <b>Ananya Rao</b>
                            {' '}
                            · Portfolio review
                          </span>
                        </div>
                        <div className="ivr">
                          <time>15:00</time>
                          <span>
                            <b>Rohan Mehta</b>
                            {' '}
                            · Intro call
                          </span>
                        </div>
                        <div className="ivr">
                          <time>17:15</time>
                          <span>
                            <b>Sana Mirza</b>
                            {' '}
                            · Design task
                          </span>
                        </div>
                      </div>
                      <div className="mod sec5" style={{ "--n": "3" }}>
                        <div className="mh5">Activity</div>
                        <div className="acr">Kabir moved to Offer</div>
                        <div className="acr">Panel feedback added for Arjun</div>
                        <div className="acr">Interview booked with Sana</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Employees: Seek People mobile */}
              <div className="lay" data-role="employees" role="img" aria-hidden="true" aria-label="Seek People mobile app showing a personal dashboard with assigned shift, attendance status, leave balances, a leave application button and profile, using sample data" style={{ "--wrgb": "94,211,200" }}>
                <div className="w5" style={{ background: "none", border: "0", boxShadow: "none", overflow: "visible", position: "relative" }}>
                  <div className="note5">
                    <span className="nic">
                      <svg viewBox="0 0 24 24">
                        <rect x="4" y="5" width="16" height="15" rx="2" />
                        <path d="M4 10h16M9 3v4M15 3v4" />
                      </svg>
                    </span>
                    <div>
                      <b>General shift</b>
                      <span>Today · 09:00 to 18:00</span>
                    </div>
                  </div>
                  <div className="note5 n2">
                    <span className="nic">
                      <svg viewBox="0 0 24 24"> <path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <div>
                      <b>Leave balance updated</b>
                      <span>Earned leave · 12 days</span>
                    </div>
                  </div>
                  <div className="phone">
                    <div className="pscr">
                      <div className="phd">
                        <span className="av5">AR</span>
                        <div>
                          <b>Hi, Ananya</b>
                          <span>Senior Product Designer · SN-0428</span>
                        </div>
                      </div>
                      <div className="pcard hero5">
                        <div className="mh5" style={{ color: "#E6F8F6" }}>Today's attendance</div>
                        <div className="pst">
                          <span className="a">Shift starts 09:00</span>
                          <span className="b">Checked in · 09:12</span>
                        </div>
                        <span className="mut5">General shift · 09:00 to 18:00</span>
                        <span className="pbtn">Clock out</span>
                      </div>
                      <div className="pcard lvc">
                        <div className="mh5">Leave balance</div>
                        <div className="plv">
                          <div>
                            <b>12</b>
                            <span>Earned</span>
                          </div>
                          <div>
                            <b>6</b>
                            <span>Casual</span>
                          </div>
                          <div>
                            <b>4</b>
                            <span>Sick</span>
                          </div>
                        </div>
                      </div>
                      <span className="pbtn" style={{ background: "rgba(var(--wrgb),.22)", borderColor: "rgba(var(--wrgb),.5)" }}>Apply for leave</span>
                      <div className="pcard">
                        <div className="mh5">Quick access</div>
                        <div className="ss" style={{ display: "flex", gap: ".3em", flexWrap: "wrap" }}>
                          <span className="pill5">Payslips</span>
                          <span className="pill5">My profile</span>
                          <span className="pill5">Shift swap</span>
                        </div>
                      </div>
                      <div className="ptab5">
                        <i className="on" />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sweep" aria-hidden="true" /> </div></div>
        </div>
        <div className="s5-end">
          <h3>One Ecosystem. Built Around Everyone Who Works.</h3>
          <p>From leadership and recruitment teams to HR professionals and employees, Seek Now supports the people and processes behind growing businesses.</p>
          <a className="btn btn-primary" href="#" data-route="solutions">
            Explore Seek Now Solutions
            {' '}
            <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
