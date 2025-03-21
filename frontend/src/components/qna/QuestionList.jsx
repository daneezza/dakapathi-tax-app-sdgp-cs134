import React from 'react';
import Question from './Question';

function QuestionList({ questions, userId, onQuestionLike, onAnswerSubmit, onAnswerLike }) {
  return (
    <div className="question-list">
      {questions.length === 0 ? (
        <p className="no-questions">No questions yet. Be the first to ask!</p>
      ) : (
        questions.map((question) => (
          <Question
            key={question._id}
            question={question}
            userId={userId}
            onQuestionLike={onQuestionLike}
            onAnswerSubmit={onAnswerSubmit}
            onAnswerLike={onAnswerLike}
          />
        ))
      )}
    </div>
  );
}

export default QuestionList;