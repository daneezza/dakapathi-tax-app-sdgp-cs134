import React, { useState } from 'react';
import Answer from './Answer';


function AnswerList({ answers, questionId, userId, onAnswerLike }) {
  // State to manage whether the answer list is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);
  // Toggles the visibility of the answer list when user clicks on replies
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  

  return (
    // reply section with answer list
    <div className="replies-section">
      {/* clickable text to toggle the answer list */}
      <div
        className="replies-count"
        onClick={toggleExpansion}
        style={{ cursor: "pointer" }}
      >
        {answers.length} {answers.length === 1 ? "Reply" : "Replies"}{" "}
        {isExpanded ? "▼" : "►"}
      </div>

      {/* display answer only when expanded */}
      {isExpanded && (
        <>
          <div className="answer-list">
            {/* If there are answers, map through and render each Answer component */}
            {answers.length > 0 ? (
              answers.map((answer) => (
                <Answer
                  key={answer._id} //unique identifier
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