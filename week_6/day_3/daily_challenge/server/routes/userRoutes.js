const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Authentication routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// User management routes
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);

module.exports = router;
