import { useEffect, useRef } from 'react';

export const MARQUEE_COPIES = 3;

const getLoopWidth = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const firstCopy = track.children[track.children.length / MARQUEE_COPIES] as
    | HTMLElement
    | undefined;

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
  const scrollPos = useRef<number>(0);
  const currentSpeed = useRef<number>(speed);
  const targetSpeed = useRef<number>(speed);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    if (disabled) {
      scrollPos.current = 0;
      track.style.transform = '';
      return;
    }

    if (paused) return;

    targetSpeed.current = track.matches(':hover') ? 0 : speed;

    const handleMouseEnter = () => {
      targetSpeed.current = 0;
    };

    const handleMouseLeave = () => {
      targetSpeed.current = speed;
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (track) {
        currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.08;
        scrollPos.current += currentSpeed.current;

        const loopWidth = getLoopWidth(track);

        if (loopWidth > 0 && scrollPos.current >= loopWidth) {
          scrollPos.current -= loopWidth;
        }

        track.style.transform = `translateX(-${scrollPos.current}px)`;
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
