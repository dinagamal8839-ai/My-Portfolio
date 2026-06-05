import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = 'en';
    root.dir = 'ltr';
    document.title = translations.en.meta.title;
    localStorage.removeItem('portfolio-lang');
  }, []);

  const t = useCallback((key, vars) => {
    const value = getNested(translations.en, key) ?? key;
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return key;
    if (!vars) return value;
    return Object.entries(vars).reduce(
      (str, [k, v]) => str.replace(`{${k}}`, v),
      value
    );
  }, []);

  const value = useMemo(() => ({ t }), [t]);

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
