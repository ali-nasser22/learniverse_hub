import Element from "@/components/element";
import {SectionTitle} from "@/components/section-title";
import Support from "@/components/support";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ArrowRightIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {getCourseList} from "../../../queries/courses";
import CourseCard from "./courses/_components/CourseCard";
import {ICourse} from "../../../model/course-model";
import {getCategoryList} from "../../../queries/categories";
import React from "react";

const HomePage: React.FC = async () => {
    const courses = await getCourseList(true);
    const categories = await getCategoryList();
    return (
        <div className="min-h-screen flex flex-col items-center w-full">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 grainy w-full">
                <div
                    className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative isolate mx-auto">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <span className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium border shadow-lg">
            Hey, Welcome
          </span>
                    <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Learn By Doing with <br/>{" "}
                        <span className="text-6xl font-bold">Learniverse Hub</span>
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        &quot;You don&apos;t understand anything until you learn it more
                        than one way.&quot;
                    </p>
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        <Link
                            href="/courses"
                            className={cn(buttonVariants({size: "lg"}))}
                        >
                            Explore Now
                        </Link>
                        <Link
                            href="/register/instructor"
                            className={cn(buttonVariants({variant: "outline", size: "lg"}))}
                        >
                            Become An Instructor
                        </Link>
                    </div>
                </div>
            </section>

            <Element/>

            {/* Categories Section */}
            <section
                id="categories"
                className="container max-w-7xl mx-auto space-y-6 py-8 md:py-12 lg:py-24 w-full"
            >
                <div className="flex items-center justify-between">
                    <SectionTitle>Categories</SectionTitle>

                    {/*<Link*/}
                    {/*  href={"/categories"}*/}
                    {/*  className=" text-sm font-medium  hover:opacity-80 flex items-center gap-1"*/}
                    {/*>*/}
                    {/*  Browse All <ArrowRightIcon className="h-4 w-4" />*/}
                    {/*</Link>*/}
                </div>
                <div className="mx-auto grid justify-center gap-4 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                    {categories.map((category) => {
                        return (
                            <Link
                                href={`/categories/${category.id}`}
                                key={category.id}
                                className="relative overflow-hidden rounded-lg border bg-background p-2 hover:scale-105 transition-all duration-500 ease-in-out"
                            >
                                <div className="flex  flex-col gap-4 items-center justify-between rounded-md p-6">
                                    <Image
                                        src={category.thumbnail}
                                        alt={category.title as string}
                                        width={150}
                                        height={150}
                                    />
                                    <h3 className="font-bold">{category.title as string}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Courses */}
            <section
                id="courses"
                className="container max-w-7xl mx-auto space-y-6 md:py-12 lg:py-24 w-full"
            >
                <div className="flex items-center justify-between">
                    <SectionTitle>Courses</SectionTitle>
                    <Link
                        href={"/courses"}
                        className=" text-sm font-medium  hover:opacity-80 flex items-center gap-1"
                    >
                        Browse All <ArrowRightIcon className="h-4 w-4"/>
                    </Link>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                    {courses.map((course) => {
                        return (
                            <CourseCard
                                key={course.id as string}
                                course={course as unknown as ICourse}
                            />
                        );
                    })}
                </div>
            </section>
            <Support/>
        </div>
    );
};
export default HomePage;
