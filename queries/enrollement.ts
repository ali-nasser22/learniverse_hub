import {replaceMongoIdInArray} from "@/lib/convertData";
import {Enrollment, IEnrollment} from "../model/enrollment-model";
import {Course} from "../model/course-model";

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

export async function getEnrolledCoursesForUser(userId: string) {
    try {
        const enrollments = await Enrollment.find({
            student: userId,
        })
            .populate({
                path: "course",
                model: Course,
            })
            .lean();
        return replaceMongoIdInArray(enrollments);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function hasEnrollmentForCourse(userId: string, courseId: string) {
    try {
        return await Enrollment.findOne({
            course: courseId,
            student: userId,
        }).populate({
            path: "course",
            model: Course
        })
            .lean();

    } catch (error) {
        console.error(error);
        return false;
    }
}
