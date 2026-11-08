import { FocusEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type UseAutoplayOptions = {
  delay?: number;
  resetKey?: unknown;
};

export const useAutoplay = <T extends HTMLElement>(
  advance: () => void,
  { delay = 5000, resetKey }: UseAutoplayOptions = {},
) => {
  const ref = useRef<T>(null);

  const isInView = useInView(ref, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  );
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => setIsPageVisible(document.visibilityState === 'visible');

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const isPlaying =
    !prefersReducedMotion &&
    isInView &&
    isPageVisible &&
    !isHovered &&
    !hasFocusWithin &&
    !isDragging;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(advance, delay);
    return () => clearTimeout(timer);
  }, [isPlaying, advance, delay, resetKey]);

  const handlers = {
    onPointerEnter: (event: PointerEvent<T>) => {
      if (event.pointerType === 'mouse') setIsHovered(true);
    },
    onPointerLeave: () => setIsHovered(false),
    onFocus: () => setHasFocusWithin(true),
    onBlur: (event: FocusEvent<T>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setHasFocusWithin(false);
      }
    },
  };

  return { ref, handlers, setIsDragging };
};
