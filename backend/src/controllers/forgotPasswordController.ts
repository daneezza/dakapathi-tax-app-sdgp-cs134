import { Request, Response } from 'express';
import crypto from 'crypto';
import { sendOTPEmail } from '../utils/emailService';
import { hashPassword } from '../utils/passwordUtil';
import { users } from './authController';

interface ResetRequest {
  email: string;
  otp: string;
  expiresAt: number;
}

const resetRequests: ResetRequest[] = [];
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
  resetRequests.push({ email, otp, expiresAt });

  await sendOTPEmail("password-reset","Your Dakapathi Password-Reset OTP Code",email,otp);

  res.status(200).json({ message: 'Password reset OTP sent to your email' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  const request = resetRequests.find(r => r.email === email && r.otp === otp);
  if (!request || Date.now() > request.expiresAt) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = await hashPassword(newPassword);
  res.status(200).json({ message: 'Password reset successful' });
};
