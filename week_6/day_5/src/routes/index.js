import { Router } from 'express';
import authRouter from '#@/modules/auth/index.js';
import projectRouter from '#@/modules/project/index.js';

const apiRouter = Router();

// Health check route
apiRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully.' });
});

// Auth Routes: /api/auth/* (register, login)
apiRouter.use('/auth', authRouter);

// Project Routes: /api/projects/* (CRUD, requires auth middleware)
apiRouter.use('/projects', projectRouter);

export default apiRouter;