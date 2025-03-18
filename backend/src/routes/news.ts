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
        console.log("Checking if news update is needed...");
        const latestNews = await News.findOne().sort({ stored_at: -1 });

        if (latestNews?.stored_at && Date.now() - new Date(latestNews.stored_at).getTime() < ONE_HOUR) {
            console.log("News is still fresh, no need to update.");
            return;
        }

        console.log("Fetching fresh news from World News API...");
        
        const response = await axios.get('https://api.worldnewsapi.com/search-news', {
            params: {
                text: 'Sri Lanka tax',
                language: 'en',
            },
            headers: {
                'x-api-key': '4afdfa4d41a74e7f8ada4579b2ab9308'
            }
        });
        console.log("data retrived from world news api");

        if (!response.data?.news) {
            console.error('Invalid response from API');
            return;
        }

        const newsArticles: NewsArticle[] = response.data.news;

        if (newsArticles.length > 0) {
            await News.deleteMany({});
            console.log("database cleared");

            const newsWithTimestamps = newsArticles.map((article: NewsArticle) => ({
                ...article,
                stored_at: new Date()
            }));

            await News.insertMany(newsWithTimestamps);
            console.log('News updated in the database.');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};


router.get('/', async (req: Request, res: Response) => {
    try {
        let news = await News.find().sort({ publish_date: -1 });

        if (news.length === 0) {
            console.log("No news in database, fetching fresh data...");
            await fetchAndStoreNews();
            news = await News.find().sort({ publish_date: -1 });
        } else {
            console.log("News already in database, checking if update is needed...");
            await fetchAndStoreNews();
            news = await News.find().sort({ publish_date: -1 }); 
        }

        res.status(200).json(news);
    } catch (error) {
        console.error('Error retrieving news from database:', error);
        res.status(500).json({ message: 'Failed to fetch news' });
    }
});

export default router;
