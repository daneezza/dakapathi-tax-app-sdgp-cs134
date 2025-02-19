import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import Quiz from './components/Quiz'; 
import Template from './components/template';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';// Import the Quiz component
=======
import Quiz from './components/Quiz';
import Template from './components/template';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import the Quiz component
>>>>>>> Stashed changes


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

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [submittedAnswer, setSubmittedAnswer] = useState<Result | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, Result | null>>({});
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  


  const fetchQuizQuestions = async (level: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
    const response = await axios.get(`http://localhost:3000/api/quiz/${level}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message); // Throw error for non-success
    }
    
    setQuestions(response.data.questions); // Directly set the questions
    setSelectedLevel(level);
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setShowScore(false);
    
    } catch (error: any) { // Catch potential errors
    console.error('Error fetching quiz questions:', error);
    setError(error.message || 'Error fetching questions. Please try again later.'); // More specific error message
    } finally {
    setIsLoading(false);
    }
  };

  const handleOptionChange = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: option,
      }));
    }
  };

  const handleSubmitAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !currentQuestionId || submittedAnswers[currentQuestionId]) return;
  
    const userAnswer = {
      questionId: currentQuestionId,
      selectedOption: answers[currentQuestionId],
      level: selectedLevel, // Add the selected level here!
    };
  
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:3000/api/quiz/submitOne', userAnswer);
      const result: Result = response.data.result;
  
      setSubmittedAnswer(result);
      setSubmittedAnswers((prevSubmitted) => ({
        ...prevSubmitted,
        [currentQuestionId]: result,
      }));
  
      if (result.isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Error submitting answer. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSubmittedAnswer(null); // Reset for the next question
      setCurrentQuestionId(questions[currentQuestionIndex + 1]?.id || null); // Set the next question's ID
    } else {
      setShowScore(true);
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setResults([]);
    setIsQuizStarted(false);
    setError(null);
    setSubmittedAnswers({});
    setSubmittedAnswer(null);
    setScore(0);
    setShowScore(false);
    setCurrentQuestionId(questions[0]?.id || null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  React.useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionId(questions[currentQuestionIndex]?.id || null);
    }
  }, [questions, currentQuestionIndex]);

  return (
    <Router>
      <Template>
        <div>
          <h1 className='quiz-head'>Quiz</h1>

          {!isQuizStarted ? (
            <div className='level-button-container'>
              <button onClick={() => fetchQuizQuestions("easy")} disabled={isLoading} className='level-button'>Easy</button>
              <button onClick={() => fetchQuizQuestions("medium")} disabled={isLoading} className='level-button'>Medium</button>
              <button onClick={() => fetchQuizQuestions("hard")} disabled={isLoading} className='level-button'>Hard</button>
            </div>
          ) : isQuizCompleted ? (
            <div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {results.map((result) => {
                const question = questions.find((q) => q.id === result.questionId);
                return (
                  <div key={result.questionId}>
                    <p>{question?.question} Correct Answer: {result.correctOption}</p>
                    <p>{result.feedback}</p>
                  </div>
                );
              })}
              <div className='quiz-card'>
                <div className='final-txt'>
                  <h1>Quiz Completed!</h1>
                  <h1>Results:</h1>
                  <p className='score'>Your Score: {score} / {questions.length}</p>
                  <button onClick={handleRestartQuiz} className='restart'>Restart Quiz</button>
                </div>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="quiz-card"> {/* Wrap Quiz component with quiz-card */}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Quiz
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                handleOptionChange={handleOptionChange}
                handleSubmitAnswer={handleSubmitAnswer}
                currentQuestionId={currentQuestionId}
                handleNextQuestion={handleNextQuestion} // Add this prop
                isLastQuestion={currentQuestionIndex === questions.length - 1} // Add this prop
                submittedAnswer={submittedAnswer}
              />
              <div className='button-container'>
                <button
                  className="button-primary"
                  onClick={handleNextQuestion}
                  disabled={isLoading || !submittedAnswers[currentQuestion.id]}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next"}
                </button>
              </div>
              

              {submittedAnswers[currentQuestion.id] && (
                <div className="final-ans">
                  <p>
                    Correct Answer: {submittedAnswers[currentQuestion.id]?.correctOption} ||{" "}
                    {submittedAnswers[currentQuestion.id]?.feedback}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </Template>
    </Router>
    
  );

};

export default App;