// src/controllers/authController.ts
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passwordUtil';
import { sendOTPEmail } from '../utils/emailService';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

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
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    await sendOTPEmail("account creation","Your Dakapathi Account Creation OTP Code",email, otp);
    res.status(200).json({ message: 'Account Creation OTP sent to your mail' });
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

// Google Sign-In Controller
export const googleSignIn = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: 'Google authentication failed' });
    }

    const { email, name } = payload;

    let user = users.find(u => u.email === email);

    if (!user) {
      user = {
        fullname: name || 'Google User',
        nic: 'N/A',
        address: 'N/A',
        birthdate: 'N/A',
        email:email ?? '',
        password: '',
        type: 'User',
      };
      users.push(user);
    }

    const authToken = jwt.sign({ email: user.email, fullname: user.fullname }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Google Sign-In successful', token: authToken, fullname: user.fullname, email: user.email });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ message: 'Failed to authenticate Google user' });
  }
};

// User Guide data (mocked for now)
const userGuides = [
  {
    id: 1,
    title: 'How to Create an Account',
    content: [
      '1. Navigate to the Signup page.',
      '2. Enter your Fullname, NIC, Address, and Birthdate.',
      '3. Provide a valid Email and create a secure Password.',
      '4. Click the Signup button to complete the registration process.'
    ],
    videoPath: 'create-account.mp4' 
  },
  {
    id: 2,
    title: 'How to Navigate the Dashboard',
    content: [
      '1. Log in with your registered email and password.',
      '2. On the Dashboard, view an overview of your tax status.',
      '3. Use the menu on the left to explore different sections, including Reports and Tax Calculator.',
      '4. Click on any section to see detailed information.'
    ],
    videoPath: 'navigate-dashboarde.mp4' 
  },
  {
    id: 3,
    title: 'How to Use the Tax Calculator Feature',
    content: [
      '1. Navigate to the Tax Calculator page from the menu.',
      '2. Enter your income details accurately.',
      '3. Click the Calculate button to see the tax results.',
      '4. Review the calculated tax amount displayed on the page.',
    ],
    videoPath: 'tax-calculator.mp4' 
  }
  
];


// Get all user guides
export const getUserGuides = (req: Request, res: Response): void => {
  res.status(200).json(userGuides);
};

// Get a specific user guide by ID
export const getUserGuideById = (req: Request, res: Response): void => {
  const guideId = parseInt(req.params.id, 10);
  const guide = userGuides.find((g) => g.id === guideId);

  if (!guide) {
    res.status(404).json({ message: 'Guide not found.' });
    return;
  }

  res.status(200).json(guide);
};

export { users };