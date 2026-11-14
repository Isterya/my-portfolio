import { useEffect, useRef } from 'react';

export const MARQUEE_COPIES = 3;

const getLoopWidth = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const firstCopy = track.children[track.children.length / MARQUEE_COPIES] as
    HTMLElement | undefined;

  return first && firstCopy ? firstCopy.offsetLeft - first.offsetLeft : 0;
};

type CarouselDrag = {
  x: number;
  delta: number;
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
  const dragRef = useRef<CarouselDrag | null>(null);

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

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      dragRef.current = { x: event.clientX, delta: 0 };
      track.setPointerCapture(event.pointerId);
      track.classList.add('dragging');
    };

    const handlePointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      drag.delta += drag.x - event.clientX;
      drag.x = event.clientX;
    };

    const handlePointerUp = () => {
      dragRef.current = null;
      track.classList.remove('dragging');
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      event.preventDefault();
      scrollPosRef.current += event.deltaX;
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);
    track.addEventListener('pointerdown', handlePointerDown);
    track.addEventListener('pointermove', handlePointerMove);
    track.addEventListener('pointerup', handlePointerUp);
    track.addEventListener('pointercancel', handlePointerUp);
    track.addEventListener('wheel', handleWheel, { passive: false });

    const animate = () => {
      if (track) {
        const drag = dragRef.current;

        if (drag) {
          scrollPosRef.current += drag.delta;
          currentSpeedRef.current += (drag.delta - currentSpeedRef.current) * 0.5;
          drag.delta = 0;
        } else {
          currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.08;
          scrollPosRef.current += currentSpeedRef.current;
        }

        const loopWidth = getLoopWidth(track);

        if (loopWidth > 0) {
          scrollPosRef.current = ((scrollPosRef.current % loopWidth) + loopWidth) % loopWidth;
        }

        track.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      track.removeEventListener('mouseenter', handleMouseEnter);
      track.removeEventListener('mouseleave', handleMouseLeave);
      track.removeEventListener('pointerdown', handlePointerDown);
      track.removeEventListener('pointermove', handlePointerMove);
      track.removeEventListener('pointerup', handlePointerUp);
      track.removeEventListener('pointercancel', handlePointerUp);
      track.removeEventListener('wheel', handleWheel);
      track.classList.remove('dragging');
      dragRef.current = null;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ref, speed, disabled, paused]);
};
