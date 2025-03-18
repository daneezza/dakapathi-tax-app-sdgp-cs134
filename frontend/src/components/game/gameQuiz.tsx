import React from 'react';
import ProgressBar from "./ProgressBar";
import '../../styles/quizz.css';

interface Question {
  id: number;
  question: string;
  options: { option: string; text: string }[];
}

interface Result {
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
  handlePreviousQuestion: () => void;
  isLastQuestion: boolean;
  submittedAnswer: Result | null;
  handleSubmitAnswer: () => Promise<void>;
  currentQuestionId: number | null;
  submittedAnswers: Record<number, Result | null>;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  currentQuestionIndex,
  answers,
  handleOptionChange,
  submittedAnswer,
  handleSubmitAnswer,
  currentQuestionId,
  submittedAnswers
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  
  const getOptionStyle = (option: string) => {
    if (currentQuestionId && submittedAnswers[currentQuestionId]) {
      const result = submittedAnswers[currentQuestionId];
      
      if (result?.selectedOption === option && result?.isCorrect) {
        return "quiz-option correct-answer";
      } else if (result?.selectedOption === option && !result?.isCorrect) {
        return "quiz-option incorrect-answer";
      } else if (result?.correctOption === option && !result?.isCorrect) {
        return "quiz-option correct-answer-hint";
      }
    }
    
    return "quiz-option";
  };

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
          <label className={getOptionStyle(opt.option)}>
            <input
              type="radio"
              name={`question-${currentQuestionId || 'default'}`}
              value={opt.option}
              checked={currentQuestionId !== null && answers[currentQuestionId] === opt.option}
              onChange={() => handleOptionChange(opt.option)}
              disabled={submittedAnswers[currentQuestionId || 0] !== undefined}
            />
            {opt.text}
          </label>
        </div>
      ))}
      <div className='submit-button-container'>
        <button 
          className='submit-button' 
          onClick={handleSubmitAnswer} 
          disabled={submittedAnswer !== null || (currentQuestionId === null || !answers[currentQuestionId]) || submittedAnswers[currentQuestionId || 0] !== undefined}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;