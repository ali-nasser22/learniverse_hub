import { replaceMongoIdInObject } from "@/lib/convertData";
import { ILesson, Lesson } from "../model/lesson-model";

export async function getLessonById(id: string) {
  const lesson = await Lesson.findById(id).lean();
  return replaceMongoIdInObject(lesson as unknown as ILesson);
}
