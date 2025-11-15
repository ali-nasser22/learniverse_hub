import mongoose, {Schema, Types} from "mongoose";

export interface INewsLetter {
    _id: Types.ObjectId;
    id?: string;
    userId: Types.ObjectId;
    isSubscribed: boolean;
    subscribedAt: Date
}

const NewsLetterSchema = new Schema<INewsLetter>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isSubscribed: {
        type: Boolean,
        required: true,
        default: false
    },
    subscribedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, {collection: 'newsletter-subscriptions'});

export const NewsLetter = mongoose.models.NewsLetter ?? mongoose.model<INewsLetter>("NewsLetter", NewsLetterSchema);