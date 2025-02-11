require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: userMessage }] }]
        });

        const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("Chatbot is running on port 3000"));
