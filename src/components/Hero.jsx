import logo from '../assets/seek-now-logo.png';
import Spotlight from './Spotlight.jsx';

export default function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-h">
      <div className="atmos" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="glow" />
        <div className="vignette" />
      </div>
      <Spotlight className="inner" scope=".hero">
        {(lit) => (
          <>
            {/* Hero logo — replaces badge; flies to nav on scroll */}
            <div className="hero-logo-wrap" id="hero-logo" aria-hidden="true">
              <img
                className="hero-logo-img"
                src={logo}
                alt=""
                draggable="false"
              />
            </div>

            <h1 id="hero-h">
              <span className="l l1">India's First</span>
              {' '}
              <span className="l l2">
                <span className="w">Workforce</span>
                {' '}
                <span className="w">Operating</span>
                {' '}
                <span className="w">System</span>
              </span>
              {' '}
              {/* <span className="l l3">Seek Now.</span> */}
            </h1>
            <p className="sub">From discovering the right talent to managing your people every day, Seek Now is India's first Workforce Operating System: talent discovery, recruitment and employee management in one connected ecosystem.</p>
            <div className="ctas">
              <a className="btn btn-primary" href="#platform" data-route="explore">
                Explore the Platform
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
          </>
        )}
      </Spotlight>
    </section>
  );
}
