import { useCallback, useEffect, useState } from 'react';

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
  breakpoints: SlidesBreakpoint[];
};

export const useSlider = ({ dataLength, itemsPerSlideDefault, breakpoints }: UseSliderProps) => {
  const [itemsPerSlide, setItemsPerSlide] = useState(() =>
    typeof window === 'undefined'
      ? itemsPerSlideDefault
      : getItemsPerPage(window.innerWidth, breakpoints, itemsPerSlideDefault),
  );
  const [firstIndex, setFirstIndex] = useState(0);

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
