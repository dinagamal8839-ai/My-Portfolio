import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectShell from './shared/ProjectShell.jsx';
import ChatbotView from './chatbot/ChatbotView.jsx';
import { loadChatbotScript } from './chatbot/loadChatbotScript.js';
import './shared/ProjectShell.css';
import './chatbot/styles/chatbot.css';

export default function ChatbotApp() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadChatbotScript()
      .then(() => setReady(true))
      .catch(() => setError('Could not load the chatbot. Please refresh and try again.'));
  }, []);

  return (
    <ProjectShell className="chatbot-app">
      {error ? (
        <p className="chatbot-app__loading">{error}</p>
      ) : !ready ? (
        <p className="chatbot-app__loading">Loading chatbot...</p>
      ) : (
        <Routes>
          <Route index element={<ChatbotView />} />
        </Routes>
      )}
    </ProjectShell>
  );
}
