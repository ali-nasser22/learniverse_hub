import React from "react";
import Image from "next/image";
import Link from "next/link";
import {formatPrice} from "@/lib/formatPrice";
import {BookOpen} from "lucide-react";
import {ICourse} from "../../../../../model/course-model";
import EnrollCourse from "@/components/enroll-course";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {hasEnrollmentForCourse} from "../../../../../queries/enrollement";
import {Badge} from "@/components/ui/badge";

interface CourseCardProps {
    course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = async ({course}) => {
    const loggedInUser = await getLoggedInUser();
    const isEnrolled = await hasEnrollmentForCourse(loggedInUser?.id, course.id!);
    return (
        <div>
            <Link key={course.id as string} href={`/courses/${course.id}`}>
                <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image
                            src={course?.thumbnail as string}
                            alt={"course"}
                            className="object-cover"
                            fill
                        />
                    </div>
                    <div className="flex flex-col pt-2">
                        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                            {course?.title}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {course?.category?.title}
                        </p>
                        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-1 text-slate-500">
                                <div>
                                    <BookOpen className="w-4"/>
                                </div>
                                <span>{course?.modules?.length} Chapters</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(course?.price)}
                        </p>
                        {isEnrolled ? <Badge>Already Enrolled In Course</Badge> : (
                            <EnrollCourse asLink={true} courseId={course?.id}/>)}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CourseCard;
