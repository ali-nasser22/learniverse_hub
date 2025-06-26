import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import { auth } from "../../../auth";
import { getUserByEmail } from "../../../queries/users";
import { getCourseDetailsByInstructor } from "../../../queries/courses";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const loggedInInstructor = await auth();
  if (!loggedInInstructor) {
    redirect("/login");
  }
  const instructor = await getUserByEmail(
    loggedInInstructor?.user?.email as string
  );

  if (instructor?.role !== "INSTRUCTOR") {
    redirect("/");
  }
  const coursesStats = await getCourseDetailsByInstructor(
    instructor.id as string
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-mono py-6">
        Hello Mr. {instructor?.firstName} {instructor?.lastName}
      </h1>{" "}
      <p className="text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        Manage your courses, enrollments, and revenue here.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* total courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesStats?.courses}</div>
          </CardContent>
        </Card>
        {/* total enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {coursesStats?.enrollments}
            </div>
          </CardContent>
        </Card>
        {/* total revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(coursesStats?.revenue)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
