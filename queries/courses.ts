import { Course, ICourse } from "../model/course-model";
import { Category } from "../model/category-model";
import { User } from "../model/user-model";
import { Testimonial } from "../model/testimonial-model";
import { Module } from "../model/module-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { getEnrollmentsForCourse } from "./enrollement";
import { getTestimonialsForCourse } from "./testimonials";
//import CoursesPage from "@/app/(main)/courses/CoursesPageClient";

export async function getCourseList() {
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "price",
      "modules",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}
export async function getCourseById(id: string) {
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInObject(course as unknown as ICourse);
}

export async function getCourseDetailsByInstructor(instructorId: string) {
  const courses = await Course.find({
    instructor: instructorId,
  }).lean();
  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(
        course?._id.toString() as string
      );
      return enrollment;
    })
  );
  const totalEnrollments = enrollments.reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonials = await getTestimonialsForCourse(
        course?._id.toString() as string
      );
      return testimonials;
    })
  );
  const totalTestimonials = testimonials.flat().length;
  const averageRating =
    testimonials.flat().reduce((acc, curr) => acc + curr.rating, 0) /
    totalTestimonials;
  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials,
    rating: averageRating.toPrecision(2),
  };
}

export async function getCoursesByInstructor(instructorId: string) {
  try {
    const courses = await Course.find({
      instructor: instructorId,
    })
      .populate({
        path: "category",
        model: Category,
      })
      .lean();
    return replaceMongoIdInArray(courses);
  } catch (error) {
    console.error(error);
    return [];
  }
}
