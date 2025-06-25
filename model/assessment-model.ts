import mongoose, { Schema, Types } from "mongoose";
import { MongoDocument } from "@/lib/convertData";

// Interface for individual option within a quiz
export interface IOption {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
}

// Interface for individual assessment item
export interface IAssessmentItem {
  quizId: string;
  options: IOption[];
  attempted: boolean;
}

// Main Assessment interface
export interface IAssessment extends MongoDocument {
  _id: Types.ObjectId;
  id?: string;
  assessments: IAssessmentItem[];
  otherMarks: number;
  __v?: number;
}

// Main Assessment schema
const AssessmentSchema = new Schema<IAssessment>({
  assessments: [
    {
      quizId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
          isSelected: {
            type: Boolean,
            required: true,
          },
        },
      ],
      attempted: {
        type: Boolean,
        required: true,
      },
    },
  ],
  otherMarks: {
    required: true,
    type: Number,
  },
});

export const Assessment =
  mongoose.models.Assessment ??
  mongoose.model<IAssessment>("Assessment", AssessmentSchema);
