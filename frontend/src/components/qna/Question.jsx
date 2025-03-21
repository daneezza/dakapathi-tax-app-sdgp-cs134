import React, { useState } from 'react';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';

function Question({ question, onQuestionLike, onAnswerSubmit, onAnswerLike }) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  
  const handleLikeClick = () => {
    onQuestionLike(question._id);
  };
  
  const handleAnswerSubmit = (answerText) => {
    onAnswerSubmit(question._id, answerText);
    setShowAnswerForm(false);
  };
  
  const formattedDate = new Date(question.createdAt).toLocaleDateString();
  
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-date">{formattedDate}</span>
      </div>
      <p className="question-text">{question.text}</p>
      <div className="question-actions">
      <div 
        className={`like-button ${question.liked ? 'liked' : ''}`}
        onClick={handleLikeClick}
      >
        <i className="heart-icon">{question.liked? "❤️" : "🤍"}</i> {question.likes.length} 
      </div>

        
      <button 
            className="answer-button"
            onClick={() => setShowAnswerForm(!showAnswerForm)}
          >
            {showAnswerForm ? 'Cancel' : 'Answer'}
          </button>
      
        
    </div>
      
      {showAnswerForm && (
        <AnswerForm onSubmit={handleAnswerSubmit} />
      )}
      
      <AnswerList 
        answers={question.answers} 
        questionId={question._id}
        onAnswerLike={onAnswerLike} 
      />
    </div>
  );
}

export default Question;