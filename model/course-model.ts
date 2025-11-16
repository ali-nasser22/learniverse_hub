import mongoose, {Schema, Types} from "mongoose";
import {ITestimonial} from "./testimonial-model";
import {ICategory} from "./category-model";
import {IUser} from "./user-model";
import {IModule} from "./module-model";


export interface ICourse extends Document {
    _id: Types.ObjectId;
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    thumbnail?: string;
    modules?: IModule[];
    price: number;
    active: boolean;
    category?: ICategory;
    instructor: IUser;
    testimonials?: ITestimonial[];
    shownOnHome: boolean;
    quizSet?: Types.ObjectId;
    learning?: string[];
    createdOn: Date;
    modifiedOn: Date;
    __v?: number;
}

const CourseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    modules: [
        {
            type: Schema.Types.ObjectId,
            ref: "Module",
        },
    ],
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    shownOnHome: {
        type: Boolean,
        required: true,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
        default: null,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    testimonials: [
        {
            type: Schema.Types.ObjectId,
            ref: "Testimonial",
        },
    ],
    quizSet: {
        type: Schema.Types.ObjectId,
        ref: "QuizSet",
    },
    learning: [
        {
            required: false,
            type: String,
        },
    ],
    createdOn: {
        type: Date,
        default: Date.now,
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
});

export const Course =
    mongoose.models.Course ?? mongoose.model<ICourse>("Course", CourseSchema);
