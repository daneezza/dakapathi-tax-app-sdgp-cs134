import dotenv from "dotenv";
dotenv.config();

export const API_KEY = process.env.GEMINI_API_KEY || "";
