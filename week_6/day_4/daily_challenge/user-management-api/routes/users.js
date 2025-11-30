const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../users.json');
const SALT_ROUNDS = 10;

// Helper function to read users from file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with empty array
      await fs.writeFile(USERS_FILE, '[]');
      return [];
    }
    throw error;
  }
}

// Helper function to write users to file
async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// POST /register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    // Validation
    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Read existing users
    const users = await readUsers();

    // Check if username already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username already exists' 
      });
    }

    // Check if email already exists
    const existingEmail = users.find(u => u.email === email);
    if (existingEmail) {
      return res.status(400).json({ 
        message: 'Email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      lastName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Add user to array
    users.push(newUser);

    // Write to file
    await writeUsers(users);

    // Return success message (matching the example format)
    res.status(201).json({ 
      message: `Hello ${name} Your account is now created!`,
      userId: newUser.id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error during registration',
      error: error.message 
    });
  }
});

// POST /login - Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      });
    }

    // Read users
    const users = await readUsers();

    // Find user by username
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(404).json({ 
        message: 'Username is not registered' 
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Incorrect password' 
      });
    }

    // Return success message (matching the example format)
    res.status(200).json({ 
      message: `Hi ${username} welcome back again!`,
      userId: user.id 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error during login',
      error: error.message 
    });
  }
});

// GET /users - Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await readUsers();
    
    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    res.status(200).json({
      count: users.length,
      users: usersWithoutPasswords
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users',
      error: error.message 
    });
  }
});

// GET /users/:id - Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ 
        message: 'Invalid user ID' 
      });
    }

    const users = await readUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      message: 'Error fetching user',
      error: error.message 
    });
  }
});

// PUT /users/:id - Update user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ 
        message: 'Invalid user ID' 
      });
    }

    const { name, lastName, email, username, password } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    // Check if new username/email already exists (for different user)
    if (username && username !== users[userIndex].username) {
      const existingUser = users.find(u => u.username === username && u.id !== userId);
      if (existingUser) {
        return res.status(400).json({ 
          message: 'Username already exists' 
        });
      }
    }

    if (email && email !== users[userIndex].email) {
      const existingEmail = users.find(u => u.email === email && u.id !== userId);
      if (existingEmail) {
        return res.status(400).json({ 
          message: 'Email already exists' 
        });
      }
    }

    // Update user fields
    if (name) users[userIndex].name = name;
    if (lastName) users[userIndex].lastName = lastName;
    if (email) users[userIndex].email = email;
    if (username) users[userIndex].username = username;
    
    // Hash new password if provided
    if (password) {
      users[userIndex].password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    users[userIndex].updatedAt = new Date().toISOString();

    // Write to file
    await writeUsers(users);

    // Remove password from response
    const { password: _, ...updatedUser } = users[userIndex];
    
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Error updating user',
      error: error.message 
    });
  }
});

module.exports = router;