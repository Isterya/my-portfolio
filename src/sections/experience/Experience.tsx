import './experience.scss';

const dataLeft = [
  {
    title: 'Full Secondary Education',
    subtitle: 'Kryvyi Rih, Ukraine (2015–2023)',
  },
  {
    title: 'Cosinus Technical College',
    subtitle: 'Łódź, Poland (Current Student)',
  },
  {
    title: 'Web Development Specialization',
    subtitle: 'Udemy (Nov 2023 - March 2025)',
  },
  {
    title: 'Work Experience',
    subtitle: 'Freelance & Independent Projects (2023 – Present)',
  },
];

const dataRight = [
  {
    title: 'Kryvyi Rih Lyceum No. 49',
    descr:
      'Graduated with excellent results, demonstrating strong analytical skills and a solid foundation in mathematics and computer science.',
  },
  {
    title: 'Programming Technician',
    descr:
      'Currently in my second year, deepening my knowledge of software development, system architecture, and modern web technologies.',
  },
  {
    title: 'Courses & Pet Projects',
    descr: (
      <>
        Completed an extensive web development course focusing on{' '}
        <a
          href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="experience__link"
        >
          JavaScript
        </a>
        ,{' '}
        <a
          href="https://udemy-certificate.s3.amazonaws.com/image/UC-00bc5d87-e2f1-448f-9126-ae957f694436.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="experience__link"
        >
          TypeScript
        </a>
        , and{' '}
        <a
          href="https://udemy-certificate.s3.amazonaws.com/image/UC-3ca32cc1-d365-4db0-a2f5-e245893f9c74.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="experience__link"
        >
          React
        </a>
        . Gained hands-on experience through numerous projects, solidifying my
        expertise in{' '}
        <a
          href="https://udemy-certificate.s3.amazonaws.com/image/UC-6a2a853e-2363-4ace-93e0-2a3b0b386d0c.jpg"
          target="_blank"
          rel="noopener noreferrer"
          className="experience__link"
        >
          frontend
        </a>{' '}
        development.
      </>
    ),
  },
  {
    title: 'Front-End Developer',
    descr:
      'Developed a variety of projects, from web applications to landing pages, honing my skills in building modern, responsive, and high-performance websites.',
  },
];

const circlePositions = [0, 180, 375, 620];

const Experience = () => {
  return (
    <div className="container">
      <section
        id="experience"
        className="experience"
      >
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
      </section>
    </div>
  );
};

export default Experience;
