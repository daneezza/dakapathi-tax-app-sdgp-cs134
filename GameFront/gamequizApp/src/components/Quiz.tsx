import React from 'react';
import ProgressBar from "./ProgressBar";
import '../styles/quizz.css';

interface Question {
  id: number;
  question: string;
  options: { option: string; text: string }[];
}

interface Result { // Define Result interface here
    questionId: number;
    success: boolean;
    isCorrect?: boolean;
    selectedOption?: string;
    correctOption?: string;
    feedback?: string;
  }

interface QuizProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  handleOptionChange: (option: string) => void;
  handleNextQuestion: () => void;
  isLastQuestion: boolean;
  submittedAnswer: Result | null; // Add this prop HERE
  handleSubmitAnswer: () => Promise<void>;
  currentQuestionId: number | null;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  currentQuestionIndex,
  answers,
  handleOptionChange,
  submittedAnswer, // Receive the prop here
  handleSubmitAnswer,
  currentQuestionId,
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="quiz-head">
        <h3 className="quiz-title">
          <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} />
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>
        <h4 className="quiz-subtitle">{currentQuestion.question}</h4>
      </div>

      {currentQuestion.options.map((opt) => (
        <div key={opt.option} className="question-text">
          <label className="quiz-option">
            <input
              type="radio"
              name={`question-${currentQuestionId || 'default'}`}
              value={opt.option}
              checked={currentQuestionId !== null && answers[currentQuestionId] === opt.option}
              onChange={() => handleOptionChange(opt.option)}
            />
            {opt.text}
          </label>
        </div>
      ))}
      <div className='submit-button-container'>
        <button className='submit-button' onClick={handleSubmitAnswer} disabled={submittedAnswer !== null || (currentQuestionId === null || !answers[currentQuestionId])}>
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default Quiz;