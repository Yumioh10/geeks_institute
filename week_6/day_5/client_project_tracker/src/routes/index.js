import { Router } from 'express';
import authRoutes from '#@/routes/auth/index.js';
import projectRoutes from '#@/routes/project/index.js';
import taskRoutes from '#@/routes/task/index.js';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router;