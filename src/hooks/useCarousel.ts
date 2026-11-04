import { useEffect, useRef } from 'react';

/** How many times the cards are repeated in the track to make the loop endless. */
export const MARQUEE_COPIES = 3;

/**
 * Distance after which the track looks exactly the same again: from the first card to its copy.
 * `scrollWidth / copies` is shorter by a third of a gap (there is no gap after the last card),
 * which made the strip skip ~11 px forward on every loop.
 */
const getLoopWidth = (track: HTMLElement) => {
  const first = track.children[0] as HTMLElement | undefined;
  const firstCopy = track.children[track.children.length / MARQUEE_COPIES] as
    | HTMLElement
    | undefined;

  return first && firstCopy ? firstCopy.offsetLeft - first.offsetLeft : 0;
};

export const useCarousel = (
  ref: React.RefObject<HTMLDivElement | null>,
  speed: number = 1.5,
  disableAnimation: boolean = false,
) => {
  const animationRef = useRef<number | null>(null);
  const scrollPos = useRef<number>(0);
  const currentSpeed = useRef<number>(speed);
  const targetSpeed = useRef<number>(speed);

  useEffect(() => {
    const track = ref.current;
    if (!track || disableAnimation) return;

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
  }, [ref, speed, disableAnimation]);

  useEffect(() => {
    const cards = document.querySelectorAll('.price-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);
};
