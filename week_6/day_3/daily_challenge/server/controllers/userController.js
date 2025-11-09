// server/controllers/userController.js
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const saltRounds = 10; // Cost factor for bcrypt

const userController = {
  /**
   * POST /register
   * Registers a new user
   */
  async register(req, res) {
    const { username, password, email, first_name, last_name } = req.body;

    // Basic validation
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required.' });
    }

    try {
      // Hash the password
      const password_hash = await bcrypt.hash(password, saltRounds);

      // Prepare user data for the model
      const userData = {
        username,
        email,
        first_name,
        last_name,
        password_hash,
      };

      // Create user using the transaction model
      const newUser = await userModel.create(userData);
      res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
      console.error(error);
      // Handle potential duplicate username/email
      if (error.code === '23505') { // PostgreSQL unique violation code
        return res.status(409).json({ error: 'Username or email already exists.' });
      }
      res.status(500).json({ error: 'Server error during registration.' });
    }
  },

  /**
   * POST /login
   * Logs in a user
   */
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
      // 1. Find the user's credentials (hashed password)
      const userCredentials = await userModel.findCredentialsByUsername(username);

      if (!userCredentials) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // 2. Compare the provided password with the stored hash
      const isMatch = await bcrypt.compare(password, userCredentials.password_hash);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // 3. Fetch the user's data (without password) to return
      const user = await userModel.findByUsername(username);

      // On successful login, you would typically create a session or JWT
      // For this challenge, we'll just send a success message
      res.status(200).json({ message: 'Login successful', user: user });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error during login.' });
    }
  },

  /**
   * GET /users
   * Retrieves all users
   */
  async getAllUsers(req, res) {
    try {
      const users = await userModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  },

  /**
   * GET /users/:id
   * Retrieves a specific user by ID
   */
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await userModel.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error.' });
    }
  },

  /**
   * PUT /users/:id
   * Updates a user's information
   */
  async updateUser(req, res) {
    const { id } = req.params;
    const { email, first_name, last_name } = req.body;

    try {
      const [updatedUser] = await userModel.update(id, { email, first_name, last_name });
      if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
       if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already in use.' });
      }
      res.status(500).json({ error: 'Server error.' });
    }
  }
};

module.exports = userController;