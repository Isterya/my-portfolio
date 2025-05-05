import { useEffect, useRef } from 'react';

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

        if (scrollPos.current >= track.scrollWidth / 3) {
          scrollPos.current = 0;
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
