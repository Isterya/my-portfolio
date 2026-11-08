import { RefObject, useEffect } from 'react';

type UseRevealOnScrollOptions = {
  threshold?: number;
  resetKey?: unknown;
};

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
