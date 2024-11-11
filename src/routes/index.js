import { Router } from 'express';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = Router();

// Home route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js Starter API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      tasks: '/api/tasks'
    }
  });
});

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/health', healthRoutes);

// Handle 404 routes
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default router;