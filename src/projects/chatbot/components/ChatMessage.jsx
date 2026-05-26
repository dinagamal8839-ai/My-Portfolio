import React from 'react';
import { chatbotAsset } from '../paths.js';

/**
 * Single chat bubble with avatar.
 *
 * @param {string|ReactNode} message - Text or JSX content (e.g. loading spinner).
 * @param {'user'|'robot'}   user    - Who sent the message.
 */
function ChatMessage({ message, user }) {
  return (
    <div className={`chat-message-container-${user}`}>
      {user === 'robot' && (
        <img src={chatbotAsset('robot.png')} className="chat-message-profile" alt="Robot" />
      )}
      <p className="chat-message-contents">{message}</p>
      {user === 'user' && (
        <img src={chatbotAsset('user.png')} className="chat-message-profile" alt="User" />
      )}
    </div>
  );
}

export default ChatMessage;
