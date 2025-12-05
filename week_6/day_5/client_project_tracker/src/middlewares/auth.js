import jwt from 'jsonwebtoken';
import { User } from '#@/modules/auth/index.js';

export const auth = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    } else if (authHeader && authHeader.startsWith('bearer ')) {
      token = authHeader.substring(7); // Handle lowercase 'bearer'
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please authenticate.',
        hint: 'Include Authorization header: Bearer YOUR_TOKEN'
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.'
        });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired. Please login again.'
        });
      }

      throw error;
    }

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Invalid token.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated.'
      });
    }

    // Attach user to request
    req.user = {
      id: user._id.toString(),
      userId: user._id.toString(), // Add userId for compatibility
      email: user.email,
      name: user.name,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};