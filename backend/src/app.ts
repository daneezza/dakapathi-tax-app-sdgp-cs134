import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { getUserGuides, getUserGuideById } from './controllers/authController';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
// routers for user guide
app.get('/api/guides', getUserGuides);
app.get('/api/guides/:id', getUserGuideById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
