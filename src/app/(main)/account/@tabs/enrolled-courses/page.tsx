import EnrolledCourseCard from "../../_component/enrolled-coursecard";
import {auth} from "../../../../../../auth";
import {getUserByEmail} from "../../../../../../queries/users";
import {redirect} from "next/navigation";
import {getEnrolledCoursesForUser} from "../../../../../../queries/enrollement";
import {ICourse} from "../../../../../../model/course-model";
import {IUser} from "../../../../../../model/user-model";
import Link from "next/link";

interface EnrollmentWithCourse {
    id: string;
    course: ICourse;
}

async function EnrolledCourses() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            redirect("/login");
        }

        const user = await getUserByEmail(session.user.email);

        if (!user?.id) {
            console.error("User not found for email:", session.user.email);
            redirect("/login");
        }

        const enrollmentCourses = await getEnrolledCoursesForUser(user.id);

        const validEnrollments =
            enrollmentCourses?.filter(
                (enrollment): enrollment is EnrollmentWithCourse =>
                    enrollment &&
                    enrollment.id &&
                    enrollment.course &&
                    typeof enrollment.course === "object"
            ) || [];

        return (
            <div className="grid sm:grid-cols-2 gap-6 md:pb-23">
                {validEnrollments.length > 0 ? (
                    validEnrollments.map((enrollment) => (
                        <Link href={`/courses/${enrollment.id}/lesson`} key={enrollment.id}>
                            <EnrolledCourseCard
                                key={enrollment.id}
                                course={enrollment.course}
                                student={user as IUser}
                            />
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <div className="text-sm text-muted-foreground">
                            You have not enrolled in any courses yet.
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error loading enrolled courses:", error);

        return (
            <div className="col-span-full text-center py-8">
                <div className="text-sm text-destructive">
                    Something went wrong loading your courses. Please try again later.
                </div>
            </div>
        );
    }
}

export default EnrolledCourses;
