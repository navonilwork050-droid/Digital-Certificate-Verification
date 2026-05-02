import { verifyCertificate } from '../../../lib/blockchain.js';
import { verify as verifyJWT } from '../../../lib/jwt.js';
import { allowCors } from '../../../lib/cors.js';

export default async function handler(req, res) {
    if (allowCors(req, res)) return;
    if (req.method !== 'GET') return res.status(405).end();

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        verifyJWT(token);
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const { hash } = req.query;
    if (!hash) return res.status(400).json({ error: 'Missing hash parameter' });

    try {
        const result = await verifyCertificate(hash);

        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Certificate not found on blockchain'
            });
        }

        return res.status(200).json({
            success: true,
            ...result
        });
    } catch (err) {
        console.error('Verify error:', err);
        return res.status(500).json({ error: err.message || 'Failed to verify certificate' });
    }
}
