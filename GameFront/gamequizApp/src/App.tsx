import React, { useState} from 'react';
import axios from 'axios';
import Quiz from './pages/Quiz';
import Template from './components/template';
import { BrowserRouter as Router} from 'react-router-dom';
import correctGif from './assets/corrrect.gif';
import incorrectGif from './assets/incorrect.gif';

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
  const [showCorrectGif, setShowCorrectGif] = useState(false);
  const[showIncorrectGif,setShowIncorrectGif]=useState(false);
  


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
        setShowCorrectGif(true);
        setTimeout(() => {
          setShowCorrectGif(false);
        }, 3000);
      }else{
        setShowIncorrectGif(true);
        setTimeout(()=>{
          setShowIncorrectGif(false);
        },3000)
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
        <div className="quiz-container">
          <h1 className='quiz-head'>Quiz</h1>

          {!isQuizStarted ? (
            <div className='level-button-container'>
              <button 
                onClick={() => fetchQuizQuestions("easy")} 
                disabled={isLoading} 
                className='level-button'
              >
                Easy
              </button>
              <button 
                onClick={() => fetchQuizQuestions("medium")} 
                disabled={isLoading} 
                className='level-button'
              >
                Medium
              </button>
              <button 
                onClick={() => fetchQuizQuestions("hard")} 
                disabled={isLoading} 
                className='level-button'
              >
                Hard
              </button>
            </div>
          ) : isQuizCompleted ? (
            <div className="quiz-card">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className='final-txt'>
                <h1>Quiz Completed!</h1>
                <h1>Results:</h1>
                <p className='score'>Your Score: {score} / {questions.length}</p>
                <button onClick={handleRestartQuiz} className='restart'>Restart Quiz</button>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="quiz-card">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <Quiz
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                handleOptionChange={handleOptionChange}
                handleSubmitAnswer={handleSubmitAnswer}
                currentQuestionId={currentQuestionId}
                handleNextQuestion={handleNextQuestion}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
                submittedAnswer={submittedAnswer}
              />
              
              <div className='next-button-container'>
                <button
                  className='next-button'
                  onClick={handleNextQuestion}
                  disabled={isLoading || !submittedAnswers[currentQuestion.id]}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next"}
                </button>
              </div>

              {submittedAnswers[currentQuestion.id] && (
                <div>
                  <p>
                    {submittedAnswers[currentQuestion.id]?.correctOption === submittedAnswers[currentQuestion.id]?.selectedOption ? (
                      <span className="correct">
                        Correct
                        {showCorrectGif && <img src={correctGif} alt="Correct Answer GIF" className="correct-gif" />}
                      </span>
                    ) : (
                        <span className="incorrect">
                          {showIncorrectGif && <img src={incorrectGif} alt="Incorrect Answer GIF" className='incorrect-gif'/>}
                          {submittedAnswers[currentQuestion.id]?.feedback || "Incorrect. Please try again."}
                          
                        </span>
                      )}
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