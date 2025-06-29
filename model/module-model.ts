import mongoose, { Schema, model, Document, Types } from "mongoose";
import { ICourse } from "./course-model";
import { ILesson } from "./lesson-model";

export interface IModule extends Document {
  _id: Types.ObjectId;
  id?:string
  title: string;
  description?: string;
  status: string;
  slug: string;
  course: ICourse;
  lessonIds?: ILesson[];
  duration?: number;
  order:number
}

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    required: false,
    default: "draft",
  },
  slug: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lessonIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  duration: {
    type: Number,
    required: false,
    default: 0,
  },
  order: {
    type: Number,
    required: true,
  },
});

export const Module =
  mongoose.models.Module ?? model<IModule>("Module", ModuleSchema);
