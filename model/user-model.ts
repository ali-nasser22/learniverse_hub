import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  password: string;
  email: string;
  phone: string;
  role: "Admin" | "Instructor" | "Student" | "Teacher";
  bio: string;
  socialMedia?: {
    X?: string;
    linkedin?: string;
    facebook?: string;
  };
  profilePicture?: string;
  profile_picture?: string;
  designation: string;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  socialMedia: {
    X: String,
    linkedin: String,
    facebook: String,
  },
  profilePicture: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models.User ?? model<IUser>("User", UserSchema);
