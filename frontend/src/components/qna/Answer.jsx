import React from 'react';

function Answer({ answer, questionId, onAnswerLike }) {
  const handleLikeClick = () => {
    onAnswerLike(questionId, answer._id);
  };
  
  const formattedDate = new Date(answer.createdAt).toLocaleDateString();
  
  // Handle the likes count properly - check if it's an array or object
  const likesCount = Array.isArray(answer.likes) 
    ? answer.likes.length 
    : (typeof answer.likes === 'number' ? answer.likes : 0);
  
  return (
    <div className="answer-card">
      {/* <div className="answer-header"> */}
        <p className="answer-date">{formattedDate}</p>
      {/* </div> */}
      <p className="answer-text">{answer.text}</p>
      <div className="answer-actions">
        <div 
          className={`like-button ${answer.liked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          <i className="heart-icon">{answer.liked? "❤️" : "🤍"}</i> {likesCount}
        </div>
      </div>
    </div>
  );
}

export default Answer;