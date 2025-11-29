const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'user_auth_db'
  },
  pool: {
    min: 2,
    max: 10
  }
});

// Reset database (for development/testing)
const resetDatabase = async () => {
  try {
    console.log('🔄 Resetting database...');
    
    // Drop tables if they exist (in correct order due to foreign keys)
    await db.schema.dropTableIfExists('hashpwd');
    await db.schema.dropTableIfExists('users');
    
    console.log('✓ Old tables dropped');
    
    // Create tables
    await initDatabase();
    
    console.log('✓ Database reset complete');
  } catch (error) {
    console.error('Database reset error:', error);
    throw error;
  }
};

// Initialize database tables
const initDatabase = async () => {
  try {
    // Create users table
    const usersExists = await db.schema.hasTable('users');
    if (!usersExists) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email', 255).unique().notNullable();
        table.string('username', 100).unique().notNullable();
        table.string('first_name', 100);
        table.string('last_name', 100);
        table.timestamps(true, true);
      });
      console.log('✓ Users table created');
    } else {
      console.log('✓ Users table already exists');
    }

    // Create hashpwd table
    const hashpwdExists = await db.schema.hasTable('hashpwd');
    if (!hashpwdExists) {
      await db.schema.createTable('hashpwd', (table) => {
        table.increments('id').primary();
        table.string('username', 100).unique().notNullable();
        table.string('hash', 255).notNullable(); // Changed from 'password' to 'hash'
        table.timestamps(true, true);
        
        // Foreign key constraint
        table.foreign('username').references('username').inTable('users').onDelete('CASCADE');
      });
      console.log('✓ Hashpwd table created');
    } else {
      console.log('✓ Hashpwd table already exists');
      
      // Check if column structure is correct
      const columns = await db('hashpwd').columnInfo();
      if (!columns.hash && columns.password) {
        console.log('⚠️  Detected old schema with "password" column');
        console.log('🔄 Run "npm run reset-db" to fix the schema');
      } else if (!columns.hash && !columns.password) {
        console.log('⚠️  Warning: hashpwd table exists but missing hash/password column');
        console.log('🔄 Run "npm run reset-db" to fix the schema');
      }
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Verify database connection
const verifyConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('✓ Database connection successful');
    return true;
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    return false;
  }
};

module.exports = { db, initDatabase, resetDatabase, verifyConnection };
