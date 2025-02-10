// src/controllers/authController.ts
import { Request, Response } from 'express';

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
