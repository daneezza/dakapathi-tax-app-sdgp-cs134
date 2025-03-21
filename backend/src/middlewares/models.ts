export interface User {
  id: number;
  username: string;
}

export interface Like {
  userId: number;
  itemId: number; // can be questionId or answerId
  itemType: 'question' | 'answer'; // Specifies what type of item is liked
}

export interface Answer {
  id: number;
  content: string;
  questionId: number; 
  likedBy: number[]; 
}

export interface Question {
  id: number;
  title: string;
  content?: string;
  likedBy: number[]; 
  shares: number;
  isBookmarked: boolean;
  answers: Answer[];
}

// Initial data storage arrays
export const questions: Question[] = [];
export const users: User[] = [];
export const likes: Like[] = [];

//ids to generate unique ids for new users, questions and answers
let nextQuestionId = 1;
let nextAnswerId = 1;
let nextUserId = 1;

// function to generate unique question ids
export function incrementQuestionId(): number {
  return nextQuestionId++;
}
//function to generate answer ids
export function incrementAnswerId(): number {
  return nextAnswerId++;
}
//function to generate user ids
export function incrementUserId(): number {
  return nextUserId++;
}

//return the number of likes
export function getLikesCount(likedBy: number[]): number {
  return likedBy.length;
}
//function to check whether the a specific user has liked an item
export function hasUserLiked(userId: number, likedBy: number[]): boolean {
  return likedBy.includes(userId);
}
//if the user has already liked, then this function will remove the like
//if not, it will add the like
export function toggleLike(userId: number, likedBy: number[]): number[] {
  if (hasUserLiked(userId, likedBy)) {
    // Remove like
    return likedBy.filter(id => id !== userId);
  } else {
    // Add like
    return [...likedBy, userId];
  }
}