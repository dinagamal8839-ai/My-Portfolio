const CHATBOT_SCRIPT_URL = 'https://unpkg.com/supersimpledev/chatbot.js';

let scriptPromise = null;

/** Loads the global Chatbot API used by ChatInput. */
export function loadChatbotScript() {
  if (typeof window !== 'undefined' && window.Chatbot) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${CHATBOT_SCRIPT_URL}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('Chatbot script failed')));
        return;
      }

      const script = document.createElement('script');
      script.src = CHATBOT_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Chatbot script failed'));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}
