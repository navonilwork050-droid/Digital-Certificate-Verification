import React, { useState } from 'react';

const Dashboard = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 'CERT-001',
      title: 'Bachelor of Technology in Computer Science',
      issuer: 'Techno Main Salt Lake',
      issueDate: '2024-05-15',
      status: 'Verified',
      hash: '0x1a2b3c4d5e6f...'
    },
    {
      id: 'CERT-002',
      title: 'Blockchain Developer Certification',
      issuer: 'Crypto University',
      issueDate: '2024-03-10',
      status: 'Verified',
      hash: '0x7g8h9i0j1k2l...'
    }
  ]);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Certificates</h1>
          <p>Manage and view your blockchain-verified certificates</p>
        </div>
        
        <div className="dashboard-stats grid grid-3">
          <div className="stat-card card">
            <div className="stat-value">{certificates.length}</div>
            <div className="stat-label">Total Certificates</div>
          </div>
          <div className="stat-card card">
            <div className="stat-value">{certificates.filter(c => c.status === 'Verified').length}</div>
            <div className="stat-label">Verified</div>
          </div>
          <div className="stat-card card">
            <div className="stat-value">2</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="certificates-list">
          <div className="section-header">
            <h2>Your Certificates</h2>
            <button className="btn btn-primary">Add Certificate</button>
          </div>
          
          <div className="certificates-grid">
            {certificates.map((cert) => (
              <div key={cert.id} className="certificate-card card">
                <div className="certificate-header">
                  <h3>{cert.title}</h3>
                  <span className={`status-badge status-${cert.status.toLowerCase()}`}>
                    {cert.status}
                  </span>
                </div>
                <div className="certificate-details">
                  <div className="detail">
                    <label>Issuer:</label>
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="detail">
                    <label>Issue Date:</label>
                    <span>{cert.issueDate}</span>
                  </div>
                  <div className="detail">
                    <label>Blockchain Hash:</label>
                    <span className="hash">{cert.hash}</span>
                  </div>
                </div>
                <div className="certificate-actions">
                  <button className="btn btn-primary">View</button>
                  <button className="btn btn-secondary">Share</button>
                  <button className="btn btn-secondary">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;