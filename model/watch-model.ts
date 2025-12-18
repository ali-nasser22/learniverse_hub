import mongoose, {Schema, Types} from "mongoose";
import {IUser} from "./user-model";
import {ILesson} from "./lesson-model";
import {IModule} from "./module-model";


export interface IWatch extends Document {
    _id: Types.ObjectId;
    id?: string;
    user: IUser | Types.ObjectId;
    lesson: ILesson | Types.ObjectId;
    module: IModule | Types.ObjectId;
    status: "started" | "in_progress" | "completed";
    lastTime: number;
    created_at: Date;
    modified_at: Date;
    __v?: number;
}

const WatchSchema = new Schema<IWatch>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lesson: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },
        module: {
            type: Schema.Types.ObjectId,
            ref: "Module",
            required: true,
        }
        ,
        status: {
            type: String,
            enum: ["started", "in_progress", "completed"],
            required: true,
            default: "started",
        },
        lastTime: {
            type: Number,
            required: true,
            default: 0,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        modified_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "modified_at",
        },
    }
);

export const Watch =
    mongoose.models.Watch ?? mongoose.model<IWatch>("Watch", WatchSchema);