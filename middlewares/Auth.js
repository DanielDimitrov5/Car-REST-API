import { verify } from 'jsonwebtoken';

const JWT_SECRET = 'secret';

const auth = (req, res, next) => {
    const token = req.header('x-access-token');

    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

export default auth;