import {SectionTitle} from "@/components/section-title";
import {Button} from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";

import {ArrowRight, BookOpen} from "lucide-react";
import {formatPrice} from "@/lib/formatPrice";
import {getCourseById, getCoursesByCategory} from "../../../../../../queries/courses";
import {ICourse} from "../../../../../../model/course-model";

interface IProps {
    params: Promise<{ id: string }>
}

const RelatedCourses = async ({params}: IProps) => {
    const {id} = await params;
    const course = await getCourseById(id) as unknown as ICourse;
    const categoryCourses = await getCoursesByCategory(course?.category?._id.toString());
    const coursesToShow = categoryCourses.filter((course) => course.id !== id);
    if (coursesToShow.length === 0) {
        return;
    }
    return (
        <section className="px-4 mx-6">
            <div className="container px-4 md:px-6 lg:px-8 py-8">
                <SectionTitle className="mb-6">Related Courses</SectionTitle>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-2xl:w-[90%] w-full mx-auto"
                >
                    <CarouselContent>
                        {coursesToShow.map((course) => (
                            <CarouselItem
                                key={course.id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <Link href={`/courses/${course.id}`}>
                                    <div
                                        className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                                            <Image
                                                src={course.thumbnail || "/assets/images/courses/course_1.png"}
                                                alt={course.title}
                                                className="object-cover"
                                                fill
                                            />
                                        </div>
                                        <div className="flex flex-col pt-2">
                                            <div
                                                className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                                                {course.title}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {course.category?.name || "Uncategorized"}
                                            </p>
                                            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                                                <div className="flex items-center gap-x-1 text-slate-500">
                                                    <div>
                                                        <BookOpen className="w-4"/>
                                                    </div>
                                                    <span>{course.modules?.length || 0} Chapters</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <p className="text-md md:text-sm font-medium text-slate-700">
                                                    {formatPrice(course.price)}
                                                </p>

                                                <Button
                                                    variant="ghost"
                                                    className="text-xs text-sky-700 h-7 gap-1"
                                                >
                                                    Enroll
                                                    <ArrowRight className="w-3"/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-12"/>
                    <CarouselNext className="-right-12"/>
                </Carousel>
            </div>
        </section>
    );
};

export default RelatedCourses;