import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes";  // Ensure the correct path for chatRoutes

const app = express();

// Middleware setup
app.use(express.json());  // To parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

app.use("/chat", chatRoutes);  // Register the /chat route from chatRoutes

const PORT = 3000;  // You can modify this if needed
app.listen(PORT, () => console.log(`Chatbot is running on port ${PORT}`));
