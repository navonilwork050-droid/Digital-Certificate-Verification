import { verify } from './jwt.js';

export default (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
        req.user = verify(token);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
