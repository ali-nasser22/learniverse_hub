import mongoose, { Schema, model, Document, Types } from "mongoose";
import { ICourse } from "./course-model";

export interface IModule extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: string;
  slug: string;
  course: ICourse;
  lessonIds: Types.ObjectId[];
  duration: number;
}

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lessonIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
});

export const Module =
  mongoose.models.Module ?? model<IModule>("Module", ModuleSchema);
