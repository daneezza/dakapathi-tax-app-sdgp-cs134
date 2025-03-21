"use client"
import ProgressBar from "./ProgressBar"
import "../../styles/quizz.css"

const Quiz = ({
  questions,
  currentQuestionIndex,
  answers,
  handleOptionChange,
  submittedAnswer,
  handleSubmitAnswer,
  currentQuestionId,
  submittedAnswers,
}) => {
  const currentQuestion = questions[currentQuestionIndex]

  if (!currentQuestion) {
    return <div>Loading...</div>
  }
  // Function to determine the styling of answer options based on submission results

  const getOptionStyle = (option) => {
    if (currentQuestionId && submittedAnswers[currentQuestionId]) {
      const result = submittedAnswers[currentQuestionId]

      // If the selected option is correct, apply the 'correct-answer' class
      if (result?.selectedOption === option && result?.isCorrect) {
        return "quiz-option correct-answer"
      } else if (result?.selectedOption === option && !result?.isCorrect) {
        return "quiz-option incorrect-answer"
      } else if (result?.correctOption === option && !result?.isCorrect) {
        return "quiz-option correct-answer-hint"
      }
    }

    return "quiz-option"
  }

  return (
    <div>
      <div className="quiz-head">
        <h3 className="quiz-title">
          {/* Display progress bar based on the current question index */}
          <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>
        <h4 className="quiz-subtitle">{currentQuestion.question}</h4>
      </div>

      {/* Display answer options */}
      {currentQuestion.options.map((opt) => (
        <div key={opt.option} className="question-text">
          <label className={getOptionStyle(opt.option)}>
            <input
              type="radio"
              name={`question-${currentQuestionId || "default"}`}
              value={opt.option}
              checked={currentQuestionId !== null && answers[currentQuestionId] === opt.option}
              onChange={() => handleOptionChange(opt.option)}
              disabled={submittedAnswers[currentQuestionId || 0] !== undefined}
            />
            {/* Display the text of the answer option */}
            {opt.text}
          </label>
        </div>
      ))}
      {/* Submit button section */}
      <div className="submit-button-container">
        <button
          className="submit-button"
          onClick={handleSubmitAnswer}
          disabled={
            submittedAnswer !== null ||
            currentQuestionId === null ||
            !answers[currentQuestionId] ||
            submittedAnswers[currentQuestionId || 0] !== undefined
          }
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Quiz

