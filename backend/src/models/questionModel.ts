import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Like document
interface ILike extends Document {
  userId: string;
}

// Define an interface for the Answer document
interface IAnswer extends Document {
  text: string;
  userId: string;
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}

// Define an interface for the Question document
interface IQuestion extends Document {
  text: string;
  userId: string;
  likes: ILike[];
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for likes
const likeSchema = new Schema<ILike>({
  userId: { type: String, required: true },
});

// Define the schema for answers
const answerSchema = new Schema<IAnswer>(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    likes: [likeSchema],
  },
  { timestamps: true }
);

// Define the schema for questions
const questionSchema = new Schema<IQuestion>(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    likes: [likeSchema],
    answers: [answerSchema],
  },
  { timestamps: true }
);
// Export the Question model based on the schema
export default mongoose.model<IQuestion>('Question', questionSchema);