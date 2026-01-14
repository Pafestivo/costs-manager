/**
 * About routes - system information endpoints
 */
import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { aboutController } from './about.controller.js';

const router = Router();

router.get('/', asyncHandler(aboutController.getAbout));

export default router;