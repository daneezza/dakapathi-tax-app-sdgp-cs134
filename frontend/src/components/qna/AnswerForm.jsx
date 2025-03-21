import React, { useState } from 'react';

function AnswerForm({ onSubmit }) {
  // State to manage the text input for the answer
  const [answerText, setAnswerText] = useState('');

  // Handles answer form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answerText.trim()) {
      onSubmit(answerText);
      setAnswerText('');
    }
  };

  return (
    <div className="answer-form-container">
      {/* answer form section */}
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