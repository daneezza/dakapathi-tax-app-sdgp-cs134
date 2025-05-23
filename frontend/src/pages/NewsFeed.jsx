import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Retrive the news from the backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/news');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  const handleCardClick = (article) => {
    navigate(`/news/${article.id}`, { state: { article } });
  };
  
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }
  
  return (
    <div className="news-feed-page">
      <h1 className="heading">News Feed</h1>
      <div className="news-feed">
        {articles.map(article => (
          <div key={article.id} className="news-card" onClick={() => handleCardClick(article)}>
            <img src={article.image} alt={article.title} className="news-image" />
            <h3 className="news-title">{article.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;