import useTyping from '../hooks/useTyping';
import profileImg from '../assets/profile.jpeg';
import '../styles/Hero.css';

export default function Hero() {
  const typedText = useTyping();

  return (
    <>
      {/* Fixed social sidebar */}
      <aside className="social-sidebar" aria-label="Social links">
        <a href="https://github.com/dinagamal8839-ai/My-Projects" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/dina-gamal-63296b251/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in" />
        </a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
        <a href="#" aria-label="Behance"><i className="fab fa-behance" /></a>
      </aside>

      <section className="hero" id="home">
        <div className="hero__container">
          {/* Text */}
          <div className="hero__content">
            <p className="hero__tag">Welcome to my portfolio</p>
            <h1>Hello, I&apos;m <span>Dina</span></h1>
            <h2 className="hero__sub">
              <span className="hero__typed">{typedText}</span>
              <span className="hero__cursor" aria-hidden="true" />
            </h2>
            <p>
              Front-end developer with a passion for crafting clean, responsive,
              and user-friendly web experiences. I turn ideas into polished digital products.
            </p>
            <div className="hero__btns">
              <a href="#contact" className="btn btn-primary">
                <i className="fas fa-paper-plane" /> Contact Me
              </a>
              <a href="#projects" className="btn btn-outline">
                <i className="fas fa-folder-open" /> My Work
              </a>
            </div>
          </div>

          {/* Blob image */}
          <div className="hero__image">
            <div className="blob-wrap">
              <div className="blob-bg" />
              <img src={profileImg} alt="Dina Abdelnasser" />
            </div>
          </div>
        </div>

        <div className="scroll-down" aria-hidden="true">
          <i className="fas fa-chevron-down" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}
