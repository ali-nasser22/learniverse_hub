import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment, IEnrollment } from "../model/enrollment-model";

export async function getEnrollmentsForCourse(id: string) {
  const enrollments = await Enrollment.find({
    course: id,
  }).lean();
  return replaceMongoIdInArray(enrollments);
}

export async function addEnrollment(enrollment: IEnrollment) {
  // check if the enrollment already exists
  const existingEnrollment = await Enrollment.findOne({
    course: enrollment.course,
    student: enrollment.student,
  });
  if (existingEnrollment) {
    return existingEnrollment;
  }
  const newEnrollment = await Enrollment.create(enrollment);
  return newEnrollment;
}
