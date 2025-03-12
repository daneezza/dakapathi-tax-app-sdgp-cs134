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



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));


app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/password', forgotPasswordRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/news', newsRouter);

// routers for user guide
app.get('/api/guides', getUserGuides);
app.get('/api/guides/:id', getUserGuideById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
