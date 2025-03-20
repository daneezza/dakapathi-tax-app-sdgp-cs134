"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../../styles/game.css"

// A service to handle all score-related operations
export const ScoreService = {
  // Get user scores from localStorage
  getLocalScores() {
    try {
      const userData = localStorage.getItem("user")
      if (!userData) return { quizEasyScore: 0, quizMediumScore: 0, quizHardScore: 0 }

      const user = JSON.parse(userData)
      return {
        quizEasyScore: user.quizEasyScore || 0,
        quizMediumScore: user.quizMediumScore || 0,
        quizHardScore: user.quizHardScore || 0,
      }
    } catch (error) {
      console.error("Error getting scores from localStorage:", error)
      return { quizEasyScore: 0, quizMediumScore: 0, quizHardScore: 0 }
    }
  },

  // Update user scores in localStorage
  updateLocalScores(scores) {
    try {
      const userData = localStorage.getItem("user")
      if (!userData) return

      const user = JSON.parse(userData)
      const updatedUser = {
        ...user,
        ...scores,
      }

      localStorage.setItem("user", JSON.stringify(updatedUser))
      console.log("Updated local scores:", scores)
    } catch (error) {
      console.error("Error updating scores in localStorage:", error)
    }
  },

  // Save score to the database and update localStorage
  async saveScore(userId, level, score) {
    try {
      // This is the corrected URL to match your new merged routes
      const response = await axios.post("http://localhost:3000/api/quiz/updateScore", {
        userId,
        level,
        score,
      })

      if (response.data.success) {
        const updatedScores = {
          quizEasyScore: response.data.user.quizEasyScore,
          quizMediumScore: response.data.user.quizMediumScore,
          quizHardScore: response.data.user.quizHardScore,
        }

        // Update localStorage with all scores
        this.updateLocalScores(updatedScores)

        return {
          success: true,
          message: response.data.message,
          scores: updatedScores,
        }
      }

      return {
        success: false,
        message: response.data.message || "Failed to update score",
      }
    } catch (error) {
      console.error("Error saving score to database:", error)
      return {
        success: false,
        message: "Error connecting to server. Score saved locally only.",
      }
    }
  },

  // Get the appropriate trophy icon based on score
  getTrophyIcon(score, maxScore = 10) {
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
    if (percentage >= 90) return "🏆"
    if (percentage >= 70) return "🥈"
    if (percentage >= 50) return "🥉"
    return "🎮"
  },
}

// Custom hook to manage user scores
export function useUserScores() {
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState("User")
  const [userScores, setUserScores] = useState({
    quizEasyScore: 0,
    quizMediumScore: 0,
    quizHardScore: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // Load user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUserId(parsedUser._id || parsedUser.id)
        setUserName(parsedUser.fullname || "User")
        setUserScores({
          quizEasyScore: parsedUser.quizEasyScore || 0,
          quizMediumScore: parsedUser.quizMediumScore || 0,
          quizHardScore: parsedUser.quizHardScore || 0,
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // Save score to database and update local state
  const saveScore = async (level, score) => {
    if (!userId) {
      setMessage("User not logged in - score saved locally only")
      
      // For guest users, just save locally
      const fieldMap = {
        'easy': 'quizEasyScore',
        'medium': 'quizMediumScore',
        'hard': 'quizHardScore'
      }
      
      const fieldName = fieldMap[level.toLowerCase()]
      if (fieldName && score > userScores[fieldName]) {
        const newScores = {...userScores, [fieldName]: score}
        setUserScores(newScores)
        
        // Try to save to localStorage even for guest users
        try {
          const userData = localStorage.getItem("user") || JSON.stringify({})
          const user = JSON.parse(userData)
          localStorage.setItem("user", JSON.stringify({...user, [fieldName]: score}))
        } catch (e) {
          console.error("Could not save guest score to localStorage", e)
        }
      }
      
      return { success: true, message: "Score saved locally" }
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const result = await ScoreService.saveScore(userId, level, score)

      if (result.success && result.scores) {
        setUserScores(result.scores)
      }

      setMessage(result.message)
      return { success: result.success, message: result.message }
    } catch (error) {
      const errorMessage = "Failed to save score. Please try again."
      setMessage(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userId,
    userName,
    userScores,
    saveScore,
    isLoading,
    message,
    getTrophyIcon: ScoreService.getTrophyIcon,
  }
}

// Score display component
export const ScoreDisplay = ({ scores, getTrophyIcon, title = "Your High Scores:" }) => {
  return (
    <div className="user-scores-container">
      <h3>{title}</h3>
      <div className="scores-grid">
        <div className="score-card easy">
          <h4>Easy</h4>
          <p className="score-value">
            {scores.quizEasyScore} {getTrophyIcon(scores.quizEasyScore, 10)}
          </p>
        </div>
        <div className="score-card medium">
          <h4>Medium</h4>
          <p className="score-value">
            {scores.quizMediumScore} {getTrophyIcon(scores.quizMediumScore, 10)}
          </p>
        </div>
        <div className="score-card hard">
          <h4>Hard</h4>
          <p className="score-value">
            {scores.quizHardScore} {getTrophyIcon(scores.quizHardScore, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}

// Default export for easier imports
export default {
  ScoreService,
  useUserScores,
  ScoreDisplay,
}