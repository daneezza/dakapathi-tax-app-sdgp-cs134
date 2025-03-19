import { Request, Response } from "express";
import { getGeminiResponse } from "../utils/geminiApi";

export const chatController = async (req: Request, res: Response) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }

    const botReply = await getGeminiResponse(userMessage);
    res.json({ reply: botReply });
};