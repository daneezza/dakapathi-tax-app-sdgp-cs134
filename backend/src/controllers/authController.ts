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





