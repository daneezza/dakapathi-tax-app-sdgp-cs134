import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { chatbotResponse } from './chatbotService';

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Basic endpoint to check if the server is running
app.get('/', (req: Request, res: Response) => {
  res.send('Tax App Chatbot Backend');
});

// Endpoint to handle chatbot messages
app.post('/chat', async (req: Request, res: Response) => {
  const userMessage = req.body.message; // Get the message from the front end
  const botResponse = await chatbotResponse(userMessage); // Get response from the chatbot service
  res.json({ reply: botResponse }); // Send the chatbot response back
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
