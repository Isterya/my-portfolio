import { useCallback, useState, useSyncExternalStore } from 'react';

import {
  SlidesBreakpoint,
  getItemsPerPage,
  getPageCount,
  getPageOf,
  wrapPage,
} from '@/utils/pagination';

const subscribeToResize = (onResize: () => void) => {
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
};

type UseSliderProps = {
  dataLength: number;
  itemsPerSlideDefault: number;
  breakpoints: SlidesBreakpoint[];
};

export const useSlider = ({ dataLength, itemsPerSlideDefault, breakpoints }: UseSliderProps) => {
  const itemsPerSlide = useSyncExternalStore(
    subscribeToResize,
    () => getItemsPerPage(window.innerWidth, breakpoints, itemsPerSlideDefault),
    () => itemsPerSlideDefault,
  );
  const [firstIndex, setFirstIndex] = useState(0);

  const pageCount = getPageCount(dataLength, itemsPerSlide);
  const currentPage = getPageOf(firstIndex, itemsPerSlide);
  const currentIndex = currentPage * itemsPerSlide;

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

  return {
    itemsPerSlide,
    currentIndex,
    currentPage,
    pageCount,
    nextSlide,
    prevSlide,
    goToPage,
  };
};
