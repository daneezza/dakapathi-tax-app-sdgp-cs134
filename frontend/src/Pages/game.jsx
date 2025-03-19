import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "../components/game/gameQuiz";
import "../styles/game.css";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showBackConfirmation, setShowBackConfirmation] = useState(false);

  const fetchQuizQuestions = async (level) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/quiz/${level}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      setQuestions(response.data.questions);
      setSelectedLevel(level);
      setIsQuizStarted(true);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setSubmittedAnswers({});
      setScore(0);
      setShowScore(false);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      setError(error.message || "Error fetching questions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (option) => {
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
      level: selectedLevel,
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/api/quiz/submitOne", userAnswer);
      const result = response.data.result;

      setSubmittedAnswer(result);
      setSubmittedAnswers((prevSubmitted) => ({
        ...prevSubmitted,
        [currentQuestionId]: result,
      }));

      if (result.isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError("Error submitting answer. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSubmittedAnswer(null);
      setCurrentQuestionId(questions[currentQuestionIndex + 1]?.id || null);
    } else {
      setShowScore(true);
      setIsQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSubmittedAnswer(null);
      setCurrentQuestionId(questions[currentQuestionIndex - 1]?.id || null);
    }
  };

  const handleBackToLevels = () => {
    setShowBackConfirmation(true);
  };

  const confirmBackToLevels = () => {
    setIsQuizStarted(false);
    setAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowBackConfirmation(false);
  };

  const cancelBackToLevels = () => {
    setShowBackConfirmation(false);
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

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionId(questions[currentQuestionIndex]?.id || null);
    }
  }, [questions, currentQuestionIndex]);

  return (
    <div className="quiz-container">
      <h1 className="quiz-head">Quiz</h1>

      {showBackConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <h3>Are you sure you want to exit this quiz?</h3>
            <p>Your progress will be lost.</p>
            <div className="confirmation-buttons">
              <button onClick={confirmBackToLevels} className="confirm-yes">
                Yes, go back
              </button>
              <button onClick={cancelBackToLevels} className="confirm-no">
                No, continue quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {!isQuizStarted ? (
        <div className="level-button-container">
          <button onClick={() => fetchQuizQuestions("easy")} disabled={isLoading} className="level-button">
            Easy
          </button>
          <button onClick={() => fetchQuizQuestions("medium")} disabled={isLoading} className="level-button">
            Medium
          </button>
          <button onClick={() => fetchQuizQuestions("hard")} disabled={isLoading} className="level-button">
            Hard
          </button>
        </div>
      ) : isQuizCompleted ? (
        <div className="quiz-card">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="final-txt">
            <h1>Quiz Completed!</h1>
            <h1>Results:</h1>
            <p className="score">
              Your Score: {score} / {questions.length}
            </p>
            <button onClick={handleRestartQuiz} className="restart">
              Restart Quiz
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        <div className="quiz-card">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="back-button-container">
            <button className="back-to-levels-button" onClick={handleBackToLevels} title="Back to level selection">
              Back to Levels
            </button>
          </div>

          <Quiz
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            handleOptionChange={handleOptionChange}
            handleSubmitAnswer={handleSubmitAnswer}
            currentQuestionId={currentQuestionId}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            submittedAnswer={submittedAnswer}
            submittedAnswers={submittedAnswers}
          />

          <div className="navigation-buttons-container">
            <button className="previous-button" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0 || isLoading}>
              Previous Question
            </button>
            <button className="next-button" onClick={handleNextQuestion} disabled={isLoading || !submittedAnswers[currentQuestion.id]}>
              {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
