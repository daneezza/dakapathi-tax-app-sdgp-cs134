export interface QuizQuestion {
    id: number;
    question: string;
    options: { option: string; text: string }[];
    correctOption: string;
  }
  
  export interface UserAnswer {
    questionId: number;
    selectedOption: string;
  }
  