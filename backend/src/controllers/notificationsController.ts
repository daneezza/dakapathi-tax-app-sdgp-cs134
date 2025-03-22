import { Request, Response } from 'express';
import Notification from '../models/notifications.model';

export const createNotification = async (req: Request, res: Response) => {
    const { userId, message } = req.body;
    const notification = new Notification({ userId, message });
    await notification.save();
    res.status(201).json(notification);
};

export const getNotifications = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
};