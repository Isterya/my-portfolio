import { useCallback, useEffect, useRef, useState } from 'react';

type Breakpoint = {
  max: number;
  items: number;
};

type UseSliderProps = {
  dataLength: number;
  itemsPerSlideDefault: number;
  breakpoints: Breakpoint[];
  intervalTime?: number;
};

export const useSlider = ({
  dataLength,
  itemsPerSlideDefault,
  breakpoints,
  intervalTime = 5000,
}: UseSliderProps) => {
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsPerSlideDefault);
  const [currentIndex, setCurrentIndex] = useState(0);

  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateItemsPerSlide = useCallback(() => {
    const width = window.innerWidth;
    const matched = breakpoints.find(({ max }) => width <= max);

    setItemsPerSlide(matched ? matched.items : itemsPerSlideDefault);
  }, [breakpoints, itemsPerSlideDefault]);

  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [updateItemsPerSlide]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + itemsPerSlide) % dataLength);
  }, [itemsPerSlide, dataLength]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - itemsPerSlide + dataLength) % dataLength);
  }, [itemsPerSlide, dataLength]);

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
    nextSlide,
    prevSlide,
    setCurrentIndex,
    stopAutoSlide,
    startAutoSlide,
  };
};
