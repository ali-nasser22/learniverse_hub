// lesson-model.ts
import mongoose, {Schema, Types} from "mongoose";

export interface ILesson {
    id?: string;
    _id: string;
    title: string;
    description: string;
    duration: number;
    video_url: string;
    published: boolean;
    slug: string;
    status: "started" | "in_progress" | "completed";
    active: boolean;
    access: "public" | "private";
    module?: Types.ObjectId | string;
    order: number;
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
    status: {
        type: String,
        default: 'started'
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
    active: {
        type: Boolean,
        default: true,
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
    module: {
        type: Schema.Types.ObjectId,
        ref: "Module",
        required: false,
    },
});

export const Lesson =
    mongoose.models.Lesson ?? mongoose.model<ILesson>("Lesson", LessonSchema);
