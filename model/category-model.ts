import mongoose, { Schema, model } from "mongoose";
import { MongoDocument } from "@/lib/convertData";

export interface ICategory extends MongoDocument {
  id: string;
  _id: string;
  title: string;
  description?: string;
  thumbnail: string;
  __v?: number;
}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

export const Category =
  mongoose.models.Category ?? model<ICategory>("Category", CategorySchema);
