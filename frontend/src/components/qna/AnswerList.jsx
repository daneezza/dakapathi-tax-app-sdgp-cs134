import React, { useState } from 'react';
import Answer from './Answer';
import AnswerForm from './AnswerForm';

function AnswerList({ answers, questionId, onAnswerLike, onSubmitAnswer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmitAnswer = (answerText) => {
    onSubmitAnswer(questionId, answerText);
  };

  return (
    <div className="replies-section">
      <div
        className="replies-count"
        onClick={toggleExpansion}
        style={{ cursor: "pointer" }}
      >
        {answers.length} {answers.length === 1 ? "Reply" : "Replies"}{" "}
        {isExpanded ? "▼" : "►"}
      </div>

      {isExpanded && (
        <>
          <div className="answer-list">
            <h3>Answers</h3>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <Answer
                  key={answer._id}
                  answer={answer}
                  questionId={questionId}
                  onAnswerLike={onAnswerLike}
                />
              ))
            ) : (
              <p className="no-answers">No answers yet.</p>
            )}
          </div>
          
          <div className="new-answer-form">
            <AnswerForm onSubmit={handleSubmitAnswer} />
          </div>
        </>
      )}
    </div>
  );
}

export default AnswerList;