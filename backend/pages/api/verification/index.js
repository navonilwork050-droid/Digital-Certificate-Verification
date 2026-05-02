import { allowCors } from '../../../lib/cors';
import { query } from '../../../lib/db';
import { verify } from '../../../lib/jwt';

export default async function handler(req, res) {
    if (allowCors(req, res)) return;

    // Check auth (convert middleware pattern for next.js api route)
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        const user = verify(token);
        req.user = user;
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (req.method === 'GET') {
        try {
            const result = await query('SELECT id, holder, certificate_title, issue_date, verified FROM verifications ORDER BY created_at DESC');
            return res.status(200).json(result.rows);
        } catch (err) {
            console.error('Verification fetch error:', err);
            return res.status(500).json({ error: 'Failed to fetch verifications' });
        }
    }

    if (req.method === 'POST') {
        const { holder, certificate_title, issue_date, verified } = req.body || {};
        if (!holder) return res.status(400).json({ error: 'Holder required' });

        try {
            const id = Math.random().toString(36).substr(2, 9);
            const result = await query(
                'INSERT INTO verifications (id, holder, certificate_title, issue_date, verified) VALUES ($1, $2, $3, $4, $5) RETURNING id, holder, certificate_title, issue_date, verified',
                [id, holder, certificate_title, issue_date, verified || false]
            );
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Verification create error:', err);
            return res.status(500).json({ error: 'Failed to create verification' });
        }
    }

    res.status(405).end();
}
