import { Request, Response } from 'express';

const taxGuides = [
  {
    id: 1,
    title: 'How to Create an Account',
    content: [
      '1. Navigate to the Signup page.',
      '2. Enter your Fullname, NIC, Address, and Birthdate.',
      '3. Provide a valid Email and create a secure Password.',
      '4. Click the Signup button to complete the registration process.'
    ],
    YoutubePath: 'https://youtu.be/dQw4w9WgXcQ?si=T-1NLz8jc6KmGM31' 
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
    YoutubePath: 'https://youtu.be/Fkk9DI-8el4?si=FLYCiEmee6k4tdJq' 
  }  
];



export const getTaxGuides = (req: Request, res: Response): void => {
  res.status(200).json(taxGuides);
};


export const getTaxGuideById = (req: Request, res: Response): void => {
  const guideId = parseInt(req.params.id, 10);
  const guide = taxGuides.find((g) => g.id === guideId);

  if (!guide) {
    res.status(404).json({ message: 'Guide not found.' });
    return;
  }

  res.status(200).json(guide);
};