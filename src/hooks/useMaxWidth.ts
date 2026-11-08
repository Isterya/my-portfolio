import { useCallback, useSyncExternalStore } from 'react';

export const useMaxWidth = (breakpoint: number): boolean => {
  const query = `(max-width: ${breakpoint}px)`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
};
