import { useEffect, useRef } from 'react';
import projects from '../data/projects';
import '../styles/Projects.css';

export default function Projects() {
  const cardRefs = useRef([]);

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
      <p className="section-tag center">What I&apos;ve built</p>
      <h2 className="section-title center">Recent <span>Projects</span></h2>

      <div className="projects__grid">
        {projects.map((project, i) => (
          <article
            className="project-card"
            key={project.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="project-card__img">
              <img src={project.image} alt={project.title} />
              <div className="project-card__overlay">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-eye" /> Live
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
        ))}
      </div>
    </section>
  );
}
