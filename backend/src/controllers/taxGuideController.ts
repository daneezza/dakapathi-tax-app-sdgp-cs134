import { Request, Response } from 'express';

const taxGuides = [
  {
    id: 1,
    title: 'Sri Lanka’s Tax & Financial System',
    content: [
      '      Sri Lanka’s official currency, the Sri Lankan Rupee (LKR), forms the basis of financial transactions and symbolizes economic stability.The tax structure includes Personal Income Tax, Corporate Tax, and Value Added Tax (VAT), funding public services and economic growth.',
      'Unlike the standard calendar year, Sri Lanka’s financial year runs from April 1st to March 31st. This timeline is crucial for tax filing and compliance. Understanding these tax periods and currency nuances is vital for effective financial planning and smooth business operations.',
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