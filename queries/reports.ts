import {Assessment} from "../model/assessment-model";
import {IReport, Report} from "../model/report-model";
import {replaceMongoIdInObject} from "@/lib/convertData";
import mongoose from 'mongoose';
import {IModule, Module} from "../model/module-model";
import {getCourseById} from "./courses";
import {ICourse} from "../model/course-model";

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
        });

        if (!report) {
            report = await Report.create({
                course: data.courseId,
                student: data.userId,
                totalCompletedLessons: [],
                totalCompletedModules: [],
            })
        }

        const foundLesson = report.totalCompletedLessons.find((lessonId) => lessonId.toString() === data.lessonId);

        if (!foundLesson) {
            report.totalCompletedLessons.push(new mongoose.Types.ObjectId(data.lessonId));
        }

        const moduleData = await Module.findById(data.moduleId) as IModule;
        const lessonIdsToCheck = moduleData.lessonIds;
        const completedLessonsIds = report.totalCompletedLessons;

        const isModuleCompleted = lessonIdsToCheck?.every((lesson) => {
            return completedLessonsIds.includes(lesson);
        })

        if (isModuleCompleted) {
            const foundModule = report.totalCompletedModules
                .find((module) => module.toString() === data.moduleId);
            if (!foundModule) {
                report.totalCompletedModules.push(new mongoose.Types.ObjectId(data.moduleId));
            }
        }

        const course = await getCourseById(data.courseId) as unknown as ICourse;
        const modulesInCourse = course?.modules;
        const modulesCount = modulesInCourse?.length ?? 0;
        const completedModules = report.totalCompletedModules;
        const completedModulesCount = completedModules?.length ?? 0;

        if (completedModulesCount >= 1 && completedModulesCount === modulesCount) {
            report.completionDate = Date.now();
        }
        await report.save();
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

