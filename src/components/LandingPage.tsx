import './LandingPage.css';

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Bolt AI</span>
          </div>
          <div className="nav-actions">
            <button className="btn-nav-login" onClick={onLogin}>
              Log In
            </button>
            <button className="btn-nav-signup" onClick={onSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>AI-Powered Task Automation</span>
          </div>
          <h1 className="hero-title">
            Automate Your Workflow with
            <span className="gradient-text"> Intelligent Agents</span>
          </h1>
          <p className="hero-description">
            Connect your favorite services, create smart automation agents, and let AI handle repetitive tasks.
            Save time and focus on what matters most.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={onSignup}>
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-hero-secondary" onClick={onLogin}>
              Sign In
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Automations Created</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card card-1">
            <div className="card-icon">📧</div>
            <div className="card-content">
              <div className="card-title">Email Summary</div>
              <div className="card-status">Running</div>
            </div>
          </div>
          <div className="visual-card card-2">
            <div className="card-icon">📅</div>
            <div className="card-content">
              <div className="card-title">Meeting Prep</div>
              <div className="card-status">Active</div>
            </div>
          </div>
          <div className="visual-card card-3">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <div className="card-title">Weekly Report</div>
              <div className="card-status">Scheduled</div>
            </div>
          </div>
          <div className="visual-glow"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to automate your workflow</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Agents</h3>
            <p>Create intelligent automation agents that learn and adapt to your workflow patterns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Service Integration</h3>
            <p>Connect Gmail, Calendar, Drive, Slack, and more with seamless OAuth integration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Triggers</h3>
            <p>Respond instantly to events with powerful trigger conditions and workflows</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI-Powered</h3>
            <p>Leverage advanced AI to summarize, analyze, and process your data automatically</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Enterprise-grade security with encrypted data and granular permission controls</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analytics Dashboard</h3>
            <p>Track automation performance with detailed insights and usage statistics</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users automating their workflows with Bolt AI</p>
          <div className="cta-actions">
            <button className="btn-cta-primary" onClick={onSignup}>
              Create Free Account
            </button>
            <p className="cta-note">No credit card required</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Bolt AI</span>
          </div>
          <p className="footer-text">Intelligent task automation for modern teams</p>
        </div>
      </footer>
    </div>
  );
}
