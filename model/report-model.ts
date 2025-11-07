import mongoose, {Schema, Types} from "mongoose";
import {ILesson} from "./lesson-model";
import {IModule} from "./module-model";
import {ICourse} from "./course-model";
import {IUser} from "./user-model";
import {IAssessment} from "./assessment-model";

export interface IReport extends Document {
    _id: Types.ObjectId;
    id?: string;
    totalCompletedLessons: ILesson[];
    totalCompletedModules: IModule[];
    course: ICourse;
    student: IUser;
    quizAssessment: IAssessment;
    completionDate?: Date;
    __v?: number;
}

const ReportSchema = new Schema<IReport>({
    totalCompletedLessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
    ],
    totalCompletedModules: [
        {
            type: Schema.Types.ObjectId,
            ref: "Module",
        },
    ],
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
    completionDate: {
        type: Date,
        required: false
    },
    quizAssessment: {
        type: Schema.Types.ObjectId,
        ref: "Assessment",
    },
});

export const Report =
    mongoose.models.Report ?? mongoose.model<IReport>("Report", ReportSchema);
