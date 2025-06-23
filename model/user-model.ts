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

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "INSTRUCTOR", "STUDENT", "TEACHER"],
    },
    bio: {
      type: String,
      required: false,
    },
    socialMedia: {
      X: {
        type: String,
        required: false,
      },
      linkedin: {
        type: String,
        required: false,
      },
      facebook: {
        type: String,
        required: false,
      },
    },
    profilePicture: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = mongoose.models.User ?? model<IUser>("User", UserSchema);
