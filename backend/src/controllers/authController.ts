// src/controllers/authController.ts
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/passwordUtil';

// Mocked user storage (in-memory)
interface User {
  fullname: string;
  nic: string;
  address: string;
  birthdate: string;
  email: string;
  password: string;
}

const users: User[] = [];

// Signup Controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullname, nic, address, birthdate, email, password } = req.body;

  // Validate all required fields
  if (!fullname || !nic || !address || !birthdate || !email || !password) {
    res.status(400).json({ message: 'All fields are required: fullname, NIC, address, birthdate, email, and password.' });
    return;
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Store user (mocked for now)
  users.push({ fullname, nic, address, birthdate, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully.', fullname, email });
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
    ]
  },
  {
    id: 2,
    title: 'How to Navigate the Dashboard',
    content: [
      '1. Log in with your registered email and password.',
      '2. On the Dashboard, view an overview of your tax status.',
      '3. Use the menu on the left to explore different sections, including Reports and Tax Calculator.',
      '4. Click on any section to see detailed information.'
    ]
  },
  {
    id: 3,
    title: 'How to Use the Tax Calculator Feature',
    content: [
      '1. Navigate to the Tax Calculator page from the menu.',
      '2. Enter your income details accurately.',
      '3. Click the Calculate button to see the tax results.',
      '4. Review the calculated tax amount displayed on the page.'
    ]
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
