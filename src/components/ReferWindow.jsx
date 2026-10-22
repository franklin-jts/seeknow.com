export default function ReferWindow() {
  return (
    <article className="win">
      <header className="win-label">
        <span className="win-name">REFER NOW</span>
        <span className="win-micro">Discover the right talent.</span>
      </header>
      <div className="frame" role="img" aria-label="Illustrative Refer Now screen: recommended referred candidates for a Senior Product Designer role">
        <div className="bar">
          <i />
          <i />
          <i />
          <span className="url">refer · seeknow</span>
          <span className="srch">Search roles, skills, people</span>
        </div>
        <div className="app app-refer">
          <aside className="aux">
            <span className="h-sm">Open roles</span>
            <div className="role on">
              <b>Senior Product Designer</b>
              <span>Bengaluru · Design</span>
              <em>3 referrals</em>
            </div>
            <div className="role">
              <b>Backend Engineer, Node.js</b>
              <span>Remote · Engineering</span>
              <em>5 referrals</em>
            </div>
            <div className="role">
              <b>HR Business Partner</b>
              <span>Pune · People</span>
              <em>2 referrals</em>
            </div>
            <div className="mine">
              <span className="h-sm">Your referrals</span>
              <div className="mine-r">
                <b>4</b>
                <span>referred</span>
                <b>1</b>
                <span>hired</span>
              </div>
            </div>
          </aside>
          <div className="main">
            <div className="mh">
              <div>
                <span className="h-sm">Recommended for</span>
                <div className="t">Senior Product Designer</div>
              </div>
              <div className="tabs">
                <span className="on">Referrals</span>
                <span>Community</span>
                <span>Applied</span>
              </div>
            </div>
            <div className="cand focus">
              <span className="av">AR</span>
              <div className="c-m">
                <b>Ananya Rao</b>
                <span>Product Designer · 6 yrs · Bengaluru</span>
                <span className="by">Referred by Karthik S., Design</span>
              </div>
              <div className="c-r">
                <span className="match">94% match</span>
                <span className="pill lav">Shortlisted</span>
              </div>
            </div>
            <div className="cand">
              <span className="av a2">VK</span>
              <div className="c-m">
                <b>Vikram Kulkarni</b>
                <span>UX Designer · 4 yrs · Mumbai</span>
                <span className="by">Community referral · Priya N.</span>
              </div>
              <div className="c-r">
                <span className="match">88% match</span>
                <span className="pill solid">In review</span>
              </div>
            </div>
            <div className="cand">
              <span className="av a3">SM</span>
              <div className="c-m">
                <b>Sana Mirza</b>
                <span>Interaction Designer · 5 yrs · Hyderabad</span>
                <span className="by">Applied via careers page</span>
              </div>
              <div className="c-r">
                <span className="match">85% match</span>
                <span className="pill">New</span>
              </div>
            </div>
            <div className="act">
              <span className="h-sm">Activity</span>
              <p>
                <b>Karthik S.</b>
                {' '}
                referred Ananya Rao
                <time>2h</time>
              </p>
              <p>
                <b>Priya N.</b>
                {' '}
                shared Backend Engineer with her network
                <time>5h</time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
