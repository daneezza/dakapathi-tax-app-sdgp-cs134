import OpenAI from 'openai';  // Corrected import for compatibility
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate chatbot responses using AI
export const chatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',  // Change to a different model if needed
      messages: [{ role: 'user', content: userMessage }],
    });

    return response.choices[0].message?.content || "I couldn't generate a response.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, something went wrong. Please try again.";
  }
};
