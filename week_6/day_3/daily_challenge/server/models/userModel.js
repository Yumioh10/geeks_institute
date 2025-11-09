// server/models/userModel.js
const db = require('../config/db');

const userModel = {
  // Use a transaction to create a user in both tables
  async create(userData) {
    const { email, username, first_name, last_name, password_hash } = userData;

    return db.transaction(async (trx) => {
      // 1. Insert into 'users' table and get the new user's ID
      const [newUser] = await trx('users')
        .insert({ email, username, first_name, last_name })
        .returning(['id', 'username', 'email']); // Return the new user's data

      // 2. Insert into 'hashpwd' table using the new ID
      await trx('hashpwd').insert({
        id: newUser.id,
        username: newUser.username,
        password_hash: password_hash,
      });

      return newUser; // Return the user data (without password)
    });
  },

  // Find all users (basic info)
  findAll() {
    return db('users').select('id', 'username', 'email', 'first_name', 'last_name');
  },

  // Find a user by their ID
  findById(id) {
    return db('users')
      .select('id', 'username', 'email', 'first_name', 'last_name')
      .where({ id })
      .first();
  },

  // Find user credentials by username (for login)
  findCredentialsByUsername(username) {
    return db('hashpwd').where({ username }).first();
  },

  // Find user data by username (to return on login)
  findByUsername(username) {
     return db('users')
      .select('id', 'username', 'email')
      .where({ username })
      .first();
  },

  // Update a user's information
  update(id, updates) {
    // Only update fields that are allowed
    const allowedUpdates = {
      email: updates.email,
      first_name: updates.first_name,
      last_name: updates.last_name
    };

    // Remove any undefined fields
    Object.keys(allowedUpdates).forEach(key => 
      allowedUpdates[key] === undefined && delete allowedUpdates[key]
    );

    return db('users')
      .where({ id })
      .update(allowedUpdates)
      .returning(['id', 'username', 'email', 'first_name', 'last_name']);
  }
};

module.exports = userModel;