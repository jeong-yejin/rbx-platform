import { useEffect, type MouseEvent } from 'react';

interface LandingNavProps {
  onEnterPlatform: () => void;
}

function scrollTo(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function LandingNav({ onEnterPlatform }: LandingNavProps) {
  useEffect(() => {
    const nav = document.getElementById('landing-nav');
    const bar = document.getElementById('landing-scroll-bar');
    if (!nav || !bar) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
      nav.classList.toggle('ln-scrolled', window.scrollY > 48);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="ln-scroll-bar" id="landing-scroll-bar" aria-hidden="true" />
      <nav id="landing-nav" className="ln-nav" role="navigation" aria-label="Main navigation">
        <div className="ln-nav-inner">
          {/* Logo */}
          <a href="/" className="ln-logo" aria-label="ReboundX home">
            <img src="/brand/reboundx.svg" alt="ReboundX" width="130" height="19" style={{ display: 'block' }} />
          </a>

          {/* Nav Links */}
          <ul className="ln-links" role="list">
            <li>
              <a href="#exchanges" className="ln-link" onClick={(e) => scrollTo(e, '#exchanges')}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 5h12M10 2l3 3-3 3M14 11H2M6 8l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Partner Exchanges
              </a>
            </li>
            <li>
              <a href="#events" className="ln-link" onClick={(e) => scrollTo(e, '#events')}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1l1.85 3.75L14 5.45l-3 2.92.71 4.13L8 10.35l-3.71 2.15L5 8.37 2 5.45l4.15-.7L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
                Events
                <span className="ln-badge">5</span>
              </a>
            </li>
            <li>
              <a href="#calculator" className="ln-link" onClick={(e) => scrollTo(e, '#calculator')}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 4.5h6M5 7.5h2M9 7.5h2M5 10.5h2M9 10.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                PerpDex Point Calculator
              </a>
            </li>
          </ul>

          {/* CTA */}
          <button type="button" className="ln-cta" onClick={onEnterPlatform}>
            Launch Platform
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Mobile hamburger — opens mobile drawer */}
          <button className="ln-mobile-menu-btn" aria-label="Open menu" onClick={() => {
            document.getElementById('ln-mobile-drawer')?.classList.toggle('open');
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <div id="ln-mobile-drawer" className="ln-mobile-drawer">
          <a href="#exchanges" className="ln-mobile-link" onClick={(e) => { scrollTo(e, '#exchanges'); document.getElementById('ln-mobile-drawer')?.classList.remove('open'); }}>Partner Exchanges</a>
          <a href="#events" className="ln-mobile-link" onClick={(e) => { scrollTo(e, '#events'); document.getElementById('ln-mobile-drawer')?.classList.remove('open'); }}>Events <span className="ln-badge">5</span></a>
          <a href="#calculator" className="ln-mobile-link" onClick={(e) => { scrollTo(e, '#calculator'); document.getElementById('ln-mobile-drawer')?.classList.remove('open'); }}>PerpDex Point Calculator</a>
          <button type="button" className="ln-cta ln-cta-mobile" onClick={onEnterPlatform}>Launch Platform</button>
        </div>
      </nav>
    </>
  );
}
