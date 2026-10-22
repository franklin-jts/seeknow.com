import logo from '../assets/seek-now-logo.png';

export default function Header() {
  return (
    <>
      {/* ── Fixed top bar — always on top (z-index:60) ── */}
      <header className="site-header" id="top-header">
        <div className="wrap">
          <div className="inner">
            <div className="nav">
              {/* Logo — hidden until user scrolls past hero */}
              <a className="logo nav-logo" href="#top" data-route="home" aria-label="Seek Now home">
                <img className="logo-img" src={logo} alt="Seek Now" width="136" height="34" />
              </a>

              {/* Single toggle button — CSS switches ☰ ↔ ✕ */}
              <button
                className="burger"
                type="button"
                id="burger"
                aria-expanded="false"
                aria-controls="m-panel"
                aria-label="Open menu"
              >
                <span className="bur-icon">
                  <i /><i /><i />
                </span>
                <span className="bur-close" aria-hidden="true">✕</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay — sibling so backdrop-filter can't trap it ── */}
      <div className="m-panel" id="m-panel" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="m-panel-top wrap">
          <div className="inner">
            <div className="m-panel-bar" />
          </div>
        </div>

        <nav className="m-nav wrap" aria-label="Mobile navigation">
          <div className="inner">
            <ul className="m-nav-list">
              <li>
                <a href="#" data-route="products">
                  <span>Products</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#" data-route="solutions">
                  <span>Solutions</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#" data-route="platform">
                  <span>Features</span>
                </a>
              </li>
              <li>
                <a href="#" data-route="resources">
                  <span>Why Us</span>
                </a>
              </li>
              <li>
                <a href="#" data-route="company">
                  <span>About</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="m-panel-foot wrap">
          <div className="inner">
            <div className="m-foot-bar">
              <a className="m-login" href="#" data-route="login">Log in</a>
              <a className="m-book-demo" href="#" data-route="demo">Book a Demo</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
