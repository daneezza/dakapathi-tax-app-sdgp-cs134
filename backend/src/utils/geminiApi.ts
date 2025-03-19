import axios from "axios";
import { API_KEY } from "../config/dotenvConfig";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const isTaxRelated = (message: string): boolean => {
    const taxKeywords = [
        "tax", "vat", "income tax", "customs", "levy", "duty", "revenue",
        "sl tax", "sri lanka tax", "tax rate", "corporate tax", "pay tax",
        "withholding tax", "GST", "NBT", "economic service charge", "stamp duty"
    ];

    return taxKeywords.some(keyword => message.toLowerCase().includes(keyword));
};

const isAcknowledgment = (message: string): boolean => {
    const acknowledgments = [
        "ok", "okay", "cool", "thanks", "thank you", "yes", "no", "great", "cool", "nice", "got it",
        "understood", "makes sense", "alright", "sure"
    ];

    return acknowledgments.includes(message.toLowerCase());
};

const isGreeting = (message: string): boolean => {
    const greetings = [
        "hi", "hello there", "hi there" , "hello", "hey", "good morning", "good afternoon", "good evening", "what's up",
        "sup", "yo", "hola", "howdy"
    ];

    return greetings.includes(message.toLowerCase());
};

export const getGeminiResponse = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase();

    // Handle greetings separately
    if (isGreeting(lowerMessage)) {
        return "Hello! 😊 How can I assist you with tax-related queries today?";
    }

    // Handle acknowledgment messages separately
    if (isAcknowledgment(lowerMessage)) {
        return "Sure thing! 😊";
    }

    // Reject non-tax-related queries
    if (!isTaxRelated(lowerMessage)) {
        return "Please ask only tax-related questions.";
    }

    try {
        const modifiedMessage = `Provide a **short and concise** response (maximum 3 sentences) about Sri Lankan tax laws only.\n\nUser: ${message}`;

        const response = await axios.post(GEMINI_URL, {
            contents: [{ role: "user", parts: [{ text: modifiedMessage }] }]
        });

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
               "Sorry, I couldn't generate a response.";
    } catch (error: any) {
        console.error("Error:", error.response?.data || error.message);
        return "Something went wrong with the chatbot.";
    }
};
