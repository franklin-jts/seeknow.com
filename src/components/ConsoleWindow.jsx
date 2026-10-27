export default function ConsoleWindow() {
  return (
    <article className="win">
      <header className="win-label">
        <span className="win-name">CONSOLE</span>
        <span className="win-micro">Turn candidates into hires.</span>
      </header>
      <div className="frame" role="img" aria-label="Illustrative Console screen: hiring pipeline with applied, screening, interview and offer stages, today's interviews and hiring progress">
        <div className="bar">
          <i />
          <i />
          <i />
          <span className="url">console · seeknow</span>
          <span className="srch">Find a candidate</span>
        </div>
        <div className="app app-console">
          <aside className="aux">
            <span className="ic" />
            <span className="ic on" />
            <span className="ic" />
            <span className="ic" />
            <span className="ic" />
          </aside>
          <div className="main">
            <div className="mh">
              <div>
                <span className="h-sm">Pipeline</span>
                <div className="t">Senior Product Designer</div>
              </div>
              <div className="mh-r">
                <span className="count">24 candidates</span>
                <div className="tabs">
                  <span className="on">Pipeline</span>
                  <span>Interviews</span>
                  <span>Offers</span>
                </div>
              </div>
            </div>
            <div className="kb">
              <div className="col">
                <div className="col-h">
                  <span>Applied</span>
                  <em>9</em>
                </div>
                <div className="slot" />
                <div className="kc">
                  <b>Rohan Mehta</b>
                  <span>Applied 2d ago</span>
                </div>
                <div className="kc">
                  <b>Isha Kapoor</b>
                  <span>Referral</span>
                </div>
              </div>
              <div className="col">
                <div className="col-h">
                  <span>Screening</span>
                  <em>6</em>
                </div>
                <div className="slot" />
                <div className="kc">
                  <b>Dev Malhotra</b>
                  <span>Call today</span>
                </div>
                <div className="kc">
                  <b>Neha Joshi</b>
                  <span>Assessment</span>
                </div>
              </div>
              <div className="col">
                <div className="col-h">
                  <span>Interview</span>
                  <em>5</em>
                </div>
                <div className="slot" />
                <div className="kc">
                  <b>Arjun Nair</b>
                  <span>Panel · Thu</span>
                </div>
                <div className="kc">
                  <b>Meera Iyer</b>
                  <span>Round 2</span>
                </div>
              </div>
              <div className="col">
                <div className="col-h">
                  <span>Offer</span>
                  <em>2</em>
                </div>
                <div className="slot" />
                <div className="kc">
                  <b>Kabir Sethi</b>
                  <span>Offer sent</span>
                </div>
                <div className="kc">
                  <b>Tara Bose</b>
                  <span>Accepted</span>
                </div>
              </div>
              <div className="trav">
                <span className="av">AR</span>
                <div>
                  <b>Ananya Rao</b>
                  <span>From Refer Now</span>
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="card">
                <span className="h-sm">Today's interviews</span>
                <div className="iv">
                  <time>11:30</time>
                  <div>
                    <b>Ananya Rao</b>
                    <span>Portfolio review · Panel</span>
                  </div>
                  <span className="stack">
                    <span className="av a2">KS</span>
                    <span className="av a3">PN</span>
                    <span className="av a4">RM</span>
                  </span>
                </div>
                <div className="iv">
                  <time>15:00</time>
                  <div>
                    <b>Rohan Mehta</b>
                    <span>Intro call · Recruiter</span>
                  </div>
                  <span className="stack">
                    <span className="av a3">PN</span>
                  </span>
                </div>
              </div>
              <div className="card">
                <span className="h-sm">Hiring progress</span>
                <div className="big">
                  2 of 3
                  <small>hires</small>
                </div>
                <div className="bar-track"> <i style={{ width: "66%" }} /></div>
                <span className="note">Target date 15 Dec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
