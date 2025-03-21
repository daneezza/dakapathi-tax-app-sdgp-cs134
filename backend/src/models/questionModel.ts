import mongoose, { Document, Schema } from 'mongoose';

interface ILike extends Document {
  userId: string;
}

interface IAnswer extends Document {
  text: string;
  userId: string;
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}

interface IQuestion extends Document {
  text: string;
  userId: string;
  likes: ILike[];
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new Schema<ILike>({
  userId: { type: String, required: true },
});

const answerSchema = new Schema<IAnswer>(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    likes: [likeSchema],
  },
  { timestamps: true }
);

const questionSchema = new Schema<IQuestion>(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    likes: [likeSchema],
    answers: [answerSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>('Question', questionSchema);