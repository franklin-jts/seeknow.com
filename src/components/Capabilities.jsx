import useInit from '../hooks/useInit';
import init from '../scripts/s6-capabilities.js';

export default function Capabilities() {
  useInit(init);
  return (
    <section className="s6 wrap" id="capabilities" aria-labelledby="s6-title">
      <div className="inner">
        <div className="s6-intro">
          <span className="eyebrow">Engineered for Modern Workforces</span>
          <h2 className="s6-h2" id="s6-title">
            Technology That Works as Hard as
            {' '}
            <em>Your People.</em>
          </h2>
          <p className="s6-lede">Discover the powerful features behind Seek Now — designed to bring greater accuracy, flexibility and control to everyday workforce operations.</p>
          <span className="s6-tag">Powerful by design · Practical by nature</span>
        </div>
        <div className="s6-track">
          <div className="s6-stage">
            <div className="s6-rail" aria-hidden="true">
              <i className="fill" />
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
            <div className="s6-texts">
              <article className="c6-ch" data-c="0" style={{ "--r": "1", "--cacc": "#62D9C9" }} aria-labelledby="c6-h1">
                <p className="c6-eyebrow">
                  01
                  {' '}
                  <span>/</span>
                  {' '}
                  SMART ATTENDANCE
                </p>
                <h3 id="c6-h1">Every Check-In. Accounted For.</h3>
                <p>Make attendance management more reliable with face recognition, location-aware check-ins and shift-based attendance tracking.</p>
                <ul className="c6-feats">
                  <li data-feature="faceRecognition">Face Recognition</li>
                  <li data-feature="locationAttendance">Location-Aware Attendance</li>
                  <li data-feature="shiftTracking">Shift Tracking</li>
                </ul>
              </article>
              <article className="c6-ch" data-c="1" style={{ "--r": "3", "--cacc": "#B991FF" }} aria-labelledby="c6-h2">
                <p className="c6-eyebrow">
                  02
                  {' '}
                  <span>/</span>
                  {' '}
                  PAYROLL
                  {' '}
                  &amp;
                  {' '}
                  COMPLIANCE
                </p>
                <h3 id="c6-h2">Complex Payroll. Clearer Processes.</h3>
                <p>Organise payroll inputs, salary components and statutory deductions through structured payroll workflows designed for Indian businesses.</p>
                <ul className="c6-feats">
                  <li data-feature="payroll">Payroll Processing</li>
                  <li data-feature="statutory">Statutory Components</li>
                  <li data-feature="salaryAdmin">Salary Administration</li>
                </ul>
              </article>
              <article className="c6-ch" data-c="2" style={{ "--r": "5", "--cacc": "#7C95FF" }} aria-labelledby="c6-h3">
                <p className="c6-eyebrow">
                  03
                  {' '}
                  <span>/</span>
                  {' '}
                  FLEXIBLE WORKFORCE OPERATIONS
                </p>
                <h3 id="c6-h3">Your Workforce. Your Way of Working.</h3>
                <p>Configure shifts, attendance cycles and role-based access to support the way your organisation operates.</p>
                <ul className="c6-feats">
                  <li data-feature="shiftConfig">Shift Configuration</li>
                  <li data-feature="attendanceCycles">Attendance Cycles</li>
                  <li data-feature="rbac">Role-Based Access</li>
                </ul>
              </article>
            </div>
            <div className="s6-vis">
              {/* Scene 1: attendance phone */}
              <div className="c6-scene c6-phs" data-s="0" style={{ "--r": "2" }}>
                <span className="c6-simtag">Simulation · sample data</span>
                <div className="c6-loc" aria-hidden="true">
                  <span className="pin">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <b>Location check</b>
                    <small>Inside Bengaluru office zone</small>
                  </div>
                </div>
                <div className="c6-shift" aria-hidden="true">
                  <span>Assigned shift</span>
                  <b>General · 09:00 to 18:00</b>
                </div>
                <div className="ph-wrap">
                  <div className="c6-phone" role="img" aria-label="Simulated Seek People attendance app: an employee opens the app, completes an illustrative face verification step and their status changes to checked in at 09:12, with shift details and attendance history. Sample data only.">
                    <div className="ph-scr">
                      <div className="ph-sb">
                        <span>9:41</span>
                        <span>●●● ▮</span>
                      </div>
                      <div className="ph-dark" />
                      <div className="ph-hd">
                        <span className="av">AR</span>
                        <div>
                          <b>Ananya Rao</b>
                          <small>SN-0428 · Design</small>
                        </div>
                      </div>
                      <div className="ph-card ph-date">
                        <span className="lb">Today</span>
                        <b>Tuesday, 21 October</b>
                        <span>General shift · 09:00 to 18:00</span>
                      </div>
                      <div className="ph-card">
                        <span className="lb">Attendance status</span>
                        <div className="ph-st">
                          <span className="s1">Not checked in</span>
                          <span className="s2">Checked In · 09:12</span>
                        </div>
                        <span className="ph-loc">Verified · Bengaluru office zone</span>
                      </div>
                      <div className="ph-btn">
                        <span className="b1">Check in with face verification</span>
                        <span className="b2">Checked in at 09:12</span>
                      </div>
                      <div className="ph-card">
                        <span className="lb">This week</span>
                        <div className="ph-hist">
                          <div className="today">
                            <b>Tue 21</b>
                            <span>
                              <span className="t1">Awaiting check-in</span>
                              <span className="t2">09:12 · in progress</span>
                            </span>
                            <em className="t2">In</em>
                          </div>
                          <div>
                            <b>Mon 20</b>
                            <span>09:04 – 18:11</span>
                            <em>Present</em>
                          </div>
                          <div>
                            <b>Fri 17</b>
                            <span>09:10 – 18:05</span>
                            <em>Present</em>
                          </div>
                        </div>
                      </div>
                      <div className="ph-scan">
                        <h4>Face verification</h4>
                        <div className="ph-frame">
                          <svg viewBox="0 0 100 120">
                            <ellipse cx="50" cy="44" rx="24" ry="30" />
                            <path d="M14 120c4-22 18-32 36-32s32 10 36 32" />
                          </svg>
                          <span className="ph-corner" />
                          <span className="ph-corner ok" />
                          <span className="ph-line" />
                        </div>
                        <p>Position your face inside the frame</p>
                        <div className="ph-ok">
                          <i>✓</i>
                          Verified
                        </div>
                        <span className="ph-sim">Illustrative simulation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Scene 2: payslip */}
              <div className="c6-scene c6-pss" data-s="1" style={{ "--r": "4" }}>
                <div className="ps-wrap">
                  <span className="ps-simtag">Sample payslip · illustrative figures</span>
                  {' '}
                  <span className="ps-glass g1" aria-hidden="true" />
                  <span className="ps-glass g2" aria-hidden="true" />
                  <div className="ps-doc" role="group" aria-label="Sample payslip for October 2026 with earnings, statutory deductions and net pay">
                    <div className="ps-top">
                      <div className="ps-brand">
                        <i>SP</i>
                        <div>
                          <b>Payslip</b>
                          <small>Seek People · Payroll</small>
                        </div>
                      </div>
                      <div className="ps-per">
                        Pay period
                        <b>October 2026</b>
                      </div>
                    </div>
                    <div className="ps-emp">
                      <div>
                        Employee
                        <b>Ananya Rao</b>
                      </div>
                      <div>
                        Employee ID
                        <b>SN-0428</b>
                      </div>
                      <div>
                        Designation
                        <b>Senior Product Designer</b>
                      </div>
                      <div>
                        Paid days
                        <b>31 of 31</b>
                      </div>
                    </div>
                    <div className="ps-cols">
                      <div>
                        <div className="ps-h">Earnings</div>
                        <div className="ps-row" style={{ "--s": ".06" }}>
                          <span>Basic salary</span>
                          <b>₹30,000</b>
                        </div>
                        <div className="ps-row" style={{ "--s": ".12" }}>
                          <span>House rent allowance</span>
                          <b>₹12,000</b>
                        </div>
                        <div className="ps-row" style={{ "--s": ".18" }}>
                          <span>Special allowance</span>
                          <b>₹13,000</b>
                        </div>
                        <div className="ps-row tot" style={{ "--s": ".26" }}>
                          <span>Gross earnings</span>
                          <b>₹55,000</b>
                        </div>
                      </div>
                      <div>
                        <div className="ps-h">Deductions</div>
                        <div className="ps-row" style={{ "--s": ".32", "--dx": "1.2em" }}>
                          <span>Provident Fund (employee, 12%)</span>
                          <b>₹3,600</b>
                        </div>
                        <div className="ps-row" style={{ "--s": ".38", "--dx": "1.2em" }}>
                          <span>Professional Tax (Karnataka)</span>
                          <b>₹200</b>
                        </div>
                        <div className="ps-row na" style={{ "--s": ".44", "--dx": "1.2em" }}>
                          <span>ESI</span>
                          <b>Not applicable</b>
                        </div>
                        <div className="ps-row" style={{ "--s": ".5", "--dx": "1.2em" }}>
                          <span>Income tax (TDS)</span>
                          <b>₹1,250</b>
                        </div>
                        <div className="ps-row tot" style={{ "--s": ".56", "--dx": "1.2em" }}>
                          <span>Total deductions</span>
                          <b>₹5,050</b>
                        </div>
                      </div>
                    </div>
                    <div className="ps-net">
                      <div>
                        <span>Net pay</span>
                        <small>₹55,000 − ₹5,050</small>
                      </div>
                      <b data-net="">₹49,950</b>
                    </div>
                    <div className="ps-foot">
                      <span>Statutory deductions vary with eligibility, wage ceilings and state rules.</span>
                      <span className="ps-status">Processed</span>
                    </div>
                  </div>
                  <div className="ps-sum" aria-hidden="true">
                    <span>Payroll summary</span>
                    <b>October run · Payslips ready</b>
                  </div>
                </div>
              </div>
              {/* Scene 3: scheduler */}
              <div className="c6-scene c6-scs" data-s="2" style={{ "--r": "6" }}>
                <div className="sch-wrap">
                  <span className="c6-done" aria-hidden="true">
                    <i />
                    Interactive preview · sample schedule
                  </span>
                  <div className="c6-cal" data-f="all" role="group" aria-label="Interactive sample weekly shift planner. Changes affect this preview only.">
                    <div className="cal-bar">
                      <h4>Shift planner</h4>
                      <span className="wk">20 – 26 Oct 2026</span>
                      <div className="cal-tools">
                        <div className="seg6" role="group" aria-label="Highlight shift type">
                          <button type="button" data-f="all" aria-pressed="true">All</button>
                          {' '}
                          <button type="button" data-f="M" aria-pressed="false">Morning</button>
                          {' '}
                          <button type="button" data-f="G" aria-pressed="false">General</button>
                          {' '}
                          <button type="button" data-f="R" aria-pressed="false">Rotational</button>
                        </div>
                      </div>
                    </div>
                    <div className="cal-cyc">
                      <span>
                        Attendance cycle:
                        {' '}
                        <b data-cyc-label="">1 Oct – 31 Oct</b>
                      </span>
                      <div className="seg6" role="radiogroup" aria-label="Sample attendance cycle">
                        <button type="button" role="radio" aria-checked="true" data-cyc="1 Oct – 31 Oct">Calendar month</button>
                        {' '}
                        <button type="button" role="radio" aria-checked="false" data-cyc="26 Sep – 25 Oct">26th to 25th</button>
                      </div>
                    </div>
                    <div className="cal-grid">
                      <div />
                      <div className="cal-dh">
                        Mon
                        <b>20</b>
                      </div>
                      <div className="cal-dh">
                        Tue
                        <b>21</b>
                      </div>
                      <div className="cal-dh">
                        Wed
                        <b>22</b>
                      </div>
                      <div className="cal-dh">
                        Thu
                        <b>23</b>
                      </div>
                      <div className="cal-dh c6-wk">
                        Fri
                        <b>24</b>
                      </div>
                      <div className="cal-dh we c6-wk">
                        Sat
                        <b>25</b>
                      </div>
                      <div className="cal-dh we c6-wk">
                        Sun
                        <b>26</b>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">AR</span>
                        <span>
                          <b>Ananya Rao</b>
                          <small>Design</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.000" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.024" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.049" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.073" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G c6-wk" style={{ "--d": "0.098" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.122" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.146" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">RM</span>
                        <span>
                          <b>Ravi Menon</b>
                          <small>Operations</small>
                        </span>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.171" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.195" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk G c6-rv" style={{ "--d": "0.220" }}>
                        <span className="c6-r1">
                          Morning
                          <small>06–14</small>
                        </span>
                        <span className="c6-r2">
                          General
                          <small>09–18</small>
                        </span>
                        <em className="c6-badge">Reassigned</em>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.244" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M c6-wk" style={{ "--d": "0.268" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M c6-wk" style={{ "--d": "0.293" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.317" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">NJ</span>
                        <span>
                          <b>Neha Joshi</b>
                          <small>Operations</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.341" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.366" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off" style={{ "--d": "0.390" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.415" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R c6-wk" style={{ "--d": "0.439" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R c6-wk" style={{ "--d": "0.463" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R c6-wk" style={{ "--d": "0.488" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">KS</span>
                        <span>
                          <b>Karthik S.</b>
                          <small>Design</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.512" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.537" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.561" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G" style={{ "--d": "0.585" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk G c6-wk" style={{ "--d": "0.610" }}>
                        <span>
                          General
                          <small>09–18</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.634" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.659" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">PN</span>
                        <span>
                          <b>Priya N.</b>
                          <small>Support</small>
                        </span>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.683" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.707" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M" style={{ "--d": "0.732" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off" style={{ "--d": "0.756" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk M c6-wk" style={{ "--d": "0.780" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk M c6-wk" style={{ "--d": "0.805" }}>
                        <span>
                          Morning
                          <small>06–14</small>
                        </span>
                      </div>
                      <div className="c6-blk R c6-wk" style={{ "--d": "0.829" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-emp">
                        <span className="c6-av">AN</span>
                        <span>
                          <b>Arjun Nair</b>
                          <small>Engineering</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.854" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.878" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.902" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk R" style={{ "--d": "0.927" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.951" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk c6-off c6-wk" style={{ "--d": "0.976" }}>
                        <span>Week off</span>
                      </div>
                      <div className="c6-blk R c6-wk" style={{ "--d": "1.000" }}>
                        <span>
                          Rotational
                          <small>14–22</small>
                        </span>
                      </div>
                    </div>
                    <div className="cal-toast">
                      <b>Ravi Menon</b>
                      {' '}
                      moved from Morning to General on Wed 22
                      <em>Preview only</em>
                    </div>
                  </div>
                  <div className="c6-acc" data-r="mgr" role="group" aria-label="Sample role-based access preview">
                    <h4>
                      Access permissions
                      {' '}
                      <small>Sample</small>
                    </h4>
                    <div className="seg6" role="radiogroup" aria-label="Preview a role">
                      <button type="button" role="radio" aria-checked="false" data-r="hr">HR Admin</button>
                      {' '}
                      <button type="button" role="radio" aria-checked="true" data-r="mgr">Manager</button>
                      {' '}
                      <button type="button" role="radio" aria-checked="false" data-r="emp">Employee</button>
                    </div>
                    <ul>
                      <li data-on="hr mgr">
                        View team attendance
                        <i aria-hidden="true" />
                      </li>
                      <li data-on="hr mgr">
                        Approve leave
                        <i aria-hidden="true" />
                      </li>
                      <li data-on="hr mgr">
                        Edit team shifts
                        <i aria-hidden="true" />
                      </li>
                      <li data-on="hr">
                        Run payroll
                        <i aria-hidden="true" />
                      </li>
                      <li data-on="hr mgr emp">
                        View own payslip
                        <i aria-hidden="true" />
                      </li>
                    </ul>
                    <p className="note" data-perm-note="">Managers see and manage their own team.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="s6-end">
          <h3>Powerful Features. Thoughtfully Connected.</h3>
          <p>Explore workforce tools designed to support the real demands of hiring and managing people.</p>
          <a className="btn btn-primary" href="#" data-route="seekPeople">
            Explore Seek People Features
            {' '}
            <span className="arr" aria-hidden="true">→</span>
          </a>
          <p className="s6-seo">Seek People combines employee attendance management software, including face recognition attendance and location-aware check-ins, with shift management software and workforce scheduling software. Its payroll management software handles salary components, payroll and statutory compliance inputs such as PF, ESI and Professional Tax, as HRMS software in India built for growing teams.</p>
        </div>
      </div>
    </section>
  );
}
