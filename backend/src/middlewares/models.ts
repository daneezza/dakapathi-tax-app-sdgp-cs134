export interface User {
  id: number;
  username: string;
}

export interface Like {
  userId: number;
  itemId: number; // can be questionId or answerId
  itemType: 'question' | 'answer';
}

export interface Answer {
  id: number;
  content: string;
  questionId: number;
  likedBy: number[]; // array of user IDs who liked this answer
}

export interface Question {
  id: number;
  title: string;
  content?: string;
  likedBy: number[]; // array of user IDs who liked this question
  shares: number;
  isBookmarked: boolean;
  answers: Answer[];
}

// Initial data
export const questions: Question[] = [];
export const users: User[] = [];
export const likes: Like[] = [];

// ID counters
let nextQuestionId = 1;
let nextAnswerId = 1;
let nextUserId = 1;

// Helper functions for ID management
export function incrementQuestionId(): number {
  return nextQuestionId++;
}

export function incrementAnswerId(): number {
  return nextAnswerId++;
}

export function incrementUserId(): number {
  return nextUserId++;
}

// Helper functions for likes
export function getLikesCount(likedBy: number[]): number {
  return likedBy.length;
}

export function hasUserLiked(userId: number, likedBy: number[]): boolean {
  return likedBy.includes(userId);
}

export function toggleLike(userId: number, likedBy: number[]): number[] {
  if (hasUserLiked(userId, likedBy)) {
    // Remove like
    return likedBy.filter(id => id !== userId);
  } else {
    // Add like
    return [...likedBy, userId];
  }
}