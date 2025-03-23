import { Router, Request, Response } from 'express';
import { createNotification, getNotifications } from '../controllers/notificationsController';

const router = Router();

// Create a new notification
router.post('/', (req: Request, res: Response) => {
  createNotification(req, res);
});

// Get all notifications
router.get('/', (req: Request, res: Response) => {
  getNotifications(req, res);
});

export default router;