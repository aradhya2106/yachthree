import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/chat', {
        question: inputMessage
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.answer,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        sources: response.data.relevant_faqs
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>💬 Ask about Indian Labor Laws</h2>
        <p>Get instant answers about your legal rights and obligations</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>👋 Welcome to the Legal Rights Chatbot!</h3>
            <p>Ask me anything about Indian labor laws, such as:</p>
            <ul>
              <li>What is the minimum wage in India?</li>
              <li>What are the rules for paid leave?</li>
              <li>Can an employer terminate without notice?</li>
              <li>What are my rights as an employee?</li>
            </ul>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
              
              {message.sources && message.sources.length > 0 && (
                <div className="message-sources">
                  <h4>📚 Sources:</h4>
                  {message.sources.map((source, index) => (
                    <div key={index} className="source-item">
                      <strong>Q: {source.question}</strong>
                      <p>A: {source.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="loading-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Thinking...</p>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your question about Indian labor laws..."
            disabled={isLoading}
            className="message-input"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
        <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
};

export default ChatInterface; 