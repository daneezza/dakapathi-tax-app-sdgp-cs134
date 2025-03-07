import express from "express";
import { chatController } from "../controllers/chatController";  // Ensure correct path

const router = express.Router();

// POST route for handling chat messages
router.post("/", async (req, res) => {
    try {
        await chatController(req, res);  // Process chat logic
    } catch (error) {
        res.status(500).send("Something went wrong with the chat!");
    }
});

export default router;
