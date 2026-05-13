import { useEffect, useRef } from 'react';
import services from '../data/services';
import '../styles/Services.css';

export default function Services() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
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
    <section className="section services-section" id="services">
      <p className="section-tag center">What I offer</p>
      <h2 className="section-title center">My <span>Services</span></h2>

      <div className="services__grid">
        {services.map((s, i) => (
          <div
            className="service-card"
            key={s.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="service-card__icon">
              <i className={s.icon} />
            </div>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
