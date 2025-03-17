import React, { useState } from 'react';
import '../styles/QuestionList.css';

interface Answer {
  id: number;
  content: string;
  questionId: number;
  likes: number;
}

interface Question {
  id: number;
  title: string;
  likes: number;
  shares: number;
  isBookmarked: boolean;
  answers: Answer[];
}

interface QuestionListProps {
  questions: Question[];
  onLike: (questionId: number) => void;
  onLikeAnswer: (questionId: number, answerId: number) => void;
  onShare: (questionId: number) => void;
  onBookmark: (questionId: number) => void;
  onSubmitAnswer: (questionId: number, content: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onLike,
  onLikeAnswer,
  onShare,
  onBookmark,
  onSubmitAnswer,
}) => {
  const [newAnswers, setNewAnswers] = useState<{ [key: number]: string }>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: number]: boolean }>({});

  const handleAnswerChange = (questionId: number, value: string) => {
    setNewAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitAnswer = (questionId: number) => {
    const content = newAnswers[questionId];
    if (content && content.trim()) {
      onSubmitAnswer(questionId, content);
      setNewAnswers(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const toggleQuestionExpansion = (questionId: number) => {
    setExpandedQuestions(prev => ({ 
      ...prev, 
      [questionId]: !prev[questionId] 
    }));
  };

  // Sort questions by likes in descending order
  const sortedQuestions = [...questions].sort((a, b) => b.likes - a.likes);

  return (
    <div className="question-list-container">
      {sortedQuestions.map((question) => {
        // Sort answers by likes in descending order
        const sortedAnswers = [...question.answers].sort((a, b) => b.likes - a.likes);
        
        return (
          <div key={question.id} className="question-item">
            <div className="question-content">
              <p>{question.title}</p>
            </div>
            <div className="interaction-bar">
              <div className="like-button" onClick={() => onLike(question.id)}>
                <i className="heart-icon">❤️</i>
                <span>{question.likes}</span>
              </div>
              <div className="share-button" onClick={() => onShare(question.id)}>
                <i className="share-icon">↗️</i>
                <span>{question.shares}</span>
              </div>
              <div className="bookmark-button" onClick={() => onBookmark(question.id)}>
                <i className={`bookmark-icon ${question.isBookmarked ? 'active' : ''}`}>🔖</i>
              </div>
            </div>
            
            <div className="replies-section">
              <div 
                className="replies-count" 
                onClick={() => toggleQuestionExpansion(question.id)}
                style={{ cursor: 'pointer' }}
              >
                {question.answers.length} {question.answers.length === 1 ? 'Reply' : 'Replies'} {expandedQuestions[question.id] ? '▼' : '►'}
              </div>
              
              {expandedQuestions[question.id] && (
                <div className="answers-container">
                  {sortedAnswers.map(answer => (
                    <div key={answer.id} className="answer-item">
                      <p className="answer-content">{answer.content}</p>
                      <div className="answer-like-button" onClick={() => onLikeAnswer(question.id, answer.id)}>
                        <i className="heart-icon">❤️</i>
                        <span>{answer.likes}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="new-answer-form">
                    <textarea
                      value={newAnswers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Write your answer..."
                      className="answer-input"
                    />
                    <button 
                      onClick={() => handleSubmitAnswer(question.id)}
                      className="submit-answer-button"
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;