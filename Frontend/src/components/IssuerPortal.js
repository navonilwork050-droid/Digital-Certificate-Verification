import React, { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

const IssuerPortal = ({ user }) => {
  const [issuers, setIssuers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [issuingCert, setIssuingCert] = useState(false);
  const [issueResult, setIssueResult] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    certificateTitle: '',
    issueDate: '',
    description: '',
    file: null
  });

  useEffect(() => {
    const fetchIssuers = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/issuer');
        setIssuers(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch issuers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIssuingCert(true);
    setIssueResult(null);

    try {
      let certHash = null;

      // Hash file if uploaded, otherwise hash student data
      if (formData.file) {
        // Calculate hash from file content
        const fileBuffer = await formData.file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        certHash = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log('File hash:', certHash);
      } else {
        // Generate hash from student data as fallback
        const dataToHash = `${formData.studentName}${formData.studentId}${formData.certificateTitle}${formData.issueDate}`;
        let hash = '';
        for (let i = 0; i < dataToHash.length; i++) {
          hash += dataToHash.charCodeAt(i).toString(16).padStart(2, '0');
        }
        hash = (hash + '0'.repeat(64)).slice(0, 64);
        certHash = '0x' + hash;
        console.log('Data hash:', certHash);
      }

      // Call blockchain mint endpoint
      const result = await apiFetch('/blockchain/mint', {
        method: 'POST',
        body: JSON.stringify({
          studentName: formData.studentName,
          degree: formData.certificateTitle,
          certHash: certHash
        })
      });

      if (result.success) {
        setIssueResult({
          success: true,
          studentName: result.studentName,
          degree: result.degree,
          blockNumber: result.blockNumber,
          transactionHash: result.transactionHash,
          timestamp: new Date(result.timestamp * 1000).toLocaleString(),
          certHash: certHash
        });

        // Clear form
        setFormData({
          studentName: '',
          studentId: '',
          certificateTitle: '',
          issueDate: '',
          description: '',
          file: null
        });
      } else {
        setIssueResult({
          success: false,
          error: result.error || 'Failed to issue certificate'
        });
      }
    } catch (err) {
      console.error('Issuance error:', err);
      setIssueResult({
        success: false,
        error: err.message
      });
    } finally {
      setIssuingCert(false);
    }
  };

  return (
    <div className="issuer-portal">
      <div className="container">
        <div className="portal-header">
          <h1>Issuer Portal</h1>
          <p>Issue new certificates and manage existing ones</p>
        </div>

        <div className="portal-content grid grid-2">
          <div className="issue-form card">
            <h2>Issue New Certificate</h2>
            {issueResult && !issueResult.success && (
              <div style={{ padding: '1rem', backgroundColor: '#fee', borderRadius: '4px', marginBottom: '1rem' }}>
                <p style={{ color: '#c00', margin: 0 }}>❌ {issueResult.error}</p>
              </div>
            )}
            {issueResult && issueResult.success && (
              <div style={{ padding: '1rem', backgroundColor: '#efe', borderRadius: '4px', marginBottom: '1rem' }}>
                <p style={{ color: '#060', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>✅ Certificate Issued to Blockchain!</p>
                <div style={{ fontSize: '0.9rem', color: '#333' }}>
                  <div><strong>Student:</strong> {issueResult.studentName}</div>
                  <div><strong>Degree:</strong> {issueResult.degree}</div>
                  <div><strong>Block Number:</strong> {issueResult.blockNumber}</div>
                  <div><strong>Transaction Hash:</strong> <span style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{issueResult.transactionHash}</span></div>
                  <div><strong>Timestamp:</strong> {issueResult.timestamp}</div>
                  <div><strong>Certificate Hash:</strong> <span style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{issueResult.certHash}</span></div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="Enter student full name"
                  required
                  disabled={issuingCert}
                />
              </div>

              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Enter student ID"
                  required
                  disabled={issuingCert}
                />
              </div>

              <div className="form-group">
                <label>Certificate Title</label>
                <input
                  type="text"
                  name="certificateTitle"
                  value={formData.certificateTitle}
                  onChange={handleInputChange}
                  placeholder="Enter certificate title"
                  required
                  disabled={issuingCert}
                />
              </div>

              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                  disabled={issuingCert}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter certificate description"
                  rows="3"
                  disabled={issuingCert}
                />
              </div>

              <div className="form-group">
                <label>Upload Certificate File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.png"
                  disabled={issuingCert}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={issuingCert}>
                {issuingCert ? 'Issuing to Blockchain...' : 'Issue Certificate to Blockchain'}
              </button>
            </form>
          </div>

          <div className="recent-activity card">
            <h2>Available Issuers</h2>
            {loading ? (
              <p>Loading issuers...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
              <div className="activity-list">
                {issuers.map(issuer => (
                  <div key={issuer.id} className="activity-item">
                    <div className="activity-icon">🏛️</div>
                    <div className="activity-content">
                      <div className="activity-title">{issuer.name}</div>
                      <div className="activity-desc">ID: {issuer.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerPortal;