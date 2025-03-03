import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  image: string;
  summary: string;
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

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

  const handleCardClick = (article: Article) => {
    navigate(`/news/${article.id}`, { state: { article } });
  };

  return (
    <div className="news-feed">
      {articles.map(article => (
        <div key={article.id} className="news-card" onClick={() => handleCardClick(article)}>
          <img src={article.image} alt={article.title} className="news-image" />
          <h3 className="news-title">{article.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
