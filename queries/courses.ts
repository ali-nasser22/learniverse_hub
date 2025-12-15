import {Course, ICourse} from "../model/course-model";
import {Category} from "../model/category-model";
import {User} from "../model/user-model";
import {Testimonial} from "../model/testimonial-model";
import {Module} from "../model/module-model";
import {replaceMongoIdInArray, replaceMongoIdInObject,} from "@/lib/convertData";
import {getAllEnrollments, getEnrollmentsForCourse} from "./enrollement";
import {getTestimonialsForCourse} from "./testimonials";
import {Lesson} from "../model/lesson-model";

//import CoursesPage from "@/app/(main)/courses/CoursesPageClient";

function groupBy<T>(array: T[], keyGetter: (item: T) => string) {
    return array.reduce(
        (acc, item) => {
            const groupKey = keyGetter(item);
            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(item);
            return acc;
        },
        {} as Record<string, T[]>
    );
}

export async function getCourseList(shownOnHome?: boolean, nbOfCourses = 3) {
    const courses = shownOnHome ? await Course.find({
        active: true,
        shownOnHome: true,
    }).select([
        "title",
        "subtitle",
        "thumbnail",
        "price",
        "modules",
        "category",
        "instructor",
        "shownOnHome",
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
        }).limit(nbOfCourses)
        .lean() : await Course.find({
        active: true,
    })
        .select([
            "title",
            "subtitle",
            "thumbnail",
            "price",
            "modules",
            "category",
            "instructor",
            "shownOnHome",
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
            populate: {
                path: "lessonIds",
                model: Lesson
            },
        })
        .lean();
    return replaceMongoIdInObject(course as unknown as ICourse);
}

export async function getCourseDetailsByInstructor(
    instructorId: string,
    expand = false
) {
    const courses = await Course.find({
        instructor: instructorId,
    }).lean();
    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course?._id.toString());
            return enrollment;
        })
    );
    // Group enrollments by course
    const groupByCourse = groupBy(enrollments.flat(), (item) => item.course);

    // calculate total revenue
    const totalRevenue = courses.reduce((acc, course) => {
        const courseEnrollments = groupByCourse[course._id.toString()] || [];
        return acc + courseEnrollments.length * course.price;
    }, 0);

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
    if (expand) {
        return {
            courses: courses?.flat(),
            enrollments: enrollments?.flat(),
            reviews: testimonials?.flat(),
        };
    }
    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials,
        rating: averageRating.toPrecision(2),
        revenue: totalRevenue * 0.9,
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

export async function createCourse(course: ICourse) {
    try {
        const newCourse = await Course.create(course);
        return JSON.stringify(newCourse);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create course");
    }
}

export async function getCoursesByCategory(categoryId: string) {
    try {
        const courses = await Course.find({
            category: categoryId,
            active: true,
        }).lean();
        return replaceMongoIdInArray(courses);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find courses");
    }
}

export async function getBestSellerCourseForTheMonth() {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    try {
        const enrollments = await getAllEnrollments();
        const enrollmentDates = enrollments.filter((enrollment) => {
            const enrollmentDate = new Date(enrollment?.enrollment_date);
            return enrollmentDate.getMonth() === thisMonth && enrollmentDate.getFullYear() === thisYear;
        })
        const enrollmentsMap = new Map<ICourse, number>();

        enrollmentDates.forEach((enrollment) => {
            if (!enrollmentsMap.has(enrollment.course)) {
                enrollmentsMap.set(enrollment.course, 1);
            } else {
                const currentCount = enrollmentsMap.get(enrollment.course) ?? 0;
                enrollmentsMap.set(enrollment.course, currentCount + 1);
            }
        })

        let bestSellerCourseId = null;
        let maxEnrollments = 0;

        for (const [course, count] of enrollmentsMap.entries()) {
            if (count > maxEnrollments) {
                maxEnrollments = count;
                bestSellerCourseId = course
            }
        }
        const bestSellerCourse = bestSellerCourseId ? bestSellerCourseId : null;
        if (bestSellerCourse) {
            const course = await getCourseById(bestSellerCourseId.toString()!);
            return {
                course,
                totalEnrollments: maxEnrollments,
            }
        }
        return {
            course: {
                title: 'No Course Was Sold This Month',
            },
            totalEnrollments: 0
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}
