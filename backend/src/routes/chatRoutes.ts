import express from "express";
import { chatController } from "../controllers/chatController";  

const router = express.Router();

// for handling chat messages
router.post("/", async (req, res) => {
    try {
        await chatController(req, res);  // process chat logic
    } catch (error) {
        res.status(500).send("Something went wrong with the chat!");
    }
});

export default router;
