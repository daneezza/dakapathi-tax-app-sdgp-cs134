import { Request, Response } from 'express';
import crypto from 'crypto';
import { sendOTPEmail } from '../utils/emailService';
import { hashPassword } from '../utils/passwordUtil';
import { users } from './authController';

interface ResetRequest {
  email: string;
  token: string;
  expiresAt: number;
}

const resetRequests: ResetRequest[] = [];

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const token = crypto.randomBytes(20).toString('hex');
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
  resetRequests.push({ email, token, expiresAt });

  const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
  await sendOTPEmail(email, `Click the link to reset your password: ${resetLink}`);

  res.status(200).json({ message: 'Reset link sent to your email' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;
  const request = resetRequests.find(r => r.email === email && r.token === token);
  if (!request || Date.now() > request.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = await hashPassword(newPassword);
  res.status(200).json({ message: 'Password reset successful' });
};
