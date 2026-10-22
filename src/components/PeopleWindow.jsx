export default function PeopleWindow() {
  return (
    <article className="win">
      <header className="win-label">
        <span className="win-name">SEEK PEOPLE</span>
        <span className="win-micro">Manage your people, effortlessly.</span>
      </header>
      <div className="frame" role="img" aria-label="Illustrative Seek People screen: new joiner profile with attendance, leave balances, payroll status and team analytics">
        <div className="bar">
          <i />
          <i />
          <i />
          <span className="url">people · seeknow</span>
          <span className="srch">Search employees</span>
        </div>
        <div className="app app-people">
          <aside className="aux">
            <span className="h-sm">Workspace</span>
            <span className="nv">Overview</span>
            <span className="nv on">Employees</span>
            <span className="nv">Attendance</span>
            <span className="nv">Leave</span>
            <span className="nv">Payroll</span>
            <span className="nv">Performance</span>
            <span className="nv">Reimbursements</span>
          </aside>
          <div className="main">
            <div className="prof">
              <span className="av">AR</span>
              <div className="prof-m">
                <b>
                  Ananya Rao
                  {' '}
                  <span className="pill lav newj">New joiner</span>
                </b>
                <span>Senior Product Designer · Design · SN-0428</span>
              </div>
              <div className="onb">
                <div className="onb-l">
                  <span>Onboarding · 3 of 4</span>
                  <span>Onboarding complete</span>
                </div>
                <div className="bar-track"> <i /></div>
              </div>
            </div>
            <div className="tiles">
              <div className="card">
                <div className="kv">
                  <span className="h-sm">Attendance</span>
                  <span className="pill solid">Present</span>
                </div>
                <div className="big">
                  09:12
                  <small>checked in</small>
                </div>
                <span className="note">General shift · 09:00 to 18:00</span>
                <div className="wk">
                  <span>
                    <i />
                    M
                  </span>
                  <span>
                    <i />
                    T
                  </span>
                  <span className="lv">
                    <i />
                    W
                  </span>
                  <span>
                    <i />
                    T
                  </span>
                  <span className="td">
                    <i />
                    F
                  </span>
                </div>
              </div>
              <div className="card">
                <span className="h-sm">Leave balance</span>
                <div className="lvr">
                  Earned
                  <div className="bar-track"> <i style={{ width: "67%" }} /></div>
                  <em>12/18</em>
                </div>
                <div className="lvr">
                  Casual
                  <div className="bar-track"> <i style={{ width: "75%" }} /></div>
                  <em>6/8</em>
                </div>
                <div className="lvr">
                  Sick
                  <div className="bar-track"> <i style={{ width: "67%" }} /></div>
                  <em>4/6</em>
                </div>
              </div>
              <div className="card">
                <span className="h-sm">Payroll</span>
                <div className="t">November cycle</div>
                <span className="note">Runs 28 Nov · Payslips 30 Nov</span>
                <div className="chk">
                  <span className="pill">PF ✓</span>
                  <span className="pill">ESI ✓</span>
                  <span className="pill">PT ✓</span>
                </div>
              </div>
              <div className="card">
                <div className="kv">
                  <span className="h-sm">Headcount</span>
                  <span className="note">+6 this month</span>
                </div>
                <div className="big">
                  142
                  <small>employees</small>
                </div>
                <svg className="spark" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <polygon points="0,30 0,24 14,22 28,23 42,18 56,17 70,12 84,10 100,5 100,30" />
                  <polyline points="0,24 14,22 28,23 42,18 56,17 70,12 84,10 100,5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
