import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" style={{animation: 'fadeInUp 0.8s ease-out 0.2s both'}}>
              Secure Certificate Verification
              <span className="gradient-text"> Powered by Blockchain</span>
            </h1>
            <p className="hero-description" style={{animation: 'fadeInUp 0.8s ease-out 0.4s both'}}>
              CertiChain provides a tamper-proof, decentralized solution for issuing 
              and verifying academic and professional certificates. Ensure authenticity 
              with cutting-edge blockchain technology and cryptographic security.
            </p>
            <div className="hero-actions" style={{animation: 'fadeInUp 0.8s ease-out 0.6s both'}}>
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Watch Demo</button>
            </div>
            <div className="hero-stats" style={{animation: 'fadeInUp 0.8s ease-out 0.8s both'}}>
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Certificates Issued</div>
              </div>
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Institutions</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
          <div className="hero-visual" style={{animation: 'fadeInUp 0.8s ease-out 0.5s both'}}>
            <div className="blockchain-visual">
              <div className="block block-1">
                <div className="block-header">Block #1</div>
                <div className="block-content">Hash: a1b2c3...</div>
              </div>
              <div className="block-connector">⛓️</div>
              <div className="block block-2">
                <div className="block-header">Block #2</div>
                <div className="block-content">Hash: d4e5f6...</div>
              </div>
              <div className="block-connector">⛓️</div>
              <div className="block block-3">
                <div className="block-header">Block #3</div>
                <div className="block-content">Hash: g7h8i9...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;