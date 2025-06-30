"use server";

import { UpdateQuery } from "mongoose";
import { Module } from "../../../model/module-model";
import { createLesson } from "../../../queries/lessons";
import { ILesson, Lesson } from "../../../model/lesson-model";
import { revalidatePath } from "next/cache";

export async function createLessonServer(formData: FormData) {
  try {
    const title = formData.get("title");
    const slug = formData.get("slug");
    const order = formData.get("order");
    const moduleId = formData.get("moduleId");
    const createdLesson = await createLesson({
      title: title as string,
      slug: slug as string,
      order: order as unknown as number,
    });
    const myModule = await Module.findById(moduleId);
    myModule.lessonIds.push(createdLesson._id);
    await myModule.save();

    return createdLesson;
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function updateLesson(
  data: unknown,
  lessonId: string,
  moduleId: string
) {
  try {
    const myLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      data as unknown as UpdateQuery<ILesson>
    );
    const myModule = await Module.findById(moduleId);
    revalidatePath(
      `/dashboard/courses/${myModule?.course}/modules/${moduleId}`
    );

    return JSON.parse(JSON.stringify(myLesson));
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function deleteLesson(lessonId: string, moduleId: string) {
  try {
    const myLesson = await Lesson.findByIdAndDelete(lessonId);
    const myModule = await Module.findById(moduleId);
    myModule.lessonIds = myModule.lessonIds.filter(
      (id: string) => id !== lessonId
    );
    await myModule.save();
    revalidatePath(
      `/dashboard/courses/${myModule?.course}/modules/${moduleId}`
    );
    return JSON.parse(JSON.stringify(myLesson));
  } catch (error) {
    throw new Error(error as string);
  }
}
