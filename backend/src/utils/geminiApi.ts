import axios from "axios";
import { API_KEY } from "../config/dotenvConfig";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (message: string): Promise<string> => {
    try {
        // Force Gemini to respond with Sri Lankan tax details only
        const modifiedMessage = `Provide a **short and concise** response (maximum 3 sentences) about Sri Lankan tax laws only. If the user asks about taxes, assume it's about Sri Lanka.\n\nUser: ${message}`;

        const response = await axios.post(GEMINI_URL, {
            contents: [{ role: "user", parts: [{ text: modifiedMessage }] }]
        });

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
               "Sorry, I couldn't generate a response.";
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        return "Something went wrong with the chatbot";
    }
};
