import React from 'react';

function Answer({ answer, questionId, userId, onAnswerLike }) {
  const handleLikeClick = () => {
    onAnswerLike(questionId, answer._id);
  };
  
  const formattedDate = new Date(answer.createdAt).toLocaleDateString();
  
  // Check if this user has liked this answer
  const isLiked = answer.likes && answer.likes.some(like => like.userId === userId);
  
  // Get total likes count
  const likesCount = answer.likes ? answer.likes.length : 0;
  
  return (
    <div className="answer-card">
      <p className="answer-date">{formattedDate}</p>
      <p className="answer-text">{answer.text}</p>
      <div className="answer-actions">
        <div 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          <i className="heart-icon">{isLiked ? "❤️" : "🤍"}</i> {likesCount}
        </div>
      </div>
    </div>
  );
}

export default Answer;