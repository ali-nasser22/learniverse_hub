import {SectionTitle} from "@/components/section-title";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import Image from "next/image";
import {getCourseById} from "../../../../../../queries/courses";

interface TestimonialsProps {
    params: Promise<{ id: string }>;
}

const Testimonials = async ({params}: TestimonialsProps) => {
    const resolvedParams = await params;
    const course = await getCourseById(resolvedParams.id);
    if (!course || !course.testimonials || course.testimonials.length === 0) return null;

    return (
        <section className="pb-8 md:pb-12 lg:pb-24 mx-12">
            <div className="container px-4 md:px-6 lg:px-8">
                <SectionTitle className="mb-6">Reviews</SectionTitle>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="max-2xl:w-[90%] w-full mx-auto"
                >
                    <CarouselPrevious/>
                    <CarouselNext/>
                    <CarouselContent className="py-4">
                        {course.testimonials.map((testimonial, index) => (
                            <CarouselItem
                                key={`testimonial-${index}-${testimonial.id || "no-id"}`}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="sm:break-inside-avoid">
                                    <blockquote className="rounded-lg bg-gray-50 p-6 sm:p-8 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            {testimonial?.user?.profile_picture ? (
                                                <Image
                                                    alt={`${testimonial?.user?.firstName || "User"} ${testimonial?.user?.lastName || ""}`}
                                                    src={testimonial.user.profile_picture}
                                                    width={56}
                                                    height={56}
                                                    className="size-14 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className="size-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-xl">
                                                        {testimonial?.user?.firstName?.[0]?.toUpperCase() || "U"}
                                                    </span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="mt-0.5 text-lg font-medium text-gray-900">
                                                    {testimonial?.user?.firstName || "Anonymous"}{" "}
                                                    {testimonial?.user?.lastName || ""}
                                                </p>
                                                <div className="flex justify-center gap-0.5 text-yellow-600">
                                                    {Array.from({length: testimonial?.rating || 0}).map(
                                                        (_, index) => (
                                                            <svg
                                                                key={index}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                            </svg>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-gray-700">{testimonial?.content || "No review content"}</p>
                                    </blockquote>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;