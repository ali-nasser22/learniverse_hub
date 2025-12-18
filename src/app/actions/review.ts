'use server'
import {Testimonial} from "../../../model/testimonial-model";
import {Course} from "../../../model/course-model";
import {revalidatePath} from "next/cache";

export async function addReview(userId: string, courseId: string, rating: number, content: string) {
    try {
        const testimonial = await Testimonial.create({
            user: userId,
            courseId,
            rating,
            content
        });

        await Course.findByIdAndUpdate(courseId, {
            $push: {testimonials: testimonial._id}
        });

        revalidatePath(`/courses/${courseId}`);
    } catch (error) {
        console.log(error);
        throw new Error('error adding review');
    }
}

export async function updateReview(reviewId: string, rating: number, content: string) {
    try {
        await Testimonial.findByIdAndUpdate(reviewId, {
            rating,
            content,
        });
        revalidatePath('/courses');
    } catch (error) {
        console.log(error);
        throw new Error('error updating review');
    }
}

export async function deleteReview(reviewId: string, courseId: string) {
    try {
        await Testimonial.findByIdAndDelete(reviewId);

        await Course.findByIdAndUpdate(courseId, {
            $pull: {testimonials: reviewId}
        });

        revalidatePath('/courses');
    } catch (error) {
        console.log(error);
        throw new Error('error deleting review');
    }
}