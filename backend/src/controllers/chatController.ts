import { Request, Response } from "express";
import { getGeminiResponse } from "../utils/geminiApi";

// Controller to handle chatbot interaction
export const chatController = async (req: Request, res: Response) => {
    // Retrive user message
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "Message is required" });
    }
    // Call API to genarate an response
    const botReply = await getGeminiResponse(userMessage);
    // Return Chatbots response
    res.json({ reply: botReply });
};