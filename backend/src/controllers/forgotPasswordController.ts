import { Request, Response } from 'express';
import { sendOTPEmail } from '../utils/emailService';
import { hashPassword } from '../utils/passwordUtil';
import User from '../models/User';

interface ResetRequest {
  email: string;
  otp: string;
  expiresAt: number;
}

// Store password reset requests
const resetRequests: ResetRequest[] = [];
// Genarate 6 digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Handle password reset request by sending an email to the user email
export const requestPasswordReset = async (req: Request, res: Response) => {
  try{
    const { email } = req.body;
    // Check if user exists  
    const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'Email not found' });
      }

      const otp = generateOTP();
      // OTP expires in 10 minutes
      const expiresAt = Date.now() + 10 * 60 * 1000; 
      // Store reset  request
      resetRequests.push({ email, otp, expiresAt });
      
      // Sent OTP to user email
      await sendOTPEmail("password-reset","Your Dakapathi Password-Reset OTP Code",email,otp);

      res.status(200).json({ message: 'Password reset OTP sent to your email' });
    } catch (error) {
      console.error("Error in request Password Reset:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  
};

// Handle reset password request
export const resetPassword = async (req: Request, res: Response) => {
  try{
    const { email, otp, newPassword } = req.body;
    // Find the request with the email and OTP  
    const request = resetRequests.find(r => r.email === email && r.otp === otp);
    // Validate OTP and check if it's expired  
    if (!request || Date.now() > request.expiresAt) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      // Encrypt password
      user.password = await hashPassword(newPassword);
      // Save user new password into the database
      await user.save();
      res.status(200).json({ message: 'Password reset successful' });
  }catch (error) {
    console.error("Error in reset Password:", error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }

  
};