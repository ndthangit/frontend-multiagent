import { useState } from 'react';
import type { Conversation } from '../types';
import { useKeycloak } from '@react-keycloak/web';

interface TaskHistoryProps {
  conversations: Conversation[];
  currentId: string;
  onSelect: (id: string) => void;
}

export default function TaskHistory({ conversations, currentId, onSelect }: TaskHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const { keycloak } = useKeycloak();

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    keycloak.logout({ redirectUri: 'http://localhost:5173/' });
    setShowLogoutMenu(false);
  };

  return (
    <div className="task-history">
      <div className="sidebar-top">
        <button className="new-chat-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New Chat
        </button>

        <div className="search-container">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="quick-links">
          <button className="quick-link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Images</span>
          </button>
          <button className="quick-link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Applications</span>
          </button>
          <button className="quick-link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Codex</span>
          </button>
          <button className="quick-link-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Projects</span>
          </button>
        </div>
      </div>

      <div className="conversation-list">
        <div className="section-header">Your Chats</div>

        <div
          className={`conversation-item ${currentId === 'current' ? 'active' : ''}`}
          onClick={() => onSelect('current')}
          onMouseEnter={() => setHoveredId('current')}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="conversation-content">
            <span className="conversation-title">Current Session</span>
          </div>
          {hoveredId === 'current' && (
            <div className="conversation-actions">
              <button className="action-menu" onClick={(e) => e.stopPropagation()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="2" fill="currentColor"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  <circle cx="12" cy="19" r="2" fill="currentColor"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            className={`conversation-item ${currentId === conv.id ? 'active' : ''}`}
            onClick={() => onSelect(conv.id)}
            onMouseEnter={() => setHoveredId(conv.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="conversation-content">
              <span className="conversation-title">{conv.title}</span>
            </div>
            {hoveredId === conv.id && (
              <div className="conversation-actions">
                <button className="action-menu" onClick={(e) => e.stopPropagation()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="2" fill="currentColor"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <circle cx="12" cy="19" r="2" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        {showLogoutMenu && (
          <>
            <div
              className="logout-overlay"
              onClick={() => setShowLogoutMenu(false)}
            />
            <div className="logout-menu">
              <button className="logout-menu-item" onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Log out</span>
              </button>
            </div>
          </>
        )}

        <div
          className="user-profile"
          onClick={() => setShowLogoutMenu(!showLogoutMenu)}
        >
          <div className="user-avatar">TN</div>
          <div className="user-info">
            <span className="user-name">Thắng Nguyễn</span>
            <span className="user-plan">Free Plan</span>
          </div>
          <svg className="user-menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="2" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
            <circle cx="12" cy="19" r="2" fill="currentColor"/>
          </svg>
        </div>
        <button className="upgrade-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
          </svg>
          Upgrade
        </button>
      </div>
    </div>
  );
}
