import mongoose, { Schema, model } from "mongoose";
import { MongoDocument } from "@/lib/convertData";

interface IOption {
  text: string;
  is_correct: boolean;
}

export interface IQuiz extends MongoDocument {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  options: IOption[];
  explanations: string;
  mark: number;
  slug: string;
  __v?: number;
}

const OptionSchema = new Schema<IOption>({
  text: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    required: true,
  },
});

const QuizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  options: {
    type: [OptionSchema],
    required: true,
  },
  explanations: {
    type: String,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

export const Quiz = mongoose.models.Quiz ?? model<IQuiz>("Quiz", QuizSchema);
