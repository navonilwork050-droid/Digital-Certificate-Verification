import { allowCors } from '../../../lib/cors';
import bcrypt from 'bcryptjs';
import { query } from '../../../lib/db';
import { sign } from '../../../lib/jwt';

export default async function handler(req, res) {
    if (allowCors(req, res)) return;
    if (req.method !== 'POST') return res.status(405).end();
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

    try {
        const result = await query('SELECT id, password_hash, name FROM users WHERE email = $1', [email]);
        if (result.rowCount === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = sign({ id: user.id, email });
        return res.status(200).json({ id: user.id, email, name: user.name, token });
    } catch (err) {
        console.error('Signin error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}
