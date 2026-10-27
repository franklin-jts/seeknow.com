import { useState, useRef, useEffect, useCallback } from 'react';
import logo from '../assets/seek-now-logo.png';

const PRODUCTS = [
  {
    id: 'refer',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 15c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M13 4l1.5 1.5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: 'Refer Now',
    badge: 'LAUNCHING SOON',
    desc: 'Employee referrals & talent discovery',
    href: '#ecosystem',
  },
  {
    id: 'console',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M5 7l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Console',
    badge: null,
    desc: 'Recruitment CRM & applicant tracking',
    href: '#ecosystem',
    active: true,
  },
  {
    id: 'people',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 15c0-2.761 2.239-4.5 5-4.5s5 1.739 5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15.5 14.5c0-2-1.12-3.5-2.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Seek People',
    badge: null,
    desc: 'HRMS & employee management',
    href: '#ecosystem',
  },
];

function ProductsDropdown({ visible, closing, onClose, products }) {
  if (!visible) return null;
  return (
    <div
      className={`nav-dropdown${closing ? ' closing' : ''}`}
      role="menu"
      aria-label="Products menu"
    >
      {products.map((p) => (
        <a
          key={p.id}
          href={p.href}
          className={`nav-dd-item${p.active ? ' nav-dd-item--active' : ''}`}
          role="menuitem"
          onClick={onClose}
        >
          <span className="nav-dd-icon" aria-hidden="true">{p.icon}</span>
          <span className="nav-dd-body">
            <span className="nav-dd-name">
              {p.name}
              {p.badge && <span className="nav-dd-badge">{p.badge}</span>}
            </span>
            <span className="nav-dd-desc">{p.desc}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function Header() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const isConsole = path === '/console';
  const isReferNow = path === '/refer-now';
  const isSolution = path === '/solution';
  const isSeekPeople = path === '/seek-people';
  const isProductPage = isConsole || isReferNow || isSolution || isSeekPeople;
  const homeSection = (section) => isProductPage ? `/#${section}` : `#${section}`;
  const homeTop = isProductPage ? '/' : '#top';
  const products = PRODUCTS.map((product) => ({
    ...product,
    href: product.id === 'console' ? '/console' : product.id === 'refer' ? '/refer-now' : product.id === 'people' ? '/seek-people' : homeSection('ecosystem'),
    active: product.id === 'console' ? isConsole : product.id === 'refer' ? isReferNow : product.id === 'people' ? isSeekPeople : false,
  }));

  // Desktop dropdown: 3 states — closed | open | closing
  const [ddState, setDdState] = useState('closed'); // 'closed' | 'open' | 'closing'
  const [mProductsOpen, setMProductsOpen] = useState(false);
  const [mClosing, setMClosing] = useState(false);
  const [consoleMobileOpen, setConsoleMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const ANIM_MS = 200; // must match CSS transition duration

  const openDropdown = useCallback(() => {
    clearTimeout(closeTimerRef.current);
    setDdState('open');
  }, []);

  const closeDropdown = useCallback(() => {
    setDdState('closing');
    closeTimerRef.current = setTimeout(() => setDdState('closed'), ANIM_MS);
  }, []);

  const toggleDropdown = useCallback(() => {
    if (ddState === 'open') closeDropdown();
    else openDropdown();
  }, [ddState, openDropdown, closeDropdown]);

  // Mobile accordion close with animation
  const closeMobile = useCallback(() => {
    setMClosing(true);
    setTimeout(() => {
      setMProductsOpen(false);
      setMClosing(false);
    }, ANIM_MS);
  }, []);

  const toggleMobile = useCallback(() => {
    if (mProductsOpen) closeMobile();
    else { setMProductsOpen(true); setMClosing(false); }
  }, [mProductsOpen, closeMobile]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        triggerRef.current  && !triggerRef.current.contains(e.target)
      ) {
        if (ddState === 'open') closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ddState, closeDropdown]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && ddState === 'open') closeDropdown();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [ddState, closeDropdown]);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);

  const ddVisible  = ddState !== 'closed';
  const ddClosing  = ddState === 'closing';
  const ddOpen     = ddState === 'open';

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header className={`site-header${isProductPage && consoleMobileOpen ? ' open' : ''}`} id="top-header">
        <div className="wrap">
          <div className="inner">
            <nav className="nav" aria-label="Main navigation">

              {/* Logo */}
              <a className={`logo nav-logo${isProductPage ? ' product-page-logo' : ''}`} href={homeTop} data-route={isProductPage ? undefined : 'home'} aria-label="Seek Now home">
                <img className="logo-img" src={logo} alt="Seek Now" width="136" height="34" />
              </a>

              {/* Desktop nav links */}
              <ul className="nav-links" role="list">
                <li><a href={homeSection('platform')} data-route={isProductPage ? undefined : 'platform'}>Platform</a></li>

                {/* Products with animated dropdown */}
                <li className="nav-has-dropdown">
                  <button
                    ref={triggerRef}
                    className={`nav-dropdown-trigger${ddOpen ? ' open' : ''}`}
                    aria-expanded={ddOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                    type="button"
                  >
                    Products
                    <svg className="nav-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <div ref={dropdownRef}>
                    <ProductsDropdown
                      visible={ddVisible}
                      closing={ddClosing}
                      onClose={closeDropdown}
                      products={products}
                    />
                  </div>
                </li>

                <li><a href="/solution" data-route={undefined}>Solutions</a></li>
                {/* <li><a href={homeSection('trust')} data-route={isProductPage ? undefined : 'resources'}>Resources</a></li> */}
                <li><a href={isProductPage ? '/#site-footer' : '#site-footer'} data-route={isProductPage ? undefined : 'company'}>Company</a></li>
              </ul>

              {/* Desktop CTA */}
              <a className="btn btn-nav-demo" href={isConsole ? '#console-demo' : (isReferNow || isSolution) ? '/#site-footer' : '#'} data-route={isProductPage ? undefined : 'demo'}>
                Book a Demo
                <span className="arr" aria-hidden="true">↗</span>
              </a>

              {/* Mobile hamburger toggle */}
              <button
                className="burger"
                type="button"
                id="burger"
                aria-expanded={isProductPage ? consoleMobileOpen : undefined}
                aria-controls="m-panel"
                aria-label={isProductPage && consoleMobileOpen ? 'Close menu' : 'Open menu'}
                onClick={isProductPage ? () => setConsoleMobileOpen((open) => !open) : undefined}
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
      <div className={`m-panel${isProductPage && consoleMobileOpen ? ' open' : ''}`} id="m-panel" role="dialog" aria-modal="true" aria-label="Navigation">
        <div className="m-panel-top wrap">
          <div className="inner">
            <div className="m-panel-bar" />
          </div>
        </div>

        <nav className="m-nav wrap" aria-label="Mobile navigation">
          <div className="inner">
            <ul className="m-nav-list">
              <li>
                <a href={homeSection('platform')} data-route={isProductPage ? undefined : 'platform'}>
                  <span>Platform</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>

              {/* Mobile Products — expandable with animation */}
              <li className="m-has-dropdown">
                <button
                  className={`m-nav-expand${mProductsOpen ? ' open' : ''}`}
                  type="button"
                  aria-expanded={mProductsOpen}
                  onClick={toggleMobile}
                >
                  <span>Products</span>
                  <span className={`m-arrow${mProductsOpen ? ' rotate' : ''}`} aria-hidden="true">→</span>
                </button>
                {mProductsOpen && (
                  <div className={`m-products-list${mClosing ? ' closing' : ''}`}>
                    {products.map((p) => (
                      <a
                        key={p.id}
                        href={p.href}
                        className={`nav-dd-item${p.active ? ' nav-dd-item--active' : ''}`}
                        onClick={() => setConsoleMobileOpen(false)}
                      >
                        <span className="nav-dd-icon" aria-hidden="true">{p.icon}</span>
                        <span className="nav-dd-body">
                          <span className="nav-dd-name">
                            {p.name}
                            {p.badge && <span className="nav-dd-badge">{p.badge}</span>}
                          </span>
                          <span className="nav-dd-desc">{p.desc}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <a href="/solution" data-route={undefined}>
                  <span>Solutions</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href={homeSection('trust')} data-route={isProductPage ? undefined : 'resources'}>
                  <span>Resources</span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
              <li>
                <a href={isProductPage ? '/#site-footer' : '#site-footer'} data-route={isProductPage ? undefined : 'company'}>
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
              <a className="m-login" href={isProductPage ? '/#site-footer' : '#'} data-route={isProductPage ? undefined : 'login'}>Log in</a>
              <a className="m-book-demo" href={isConsole ? '#console-demo' : (isReferNow || isSolution) ? '/#site-footer' : '#'} data-route={isProductPage ? undefined : 'demo'}>Book a Demo ↗</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
