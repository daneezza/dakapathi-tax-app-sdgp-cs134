import express from 'express';
import { questions, Question, Answer, incrementQuestionId, incrementAnswerId } from '../middlewares/models';

const router = express.Router();

// Get all questions
router.get('/', (req, res) => {
  res.status(200).json(questions);
});

// Create a new question
router.post('/', (req, res) => {
  const { title } = req.body;
  const newQuestion: Question = {
    id: incrementQuestionId(),
    title,
    likes: 0,
    shares: 0,
    isBookmarked: false,
    answers: []
  };
  
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
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
    likes: 0
  };
  
  questions[questionIndex].answers.push(newAnswer);
  res.status(201).json(newAnswer);
});

// Update a question
router.put('/:id', (req: any, res:any) => {
  const id = parseInt(req.params.id, 10);
  const questionIndex = questions.findIndex(q => q.id === id);
  
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Question not found' });
  }
  
  questions[questionIndex] = { ...questions[questionIndex], ...req.body };
  res.status(200).json(questions[questionIndex]);
});

export default router;