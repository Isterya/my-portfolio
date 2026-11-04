import { useCallback, useEffect, useRef, useState } from 'react';

import {
  SlidesBreakpoint,
  getItemsPerPage,
  getPageCount,
  getPageOf,
  wrapPage,
} from '@/utils/pagination';

type UseSliderProps = {
  dataLength: number;
  itemsPerSlideDefault: number;
  /** Keep the array referentially stable (module constant): it is an effect dependency. */
  breakpoints: SlidesBreakpoint[];
  intervalTime?: number;
};

export const useSlider = ({
  dataLength,
  itemsPerSlideDefault,
  breakpoints,
  intervalTime = 5000,
}: UseSliderProps) => {
  // Read the viewport during the first render: starting from the default and correcting it in an
  // effect rendered three cards on phones for a frame and shifted the layout (CLS).
  const [itemsPerSlide, setItemsPerSlide] = useState(() =>
    typeof window === 'undefined'
      ? itemsPerSlideDefault
      : getItemsPerPage(window.innerWidth, breakpoints, itemsPerSlideDefault),
  );
  // Index of the first visible item. Pages are derived from it, so a breakpoint change keeps that
  // item on screen instead of jumping to an unrelated slide.
  const [firstIndex, setFirstIndex] = useState(0);

  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pageCount = getPageCount(dataLength, itemsPerSlide);
  const currentPage = getPageOf(firstIndex, itemsPerSlide);
  const currentIndex = currentPage * itemsPerSlide;

  const updateItemsPerSlide = useCallback(() => {
    setItemsPerSlide(getItemsPerPage(window.innerWidth, breakpoints, itemsPerSlideDefault));
  }, [breakpoints, itemsPerSlideDefault]);

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [updateItemsPerSlide]);

  const goToPage = useCallback(
    (page: number) => setFirstIndex(wrapPage(page, pageCount) * itemsPerSlide),
    [pageCount, itemsPerSlide],
  );

  const shiftPage = useCallback(
    (delta: number) =>
      setFirstIndex(
        (prev) => wrapPage(getPageOf(prev, itemsPerSlide) + delta, pageCount) * itemsPerSlide,
      ),
    [pageCount, itemsPerSlide],
  );

  const nextSlide = useCallback(() => shiftPage(1), [shiftPage]);
  const prevSlide = useCallback(() => shiftPage(-1), [shiftPage]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    autoSlideRef.current = setInterval(nextSlide, intervalTime);
  }, [nextSlide, stopAutoSlide, intervalTime]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

  return {
    itemsPerSlide,
    currentIndex,
    currentPage,
    pageCount,
    nextSlide,
    prevSlide,
    goToPage,
    stopAutoSlide,
    startAutoSlide,
  };
};
