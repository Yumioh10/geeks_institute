// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /register
router.post('/register', userController.register);

// POST /login
router.post('/login', userController.login);

// GET /users
router.get('/users', userController.getAllUsers);

// GET /users/:id
router.get('/users/:id', userController.getUserById);

// PUT /users/:id
router.put('/users/:id', userController.updateUser);

module.exports = router;