import React, { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

const VerificationPortal = ({ user }) => {
  const [verificationMethod, setVerificationMethod] = useState('hash');
  const [certificateHash, setCertificateHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifyingHash, setVerifyingHash] = useState(false);

  // Clear verification result when method changes
  useEffect(() => {
    setVerificationResult(null);
    setCertificateHash('');
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  }, [verificationMethod]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifyingHash(true);

    try {
      let hashToVerify = certificateHash;

      // If file upload method, extract hash from file
      if (verificationMethod === 'upload') {
        const fileInput = document.querySelector('input[type="file"]');
        if (!fileInput.files || fileInput.files.length === 0) {
          setVerificationResult({
            valid: false,
            error: 'Please select a file'
          });
          setVerifyingHash(false);
          return;
        }

        const file = fileInput.files[0];

        // Calculate hash from file
        const fileBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', fileBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashToVerify = '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        console.log('File hash:', hashToVerify);
      }

      const result = await apiFetch(`/blockchain/verify?hash=${hashToVerify}`);

      if (result.success) {
        setVerificationResult({
          valid: true,
          certificate: {
            studentName: result.studentName,
            degree: result.degree,
            issuer: result.issuer,
            issueDate: new Date(parseInt(result.issueDate) * 1000).toLocaleDateString(),
            hash: result.certHash
          },
          blockchainData: {
            blockNumber: result.blockNumber || 'Pending',
            transactionHash: result.transactionHash || result.hash,
            timestamp: new Date(parseInt(result.issueDate) * 1000).toLocaleString()
          }
        });
      } else {
        setVerificationResult({
          valid: false,
          error: result.error || 'Certificate not found'
        });
      }
    } catch (err) {
      console.error('Verification error:', err);
      setVerificationResult({
        valid: false,
        error: err.message || 'Failed to verify certificate'
      });
    } finally {
      setVerifyingHash(false);
    }
  };

  return (
    <div className="verification-portal">
      <div className="container">
        <div className="portal-header">
          <h1>Certificate Verification</h1>
          <p>Verify the authenticity of any certificate using blockchain technology</p>
        </div>

        <div className="verification-content grid grid-2">
          <div className="verification-form card">
            <h2>Verify Certificate</h2>

            <div className="method-selector">
              <button
                className={`method-btn ${verificationMethod === 'hash' ? 'active' : ''}`}
                onClick={() => setVerificationMethod('hash')}
              >
                By Hash
              </button>
              <button
                className={`method-btn ${verificationMethod === 'upload' ? 'active' : ''}`}
                onClick={() => setVerificationMethod('upload')}
              >
                Upload File
              </button>
              <button
                className={`method-btn ${verificationMethod === 'qr' ? 'active' : ''}`}
                onClick={() => setVerificationMethod('qr')}
              >
                QR Code
              </button>
            </div>

            <form onSubmit={handleVerify}>
              {verificationMethod === 'hash' && (
                <div className="form-group">
                  <label>Certificate Hash</label>
                  <input
                    type="text"
                    value={certificateHash}
                    onChange={(e) => setCertificateHash(e.target.value)}
                    placeholder="Enter certificate hash (0x...)"
                    required
                  />
                </div>
              )}

              {verificationMethod === 'upload' && (
                <div className="form-group">
                  <label>Upload Certificate File</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    required
                  />
                  <small>Supported formats: PDF, JPG, PNG</small>
                </div>
              )}

              {verificationMethod === 'qr' && (
                <div className="qr-section">
                  <div className="qr-placeholder">
                    <div className="qr-scanner-mock">
                      <div className="qr-frame"></div>
                      <p>Point camera at QR code</p>
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={verifyingHash}>
                {verifyingHash ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </form>
          </div>

          <div className="verification-result">
            {verificationResult ? (
              <div className={`result-card card ${verificationResult.valid ? 'valid' : 'invalid'}`}>
                <div className="result-header">
                  <div className="result-icon">
                    {verificationResult.valid ? '✅' : '❌'}
                  </div>
                  <h3>
                    {verificationResult.valid ? 'Certificate Verified ✓ On Blockchain' : 'Certificate Invalid'}
                  </h3>
                </div>

                {verificationResult.valid && (
                  <>
                    <div className="certificate-details">
                      <h4>Certificate Information</h4>
                      <div className="detail">
                        <label>Student Name:</label>
                        <span>{verificationResult.certificate.studentName}</span>
                      </div>
                      <div className="detail">
                        <label>Degree:</label>
                        <span>{verificationResult.certificate.degree}</span>
                      </div>
                      <div className="detail">
                        <label>Issuer Address:</label>
                        <span style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>{verificationResult.certificate.issuer}</span>
                      </div>
                      <div className="detail">
                        <label>Issue Date:</label>
                        <span>{verificationResult.certificate.issueDate}</span>
                      </div>
                    </div>

                    <div className="blockchain-details">
                      <h4>Blockchain Verification ⛓️</h4>
                      <div className="detail">
                        <label>Block Number:</label>
                        <span>{verificationResult.blockchainData.blockNumber}</span>
                      </div>
                      <div className="detail">
                        <label>Transaction Hash:</label>
                        <span className="hash" style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>{verificationResult.blockchainData.transactionHash}</span>
                      </div>
                      <div className="detail">
                        <label>Timestamp:</label>
                        <span>{verificationResult.blockchainData.timestamp}</span>
                      </div>
                      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        ✓ This certificate has been cryptographically verified and stored on the Ethereum blockchain.
                      </p>
                    </div>
                  </>
                )}

                {!verificationResult.valid && (
                  <div style={{ padding: '1rem', backgroundColor: '#fee', borderRadius: '4px' }}>
                    <p style={{ color: '#c00', margin: 0 }}>{verificationResult.error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="placeholder-card card">
                <div className="placeholder-icon">🔍</div>
                <h3>Verify a Certificate on Blockchain</h3>
                <p>Upload a certificate file or enter its hash to verify authenticity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPortal;