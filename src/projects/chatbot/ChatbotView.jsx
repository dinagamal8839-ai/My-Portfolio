import { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './styles/chatbot.css';

export default function ChatbotView() {
  const [messages, setMessages] = useState([]);
  const [inputPosition, setInputPosition] = useState(
    () => localStorage.getItem('inputPosition') || 'top'
  );

  function toggleInputPosition() {
    const next = inputPosition === 'top' ? 'bottom' : 'top';
    setInputPosition(next);
    localStorage.setItem('inputPosition', next);
  }

  return (
    <div
      className={`chatbot-container ${inputPosition === 'top'
        ? 'chatbot-container-top'
        : 'chatbot-container-bottom'
      }`}
    >
      <div className="position-switcher-container">
        <button type="button" className="position-switcher" onClick={toggleInputPosition}>
          Move textbox to {inputPosition === 'top' ? 'bottom' : 'top'}
        </button>
      </div>

      {inputPosition === 'top' ? (
        <>
          <ChatInput setMessages={setMessages} />
          <ChatMessages messages={messages} inputPosition={inputPosition} />
        </>
      ) : (
        <>
          <ChatMessages messages={messages} inputPosition={inputPosition} />
          <ChatInput setMessages={setMessages} />
        </>
      )}
    </div>
  );
}
