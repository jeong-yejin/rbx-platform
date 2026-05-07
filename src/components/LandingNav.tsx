import { useEffect, type MouseEvent } from 'react';

interface LandingNavProps {
  onEnterPlatform?: () => void;
  onHome?: () => void;
}

const NAV_ITEMS = [
  { label: 'How it works', href: '#how' },
  { label: 'Exchanges',    href: '#exchanges' },
  { label: 'Calculator',   href: '#calculator' },
  { label: 'Guide',        href: '#exchanges' },
];

function smoothScroll(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return;
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    e.preventDefault();
    window.location.href = `/${href}`;
  }
}

export default function LandingNav({ onEnterPlatform, onHome }: LandingNavProps) {
  useEffect(() => {
    const nav = document.getElementById('landing-nav');
    const bar = document.getElementById('landing-scroll-bar');
    if (!nav || !bar) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
      nav.classList.toggle('ln-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onHome) {
      e.preventDefault();
      onHome();
    }
  };

  return (
    <>
      <div className="ln-scroll-bar" id="landing-scroll-bar" aria-hidden="true" />
      <nav id="landing-nav" className="ln-nav" role="navigation" aria-label="Main navigation">
        <div className="ln-nav-inner">
          <a href="/" className="ln-logo" aria-label="ReboundX home" onClick={handleHome}>
            <img src="/brand/reboundx.svg" alt="ReboundX" width="120" height="18" style={{ display: 'block' }} />
          </a>

          <ul className="ln-links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="ln-link" onClick={(e) => smoothScroll(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {onEnterPlatform && (
            <button type="button" className="ln-cta" onClick={onEnterPlatform}>
              Launch Platform
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <button className="ln-mobile-menu-btn" aria-label="Open menu" onClick={() => {
            document.getElementById('ln-mobile-drawer')?.classList.toggle('open');
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div id="ln-mobile-drawer" className="ln-mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="ln-mobile-link"
               onClick={(e) => { smoothScroll(e, item.href); document.getElementById('ln-mobile-drawer')?.classList.remove('open'); }}>
              {item.label}
            </a>
          ))}
          {onEnterPlatform && (
            <button type="button" className="ln-cta ln-cta-mobile" onClick={onEnterPlatform}>Launch Platform</button>
          )}
        </div>
      </nav>
    </>
  );
}
