import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_CONFIG } from '../data/projectsConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';
import '../styles/Projects.css';

function ProjectCardContent({ project, t }) {
  return (
    <>
      <div className="project-card__img">
        <img src={project.image} alt={project.title} />
        <div className="project-card__overlay">
          <span className="project-card__cta">
            <i className="fas fa-arrow-right" />
            {project.routePath ? t('projects.viewProject') : t('projects.live')}
          </span>
        </div>
      </div>
      <div className="project-card__info">
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const cardRefs = useRef([]);

  const projects = PROJECTS_CONFIG.map((p) => ({
    ...p,
    title: t(`projects.items.${p.key}.title`),
    description: t(`projects.items.${p.key}.description`),
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section projects-section" id="projects">
      <SectionHeading
        tag="projects.tag"
        title="projects.title"
        titleHighlight="projects.titleHighlight"
        center
      />

      <div className="projects__grid">
        {projects.map((project, i) => {
          const cardClass = `project-card${project.routePath ? ' project-card--clickable' : ''}${project.cardVariant === 'glow' ? ' project-card--glow' : ''}`;

          if (project.routePath) {
            return (
              <Link
                to={project.routePath}
                className={cardClass}
                key={project.id}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-label={t('projects.openProject', { title: project.title })}
              >
                <ProjectCardContent project={project} t={t} />
              </Link>
            );
          }

          return (
            <article
              className={cardClass}
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="project-card__img">
                <img src={project.image} alt={project.title} />
                <div className="project-card__overlay">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-eye" /> {t('projects.live')}
                  </a>
                </div>
              </div>
              <div className="project-card__info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
