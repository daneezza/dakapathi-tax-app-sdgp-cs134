import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();



router.get('/', async (req: Request, res: Response) => {
try {
    const response = await axios.get('https://api.worldnewsapi.com/search-news', {
    params: {
        text: 'Sri Lanka tax',
        language: 'en',
    },
    headers: {
        'x-api-key': '4afdfa4d41a74e7f8ada4579b2ab9308'
    }
    });

    const news = response.data.news;
    res.status(200).json(news);
} catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch news' });
}
});

export default router;
