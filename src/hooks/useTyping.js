import { useState, useEffect } from 'react';

const DEFAULT_WORDS = ['Frontend Developer', 'UI Enthusiast', 'React Learner', 'Problem Solver'];

export default function useTyping(words = DEFAULT_WORDS) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setWordIndex(0);
    setCharIndex(0);
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    if (!words.length) return undefined;

    const word = words[wordIndex] ?? words[0];
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
          setWordIndex((w) => (w + 1) % words.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, words]);

  return text;
}
