import { useState } from 'react';
import type { Message } from '../types';
import CalendarSnippet from './CalendarSnippet';
import FileSnippet from './FileSnippet';
import ServiceBadge from './ServiceBadge';

interface ChatInterfaceProps {
  messages: Message[];
  onSettingsClick?: () => void;
  onAgentsClick?: () => void;
}

export default function ChatInterface({ messages, onSettingsClick, onAgentsClick }: ChatInterfaceProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <h1>Bolt AI Assistant</h1>
        </div>
        <div className="chat-actions">
          {onAgentsClick && (
            <button className="agents-button" onClick={onAgentsClick} title="Agents">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
              </svg>
              Agents
            </button>
          )}
          {onSettingsClick && (
            <button className="settings-button" onClick={onSettingsClick} title="Settings">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-sender">{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
                <span className="message-time">Just now</span>
              </div>
              <div className="message-text">
                {message.content}
              </div>
              {message.metadata?.type === 'calendar' && message.metadata.data?.events && (
                <CalendarSnippet events={message.metadata.data.events} />
              )}
              {message.metadata?.type === 'file' && message.metadata.data?.fileName && (
                <FileSnippet
                  fileName={message.metadata.data.fileName}
                  summary={message.metadata.data.summary}
                />
              )}
              {message.metadata?.services && message.metadata.services.length > 0 && (
                <div className="service-badges">
                  {message.metadata.services.map((service, index) => (
                    <ServiceBadge
                      key={index}
                      serviceName={service.name}
                      icon={service.icon}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
          />
          <button className="send-button" onClick={handleSend} disabled={!input.trim()}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
