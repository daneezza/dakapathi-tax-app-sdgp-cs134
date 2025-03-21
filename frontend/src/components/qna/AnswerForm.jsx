import React, { useState } from 'react';

function AnswerForm({ onSubmit }) {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answerText.trim()) {
      onSubmit(answerText);
      setAnswerText('');
    }
  };

  return (
    <div className="answer-form-container">
      <form onSubmit={handleSubmit} className="answer-form">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer here..."
          required
        />
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  );
}

export default AnswerForm;