import express from 'express';
import { quizData } from '../middlewares/quizData';
import User from '../models/User'; // Added import for User model

const router = express.Router();

// Get questions for a specific level
router.get('/:level', (req: any, res: any) => {
  const { level } = req.params;
  const questionsForLevel = quizData[level];
  
  if (!questionsForLevel) {
    return res.status(404).json({ 
      success: false, 
      message: "Level not found or no questions for level" 
    });
  }

  const formattedQuestions = questionsForLevel.map(({ id, question, options }) => ({
    id,
    question,
    options,
  }));

  return res.status(200).json({ 
    success: true, 
    questions: questionsForLevel 
  });
});

// Submit a single answer
router.post('/submitOne', (req: any, res: any) => {
  try {
    const userAnswer = req.body;
    const question = quizData[userAnswer.level]?.find((q) => q.id === userAnswer.questionId);

    if (!question) {
      return res.status(404).json({ 
        success: false, 
        message: 'Question not found' 
      });
    }

    const isCorrect = question.correctOption.toUpperCase() === userAnswer.selectedOption.toUpperCase();

    const result = {
      questionId: userAnswer.questionId,
      success: true,
      isCorrect,
      selectedOption: userAnswer.selectedOption,
      correctOption: question.correctOption,
      feedback: isCorrect
        ? 'Correct answer!'
        : `Incorrect. The correct answer was: ${question.correctOption}`,
    };

    return res.status(200).json({ 
      success: true, 
      result 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid JSON or request format' 
    });
  }
});

// Update user quiz score - Merged from userScoreRoutes.ts
router.post('/updateScore', async (req: any, res: any) => {
  try {
    const { userId, level, score } = req.body;
    
    if (!userId || !level || score === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: userId, level, score' 
      });
    }
    
    // Validate level
    if (!['easy', 'medium', 'hard'].includes(level.toLowerCase())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid level. Must be easy, medium, or hard' 
      });
    }
    
    // Map level to score field name
    let scoreField: 'quizEasyScore' | 'quizMediumScore' | 'quizHardScore';
    
    switch(level.toLowerCase()) {
      case 'easy':
        scoreField = 'quizEasyScore';
        break;
      case 'medium':
        scoreField = 'quizMediumScore';
        break;
      case 'hard':
        scoreField = 'quizHardScore';
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid level' 
        });
    }
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Only update if the new score is higher than the current score
    if (score > user[scoreField]) {
      // Update score
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { [scoreField]: score },
        { new: true }
      );
      
      // Add null check before accessing properties
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found after update'
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Score updated successfully',
        user: {
          id: updatedUser._id,
          fullname: updatedUser.fullname,
          quizEasyScore: updatedUser.quizEasyScore,
          quizMediumScore: updatedUser.quizMediumScore,
          quizHardScore: updatedUser.quizHardScore
        }
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'Score not updated as it is not higher than the current score',
        user: {
          id: user._id,
          fullname: user.fullname,
          quizEasyScore: user.quizEasyScore,
          quizMediumScore: user.quizMediumScore,
          quizHardScore: user.quizHardScore
        }
      });
    }
    
  } catch (error) {
    console.error('Error updating score:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error while updating score' 
    });
  }
});

export default router;