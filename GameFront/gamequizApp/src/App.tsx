import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import Template from './components/template';
import { BrowserRouter as Router} from 'react-router-dom';

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
  const confettiRef = useRef<HTMLDivElement>(null);
  const [confetti, setConfetti] = useState<any[]>([]);
  const sadEmojisRef = useRef<HTMLDivElement>(null);
  const [sadEmojis, setSadEmojis] = useState<any[]>([]);
  


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
      if (result.isCorrect) {
        setConfetti([]); // Clear existing confetti first
        setTimeout(() => createConfetti(currentQuestionId!), 0);  // Pass questionId
      } else {
        setSadEmojis([]); // Clear existing emojis first
        setTimeout(() => createSadEmojis(currentQuestionId!), 0); // Pass questionId
      }
    } catch (error) {
        console.error('Error submitting answer:', error);
        setError('Error submitting answer. Please try again later.');
    } finally {
        setIsLoading(false);
    }
      
  };
  const createConfetti = (questionId: number) => {
      const newConfetti: any[] = []; // Explicitly type the newConfetti array
      const confettiCount = 1000;

      if (confettiRef.current) {
          for (let i = 0; i < confettiCount; i++) {
              newConfetti.push({
                  x: Math.random() * confettiRef.current.offsetWidth,
                  y: 0,
                  size: Math.random() * 10 + 5,
                  color: getRandomColor(),
                  delay: Math.random() * 1
              });
          }
      }

      setConfetti(newConfetti);
  };
  const createSadEmojis = (questionId: number) => {
      const newSadEmojis: any[] = []; // Explicitly type the newSadEmojis array
      const emojiCount = 100;

      if (sadEmojisRef.current) {
          for (let i = 0; i < emojiCount; i++) {
              newSadEmojis.push({
                  x: Math.random() * sadEmojisRef.current.offsetWidth,
                  y: 0,
                  
                  delay: Math.random() * 2,
                  emoji: getRandomSadEmoji()
              });
          }
      }
      setSadEmojis(newSadEmojis);
  };


  const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  };

  const getRandomSadEmoji = () => {
      const sadEmojis = ["😞", "😔", "🙁", "😖"];
      return sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
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
                        <div className="confetti-container" ref={confettiRef}>
                            {confetti.map((c:any, index:number) => (
                              <div
                                key={index}
                                  className="confetti"
                                    style={{
                                      left: c.x,
                                        top: c.y,
                                        width: c.size,
                                        height: c.size,
                                        backgroundColor: c.color,
                                        animationDelay: `${c.delay}s`
                                    }}
                              />
                            ))}
                        </div>
                      </span>
                    ) : (
                        <span className="incorrect">
                          {submittedAnswers[currentQuestion.id]?.feedback || "Incorrect. Please try again."}
                          <div className="sad-emojis-container" ref={sadEmojisRef}>
                            {sadEmojis.map((e, index) => (
                              <span
                                key={index}
                                className="sad-emoji"
                                style={{
                                  left: e.x,
                                  top: e.y,
                                  animationDelay: `${e.delay}s`
                                }}
                              >
                                {e.emoji}
                              </span>
                            ))}
                          </div>
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