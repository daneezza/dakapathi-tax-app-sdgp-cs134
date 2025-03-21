// src/controllers/authController.ts
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passwordUtil';
import { sendOTPEmail } from '../utils/emailService';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';


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


export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullname, nic, address, birthdate, email, password, type } = req.body;


  if (!fullname || !nic || !address || !birthdate || !email || !password || !type) {
    res.status(400).json({ message: 'All fields are required: fullname, NIC, address, birthdate, email, password, and type.' });
    return;
  }


  if (type !== 'Admin' && type !== 'User') {
    res.status(400).json({ message: "Type must be either 'Admin' or 'User'." });
    return;
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    return;
  }



  const hashedPassword = await hashPassword(password);
  const newUser = new User({ fullname, nic, address, birthdate, email, password: hashedPassword, type });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully.', fullname, email, type,profilePic: '', });
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;


  if (Object.keys(req.body).length !== 2) {
    res.status(400).json({ message: 'Only email and password are required for login.' });
    return;
  }




  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }


  if (!user.password) {
    res.status(400).json({ message: 'This account was created using Google Sign-In. Please use Google to log in.' });
    return;
  }


  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }


  res.status(200).json({
        message: 'Login successful.',
        user: {
            fullname: user.fullname,
            nic: user.nic,
            address: user.address,
            birthdate: user.birthdate,
            password: user.password,
            email: user.email,
            type: user.type,
            quizEasyScore: user.quizEasyScore,
            quizMediumScore: user.quizMediumScore,
            quizHardScore: user.quizHardScore,
            profilePic: user.profilePic || null,
        }
    });
};






const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {};


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expiresAt };

    await sendOTPEmail("account creation","Your Dakapathi Account Creation OTP Code",email, otp);
    res.status(200).json({ message: 'Account Creation OTP sent to your mail' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};


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

    
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullname: name || 'Google User',
        nic: 'N/A',
        address: 'N/A',
        birthdate: 'N/A',
        email: email ?? '',
        password: '',
        type: 'User',
        quizEasyScore: 0,
        quizMediumScore: 0,
        quizHardScore: 0,
        profilePic: null, 
      });

      await user.save();
    }

    res.status(200).json({
            message: 'Google Sign-In successful',
            user: {
                fullname: user.fullname,
                nic: user.nic !== 'N/A' ? user.nic : '',
                address: user.address !== 'N/A' ? user.address : '',
                birthdate: user.birthdate !== 'N/A' ? user.birthdate : '',
                email: user.email,
                password: user.password,
                type: user.type,
                quizEasyScore: user.quizEasyScore,
                quizMediumScore: user.quizMediumScore,
                quizHardScore: user.quizHardScore,
                profilePic: user.profilePic || null,
            }
        });

  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ message: 'Failed to authenticate Google user' });
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, fullname, nic, address, birthdate } = req.body;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // Update user details
        user.fullname = fullname || user.fullname;
        user.nic = nic || user.nic;
        user.address = address || user.address;
        user.birthdate = birthdate || user.birthdate;

        await user.save();

        res.status(200).json({ message: 'User details updated successfully.', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user details.' });
    }
};


export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!email || !newPassword) {
            res.status(400).json({ message: 'Email and new password are required.' });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        if (user.password) {
            // If the user has a password, require currentPassword for verification
            if (!currentPassword) {
                res.status(400).json({ message: 'Current password is required.' });
                return;
            }

            const isPasswordValid = await comparePassword(currentPassword, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Current password is incorrect.' });
                return;
            }
        }

        // Hash and update the new password
        user.password = await hashPassword(newPassword);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Failed to update password.' });
    }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required.' });
      return;
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    // Delete the user
    await User.deleteOne({ email });

    res.status(200).json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user account.' });
  }
};

export const checkPasswordStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ message: "Email is required." });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        res.json({ hasPassword: !!user.password });
    } catch (error) {
        console.error("Error checking password status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

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



export const getUserGuides = (req: Request, res: Response): void => {
  res.status(200).json(userGuides);
};


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