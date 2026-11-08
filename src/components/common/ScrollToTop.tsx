import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;

    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
