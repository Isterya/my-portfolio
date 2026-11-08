import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every page change scrolls to the top, or to the section named in the URL hash when the page
 * is opened from a link like /#contact. Clicks on in-page anchors keep the browser's own scrolling:
 * they change only the hash, not the pathname.
 */
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
