import {Assessment} from "../model/assessment-model";
import {IReport, Report} from "../model/report-model";
import {replaceMongoIdInObject} from "@/lib/convertData";
import mongoose from "mongoose";
import {IModule, Module} from "../model/module-model";

type Filter = {
    course: string;
    student: string;
};

type Data = {
    userId: string,
    courseId: string,
    moduleId: string,
    lessonId: string
}

export async function getReport(filter: Filter) {
    try {
        const report = await Report.findOne(filter)
            .populate({
                path: "quizAssessment",
                model: Assessment,
            })
            .lean();
        return replaceMongoIdInObject(report as unknown as IReport);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createWatchReport(data: Data) {
    try {
        let report = await Report.findOne({
            student: data.userId,
            course: data.courseId
        }).lean() as unknown as IReport;

        if (!report) {
            report = await Report.create({
                course: data.courseId,
                student: data.userId,
            })
        }

        const foundLesson = report.totalCompletedLessons.find((lessonId) => lessonId.toString() === data.lessonId);

        if (!foundLesson) {
            // @ts-ignore
            report.totalCompletedLessons.push(new mongoose.Types.ObjectId(data.lessonId));
        }

        const moduleData = await Module.findById(data.moduleId) as IModule;
        const lessonIdsToCheck = moduleData.lessonIds;
        const completedLessonsIds = report.totalCompletedLessons;

    } catch (error) {
        console.error(error);
    }
}