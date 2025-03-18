import { Request, Response } from 'express';
import crypto from 'crypto';
import { sendOTPEmail } from '../utils/emailService';
import { hashPassword } from '../utils/passwordUtil';
import { users } from './authController';
import User from '../models/User';

interface ResetRequest {
  email: string;
  otp: string;
  expiresAt: number;
}

const resetRequests: ResetRequest[] = [];
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const requestPasswordReset = async (req: Request, res: Response) => {
  try{
    const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'Email not found' });
      }

      const otp = generateOTP();
      const expiresAt = Date.now() + 10 * 60 * 1000; 
      resetRequests.push({ email, otp, expiresAt });

      await sendOTPEmail("password-reset","Your Dakapathi Password-Reset OTP Code",email,otp);

      res.status(200).json({ message: 'Password reset OTP sent to your email' });
    } catch (error) {
      console.error("Error in request Password Reset:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  
};

export const resetPassword = async (req: Request, res: Response) => {
  try{
    const { email, otp, newPassword } = req.body;
      const request = resetRequests.find(r => r.email === email && r.otp === otp);
      if (!request || Date.now() > request.expiresAt) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.password = await hashPassword(newPassword);
      await user.save();
      res.status(200).json({ message: 'Password reset successful' });
  }catch (error) {
    console.error("Error in reset Password:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }

  
};
