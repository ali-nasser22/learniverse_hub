import {IModule, Module} from "../model/module-model";
import {Types} from "mongoose";
import {Lesson} from "../model/lesson-model";
import {replaceMongoIdInObject} from "@/lib/convertData";

interface IModuleCreate {
    title: string;
    slug: string;
    course: Types.ObjectId;
    order: number;
}

export async function createModule(module: IModuleCreate) {
    try {
        const newModule = await Module.create(module);
        return JSON.parse(JSON.stringify(newModule));
    } catch (error) {
        throw new Error("Failed to create module");
        console.log(error);
    }
}

export async function getModuleById(moduleId: string) {
    try {
        const myModule = await Module.findById(moduleId)
            .populate({
                path: "lessonIds",
                model: Lesson,
            })
            .lean();

        return replaceMongoIdInObject(myModule as unknown as IModule);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get module");
    }
}

export async function getModuleBySlug(slug: string) {
    try {
        const moduleData = await Module.findOne({
            slug
        }).lean();
        if (!moduleData) {
            console.log(`module not found with ID: ${slug}`);
        }
        return replaceMongoIdInObject(JSON.parse(JSON.stringify(moduleData)));
    } catch (error) {
        console.error(error);
    }
}