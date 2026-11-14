import { useEffect, useRef } from 'react';

export const MARQUEE_COPIES = 3;

const getLoopWidth = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const firstCopy = track.children[track.children.length / MARQUEE_COPIES] as
    HTMLElement | undefined;

  return first && firstCopy ? firstCopy.offsetLeft - first.offsetLeft : 0;
};

type UseCarouselOptions = {
  speed?: number;
  disabled?: boolean;
  paused?: boolean;
};

export const useCarousel = (
  ref: React.RefObject<HTMLDivElement | null>,
  { speed = 1.5, disabled = false, paused = false }: UseCarouselOptions = {},
) => {
  const animationRef = useRef<number | null>(null);
  const scrollPosRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(speed);
  const targetSpeedRef = useRef<number>(speed);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    if (disabled) {
      scrollPosRef.current = 0;
      track.style.transform = '';
      return;
    }

    if (paused) return;

    targetSpeedRef.current = track.matches(':hover') ? 0 : speed;

    const handleMouseEnter = () => {
      targetSpeedRef.current = 0;
    };

    const handleMouseLeave = () => {
      targetSpeedRef.current = speed;
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (track) {
        currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.08;
        scrollPosRef.current += currentSpeedRef.current;

        const loopWidth = getLoopWidth(track);

        if (loopWidth > 0 && scrollPosRef.current >= loopWidth) {
          scrollPosRef.current -= loopWidth;
        }

        track.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ref, speed, disabled, paused]);
};
