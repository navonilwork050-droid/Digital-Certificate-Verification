import { mintCertificate } from '../../../lib/blockchain.js';
import { verify } from '../../../lib/jwt.js';
import { allowCors } from '../../../lib/cors.js';

export default async function handler(req, res) {
    if (allowCors(req, res)) return;
    if (req.method !== 'POST') return res.status(405).end();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        verify(token);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { studentName, degree, certHash } = req.body || {};
    if (!studentName || !degree || !certHash) {
        return res.status(400).json({ error: 'Missing required fields: studentName, degree, certHash' });
    }

    try {
        const result = await mintCertificate(studentName, degree, certHash);
        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (err) {
        console.error('Mint error:', err);
        return res.status(500).json({ error: err.message || 'Failed to mint certificate' });
    }
}
