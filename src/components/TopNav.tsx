import { useState, useEffect, useRef } from 'react';
import { USER, EVENTS } from '../data';

export type Page = 'exchanges' | 'events' | 'calculator' | 'dashboard' | 'mypage';

interface TopNavProps {
  page: Page;
  isLoggedIn: boolean;
  onNav: (p: Page) => void;
  onLogin: () => void;
  onLogout: () => void;
}

const NAV_ITEMS: { key: Page; label: string; icon: () => JSX.Element; badge?: number }[] = [
  {
    key: 'exchanges',
    label: 'Partner Exchanges',
    icon: () => (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 5h12M10 2l3 3-3 3M14 11H2M6 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'events',
    label: 'Events',
    badge: EVENTS.length,
    icon: () => (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 1l1.85 3.75L14 5.45l-3 2.92.71 4.13L8 10.35l-3.71 2.15L5 8.37 2 5.45l4.15-.7L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'calculator',
    label: 'PerpDex Point Calculator',
    icon: () => (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 4.5h6M5 7.5h2M9 7.5h2M5 10.5h2M9 10.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function TopNav({ page, isLoggedIn, onNav, onLogin, onLogout }: TopNavProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNav = (p: Page) => {
    onNav(p);
    setMobileOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      {/* scroll progress */}
      <div className="tn-scroll-bar" id="tn-scroll-bar" aria-hidden="true" />

      <header className={`tn-header${scrolled ? ' tn-header--scrolled' : ''}`}>
        <div className="tn-inner">

          {/* Logo */}
          <button className="tn-logo" onClick={() => handleNav(isLoggedIn ? 'dashboard' : 'exchanges')} aria-label="ReboundX home">
            <img src="/brand/reboundx.svg" alt="ReboundX" width="128" height="19" />
          </button>

          {/* Desktop nav */}
          <nav className="tn-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(({ key, label, badge, icon: Icon }) => (
              <button
                key={key}
                className={`tn-nav-btn${page === key ? ' active' : ''}`}
                onClick={() => handleNav(key)}
              >
                <Icon />
                {label}
                {badge && <span className="tn-nav-badge">{badge}</span>}
              </button>
            ))}
          </nav>

          {/* Right area */}
          <div className="tn-right">
            {isLoggedIn ? (
              <div className="tn-user-wrap" ref={menuRef}>
                {/* Dashboard quick link */}
                <button
                  className={`tn-dashboard-btn${page === 'dashboard' ? ' active' : ''}`}
                  onClick={() => handleNav('dashboard')}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                  </svg>
                  Dashboard
                </button>

                <button className="tn-avatar-btn" onClick={() => setUserMenuOpen(!userMenuOpen)} aria-label="User menu">
                  <div className="tn-avatar">{USER.name[0]}</div>
                  <div className="tn-avatar-info">
                    <span className="tn-avatar-name">{USER.name}</span>
                    <span className="tn-avatar-handle">{USER.handle}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={userMenuOpen ? 'tn-chevron-up' : ''}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="tn-user-menu">
                    <div className="tn-user-menu-header">
                      <div className="tn-user-menu-name">{USER.name}</div>
                      <div className="tn-user-menu-handle">{USER.handle}</div>
                    </div>
                    <button className="tn-user-menu-item" onClick={() => handleNav('mypage')}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 13.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      My Page
                    </button>
                    <div className="tn-user-menu-divider" />
                    <button className="tn-user-menu-item tn-logout" onClick={() => { onLogout(); setUserMenuOpen(false); }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="tn-google-btn" onClick={onLogin} aria-label="Sign in with Google">
                <svg className="tn-google-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            )}

            {/* Mobile hamburger */}
            <button className="tn-hamburger" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen
                ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="tn-mobile-menu">
            {NAV_ITEMS.map(({ key, label, badge, icon: Icon }) => (
              <button key={key} className={`tn-mobile-item${page === key ? ' active' : ''}`} onClick={() => handleNav(key)}>
                <Icon />
                {label}
                {badge && <span className="tn-nav-badge">{badge}</span>}
              </button>
            ))}
            <div className="tn-mobile-divider" />
            {isLoggedIn ? (
              <>
                <button className={`tn-mobile-item${page === 'dashboard' ? ' active' : ''}`} onClick={() => handleNav('dashboard')}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>
                  Dashboard
                </button>
                <button className={`tn-mobile-item${page === 'mypage' ? ' active' : ''}`} onClick={() => handleNav('mypage')}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2.5 13.5c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  My Page
                </button>
                <button className="tn-mobile-item tn-mobile-logout" onClick={() => { onLogout(); setMobileOpen(false); }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Sign out
                </button>
              </>
            ) : (
              <button className="tn-mobile-login" onClick={() => { onLogin(); setMobileOpen(false); }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
}
