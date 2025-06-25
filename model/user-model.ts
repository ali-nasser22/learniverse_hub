import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  phone: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
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
      default: "",
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "INSTRUCTOR", "STUDENT"],
    },
    bio: {
      type: String,
      required: false,
      default: "",
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
      default: "https://i.pravatar.cc",
    },
    designation: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const User = mongoose.models.User ?? model<IUser>("User", UserSchema);
