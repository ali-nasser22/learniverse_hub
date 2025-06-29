"use server";

import { Module } from "../../../model/module-model";
import { createLesson } from "../../../queries/lessons";

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
