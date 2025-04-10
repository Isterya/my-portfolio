import { useEffect, useRef } from 'react';

import PriceCard from '../../components/priceCard/PriceCard';
import { priceData } from '../../data/priceData';

import './price.scss';

const Price = () => {
  const renderedData = [...priceData, ...priceData, ...priceData];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPos = useRef<number>(0);

  const SPEED = 1.5;
  const currentSpeed = useRef<number>(SPEED);
  const targetSpeed = useRef<number>(SPEED);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleMouseEnter = () => {
      targetSpeed.current = 0;
    };

    const handleMouseLeave = () => {
      targetSpeed.current = SPEED;
    };

    track.addEventListener('mouseenter', handleMouseEnter);
    track.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (track) {
        currentSpeed.current +=
          (targetSpeed.current - currentSpeed.current) * 0.08;

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
  }, []);

  return (
    <section
      id="price"
      className="price"
    >
      <div className="container">
        <div className="price-wrapper">
          <div className="price-header">
            <div className="price-header__content">
              <h2 className="price-header__title">
                My <span>Price</span>
              </h2>
              <p className="price-header__descr">
                Whether you need a sleek landing page, a powerful web
                application, or a full-scale eCommerce platform, I deliver
                modern, high-performance websites built with cutting-edge
                technologies. Choose a service that fits your goals, and let’s
                create something exceptional together.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="price-carousel">
        <div
          className="price-carousel__track"
          ref={trackRef}
        >
          {renderedData.map((price) => (
            <PriceCard
              key={price.id}
              {...price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Price;
