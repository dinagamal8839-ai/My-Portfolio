import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Designed &amp; Built by <span>Dina Abdelnasser</span> &copy; 2026
      </p>
      <div className="footer__links">
        <a href="https://github.com/dinagamal8839-ai/My-Projects" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/dina-gamal-63296b251/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in" />
        </a>
      </div>
    </footer>
  );
}
