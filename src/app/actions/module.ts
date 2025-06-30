"use server";

import { createModule } from "../../../queries/modules";
import { Types, UpdateQuery } from "mongoose";
import { Course } from "../../../model/course-model";
import { revalidatePath } from "next/cache";
import { IModule, Module } from "../../../model/module-model";

export async function createNewModule(formData: FormData) {
  try {
    const title = formData.get("title");
    const slug = formData.get("slug");
    const courseId = formData.get("courseId");
    const order = formData.get("order");

    const createdModule = await createModule({
      title: title as string,
      slug: slug as string,
      course: courseId as unknown as Types.ObjectId,
      order: order as unknown as number,
    });
    const course = await Course.findById(courseId);
    course.modules.push(createdModule._id);
    await course.save();

    return createdModule;
  } catch (error) {
    throw new Error(error as string);
  }
}

interface UpdateData {
  id: string;
  position: number;
}

export async function reorderModules(
  courseId: string,
  updateData: UpdateData[]
) {
  try {
    // Update each module's order in the database
    const updatePromises = updateData.map(({ id, position }) =>
      Module.findByIdAndUpdate(id, { order: position })
    );

    await Promise.all(updatePromises);

    // Revalidate the course page
    revalidatePath(`/dashboard/courses/${courseId}`);

    return { success: true };
  } catch (error) {
    console.error("Error reordering modules:", error);
    throw new Error("Failed to reorder modules");
  }
}
export async function updateModule(data: unknown, moduleId: string) {
  try {
    const myModule = await Module.findByIdAndUpdate(
      moduleId,
      data as unknown as UpdateQuery<IModule>
    );
    return JSON.parse(JSON.stringify(myModule));
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function deleteModule(moduleId: string) {
  try {
    const myModule = await Module.findByIdAndDelete(moduleId);
    const myCourse = await Course.findById(myModule?.course);
    myCourse.modules = myCourse.modules.filter((id: string) => id !== moduleId);
    await myCourse.save();
    revalidatePath(`/dashboard/courses/${myCourse?.id}`);
    return JSON.parse(JSON.stringify(myModule));
  } catch (error) {
    throw new Error(error as string);
  }
}
