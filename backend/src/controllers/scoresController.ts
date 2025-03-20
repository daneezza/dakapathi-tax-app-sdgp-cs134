import { Request, Response } from 'express';
import User from '../models/User';

class ScoreController {
  static async saveScores(req: Request, res: Response) {
    try {
      const { userEmail, quizEasyScore, quizMediumScore, quizHardScore } = req.body;

      if (!userEmail) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the scores if provided
      if (quizEasyScore !== undefined) user.quizEasyScore = quizEasyScore;
      if (quizMediumScore !== undefined) user.quizMediumScore = quizMediumScore;
      if (quizHardScore !== undefined) user.quizHardScore = quizHardScore;

      await user.save();

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
      console.error('Error updating scores:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default ScoreController;
