import mongoose, {model, Schema} from "mongoose";
import {IQuiz} from "./quiz-model";

export interface IQuizSet extends Document {
    id?: string;
    _id?: string;
    title: string;
    description?: string;
    slug: string;
    active: boolean;
    quizIds: IQuiz[];
    __v?: number;
}

const QuizSetSchema = new Schema<IQuizSet>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    slug: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    quizIds: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Quiz",
        },
    ],
});

export const QuizSet =
    mongoose.models.QuizSet ?? model<IQuizSet>("QuizSet", QuizSetSchema);
