import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { getUserGuides, getUserGuideById } from './controllers/authController';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());



// routers for user guide
app.get('/api/guides', getUserGuides);
app.get('/api/guides/:id', getUserGuideById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
