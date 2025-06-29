import mongoose, { Schema } from "mongoose";
import { IModule } from "./module-model";
import { MongoDocument } from "@/lib/convertData";

export interface ILesson extends MongoDocument {
  id?: string;
  _id: string;
  title: string;
  description: string;
  duration: number; // duration in seconds
  video_url: string;
  published: boolean;
  slug: string;
  access: "public" | "private";
  module?: IModule; // Reference to parent module
  order: number; // Order within the module
  createdOn: Date;
  modifiedOn: Date;
  __v?: number;
}

const LessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
    default: 0,
  },
  video_url: {
    type: String,
    required: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  access: {
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
});

export const Lesson =
  mongoose.models.Lesson ?? mongoose.model<ILesson>("Lesson", LessonSchema);
