import aboutImg from '../assets/about.jpeg';
import '../styles/About.css';

const STATS = [
  { value: '5+', label: 'Projects' },
  { value: '3+', label: 'Technologies' },
  { value: '100%', label: 'Dedication' },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about__inner">
        {/* Image */}
        <div className="about__img-wrap">
          <img src={aboutImg} alt="About Dina" className="about__img" />
          <div className="about__badge">
            <strong>1+</strong>
            <small>Year of<br />Experience</small>
          </div>
        </div>

        {/* Content */}
        <div className="about__content">
          <p className="section-tag">Get to know me</p>
          <h2 className="section-title">About <span>Me</span></h2>
          <p>
            I&apos;m Dina Abdelnasser, a passionate Front-End Developer based in Egypt.
            I love building beautiful, accessible, and performant web interfaces that
            make people&apos;s lives easier.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m exploring new design trends, learning new
            technologies, and working on personal projects that challenge me to grow.
          </p>

          <div className="about__stats">
            {STATS.map(({ value, label }) => (
              <div className="about__stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn-primary" style={{ marginTop: '1.8rem' }}>
            <i className="fas fa-handshake" /> Hire Me
          </a>
        </div>
      </div>
    </section>
  );
}
