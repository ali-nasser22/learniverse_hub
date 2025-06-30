"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course, ICourse } from "../../../model/course-model";
import { createCourse } from "../../../queries/courses";
import { UpdateQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { deleteModule } from "./module";
import { Module } from "../../../model/module-model";
import { deleteLesson } from "./lesson";
import { Lesson } from "../../../model/lesson-model";

export async function createNewCourse(data: ICourse) {
  try {
    const user = await getLoggedInUser();
    data.instructor = user?.id;
    const newCourse = await createCourse(data);
    return newCourse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create course");
  }
}

export async function updateCourse(courseId: string, data: unknown) {
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      data as unknown as UpdateQuery<ICourse>
    );
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update course");
  }
}
export async function deleteCourse(courseId: string) {
  try {
    const modules = await Module.find({ course: courseId });
    await Promise.all(
      modules.map((module) => deleteModule(module?.id as string))
    );
    const lessons = await Lesson.find({
      moduleId: { $in: modules.map((module) => module?.id) },
    });
    await Promise.all(
      lessons.map((lesson) =>
        deleteLesson(lesson?.id as string, lesson?.module as string)
      )
    );
    const course = await Course.findByIdAndDelete(courseId);
    revalidatePath(`/dashboard/courses/${course?.id}`);
    revalidatePath(`/dashboard/courses`);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete course");
  }
}
