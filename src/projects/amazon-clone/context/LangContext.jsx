import { useState } from 'react';
import { LangContext } from './langContext';

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang((l) => (l === 'en' ? 'ar' : 'en'));
  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
