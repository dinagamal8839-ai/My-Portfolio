import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark((prev) => !prev);

  return { dark, toggle };
}
