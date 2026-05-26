import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Hides floating sidebar while the contact section (or its info column) is in view,
 * so icons do not duplicate the contact cards.
 */
function shouldHideSidebar(target) {
  const rect = target.getBoundingClientRect();
  const vh = window.innerHeight;

  // Above contact — show floating icons
  if (rect.top >= vh * 0.9) return false;

  // Below contact — show floating icons
  if (rect.bottom <= vh * 0.1) return false;

  // Contact visible — hide before overlap with sidebar icons
  return true;
}

export function useFloatingSocialSidebar() {
  const { lang } = useLanguage();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const section = document.getElementById('contact');
    const contactTarget = section?.querySelector('.contact__info') ?? section;
    if (!contactTarget) return undefined;

    let rafId = 0;

    const sync = (entry) => {
      if (entry) {
        if (!entry.isIntersecting) {
          setHidden(false);
          return;
        }
        setHidden(shouldHideSidebar(entry.target));
        return;
      }
      setHidden(shouldHideSidebar(contactTarget));
    };

    const observer = new IntersectionObserver(
      (entries) => sync(entries[0]),
      {
        root: null,
        threshold: [0, 0.01, 0.05, 0.1, 0.15, 0.25],
        rootMargin: '0px',
      }
    );

    observer.observe(contactTarget);

    const onScrollOrResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => sync());
    };

    sync();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(rafId);
    };
  }, [lang]);

  return { hidden };
}
