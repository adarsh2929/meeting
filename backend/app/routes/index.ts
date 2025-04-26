import express from 'express';
import { errorHandler,notFoundHandler } from '../helper/errorHandler';
import roomRoutes from './roomRoutes';
import meetingRoutes from './meetingRoutes';

const router = express.Router();


router.use('/room', roomRoutes);
router.use('/meeting', meetingRoutes);
router.use(notFoundHandler)
router.use(errorHandler)

export default router;



