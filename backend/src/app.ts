import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { getUserGuides, getUserGuideById } from './controllers/authController';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/videos', express.static(path.join(__dirname, '../public/videos')));



// routers for user guide
app.get('/api/guides', getUserGuides);
app.get('/api/guides/:id', getUserGuideById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
