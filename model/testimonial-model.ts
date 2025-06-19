import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface ITestimonial extends Document {
  _id: Types.ObjectId;
  content: string;
  rating: number;
  courseId: Types.ObjectId;
  user: Types.ObjectId;
}

const TestimonialSchema = new Schema<ITestimonial>({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Testimonial =
  mongoose.models.Testimonial ??
  model<ITestimonial>("Testimonial", TestimonialSchema);
