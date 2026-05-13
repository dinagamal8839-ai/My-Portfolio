import { useState, useEffect, useRef } from 'react';
import '../styles/Contact.css';

const CONTACT_ITEMS = [
  { icon: 'fas fa-envelope', label: 'Email', value: 'dinagamal7553@gmail.com', href: null },
  { icon: 'fab fa-linkedin-in', label: 'LinkedIn', value: 'dina-gamal', href: 'https://www.linkedin.com/in/dina-gamal-63296b251/' },
  { icon: 'fab fa-github', label: 'GitHub', value: 'dinagamal8839-ai', href: 'https://github.com/dinagamal8839-ai/My-Projects' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const itemRefs = useRef([]);

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
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="section contact-section" id="contact">
      <p className="section-tag center">Get in touch</p>
      <h2 className="section-title center">Contact <span>Me</span></h2>

      <div className="contact__inner">
        {/* Info */}
        <div className="contact__info">
          {CONTACT_ITEMS.map(({ icon, label, value, href }, i) => (
            <div
              className="contact__item"
              key={label}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              <i className={icon} />
              <div>
                <strong>{label}</strong>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer">{value}</a>
                  : <span>{value}</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text" name="name" placeholder="Your Name"
              value={form.name} onChange={handleChange} required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <input
              type="email" name="email" placeholder="Your Email"
              value={form.email} onChange={handleChange} required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <input
              type="text" name="subject" placeholder="Subject"
              value={form.subject} onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message" rows={5} placeholder="Your Message"
              value={form.message} onChange={handleChange} required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
            <i className="fas fa-paper-plane" /> Send Message
          </button>
          <p className={`form-success${success ? ' show' : ''}`}>
            Message sent! I&apos;ll get back to you soon.
          </p>
        </form>
      </div>
    </section>
  );
}
