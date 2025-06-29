import { replaceMongoIdInObject } from "@/lib/convertData";
import { ILesson, Lesson } from "../model/lesson-model";

export async function getLessonById(id: string) {
  const lesson = await Lesson.findById(id).lean();
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
