'use server'
import {replaceMongoIdInArray} from "@/lib/convertData";
import {Testimonial} from "../model/testimonial-model";

export async function getTestimonialsForCourse(id: string) {
    const testimonials = await Testimonial.find({
        courseId: id,
    }).lean();
    return replaceMongoIdInArray(testimonials);
}


export async function getTestimonialForUser(userId: string, courseId: string) {
    const testimonial = await Testimonial.findOne({
        courseId,
        user: userId
    }).lean();

    if (!testimonial) {
        return null;
    }

    return {
        id: testimonial._id.toString(),
        rating: testimonial.rating,
        review: testimonial.content,
        user: testimonial.user.toString(),
        courseId: testimonial.courseId.toString(),
    };
}