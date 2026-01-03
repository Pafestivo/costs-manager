/**
 * Routes index - main router configuration
 */
import { Router } from 'express';
import healthRoutes from './health.routes.js';
import aboutRoutes from '../about/about.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/about', aboutRoutes);  // <-- הוספה חדשה

export default router;