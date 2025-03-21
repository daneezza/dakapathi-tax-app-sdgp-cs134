import React, { useState } from 'react';
import Answer from './Answer';


function AnswerList({ answers, questionId, userId, onAnswerLike, onSubmitAnswer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
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
            {answers.length > 0 ? (
              answers.map((answer) => (
                <Answer
                  key={answer._id}
                  answer={answer}
                  questionId={questionId}
                  userId={userId}
                  onAnswerLike={onAnswerLike}
                />
              ))
            ) : (
              <p className="no-answers">No answers yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AnswerList;