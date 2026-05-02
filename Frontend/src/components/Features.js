import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🔐',
      title: 'Tamper-Proof Security',
      description: 'Immutable blockchain records prevent unauthorized alterations and forgeries with cryptographic proof.'
    },
    {
      icon: '⚡',
      title: 'Instant Verification',
      description: 'Verify certificates in seconds without manual processes or intermediaries using smart contracts.'
    },
    {
      icon: '🌍',
      title: 'Global Access',
      description: 'Access and verify certificates from anywhere in the world, 24/7 with decentralized infrastructure.'
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Reduce administrative costs by 80% and eliminate third-party verification fees forever.'
    },
    {
      icon: '🛡️',
      title: 'Privacy First',
      description: 'Zero-knowledge proofs and off-chain storage protect sensitive personal information.'
    },
    {
      icon: '🔗',
      title: 'Interoperable',
      description: 'W3C Verifiable Credentials standard ensures seamless cross-platform compatibility.'
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose CertiChain?</h2>
          <p>Revolutionizing certificate verification with cutting-edge blockchain technology</p>
        </div>
        <div className="grid grid-3">
          {features.map((feature, index) => (
            <div key={index} className="feature-card card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;