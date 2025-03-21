import { Request, Response } from 'express';
import Question from '../models/questionModel';

// Get all questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    // Fetching all questions from the database and sorting them by creation date (latest first)
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
    // Validating input data
    if (!text || !userId) {
      return res.status(400).json({ message: 'Text and userId are required' });
    }
    // Creating a new question document
    const newQuestion = new Question({
      text,
      userId,
      likes: [], // Initial empty likes array
      answers: [],
    });
    // Saving the question to the database
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Like or unlike a question
export const likeQuestion = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.body;
    // Validating userId
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    // Finding the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Checking if the user has already liked the question
    const alreadyLikedIndex = question.likes.findIndex(
      (like: any) => like.userId == userId
    );

    if (alreadyLikedIndex !== -1) {
      // If already liked, remove the like
      question.likes.splice(alreadyLikedIndex, 1);
    } else {
      // If not liked yet, add the like
      question.likes.push({ userId } as any);
    }
    // Saving the updated question
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
    // Validating input data
    if (!text || !userId) {
      return res.status(400).json({ message: 'Text and userId are required' });
    }
    // Finding the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    // Creating a new answer object
    const newAnswer: any = {
      text,
      userId,
      likes: [] // Initial empty likes array for the answer
    };
    // Adding the answer to the question's answers array
    question.answers.push(newAnswer);

    const updatedQuestion = await question.save();
    res.status(201).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Like or unlike an answer
export const likeAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, answerId } = req.params;
    const { userId } = req.body;
    // Validating userId
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    // Finding the question by ID
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
     
    // Finding the answer within the question's answers array
    const answerIndex = question.answers.findIndex(
      (answer: any) => answer._id.toString() === answerId
    );
     
    if (answerIndex === -1) {
      return res.status(404).json({ message: 'Answer not found' });
    }
     
    const answer = question.answers[answerIndex];
     
    // Checking if the user has already liked the answer
    const likeIndex = answer.likes.findIndex(
      (like: any) => like.userId == userId
    );
    if (likeIndex !== -1) {
      // If already liked, remove the like
    answer.likes.splice(likeIndex, 1);
    } else {
      // If not liked yet, add the like
      answer.likes.push({ userId } as any);
    }
    // Saving the updated question with the modified answer likes
    const updatedQuestion = await question.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
 



