import {Router, RequestHandler} from 'express';
// Import controller functions
import {
  getQuestions,
  createQuestion,
  likeQuestion,
  addAnswer,
  likeAnswer,
} from '../controllers/questionController';

const router = Router();

// Route to get all questions
router.get('/', getQuestions);
// Route to create a new question
router.post('/', createQuestion as RequestHandler);
// Route to like a specific question
router.post('/:questionId/like', likeQuestion as RequestHandler);
// Route to add an answer to a specific question
router.post('/:questionId/answers', addAnswer as RequestHandler);
// Route to like a specific answer for a specific question
router.post('/:questionId/answers/:answerId/like', likeAnswer as RequestHandler);

export default router;