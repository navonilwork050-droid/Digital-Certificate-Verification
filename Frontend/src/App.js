import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import IssuerPortal from './components/IssuerPortal';
import VerificationPortal from './components/VerificationPortal';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import { getToken, clearToken } from './lib/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setSignedIn(true);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to restore auth state:', err);
        clearToken();
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Scroll to top whenever activeTab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleSignIn = (userObj) => {
    setSignedIn(true);
    setUser(userObj);
    try {
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (err) {
      console.error('Failed to store user:', err);
    }
    setActiveTab('home');
  };

  const handleSignOut = () => {
    setSignedIn(false);
    setUser(null);
    clearToken();
    localStorage.removeItem('user');
    setActiveTab('home');
  };

  const renderContent = () => {
    if (!signedIn) {
      return activeTab === 'signin' ? (
        <SignIn onAuth={handleSignIn} />
      ) : (
        <>
          <Hero />
          <Features />
        </>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'issuer':
        return <IssuerPortal user={user} />;
      case 'verification':
        return <VerificationPortal user={user} />;
      default:
        return (
          <>
            <Hero />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        signedIn={signedIn}
        user={user}
        onSignOut={handleSignOut}
      />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;