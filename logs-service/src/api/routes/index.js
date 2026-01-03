/**
 * Routes index - main router configuration
 */
import { Router } from 'express';
import healthRoutes from './health.routes. js';
import logsRoutes from '../logs/logs.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/logs', logsRoutes); 

export default router;