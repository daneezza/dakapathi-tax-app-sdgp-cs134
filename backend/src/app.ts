import connectDB from './config/db';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import otpRoutes from './routes/otpRoutes';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes';
import { getUserGuides, getUserGuideById } from './controllers/authController';
import path from 'path';
import newsRouter from './routes/news';
import quizRoutes from './routes/gameQuizRoutes';
import { getTaxGuides, getTaxGuideById } from './controllers/taxGuideController';  
import taxRoutes from "./routes/tax.routes";
import chatRoutes from "./routes/chatRoutes";  


// Connect to MongoDB
connectDB();
// Load .env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiUrl = process.env.REACT_APP_BACKEND_URL;


// Enable cors and body parser
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



// Define API routes
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/password', forgotPasswordRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/news', newsRouter);
app.use('/api/quiz', quizRoutes);
app.use("/api/tax", taxRoutes);
app.use("/chat", chatRoutes);  
app.get('/api/guides', getUserGuides);
app.get('/api/guides/:id', getUserGuideById);
app.get('/api/taxGuides', getTaxGuides);
app.get('/api/taxGuides/:id', getTaxGuideById);

// Start the server and isted on the specified port
app.listen(apiUrl, () => {
    console.log(`Server running on http://localhost:${apiUrl}`);
});
