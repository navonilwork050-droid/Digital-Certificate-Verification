import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export const sign = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });
export const verify = (token) => jwt.verify(token, SECRET);
