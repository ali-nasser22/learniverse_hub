"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course, ICourse } from "../../../model/course-model";
import { createCourse } from "../../../queries/courses";


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
     await Course.findByIdAndUpdate(courseId, data as ICourse);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update course");
  }
}
