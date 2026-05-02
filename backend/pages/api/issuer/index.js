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
            const result = await query('SELECT id, name, email, institution FROM issuers ORDER BY created_at DESC');
            return res.status(200).json(result.rows);
        } catch (err) {
            console.error('Issuer fetch error:', err);
            return res.status(500).json({ error: 'Failed to fetch issuers' });
        }
    }

    if (req.method === 'POST') {
        const { name, email, institution } = req.body || {};
        if (!name) return res.status(400).json({ error: 'Name required' });

        try {
            const result = await query(
                'INSERT INTO issuers (name, email, institution) VALUES ($1, $2, $3) RETURNING id, name, email, institution',
                [name, email, institution]
            );
            return res.status(201).json(result.rows[0]);
        } catch (err) {
            if (err.code === '23505') return res.status(409).json({ error: 'Issuer already exists' });
            console.error('Issuer create error:', err);
            return res.status(500).json({ error: 'Failed to create issuer' });
        }
    }

    res.status(405).end();
}
