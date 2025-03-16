export interface Answer {
    id: number;
    content: string;
    questionId: number;
    likes: number;
}
  
  export interface Question {
    id: number;
    title: string;
    content?: string;
    likes: number;
    shares: number;
    isBookmarked: boolean;
    answers: Answer[];
}
  
  // Initial data
export const questions: Question[] = [
  { 
      id: 1, 
      title: 'What is the Tax Ratio of 2024 for income tax?', 
      likes: 28, 
      shares: 72, 
      isBookmarked: false,
      answers: []
  },
  { 
      id: 2, 
      title: 'What is the Tax Ratio of 2022 for income tax?', 
      likes: 28, 
      shares: 72, 
      isBookmarked: false,
      answers: []
  }
];
  
  // ID counters
let nextId = 3;
let nextAnswerId = 1;
  
  // Helper functions for ID management
export function incrementQuestionId(): number {
    return nextId++;
}
  
export function incrementAnswerId(): number {
    return nextAnswerId++;
}