import React, { useState } from 'react';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';

function Question({ question, userId, onQuestionLike, onAnswerSubmit, onAnswerLike }) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  
  // Handles the like button click for the question
  const handleLikeClick = () => {
    onQuestionLike(question._id);
  };
  
  const handleAnswerSubmit = (answerText) => {
    onAnswerSubmit(question._id, answerText);
    setShowAnswerForm(false); //to hide the answer form after submitting
  };
  
  const formattedDate = new Date(question.createdAt).toLocaleDateString();
  
  // Check if this user has liked this question
  const isLiked = question.likes && question.likes.some(like => like.userId === userId);
  
  // Get total likes count
  const likesCount = question.likes ? question.likes.length : 0;
  
  return (
    // question list section
    <div className="question-card">
      <div className="question-header">
        <span className="question-date">{formattedDate}</span>
      </div>
      <p className="question-text">{question.text}</p>
      <div className="question-actions">
        <div 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
        >
          <i className="heart-icon">{isLiked ? "❤️" : "🤍"}</i> {likesCount}
        </div>
          
        <button 
          className="answer-button"
          onClick={() => setShowAnswerForm(!showAnswerForm)}
        >
          {showAnswerForm ? 'Cancel' : 'Answer'}
        </button>
      </div>
      {/* answer form section */}
      {showAnswerForm && (
        <AnswerForm onSubmit={handleAnswerSubmit} />
      )}
      {/* list of answers for the particular question */}
      <AnswerList 
        answers={question.answers} 
        questionId={question._id}
        userId={userId}
        onAnswerLike={onAnswerLike}
        onSubmitAnswer={onAnswerSubmit}
      />
    </div>
  );
}

export default Question;