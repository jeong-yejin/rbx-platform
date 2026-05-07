import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import MyPage from './pages/MyPage';

type Route = 'landing' | 'app';
const routeFor = (pathname: string): Route =>
  pathname.startsWith('/app') ? 'app' : 'landing';

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFor(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(routeFor(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const enterPlatform = () => {
    if (window.location.pathname !== '/app') {
      window.history.pushState({}, '', '/app');
    }
    setRoute('app');
    window.scrollTo({ top: 0 });
  };

  const goHome = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    setRoute('landing');
    window.scrollTo({ top: 0 });
  };

  return route === 'app' ? <MyPage onHome={goHome} /> : <LandingPage onEnterPlatform={enterPlatform} />;
}
