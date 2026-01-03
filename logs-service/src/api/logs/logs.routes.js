/**
 * Logs routes
 */
import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { logsController } from './logs.controller.js';

const router = Router();

router.get('/', asyncHandler(logsController.getLogs));
router.post('/', asyncHandler(logsController.createLog));

export default router;