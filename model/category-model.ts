import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  _id: Types.ObjectId;
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
