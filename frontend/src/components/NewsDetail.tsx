import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NewsDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <div>No article data available.</div>;
  }

  return (
    <div className="news-detail">
      <button className="back-button" onClick={() => navigate(-1)}>← Back to News Feed</button>
      <h1 className="news-title">{article.title}</h1>
      <img src={article.image} alt={article.title} className="news-image-large" />
      <p className="news-summary">{article.summary}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read full article</a>
    </div>
  );
};

export default NewsDetail;
