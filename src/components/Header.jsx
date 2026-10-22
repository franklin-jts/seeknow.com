import logo from '../assets/seek-now-logo.png';

export default function Header() {
  return (
    <>
      {/* ── Fixed top bar ── */}
      <header className="site-header" id="top-header">
        <div className="wrap">
          <div className="inner">
            <nav className="nav" aria-label="Main navigation">

              {/* Logo */}
              <a className="logo nav-logo" href="#top" data-route="home" aria-label="Seek Now home">
                <img className="logo-img" src={logo} alt="Seek Now" width="136" height="34" />
              </a>

              {/* Desktop nav links */}
              <ul className="nav-links" role="list">
                <li><a href="#platform"     data-route="platform">Platform</a></li>
                <li><a href="#ecosystem"    data-route="products">Products</a></li>
                <li><a href="#capabilities" data-route="solutions">Solutions</a></li>
                <li><a href="#trust"        data-route="resources">Resources</a></li>
                <li><a href="#"             data-route="company">Company</a></li>
              </ul>

              {/* Desktop CTA */}
              <a className="btn btn-nav-demo" href="#" data-route="demo">
                Book a Demo
                <span className="arr" aria-hidden="true">↗</span>
              </a>

              {/* Mobile hamburger toggle */}
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

            </nav>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
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
                <a href="#platform" data-route="platform">
                  <span>Platform</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#ecosystem" data-route="products">
                  <span>Products</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#capabilities" data-route="solutions">
                  <span>Solutions</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#trust" data-route="resources">
                  <span>Resources</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href="#" data-route="company">
                  <span>Company</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="m-panel-foot wrap">
          <div className="inner">
            <div className="m-foot-bar">
              <a className="m-login" href="#" data-route="login">Log in</a>
              <a className="m-book-demo" href="#" data-route="demo">Book a Demo ↗</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
