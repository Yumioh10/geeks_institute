const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
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
      error: 'Please check your JSON syntax'
    });
  }
  next(err);
});

// Request logger (development)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    version: '1.0.0',
    endpoints: {
      getAllTasks: 'GET /api/tasks',
      getTaskById: 'GET /api/tasks/:id',
      createTask: 'POST /api/tasks',
      updateTask: 'PUT /api/tasks/:id',
      deleteTask: 'DELETE /api/tasks/:id'
    },
    example: {
      createTask: {
        method: 'POST',
        url: '/api/tasks',
        body: {
          title: 'Complete project',
          description: 'Finish the task management API',
          status: 'pending'
        }
      }
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
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

// Initialize data directory and file
const initializeDataFile = async () => {
  try {
    const dataDir = path.join(__dirname, 'data');
    const tasksFile = path.join(dataDir, 'tasks.json');

    // Create data directory if it doesn't exist
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
      console.log('✓ Data directory created');
    }

    // Create tasks.json if it doesn't exist
    try {
      await fs.access(tasksFile);
      console.log('✓ tasks.json file exists');
    } catch {
      await fs.writeFile(tasksFile, JSON.stringify([], null, 2));
      console.log('✓ tasks.json file created with empty array');
    }
  } catch (error) {
    console.error('Error initializing data file:', error);
    throw error;
  }
};

// Start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Task Management API...');
    await initializeDataFile();
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/health`);
      console.log(`✓ API ready to accept requests`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing server');
  process.exit(0);
});
