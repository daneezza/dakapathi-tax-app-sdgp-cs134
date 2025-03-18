import express, { Request, Response } from 'express';
import axios from 'axios';
import News from '../models/News';
import dotenv from 'dotenv';

dotenv.config(); 

const router = express.Router();
const ONE_HOUR = 60 * 60 * 1000;

type NewsArticle = {
    id: number;
    title: string;
    text: string;
    summary: string;
    url: string;
    image: string | null;
    video: string | null;
    publish_date: string;
    author: string;
    authors: string[];
    language: string;
    category: string;
    source_country: string;
    sentiment: number;
};


const fetchAndStoreNews = async () => {
    try {
        const latestNews = await News.findOne().sort({ stored_at: -1 });

        if (latestNews?.stored_at && Date.now() - new Date(latestNews.stored_at).getTime() < ONE_HOUR) {
            return;
        }

        
        
        const response = await axios.get('https://api.worldnewsapi.com/search-news', {
            params: {
                text: 'Sri Lanka tax',
                language: 'en',
            },
            headers: {
                'x-api-key': '4afdfa4d41a74e7f8ada4579b2ab9308'
            }
        });

        if (!response.data?.news) {
            return;
        }

        const newsArticles: NewsArticle[] = response.data.news;

        if (newsArticles.length > 0) {
            await News.deleteMany({});

            const newsWithTimestamps = newsArticles.map((article: NewsArticle) => ({
                ...article,
                stored_at: new Date()
            }));

            await News.insertMany(newsWithTimestamps);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};


router.get('/', async (req: Request, res: Response) => {
    try {
        let news = await News.find().sort({ publish_date: -1 });

        if (news.length === 0) {
            await fetchAndStoreNews();
            news = await News.find().sort({ publish_date: -1 });
        } else {
            await fetchAndStoreNews();
            news = await News.find().sort({ publish_date: -1 }); 
        }

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news' });
    }
});

export default router;
