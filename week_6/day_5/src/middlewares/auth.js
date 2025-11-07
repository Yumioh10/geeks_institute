import jwt from 'jsonwebtoken';
import { userModel } from '#@/modules/auth/model/index.js';

const JWT_SECRET = process.env.JWT_SECRET;

export async function auth(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Authentication failed. Token has expired.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
        }
            console.error("Auth Middleware Error:", error.message);
            return res.status(500).json({ message: 'Server error during authentication.' });
        }
    }
      