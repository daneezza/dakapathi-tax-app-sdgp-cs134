import express from 'express';
import { quizData } from '../middlewares/quizData'; // Import your quiz data

const router = express.Router();

/**
 * GET /api/quiz/:level
 * Returns quiz questions for the specified level
 */
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

/**
 * POST /api/quiz/submitOne
 * Processes a single question submission and returns feedback
 */
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

export default router;