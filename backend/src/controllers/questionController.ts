import { Request, Response } from 'express';
import Question from '../models/questionModel';

// Get all questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({ message: 'Text and userId are required' });
    }
    const newQuestion = new Question({
      text,
      userId,
      likes: [],
      answers: [],
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Like a question
export const likeQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Avoiding type issues by using direct document manipulation
    const alreadyLikedIndex = question.likes.findIndex(
      (like: any) => like.userId == userId
    );

    if (alreadyLikedIndex !== -1) {
      // Remove like if already liked
      question.likes.splice(alreadyLikedIndex, 1);
    } else {
      // Add like if not already liked
      question.likes.push({ userId } as any);
    }
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add an answer to a question
export const addAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({ message: 'Text and userId are required' });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    // Use any type to bypass TypeScript checks
    const newAnswer: any = {
      text,
      userId,
      likes: []
    };

    question.answers.push(newAnswer);

    const updatedQuestion = await question.save();
    res.status(201).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Like an answer
export const likeAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, answerId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
     // Use findOneAndUpdate to make atomic updates within MongoDB
     const question = await Question.findById(questionId);
    
     if (!question) {
       return res.status(404).json({ message: 'Question not found' });
     }
     
     // Find the answer in the answers array
     const answerIndex = question.answers.findIndex(
       (answer: any) => answer._id.toString() === answerId
     );
     
     if (answerIndex === -1) {
       return res.status(404).json({ message: 'Answer not found' });
     }
     
     const answer = question.answers[answerIndex];
     
     // Check if user already liked this answer
     const likeIndex = answer.likes.findIndex(
       (like: any) => like.userId == userId
     );
     if (likeIndex !== -1) {
      // Remove like if already liked
      answer.likes.splice(likeIndex, 1);
    } else {
      // Add like if not already liked
      answer.likes.push({ userId } as any);
    }
    
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
 



