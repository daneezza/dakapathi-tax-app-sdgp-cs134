import express from 'express';
import { 
  questions, 
  Question, 
  Answer, 
  incrementQuestionId, 
  incrementAnswerId,
  toggleLike,
  hasUserLiked,
  getLikesCount
} from '../middlewares/models';

const router = express.Router();

// Get all questions
router.get('/', (req, res) => {
  // Transform the data to include like counts instead of arrays of user IDs
  const transformedQuestions = questions.map(q => ({
    ...q,
    likes: getLikesCount(q.likedBy),
    likedBy: undefined,
    answers: q.answers.map(a => ({
      ...a,
      likes: getLikesCount(a.likedBy),
      likedBy: undefined
    }))
  }));
  
  res.status(200).json(transformedQuestions);
});

// Create a new question
router.post('/', (req, res) => {
  const { title } = req.body;
  const newQuestion: Question = {
    id: incrementQuestionId(),
    title,
    likedBy: [],
    shares: 0,
    isBookmarked: false,
    answers: []
  };
  
  questions.push(newQuestion);
  
  // Transform for response
  const transformedQuestion = {
    ...newQuestion,
    likes: 0,
    likedBy: undefined
  };
  
  res.status(201).json(transformedQuestion);
});

// Add an answer to a question
router.post('/:id/answers', (req: any, res: any) => {
  const questionId = parseInt(req.params.id, 10);
  const questionIndex = questions.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  const { content } = req.body;
  const newAnswer: Answer = {
    id: incrementAnswerId(),
    content,
    questionId,
    likedBy: []
  };
  
  questions[questionIndex].answers.push(newAnswer);
  
  // Transform for response
  const transformedAnswer = {
    ...newAnswer,
    likes: 0,
    likedBy: undefined
  };
  
  res.status(201).json(transformedAnswer);
});

// Like a question
router.post('/:id/like', (req: any, res: any) => {
  const questionId = parseInt(req.params.id, 10);
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  const questionIndex = questions.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  // Toggle the like
  questions[questionIndex].likedBy = toggleLike(userId, questions[questionIndex].likedBy);
  
  res.status(200).json({
    id: questionId,
    likes: getLikesCount(questions[questionIndex].likedBy),
    userLiked: hasUserLiked(userId, questions[questionIndex].likedBy)
  });
});

// Like an answer
router.post('/:questionId/answers/:answerId/like', (req: any, res: any) => {
  const questionId = parseInt(req.params.questionId, 10);
  const answerId = parseInt(req.params.answerId, 10);
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  const questionIndex = questions.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  const answerIndex = questions[questionIndex].answers.findIndex(a => a.id === answerId);
  
  if (answerIndex === -1) {
    return res.status(404).json({ error: 'Answer not found' });
  }
  
  // Toggle the like
  questions[questionIndex].answers[answerIndex].likedBy = toggleLike(
    userId,
    questions[questionIndex].answers[answerIndex].likedBy
  );
  
  res.status(200).json({
    questionId,
    answerId,
    likes: getLikesCount(questions[questionIndex].answers[answerIndex].likedBy),
    userLiked: hasUserLiked(userId, questions[questionIndex].answers[answerIndex].likedBy)
  });
});

// Update a question
router.put('/:id', (req: any, res:any) => {
  const id = parseInt(req.params.id, 10);
  const questionIndex = questions.findIndex(q => q.id === id);
  
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  questions[questionIndex] = { ...questions[questionIndex], ...req.body };
  
  // Transform for response
  const transformedQuestion = {
    ...questions[questionIndex],
    likes: getLikesCount(questions[questionIndex].likedBy),
    likedBy: undefined
  };
  
  res.status(200).json(transformedQuestion);
});

export default router;