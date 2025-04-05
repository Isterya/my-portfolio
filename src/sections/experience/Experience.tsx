import { dataLeft, dataRight } from '../../data/expData';

import './experience.scss';

const circlePositions = [0, 180, 375, 620];

const Experience = () => {
  return (
    <section
      id="experience"
      className="experience"
    >
      <div className="container">
        <h2 className="experience-header">
          My <span>Experience</span>
        </h2>

        <div className="experience__grid">
          <div className="experience__column experience__column--left">
            {dataLeft.map((item, index) => (
              <div
                className="experience__text"
                key={index}
              >
                <div className="experience__text-title">{item.title}</div>
                <div className="experience__text-subtitle">{item.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="experience__timeline">
            <div className="timeline-line-horizontal" />
            {circlePositions.map((top, i) => (
              <div
                key={i}
                className={`timeline-point ${i % 2 === 0 ? 'primary' : 'dark'}`}
                style={{ top: `${top}px` }}
              >
                <div className="timeline-point-inner" />
              </div>
            ))}
          </div>

          <div className="experience__column experience__column--right">
            {dataRight.map((item, index) => (
              <div
                className="experience__text"
                key={index}
              >
                <div className="experience__text-title">{item.title}</div>
                <div className="experience__text-descr">{item.descr}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
