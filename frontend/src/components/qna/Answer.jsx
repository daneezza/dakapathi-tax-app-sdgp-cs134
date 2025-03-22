import React from 'react';

//handles the click event for the like button
function Answer({ answer, questionId, userEmail, onAnswerLike }) {
  const handleLikeClick = () => {
    onAnswerLike(questionId, answer._id);
  };
  
  //Formats the createdAt timestamp of the answer into a readable date string.
  const formattedDate = new Date(answer.createdAt).toLocaleDateString();
  
  // Check if this user has liked this answer
  const isLiked = answer.likes && answer.likes.some(like => like.userEmail === userEmail);
  
  // calculating the total likes counts
  const likesCount = answer.likes ? answer.likes.length : 0;
  
  return (
    <div className="answer-card">
      {/*Displays the formatted date when the answer was created*/ }
      <p className="answer-date">{formattedDate}</p>
      {/* Displays the text content of the answer */}
      <p className="answer-text">{answer.text}</p>
      {/* Like button section */}
      <div className="answer-actions">
        <div 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          {/* if the user has liked then the red heart, if not white heart */}
          <i className="heart-icon">{isLiked ? "❤️" : "🤍"}</i> {likesCount}
        </div>
      </div>
    </div>
  );
}

export default Answer;