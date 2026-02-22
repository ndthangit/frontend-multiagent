import { useState } from 'react';
import type { Agent } from '../types';
import './AgentsUI.css';

interface AgentsUIProps {
  agents: Agent[];
  onBack: () => void;
  onCreateAgent: () => void;
  onToggleAgent: (agentId: string) => void;
}

export default function AgentsUI({ agents, onBack, onCreateAgent, onToggleAgent }: AgentsUIProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredAgents = agents.filter(agent => {
    if (filter === 'active') return agent.enabled;
    if (filter === 'inactive') return !agent.enabled;
    return true;
  });

  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="agents-ui">
      <div className="agents-header">
        <button className="back-button" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor"/>
          </svg>
          Back to Chat
        </button>
        <div className="agents-header-content">
          <div>
            <h1>Process Task Agents</h1>
            <p>Automate workflows by connecting your services with AI-powered agents</p>
          </div>
          <button className="btn-create-agent" onClick={onCreateAgent}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Create Agent
          </button>
        </div>
      </div>

      <div className="agents-content">
        <div className="agents-toolbar">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Agents ({agents.length})
            </button>
            <button
              className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({agents.filter(a => a.enabled).length})
            </button>
            <button
              className={`filter-tab ${filter === 'inactive' ? 'active' : ''}`}
              onClick={() => setFilter('inactive')}
            >
              Inactive ({agents.filter(a => !a.enabled).length})
            </button>
          </div>
        </div>

        {filteredAgents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤖</div>
            <h3>No agents found</h3>
            <p>Create your first automation agent to get started</p>
            <button className="btn-create-agent" onClick={onCreateAgent}>
              Create Agent
            </button>
          </div>
        ) : (
          <div className="agents-grid">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className={`agent-card ${!agent.enabled ? 'disabled' : ''}`}>
                <div className="agent-card-header">
                  <div className="agent-icon">{agent.icon}</div>
                  <div className="agent-toggle">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={agent.enabled}
                        onChange={() => onToggleAgent(agent.id)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="agent-card-body">
                  <h3>{agent.name}</h3>
                  <p className="agent-description">{agent.description}</p>

                  <div className="agent-workflow">
                    <div className="workflow-step">
                      <div className="step-icon trigger">⚡</div>
                      <div className="step-info">
                        <span className="step-label">Trigger</span>
                        <span className="step-value">{agent.trigger.operation}</span>
                      </div>
                    </div>

                    <div className="workflow-arrow">→</div>

                    <div className="workflow-step">
                      <div className="step-icon action">⚙️</div>
                      <div className="step-info">
                        <span className="step-label">Actions</span>
                        <span className="step-value">{agent.actions.length} step{agent.actions.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>

                  <div className="agent-stats">
                    <div className="stat">
                      <span className="stat-label">Last Run</span>
                      <span className="stat-value">{formatDate(agent.lastRun)}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Total Runs</span>
                      <span className="stat-value">{agent.runCount}</span>
                    </div>
                  </div>
                </div>

                <div className="agent-card-footer">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-test">Test Run</button>
                  <button className="btn-more">⋮</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
