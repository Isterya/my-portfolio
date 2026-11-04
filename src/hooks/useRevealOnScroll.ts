import { RefObject, useEffect } from 'react';

type UseRevealOnScrollOptions = {
  threshold?: number;
  /** Re-observe when it changes, e.g. the number of rendered children. */
  resetKey?: unknown;
};

/**
 * Adds the `visible` class to each child of the container the first time it scrolls into view;
 * the reveal itself is a CSS transition on that class.
 */
export const useRevealOnScroll = (
  ref: RefObject<HTMLElement | null>,
  { threshold = 0.3, resetKey }: UseRevealOnScrollOptions = {},
) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold },
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [ref, threshold, resetKey]);
};
