"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes")); // Ensure the correct path for chatRoutes
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json()); // To parse incoming JSON requests
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing (CORS)
app.use("/chat", chatRoutes_1.default); // Register the /chat route from chatRoutes
const PORT = 3000; // You can modify this if needed
app.listen(PORT, () => console.log(`Chatbot is running on port ${PORT}`));
