import { Router } from "express";

const notificationsRouter = Router();

notificationsRouter.get("/", getNotifications);