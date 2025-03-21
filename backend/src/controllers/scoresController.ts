import { Request, Response } from 'express';
import User from '../models/User';

class ScoreController {
  // Method to update user quiz scores
  static async saveScores(req: Request, res: Response) {
    try {
      // Extracting required fields from request body
      const { userEmail, quizEasyScore, quizMediumScore, quizHardScore } = req.body;
      // Checking if user email is provided
      if (!userEmail) {
        return res.status(400).json({ message: 'User email is required' });
      }
      // Finding the user by email in the database
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Updating the scores only if they are provided in the request
      if (quizEasyScore !== undefined) user.quizEasyScore = quizEasyScore;
      if (quizMediumScore !== undefined) user.quizMediumScore = quizMediumScore;
      if (quizHardScore !== undefined) user.quizHardScore = quizHardScore;

      // Saving the updated user data
      await user.save();
      // Sending response with updated user details
      res.status(200).json({
        message: 'Scores updated successfully',
        user: {
          fullname: user.fullname,
          email: user.email,
          type: user.type,
          quizEasyScore: user.quizEasyScore,
          quizMediumScore: user.quizMediumScore,
          quizHardScore: user.quizHardScore,
        },
      });
    } catch (error) {
      // Handling unexpected errors
      console.error('Error updating scores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ScoreController;
