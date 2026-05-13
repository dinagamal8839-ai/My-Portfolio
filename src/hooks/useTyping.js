import { useState, useEffect } from 'react';

const WORDS = ['Frontend Developer', 'UI Enthusiast', 'React Learner', 'Problem Solver'];

export default function useTyping() {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    const speed = deleting ? 60 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setText(word.slice(0, charIndex - 1));
        if (charIndex - 1 < 0) {
          setDeleting(false);
          setCharIndex(0);
          setWordIndex((w) => (w + 1) % WORDS.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  return text;
}
