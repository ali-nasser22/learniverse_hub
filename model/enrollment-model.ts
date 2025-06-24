import mongoose, { Schema } from "mongoose";
import { ICourse } from "./course-model";
import { IUser } from "./user-model";
import { MongoDocument } from "@/lib/convertData";

export interface IEnrollment extends MongoDocument {
  id?: string;
  enrollment_date: Date;
  status: string;
  completion_date?: Date;
  method: string;
  course: ICourse;
  student: IUser;
  __v?: number;
}

const EnrollmentSchema = new Schema<IEnrollment>({
  enrollment_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  completion_date: {
    type: Date,
    required: false,
  },
  method: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Enrollment =
  mongoose.models.Enrollment ??
  mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);
