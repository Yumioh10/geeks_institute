import { Router } from 'express';
import { registerUser, loginUser, getUserById, getAllUsers } from '#@/modules/auth/index.js';
import { auth } from '#@/middlewares/auth.js';
import { isAdmin } from '#@/middlewares/roles.js';
import { asyncHandler } from '#@/middlewares/asyncHandler.js';

const router = Router();

// Register new user
router.post('/register', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password'
    });
  }

  const result = await registerUser({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result
  });
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
  // Check if body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body is required'
    });
  }

  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  const result = await loginUser(email, password);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
}));

// Get current user profile
router.get('/me', auth, asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
}));

// Debug endpoint to test token (development only)
if (process.env.NODE_ENV === 'development') {
  router.get('/debug-token', asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    res.json({
      success: true,
      debug: {
        authHeader: authHeader || 'Not provided',
        headers: req.headers,
        hasToken: !!authHeader,
        tokenFormat: authHeader ? (authHeader.startsWith('Bearer ') ? 'Correct' : 'Wrong format') : 'N/A'
      }
    });
  }));
}

// Get all users (admin only)
router.get('/users', auth, isAdmin, asyncHandler(async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
}));

export default router;