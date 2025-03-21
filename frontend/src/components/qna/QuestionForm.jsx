import React, { useState } from 'react';

function QuestionForm({ onSubmit }) {
  const [questionText, setQuestionText] = useState('');
  // handles the submission of the question
  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionText.trim()) {
      onSubmit(questionText);
      setQuestionText('');
    }
  };
  //handles the reset button
  const handleReset = () => {
    setQuestionText('');
  };

  return (
    <div className="question-form-container">
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit} className="question-form">
        {/* question entering form */}
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Write your question here..."
          className="question-input"
          required
        />
        {/* submit and reset button */}
        <div className="question-form-buttons">
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
          <button type="submit" className="sub-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;