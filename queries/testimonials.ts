import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "../model/testimonial-model";

export async function getTestimonialsForCourse(id: string) {
  const testimonials = await Testimonial.find({
    courseId: id,
  }).lean();
  return replaceMongoIdInArray(testimonials);
}
