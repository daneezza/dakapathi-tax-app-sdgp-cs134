import {Router, RequestHandler} from 'express';
import {
  getQuestions,
  createQuestion,
  likeQuestion,
  addAnswer,
  likeAnswer,
} from '../controllers/questionController';

const router = Router();

// Fix: Using the router methods correctly
router.get('/', getQuestions);
router.post('/', createQuestion as RequestHandler);
router.post('/:questionId/like', likeQuestion as RequestHandler);
router.post('/:questionId/answers', addAnswer as RequestHandler);
router.post('/:questionId/answers/:answerId/like', likeAnswer as RequestHandler);

export default router;