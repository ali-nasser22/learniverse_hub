import {getCoursesByCategory} from "../../../../../queries/courses";
import {ICourse} from "../../../../../model/course-model";
import {getCategoryById} from "../../../../../queries/categories";
import {ICategory} from "../../../../../model/category-model";
import CourseCard from "@/app/(main)/courses/_components/CourseCard";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

interface IProps {
    params: Promise<{ id: string }>
}

export default async function Page({params}: IProps) {
    const resolvedParams = await params;
    const courses = await getCoursesByCategory(resolvedParams.id) as unknown as ICourse[];
    const category = await getCategoryById(resolvedParams.id) as unknown as ICategory;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {category?.title}
                </h1>
                <Separator/>
                {category?.description && (
                    <p className="text-gray-600 text-lg">
                        {category.description}
                    </p>
                )}
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
                    </span>
                </div>
            </div>

            {/* Courses Grid or Empty State */}
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="bg-gray-50 rounded-full p-6 mb-4">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Courses Available
                    </h3>
                    <p className="text-gray-600 text-center max-w-md mb-6">
                        There are currently no courses in this category. Check back later for new content!
                    </p>
                    <Link
                        href="/courses"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Browse All Courses
                    </Link>
                </div>
            )}
        </div>
    );
}