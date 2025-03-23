import { Request, Response } from 'express';

const taxGuides = [
  {
    id: 1,
    title: 'Sri Lanka’s Tax & Financial System',
    content: [
      '      Sri Lanka’s official currency, the Sri Lankan Rupee (LKR), forms the basis of financial transactions and symbolizes economic stability.The tax structure includes Personal Income Tax, Corporate Tax, and Value Added Tax (VAT), funding public services and economic growth.',
      'Unlike the standard calendar year, Sri Lanka’s financial year runs from April 1st to March 31st. This timeline is crucial for tax filing and compliance. Understanding these tax periods and currency nuances is vital for effective financial planning and smooth business operations.',
    ],
    YoutubePath: 'https://youtu.be/Xr2870I6ESg?si=AJV-zNypSd88Qnl7' 
  },
  {
    id: 2,
    title: 'Dakapathi Marketing Video',
    content: [
      ' Dakapathi is an intelligent tax consulting web application designed specifically for Sri Lankan taxpayers. It simplifies tax calculations, provides real-time updates on tax regulations,',
      'and offers personalized guidance to ensure compliance. With smart notifications and an easy-to-use interface, Dakapathi helps individuals and businesses manage their taxes effortlessly.',
    ],
    YoutubePath: 'https://youtu.be/JZE6C57DQfA?si=XSXEiy_6pfSYcFlo' 
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