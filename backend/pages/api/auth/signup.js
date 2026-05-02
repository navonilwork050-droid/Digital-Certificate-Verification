import { allowCors } from '../../../lib/cors';
import bcrypt from 'bcryptjs';
import { query } from '../../../lib/db';
import { sign } from '../../../lib/jwt';

export default async function handler(req, res) {
    if (allowCors(req, res)) return;
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
            [email, hashed, name || email.split('@')[0]]
        );
        const user = result.rows[0];
        const token = sign({ id: user.id, email });
        return res.status(201).json({ id: user.id, email: user.email, name: user.name, token });
    } catch (err) {
        // Handle unique constraint (user exists)
        if (err.code === '23505') return res.status(409).json({ error: 'User already exists' });
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}
