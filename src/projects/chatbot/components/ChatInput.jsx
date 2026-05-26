import React, { useState } from 'react';
import { chatbotAsset } from '../paths.js';

/**
 * Input bar with async send + loading state.
 * Disabled while waiting for the bot response.
 *
 * @param {Function} setMessages - State setter for the messages array.
 */
function ChatInput({ setMessages }) {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') sendMessage();
  }

  async function sendMessage() {
    if (isDisabled || inputValue === '') return;

    const newMessage = inputValue;

    // Add the user message
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), message: newMessage, user: 'user' },
    ]);

    setIsDisabled(true);
    setInputValue('');

    // Show loading spinner as a robot message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message: (
          <img src={chatbotAsset('loading-spinner.gif')} className="loading-spinner" alt="loading" />
        ),
        user: 'robot',
      },
    ]);

    // Fetch real response and replace the spinner
    const response = await Chatbot.getResponseAsync(newMessage);

    setMessages((prev) => [
      ...prev.slice(0, prev.length - 1),
      { id: crypto.randomUUID(), message: response, user: 'robot' },
    ]);

    setIsDisabled(false);
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      <button
        className="send-button"
        onClick={sendMessage}
        disabled={isDisabled}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
