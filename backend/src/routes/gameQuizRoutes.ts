import express from "express"
import { quizData } from "../middlewares/quizData"
import User from "../models/User"

const router = express.Router()

// Get questions for a specific level
router.get("/:level", (req: any, res: any) => {
  const { level } = req.params
  const questionsForLevel = quizData[level]

  if (!questionsForLevel) {
    return res.status(404).json({
      success: false,
      message: "Level not found or no questions for level",
    })
  }

  const formattedQuestions = questionsForLevel.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }))

  return res.status(200).json({
    success: true,
    questions: questionsForLevel,
  })
})

// Submit a single answer
router.post("/submitOne", (req: any, res: any) => {
  try {
    const userAnswer = req.body
    const question = quizData[userAnswer.level]?.find((q) => q.id === userAnswer.questionId)

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    const isCorrect = question.correctOption.toUpperCase() === userAnswer.selectedOption.toUpperCase()

    const result = {
      questionId: userAnswer.questionId,
      success: true,
      isCorrect,
      selectedOption: userAnswer.selectedOption,
      correctOption: question.correctOption,
      feedback: isCorrect ? "Correct answer!" : `Incorrect. The correct answer was: ${question.correctOption}`,
    }

    return res.status(200).json({
      success: true,
      result,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON or request format",
    })
  }
})

// Update user quiz score
router.post("/updateScore", async (req: any, res: any) => {
  try {
    const { userEmail, level, score } = req.body

    if (!userEmail || !level || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userEmail, level, score",
      })
    }

    // Validate level
    if (!["easy", "medium", "hard"].includes(level.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid level. Must be easy, medium, or hard",
      })
    }

    // Map level to score field name
    let scoreField: "quizEasyScore" | "quizMediumScore" | "quizHardScore"

    switch (level.toLowerCase()) {
      case "easy":
        scoreField = "quizEasyScore"
        break
      case "medium":
        scoreField = "quizMediumScore"
        break
      case "hard":
        scoreField = "quizHardScore"
        break
      default:
        return res.status(400).json({
          success: false,
          message: "Invalid level",
        })
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Only update if the new score is higher than the current score
    if (score > user[scoreField]) {
      // Create update object
      const update = { [scoreField]: score };
      
      // Update score
      const updatedUser = await User.findOneAndUpdate(
        { email: userEmail }, 
        update, 
        { new: true }
      );

      // Add null check before accessing properties
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found after update",
        })
      }

      return res.status(200).json({
        success: true,
        message: "Score updated successfully",
        user: {
          email: updatedUser.email,
          fullname: updatedUser.fullname,
          quizEasyScore: updatedUser.quizEasyScore,
          quizMediumScore: updatedUser.quizMediumScore,
          quizHardScore: updatedUser.quizHardScore,
        },
      })
    } else {
      return res.status(200).json({
        success: true,
        message: "Score not updated as it is not higher than the current score",
        user: {
          email: user.email,
          fullname: user.fullname,
          quizEasyScore: user.quizEasyScore,
          quizMediumScore: user.quizMediumScore,
          quizHardScore: user.quizHardScore,
        },
      })
    }
  } catch (error) {
    console.error("Error updating score:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while updating score",
    })
  }
})

// Add a route for syncing all scores at once
router.post("/syncScores", async (req: any, res: any) => {
  try {
    const { userEmail, scores } = req.body

    if (!userEmail || !scores) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userEmail, scores",
      })
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Only update scores that are higher than current scores
    const updates: any = {}

    if (scores.easy > user.quizEasyScore) {
      updates.quizEasyScore = scores.easy
    }

    if (scores.medium > user.quizMediumScore) {
      updates.quizMediumScore = scores.medium
    }

    if (scores.hard > user.quizHardScore) {
      updates.quizHardScore = scores.hard
    }

    // If there are no updates needed, return current user data
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({
        success: true,
        message: "No scores needed updating",
        user: {
          email: user.email,
          fullname: user.fullname,
          quizEasyScore: user.quizEasyScore,
          quizMediumScore: user.quizMediumScore,
          quizHardScore: user.quizHardScore,
        },
      })
    }

    // Update user with new scores
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail }, 
      updates, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found after update",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Scores synced successfully",
      user: {
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        quizEasyScore: updatedUser.quizEasyScore,
        quizMediumScore: updatedUser.quizMediumScore,
        quizHardScore: updatedUser.quizHardScore,
      },
    })
  } catch (error) {
    console.error("Error syncing scores:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while syncing scores",
    })
  }
})

export default router