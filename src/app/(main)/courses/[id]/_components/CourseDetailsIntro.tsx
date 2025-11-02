import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import {getCourseById} from "../../../../../../queries/courses";
import {formatPrice} from "@/lib/formatPrice";
import EnrollCourse from "@/components/enroll-course";
import {auth} from "../../../../../../auth";
import {getUserByEmail} from "../../../../../../queries/users";
import {hasEnrollmentForCourse} from "../../../../../../queries/enrollement";


interface CourseDetailsIntroProps {
    params: Promise<{ id: string }>;
}

const CourseDetailsIntro = async ({params}: CourseDetailsIntroProps) => {

    const session = await auth();
    const loggedInUser = await getUserByEmail(session?.user?.email || '');


    try {
        const resolvedParams = await params;
        const isEnrolled = await hasEnrollmentForCourse(loggedInUser?.id, resolvedParams.id);
        if (!resolvedParams?.id) {
            console.error("No course ID provided");
            return (
                <div className="overflow-x-hidden grainy">
                    <section className="pt-12 sm:pt-16">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="max-w-2xl mx-auto text-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Invalid Course URL
                                </h1>
                                <p className="mt-4 text-gray-600">
                                    The course URL is not valid.
                                </p>
                                <Link
                                    href="/courses"
                                    className={cn(buttonVariants({size: "lg"}), "mt-6")}
                                >
                                    Browse All Courses
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        const courseData = await getCourseById(resolvedParams.id);

        if (!courseData) {
            console.warn("Course not found for ID:", resolvedParams.id);
            return (
                <div className="overflow-x-hidden grainy">
                    <section className="pt-12 sm:pt-16">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="max-w-2xl mx-auto text-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Course Not Found
                                </h1>
                                <p className="mt-4 text-gray-600">
                                    The course you&apos;re looking for doesn&apos;t exist or has
                                    been removed.
                                </p>
                                <Link
                                    href="/courses"
                                    className={cn(buttonVariants({size: "lg"}), "mt-6")}
                                >
                                    Browse All Courses
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }

        // Handle array vs single object
        const course = Array.isArray(courseData) ? courseData[0] : courseData;

        if (!course) {
            return (
                <div className="overflow-x-hidden grainy">
                    <section className="pt-12 sm:pt-16">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="max-w-2xl mx-auto text-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Course Not Available
                                </h1>
                                <p className="mt-4 text-gray-600">
                                    This course is currently not available.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }


        return (
            <div className="overflow-x-hidden grainy">
                <section className="pt-12 sm:pt-16">
                    <div className="">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="max-w-2xl mx-auto text-center">
                                <h1 className="px-6 text-lg text-gray-600 font-inter">
                                    {course.title || "Course Title Not Available"}
                                </h1>
                                <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                  <span className="relative inline-flex sm:inline">
                    <span
                        className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                    <span className="relative">
                      {course.subtitle || "Reactive Accelerator"}
                    </span>
                  </span>
                                </p>

                                {isEnrolled ?
                                    <Link href={`/courses/${resolvedParams.id}/lesson`}><Button className="mt-6">Access
                                        Course</Button></Link> :
                                    <div className="mt-6 flex items-center justify-center flex-wrap gap-3">
                                        <EnrollCourse asLink={false} courseId={course.id}/>
                                        <Link
                                            href={`/courses/${resolvedParams.id}/preview`}
                                            className={cn(
                                                buttonVariants({variant: "outline", size: "lg"})
                                            )}
                                        >
                                            See Intro
                                        </Link>
                                        <Button
                                            className={cn(
                                                buttonVariants({variant: "destructive", size: "lg"})
                                            )}
                                        >
                                            Price: {formatPrice(course?.price)}
                                        </Button>
                                    </div>}
                            </div>
                        </div>

                        <div className="pb-12 mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 h-2/3"></div>
                                <div className="relative mx-auto">
                                    <div className="lg:max-w-3xl lg:mx-auto">
                                        <Image
                                            className="w-full rounded-lg"
                                            width={768}
                                            height={463}
                                            src={`${course.thumbnail}`}
                                            alt={course.title || "Course thumbnail"}
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error("Error loading course:", error);

        return (
            <div className="overflow-x-hidden grainy">
                <section className="pt-12 sm:pt-16">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h1 className="text-2xl font-bold text-red-600">
                                Error Loading Course
                            </h1>
                            <p className="mt-4 text-gray-600">
                                An error occurred while loading the course. Please try again
                                later.
                            </p>
                            <Link
                                href="/courses"
                                className={cn(buttonVariants({size: "lg"}), "mt-6")}
                            >
                                Browse All Courses
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default CourseDetailsIntro;
