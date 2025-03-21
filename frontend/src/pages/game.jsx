"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Quiz from "../components/game/gameQuiz"
import { useUserScores, ScoreDisplay } from "../components/game/score-display"
import "../styles/game.css"

const Game = () => {
  //State variables for managing quiz questions, answers, and user progress.
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [error, setError] = useState(null)
  const [submittedAnswer, setSubmittedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [submittedAnswers, setSubmittedAnswers] = useState({})
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [showBackConfirmation, setShowBackConfirmation] = useState(false)
  const [results, setResults] = useState([])

  //custom hook for user scores
  const {
    userEmail,
    userName,
    userScores,
    saveScore,
    isLoading: isSavingScore,
    message: scoreUpdateMessage,
    syncWithDatabase,
    getTrophyIcon,
  } = useUserScores()

  //fetching questions from the backend based on the levl

  const fetchQuizQuestions = async (level) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`http://localhost:3000/api/quiz/${level}`)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      setQuestions(response.data.questions)
      setSelectedLevel(level)
      setIsQuizStarted(true)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setSubmittedAnswers({})
      setScore(0)
      setShowScore(false)
    } catch (error) {
      console.error("Error fetching quiz questions:", error)
      setError(error.message || "Error fetching questions. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  //updating answer selected by the user for the current question

  const handleOptionChange = (option) => {
    const currentQuestion = questions[currentQuestionIndex]
    if (currentQuestion) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.id]: option,
      }))
    }
  }

  //submits the selected answer to the backend

  const handleSubmitAnswer = async () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion || !currentQuestionId || submittedAnswers[currentQuestionId]) return

    const userAnswer = {
      questionId: currentQuestionId,
      selectedOption: answers[currentQuestionId],
      level: selectedLevel,
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("http://localhost:3000/api/quiz/submitOne", userAnswer)
      const result = response.data.result

      setSubmittedAnswer(result)
      setSubmittedAnswers((prevSubmitted) => ({
        ...prevSubmitted,
        [currentQuestionId]: result,
      }))

      if (result.isCorrect) {
        setScore((prevScore) => prevScore + 1)
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
      setError("Error submitting answer. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  //to move to the next question, if it is the last question, then submit answer
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSubmittedAnswer(null)
      setCurrentQuestionId(questions[currentQuestionIndex + 1]?.id || null)
    } else {
      setShowScore(true)
      setIsQuizCompleted(true)
      // Send score to backend when quiz is completed
      saveUserScore()
    }
  }

  // Function to save user score to the backend
  const saveUserScore = async () => {
    if (!selectedLevel) return
    
    console.log(`Saving score for level ${selectedLevel}: ${score}`)
    
    await saveScore(selectedLevel, score)
  }
  
  //for moving to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSubmittedAnswer(null)
      setCurrentQuestionId(questions[currentQuestionIndex - 1]?.id || null)
    }
  }

  // to confirm whether the user wants to go back to the level page or proceed with the quiz
  const handleBackToLevels = () => {
    setShowBackConfirmation(true)
  }

  const confirmBackToLevels = () => {
    setIsQuizStarted(false)
    setAnswers({})
    setSubmittedAnswers({})
    setScore(0)
    setCurrentQuestionIndex(0)
    setShowBackConfirmation(false)
  }

  const cancelBackToLevels = () => {
    setShowBackConfirmation(false)
  }

  const handleRestartQuiz = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setIsQuizCompleted(false)
    setResults([])
    setIsQuizStarted(false)
    setError(null)
    setSubmittedAnswers({})
    setSubmittedAnswer(null)
    setScore(0)
    setShowScore(false)
    setCurrentQuestionId(questions[0]?.id || null)
  }

  const currentQuestion = questions[currentQuestionIndex]

  //Updates the current question ID when the question list changes.
  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionId(questions[currentQuestionIndex]?.id || null)
    }
  }, [questions, currentQuestionIndex])

  // Sync local scores with database when component mounts
  useEffect(() => {
    if (userEmail) {
      syncWithDatabase(userEmail, {
        easy: userScores.quizEasyScore,
        medium: userScores.quizMediumScore,
        hard: userScores.quizHardScore
      })
    }
  }, [userEmail])

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
        <div>
          {/* show quiz levels */}
          <ScoreDisplay scores={userScores} getTrophyIcon={getTrophyIcon} title={`${userName}'s High Scores:`} />

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
        </div>
      ) : isQuizCompleted ? (
        //scoreboard at the end of the quiz
        <div className="quiz-card">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="final-txt">
            <h1>Quiz Completed!</h1>
            <h1>Results:</h1>
            <p className="score">
              Your Score: {score} / {questions.length}
            </p>

            {scoreUpdateMessage && <div className="score-update-message">{scoreUpdateMessage}</div>}

            {isSavingScore && <p>Saving your score...</p>}

            {/* Display updated scores after completion */}
            <ScoreDisplay scores={userScores} getTrophyIcon={getTrophyIcon} title="Your Updated Scores:" />

            <button onClick={handleRestartQuiz} className="restart">
              Back to Levels
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
            <button
              className="previous-button"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || isLoading}
            >
              Previous Question
            </button>
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={isLoading || !submittedAnswers[currentQuestion.id]}
            >
              {currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Game