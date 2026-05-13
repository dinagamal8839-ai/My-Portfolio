import { useEffect, useRef } from 'react';
import skills from '../data/skills';
import '../styles/Skills.css';

export default function Skills() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
              // Animate the fill bar
              const fill = entry.target.querySelector('.skill-fill');
              if (fill) fill.style.width = fill.dataset.w + '%';
            }, i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills-section" id="skills">
      <p className="section-tag center">What I know</p>
      <h2 className="section-title center">My <span>Skills</span></h2>

      <div className="skills__grid">
        {skills.map((skill, i) => (
          <div
            className="skill-card"
            key={skill.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <i className={skill.icon} />
            <span>{skill.name}</span>
            <div className="skill-bar">
              <div className="skill-fill" data-w={skill.level} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
