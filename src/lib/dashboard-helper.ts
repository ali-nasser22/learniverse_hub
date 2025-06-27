import { auth } from "../../auth";
import { getCourseDetailsByInstructor } from "../../queries/courses";
import { getUserByEmail } from "../../queries/users";

export async function getInstructorDashboardData() {
  try {
    const session = await auth();
    const instructor = await getUserByEmail(session?.user?.email as string);
    if (!instructor) throw new Error("Instructor not found");
    const courseDetails = await getCourseDetailsByInstructor(
      instructor?.id as string,
      true
    );
    return {
      courseDetails: courseDetails,
      instructor: instructor,
    };
  } catch (error) {
    console.error("Error fetching instructor dashboard data:", error);
  }
}
