import {getLoggedInUser} from "@/lib/loggedin-user";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatPrice} from "@/lib/formatPrice";
import {getAllUsers} from "../../../../queries/users";
import {getBestSellerCourseForTheMonth, getCourseList} from "../../../../queries/courses";
import {ICourse} from "../../../../model/course-model";
import {getTotalRevenue} from "../../../../queries/revenues";

export default async function AdminDashboard() {
    const loggedInUser = await getLoggedInUser();

    if (!loggedInUser) {
        return redirect("/login");
    }

    if (loggedInUser.role !== "ADMIN") {
        return redirect("/");
    }

    const totalUsers = await getAllUsers();
    const activeCourses = await getCourseList() as ICourse[];
    const revenue = await getTotalRevenue();
    const enrollments = await getBestSellerCourseForTheMonth();

    const platformStats = {
        bestSellerCourse: {
            title: enrollments?.course?.title,
            enrollments: enrollments?.totalEnrollments,
        },
        platformRevenue: +revenue.platform, // 10% platform fee from total revenue
        totalCourses: activeCourses.length,
        totalUsers: totalUsers.length,
        pendingReports: 3,
        instructorPayouts: +revenue?.instructors// 90% share to instructors
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-mono py-6">
                Hello Mr. {loggedInUser?.firstName} {loggedInUser?.lastName}
            </h1>
            <p className="text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
                Here you can manage and oversee your entire platform. Monitor performance, track revenue, and ensure
                everything runs smoothly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Best Seller Course This Month */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Best Seller This Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {platformStats.bestSellerCourse.title}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {platformStats.bestSellerCourse.enrollments} enrollments
                        </p>
                    </CardContent>
                </Card>

                {/* Platform Revenue This Month */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Platform Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(platformStats.platformRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            10% platform fee
                        </p>
                    </CardContent>
                </Card>

                {/* Total Active Courses */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {platformStats.totalCourses}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Published on platform
                        </p>
                    </CardContent>
                </Card>

                {/* Total Users */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {platformStats.totalUsers}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Students & Instructors
                        </p>
                    </CardContent>
                </Card>

                {/* Pending Reports */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {platformStats.pendingReports}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Require attention
                        </p>
                    </CardContent>
                </Card>

                {/* Instructor Payouts This Month */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Instructor Payouts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatPrice(platformStats.instructorPayouts)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            90% revenue share
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}