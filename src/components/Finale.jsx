export default function Finale() {
  return (
    <section className="s10 wrap" id="finale" aria-labelledby="s10-title">
      <div className="s10-bg" aria-hidden="true" />
      <div className="s10-amb" aria-hidden="true" />
      <div className="s10-hz" aria-hidden="true">
        <span className="glow" />
        <span className="haze" />
        <span className="arc" />
      </div>
      <div className="s10-in">
        <span className="eyebrow">Your Next Chapter Starts Here</span>
        <h2 className="s10-h2" id="s10-title">
          <span>Your People.</span>
          <span>Your Potential.</span>
          <span>Your Future.</span>
        </h2>
        <p className="s10-p">Build what's next with Seek Now. Discover a better way to bring talent, teams and technology together.</p>
        <div className="s10-ctas">
          <a className="btn btn-primary" href="#" data-route="demo">
            Book a Demo
            {' '}
            <span className="arr" aria-hidden="true">↗</span>
          </a>
          {' '}
          <a className="btn btn-ghost" href="#" data-route="contact">
            Talk to Our Team
            {' '}
            <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <span className="s10-line" aria-hidden="true" />
    </section>
  );
}
