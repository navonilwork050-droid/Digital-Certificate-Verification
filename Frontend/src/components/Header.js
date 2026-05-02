import React from 'react';

const Header = ({ activeTab, setActiveTab, signedIn, user, onSignOut }) => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">⛓️</div>
            <span className="logo-text">CertiChain</span>
          </div>
          <div className="nav-links">
            <button
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </button>
            {signedIn && (
              <>
                <button
                  className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`nav-link ${activeTab === 'issuer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('issuer')}
                >
                  Issuer Portal
                </button>
                <button
                  className={`nav-link ${activeTab === 'verification' ? 'active' : ''}`}
                  onClick={() => setActiveTab('verification')}
                >
                  Verify Certificate
                </button>
              </>
            )}
          </div>
          <div className="nav-actions">
            {signedIn ? (
              <>
                <span style={{ marginRight: '1rem', color: '#666' }}>
                  Welcome, {user?.name || user?.email || 'User'}
                </span>
                <button className="btn btn-secondary">Connect Wallet</button>
                <button
                  className="btn btn-primary"
                  onClick={onSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-secondary">Connect Wallet</button>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('signin')}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;