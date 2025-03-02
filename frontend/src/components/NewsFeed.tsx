import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  image: string;
  summary: string;
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/news'); // Adjust your backend endpoint
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-feed">
      {articles.map(article => (
        <div key={article.id} className="news-card">
          <img src={article.image} alt={article.title} className="news-image" />
          <h3 className="news-title">{article.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
