import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

/**
 * Scrollable message list. Shows a welcome message when empty.
 * Auto-scrolls to bottom on new messages or position change.
 *
 * @param {Array}  messages      - Array of { id, message, user } objects.
 * @param {string} inputPosition - 'top' or 'bottom', used in the welcome text.
 */
function ChatMessages({ messages, inputPosition }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, inputPosition]);

  return (
    <div className="chat-messages-container" ref={containerRef}>
      {messages.length === 0 ? (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox{' '}
          {inputPosition === 'top' ? 'above' : 'below'}.
        </p>
      ) : (
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.message} user={msg.user} />
        ))
      )}
    </div>
  );
}

export default ChatMessages;
