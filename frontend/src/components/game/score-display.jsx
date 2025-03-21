"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../../styles/game.css"

// A service to handle all score-related operations
export const ScoreService = {
  // Retrieves user scores from localStorage
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

  // Determines which trophy icon to display based on score percentage
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
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState("User")
  const [userScores, setUserScores] = useState({
    quizEasyScore: 0,
    quizMediumScore: 0,
    quizHardScore: 0,
  })
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUserEmail(parsedUser.email || parsedUser.email)
        setUserName(parsedUser.fullname || "User")
        setUserScores({
          quizEasyScore: parsedUser.quizEasyScore || 0,
          quizMediumScore: parsedUser.quizMediumScore || 0,
          quizHardScore: parsedUser.quizHardScore || 0,
        })
        
        // Sync with database when user data is loaded
        syncWithDatabase(parsedUser.email, {
          easy: parsedUser.quizEasyScore || 0,
          medium: parsedUser.quizMediumScore || 0,
          hard: parsedUser.quizHardScore || 0
        })
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // Function to sync scores with the database
  const syncWithDatabase = async (email, scores) => {
    if (!email) return
    
    try {
      setIsLoading(true)
      const response = await axios.post("http://localhost:3000/api/quiz/syncScores", {
        userEmail: email,
        scores: scores
      })
      
      if (response.data.success) {
        // Update local scores with the data received from the server
        const serverUser = response.data.user
        const updatedScores = {
          quizEasyScore: serverUser.quizEasyScore,
          quizMediumScore: serverUser.quizMediumScore,
          quizHardScore: serverUser.quizHardScore
        }
        
        setUserScores(updatedScores)
        ScoreService.updateLocalScores(updatedScores)
        console.log("Synced scores with database:", response.data)
      }
    } catch (error) {
      console.error("Error syncing with database:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to save a new score locally and to the database
  const saveScore = async (level, score) => {
    setIsLoading(true)
    
    // Map level to score field
    const fieldMap = {
      'easy': 'quizEasyScore',
      'medium': 'quizMediumScore',
      'hard': 'quizHardScore'
    }
    
    const fieldName = fieldMap[level.toLowerCase()]
    if (!fieldName) {
      setIsLoading(false)
      return
    }

    // Only proceed if new score is higher
    if (score <= userScores[fieldName]) {
      setMessage("Score not saved - your previous score was higher")
      setIsLoading(false)
      return
    }
    
    // Update local storage first
    const newScores = { ...userScores, [fieldName]: score }
    setUserScores(newScores)
    ScoreService.updateLocalScores({ [fieldName]: score })
    
    // Save to database
    try {
      if (userEmail) {
        // Send score update request to the server
        const response = await axios.post("http://localhost:3000/api/quiz/updateScore", {
          userEmail: userEmail,
          level: level.toLowerCase(),
          score: score
        })
        
        if (response.data.success) {
          setMessage("Score saved successfully!")
        } else {
          setMessage("Score saved locally but failed to update server")
        }
      } else {
        setMessage("Score saved locally only (no user email)")
      }
    } catch (error) {
      console.error("Error saving score to database:", error)
      setMessage("Error saving score to database")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userEmail,
    userName,
    userScores,
    saveScore,
    isLoading,
    message,
    syncWithDatabase,
    getTrophyIcon: ScoreService.getTrophyIcon,
  }
}

//components to display user scores
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