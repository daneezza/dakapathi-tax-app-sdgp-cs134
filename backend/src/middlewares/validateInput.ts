import { Request, Response, NextFunction } from 'express';

// Validate the input fields
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // Check if mail and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  next(); // Proceed to the next middleware or route handler
};