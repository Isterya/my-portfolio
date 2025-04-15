import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from './routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const routing = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {routing}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
