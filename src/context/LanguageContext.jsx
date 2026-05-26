import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'portfolio-lang';

const LanguageContext = createContext(null);

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'ar' ? 'ar' : 'en';
  });

  const isRtl = lang === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = isRtl ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', isRtl);
    document.title = translations[lang].meta.title;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, isRtl]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  }, []);

  const t = useCallback(
    (key, vars) => {
      const value = getNested(translations[lang], key) ?? getNested(translations.en, key) ?? key;
      if (Array.isArray(value)) return value;
      if (typeof value !== 'string') return key;
      if (!vars) return value;
      return Object.entries(vars).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, v),
        value
      );
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, isRtl, toggleLanguage, t, setLang }),
    [lang, isRtl, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
