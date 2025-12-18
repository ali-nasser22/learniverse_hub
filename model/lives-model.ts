import mongoose, {Schema, Types} from "mongoose";

export interface ILives {
    _id: Types.ObjectId;
    id?: string;
    title: string;
    description: string;
    liveUrl: string;
    instructorId: Types.ObjectId;
    schedule: Date;
    createdAt: Date;
}

const LivesSchema = new Schema<ILives>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    liveUrl: {
        type: String,
        required: true,
    },
    instructorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    schedule: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

export const Lives = mongoose.models.Lives ?? mongoose.model<ILives>("Lives", LivesSchema);