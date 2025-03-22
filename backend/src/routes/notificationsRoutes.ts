import { Router } from 'express';
import { createNotification, getNotifications } from '../controllers/notificationsController';

const router = Router();

router.post('/', createNotification);
router.get('/:userId', getNotifications);

export default router;