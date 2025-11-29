const { db } = require('../config/database');

class UserModel {
  // Create user with transaction
  static async createUser(userData, hashedPassword) {
    const trx = await db.transaction();
    try {
      // Insert into users table
      const [user] = await trx('users')
        .insert({
          email: userData.email,
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name
        })
        .returning(['id', 'username', 'email']);

      // Insert into hashpwd table
      await trx('hashpwd').insert({
        username: userData.username,
        hash: hashedPassword
      });

      await trx.commit();
      return user;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  // Get all users
  static async getAllUsers() {
    return await db('users')
      .select('id', 'email', 'username', 'first_name', 'last_name', 'created_at', 'updated_at')
      .orderBy('id', 'asc');
  }

  // Get user by ID
  static async getUserById(id) {
    return await db('users')
      .where({ id })
      .select('id', 'email', 'username', 'first_name', 'last_name', 'created_at', 'updated_at')
      .first();
  }

  // Get user by username
  static async getUserByUsername(username) {
    return await db('users')
      .where({ username })
      .select('id', 'email', 'username', 'first_name', 'last_name')
      .first();
  }

  // Get password hash
  static async getPasswordHash(username) {
    const result = await db('hashpwd')
      .where({ username })
      .select('hash')
      .first();
    return result ? result.hash : null;
  }

  // Update user
  static async updateUser(id, userData) {
    const [updatedUser] = await db('users')
      .where({ id })
      .update({
        ...userData,
        updated_at: db.fn.now()
      })
      .returning(['id', 'email', 'username', 'first_name', 'last_name', 'updated_at']);
    
    return updatedUser;
  }

  // Check if user exists
  static async userExists(username, email) {
    const user = await db('users')
      .where({ username })
      .orWhere({ email })
      .first();
    return !!user;
  }
}

module.exports = UserModel;
