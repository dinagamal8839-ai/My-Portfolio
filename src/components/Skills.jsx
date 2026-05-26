import { useEffect, useRef } from 'react';
import skills from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';
import '../styles/Skills.css';

export default function Skills() {
  const { t } = useLanguage();
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
              const fill = entry.target.querySelector('.skill-fill');
              if (fill) fill.style.width = `${fill.dataset.w}%`;
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

  const skillName = (skill) =>
    skill.id === 6 ? t('skills.items.responsiveDesign') : skill.name;

  return (
    <section className="section skills-section" id="skills">
      <SectionHeading
        tag="skills.tag"
        title="skills.title"
        titleHighlight="skills.titleHighlight"
        center
      />

      <div className="skills__grid">
        {skills.map((skill, i) => (
          <div
            className="skill-card"
            key={skill.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <i className={skill.icon} />
            <span>{skillName(skill)}</span>
            <div className="skill-bar">
              <div className="skill-fill" data-w={skill.level} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
