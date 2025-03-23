import { Request, Response } from 'express';
import Notification, { INotification } from '../models/Notifications';

// Create a new notification
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    // Basic validation (optional but recommended)
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required and must be a string' });
      return; // Explicitly return to avoid further execution
    }

    // Create and save the notification
    const notification: INotification = new Notification({ message });
    await notification.save();

    // Return the created notification
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all notifications
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all notifications, sorted by createdAt in descending order
    const notifications: INotification[] = await Notification.find().sort({ createdAt: -1 });

    // Return the notifications
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};