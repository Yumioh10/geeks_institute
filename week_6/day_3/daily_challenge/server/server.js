const express = require('express');
const { initDatabase, verifyConnection } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (optional but recommended)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// JSON parsing error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON format',
      error: 'Please check your JSON syntax (common issues: trailing commas, missing quotes, extra brackets)',
      details: err.message
    });
  }
  next(err);
});

// Routes
app.use('/api', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'User Management API with PostgreSQL',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      getAllUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      updateUser: 'PUT /api/users/:id'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('🚀 Starting User Management API...');
    console.log('Connecting to PostgreSQL database...');
    
    // Verify connection first
    const connected = await verifyConnection();
    if (!connected) {
      console.error('❌ Cannot connect to database. Please check:');
      console.error('   1. PostgreSQL is running');
      console.error('   2. Database "user_management" exists');
      console.error('   3. Connection credentials are correct in .env');
      process.exit(1);
    }
    
    // Initialize database schema
    await initDatabase();
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log(`✓ API ready to accept requests`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
