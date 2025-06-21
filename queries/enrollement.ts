import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "../model/enrollment-model";

export async function getEnrollmentsForCourse(id: string) {
  const enrollments = await Enrollment.find({
    course: id,
  }).lean();
  return replaceMongoIdInArray(enrollments);
}
