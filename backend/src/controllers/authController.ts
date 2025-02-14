// src/controllers/authController.ts
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passwordUtil';
import { sendOTPEmail } from '../utils/emailService';

// Mocked user storage (in-memory)
interface User {
  fullname: string;
  nic: string;
  address: string;
  birthdate: string;
  email: string;
  password: string;
  type: string;
}

const users: User[] = [];

// Signup Controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullname, nic, address, birthdate, email, password, type } = req.body;

  // Validate all required fields
  if (!fullname || !nic || !address || !birthdate || !email || !password || !type) {
    res.status(400).json({ message: 'All fields are required: fullname, NIC, address, birthdate, email, password, and type.' });
    return;
  }

  // Validate type value
  if (type !== 'Admin' && type !== 'User') {
    res.status(400).json({ message: "Type must be either 'Admin' or 'User'." });
    return;
  }

  // Check for duplicate email
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    return;
  }


  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Store user (mocked for now)
  users.push({ fullname, nic, address, birthdate, email, password: hashedPassword, type });

  res.status(201).json({ message: 'User registered successfully.', fullname, email, type });
};

// Login Controller
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Validate only email and password for login
  if (Object.keys(req.body).length !== 2) {
    res.status(400).json({ message: 'Only email and password are required for login.' });
    return;
  }

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  // Find user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  // Compare password
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  res.status(200).json({ message: 'Login successful.', fullname: user.fullname, email: user.email });
};



// OTP


// Temporary storage for OTPs (Use a database in production)
const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {};

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to User
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes
    otpStore[email] = { otp, expiresAt };

    await sendOTPEmail(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: 'Email and OTP are required' });
      return;
    }

    const storedOTP = otpStore[email];
    if (!storedOTP) {
      res.status(400).json({ message: 'No OTP found. Request a new one.' });
      return;
    }

    if (Date.now() > storedOTP.expiresAt) {
      delete otpStore[email];
      res.status(400).json({ message: 'OTP expired. Request a new one.' });
      return;
    }

    if (storedOTP.otp !== otp) {
      res.status(400).json({ message: 'Invalid OTP. Try again.' });
      return;
    }

    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

export { users };