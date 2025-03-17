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
export const questions: Question[] = [];

// ID counters
let nextId = 1;
let nextAnswerId = 1;

// Helper functions for ID management
export function incrementQuestionId(): number {
  return nextId++;
}

export function incrementAnswerId(): number {
  return nextAnswerId++;
}