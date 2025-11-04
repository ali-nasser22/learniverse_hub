import {replaceMongoIdInObject} from "@/lib/convertData";
import {ILesson, Lesson} from "../model/lesson-model";
import mongoose, {isValidObjectId} from "mongoose";

export async function getLessonById(id: string) {
    // Validate the ID first
    if (!id || !isValidObjectId(id)) {
        throw new Error(`Invalid lesson ID: ${id}`);
    }

    const lesson = await Lesson.findById(id).lean();

    if (!lesson) {
        throw new Error(`Lesson not found with ID: ${id}`);
    }

    return replaceMongoIdInObject(lesson as unknown as ILesson);
}

export async function createLesson(data: unknown) {
    try {
        const myLesson = await Lesson.create(data as unknown as ILesson);
        return JSON.parse(JSON.stringify(myLesson));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create lesson");
    }
}

export async function updateLessonStatus(id: string, status: string) {
    try {
        const collection = mongoose.connection.collection('lessons');

        const result = await collection.updateOne(
            {_id: new mongoose.Types.ObjectId(id)},
            {$set: {status: status}}
        );

        if (result.matchedCount === 0) {
            console.log('Lesson not found');
        }

        return {
            success: result.acknowledged,
            modified: result.modifiedCount > 0
        };
    } catch (error) {
        console.error('Error updating lesson status:', error);
        throw error;
    }
}