import axios from "axios";
import { API_KEY } from "../config/dotenvConfig";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(GEMINI_URL, {
            contents: [{ role: "user", parts: [{ text: message }] }],
        });

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
               "Sorry, I couldn't generate a response.";
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        return "Something went wrong with the chatbot";
    }
};
