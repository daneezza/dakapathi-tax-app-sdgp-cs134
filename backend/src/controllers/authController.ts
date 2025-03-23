// src/controllers/authController.ts
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passwordUtil';
import { sendOTPEmail } from '../utils/emailService';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';

// Define user interface for type safty
interface User {
  fullname: string;
  nic: string;
  address: string;
  birthdate: string;
  email: string;
  password: string;
  type: string;
  profilePic: string | null; // Add profilePic field to the User interface
}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Handle user signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullname, nic, address, birthdate, email, password, type } = req.body;

  // Validate required feilds
  if (!fullname || !nic || !address || !birthdate || !email || !password || !type) {
    res.status(400).json({ message: 'All fields are required: fullname, NIC, address, birthdate, email, password, and type.' });
    return;
  }

  // Validate user type
  if (type !== 'Admin' && type !== 'User') {
    res.status(400).json({ message: "Type must be either 'Admin' or 'User'." });
    return;
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    return;
  }


  // Encrypt password 
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ fullname, nic, address, birthdate, email, password: hashedPassword, type });
  // Save user details in the database
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully.', fullname, email, type,profilePic: '', });
};

// Handle user login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;


  if (Object.keys(req.body).length !== 2) {
    res.status(400).json({ message: 'Only email and password are required for login.' });
    return;
  }



  // CHeck if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  // Prvent login for google sign in users 
  if (!user.password) {
    res.status(400).json({ message: 'This account was created using Google Sign-In. Please use Google to log in.' });
    return;
  }


  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'Invalid email or password.' });
    return;
  }

  // Return user details
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





// Store OTp temporrarily in memory
const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {};

// Genarate 6 digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to user mail
export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    otpStore[email] = { otp, expiresAt };

    await sendOTPEmail("account creation","Your Dakapathi Account Creation OTP Code",email, otp);
    res.status(200).json({ message: 'Account Creation OTP sent to your mail' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify is the OTP entered is valid
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

// Handle google sign in 
export const googleSignIn = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: 'Google authentication failed' });
    }

    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    // If no user exists assign default null values
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
      // Save user in the database
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

// Handles update user details fullname,NIC,Address,DOB
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, fullname, nic, address, birthdate } = req.body;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }
        // Check if user exists
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
        // Sva the updated user details into the databse
        await user.save();

        res.status(200).json({ message: 'User details updated successfully.', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user details.' });
    }
};

// Handle password reset
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
        // Update user password in the database
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Failed to update password.' });
    }
};

// Handel user delete
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

    // Delete the user from the database
    await User.deleteOne({ email });

    res.status(200).json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user account.' });
  }
};

// Check if user has a password saved (To ensure if he is a google signin user)
export const checkPasswordStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ message: "Email is required." });
            return;
        }
        // Check if user exists
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

// Handle user Guide details
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


// Handles get all user guides
export const getUserGuides = (req: Request, res: Response): void => {
  res.status(200).json(userGuides);
};

// Handles get user guide by id
export const getUserGuideById = (req: Request, res: Response): void => {
  const guideId = parseInt(req.params.id, 10);
  const guide = userGuides.find((g) => g.id === guideId);

  if (!guide) {
    res.status(404).json({ message: 'Guide not found.' });
    return;
  }

  res.status(200).json(guide);
};


// New function to update profile image
export const updateProfileImage = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email, profilePic } = req.body; // Base64 image and email

      if (!email || !profilePic) {
          res.status(400).json({ message: 'Email and profile image are required.' });
          return;
      }

      const user = await User.findOne({ email });
      if (!user) {
          res.status(404).json({ message: 'User not found.' });
          return;
      }

      // Update user's profile image
      user.profilePic = profilePic; // Store the base64 image in the database
      await user.save();

      res.status(200).json({ message: 'Profile image updated successfully.' });
  } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).json({ message: 'Failed to update profile image.' });
  }
};

// Fetch Profile Image by Email
export const getProfileImage = async (req: Request, res: Response) => {
  try {
      const { email } = req.query;

      if (!email) {
          return res.status(400).json({ error: 'Email is required' });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Send the profile image back
      res.status(200).json({ profileImage: user.profilePic });
  } catch (error) {
      console.error('Error fetching profile image:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

