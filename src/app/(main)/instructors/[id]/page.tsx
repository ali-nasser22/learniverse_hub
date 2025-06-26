import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import {
  ArrowRight,
  BookOpen,
  MessageSquare,
  Presentation,
  Star,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUserById } from "../../../../../queries/users";
import {
  getCourseDetailsByInstructor,
  getCoursesByInstructor,
} from "../../../../../queries/courses";

interface InstructorProfileProps {
  params: Promise<{
    id: string;
  }>;
}

const InstructorProfile = async ({ params }: InstructorProfileProps) => {
  const { id: instructorId } = await params;
  const instructor = await getUserById(instructorId);
  const courseDetails = await getCourseDetailsByInstructor(instructorId);
  const instructorCourses = await getCoursesByInstructor(instructorId);

  return (
    <section id="instructor-profile" className="space-y-6 py-6 lg:py-23 mx-12 ">
      <div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
        {/* Instructor Info */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gray-100 rounded-2xl p-6 shadow">
            <div className="mb-6">
              <div className="w-36 h-36 rounded-full mb-5 mx-auto overflow-hidden">
                <Image
                  src={
                    instructor?.profilePicture ||
                    "/assets/images/default-avatar.jpg"
                  }
                  alt={`${instructor?.firstName} ${instructor?.lastName} Profile`}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover rounded"
                  priority
                />
              </div>

              <div>
                <h4 className="text-xl lg:text-2xl text-center">
                  {`${instructor?.firstName} ${instructor?.lastName}`}
                </h4>
                <div className="text-gray-600 font-medium mb-6 text-sm text-center">
                  {instructor?.designation}
                </div>
                <ul className="items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
                  <li className="flex items-center space-x-3">
                    <Presentation className="text-gray-600 w-4" />
                    <div>{courseDetails?.courses || 0}+ Courses</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <UsersRound className="text-gray-600 w-4" />
                    <div>{courseDetails?.enrollments || 0}+ Students</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MessageSquare className="text-gray-600 w-4" />
                    <div>{courseDetails?.reviews || 0}+ Reviews</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="text-gray-600 w-4" />
                    <div>{courseDetails?.rating || 0} Average Rating</div>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-[1.8] text-justify">
              {instructor?.bio || "No bio available."}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="col-span-12 lg:col-span-8">
          <div>
            <SectionTitle className="mb-6">Courses</SectionTitle>
            {instructorCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {instructorCourses.map((course) => {
                  return (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                          <Image
                            src={`/assets/images/courses/${course.thumbnail}`}
                            alt={course.title}
                            className="object-cover"
                            width={486}
                            height={273}
                            priority
                          />
                        </div>
                        <div className="flex flex-col pt-2">
                          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
                            {course.title}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {course.category?.title || "General"}
                          </p>
                          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                            <div className="flex items-center gap-x-1 text-slate-500">
                              <div>
                                <BookOpen className="w-4" />
                              </div>
                              <span>{course.modules?.length || 0} Modules</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <p className="text-md md:text-sm font-medium text-slate-700">
                              {course.price
                                ? formatPrice(course.price)
                                : "Free"}
                            </p>

                            <Button
                              variant="ghost"
                              className="text-xs text-sky-700 h-7 gap-1"
                            >
                              Enroll
                              <ArrowRight className="w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No courses available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorProfile;
