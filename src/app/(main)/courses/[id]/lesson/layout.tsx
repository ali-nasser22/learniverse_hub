import {CourseSidebarMobile} from "./_components/course-sidebar-mobile";
import {CourseSidebar} from "./_components/course-sidebar";
import React from "react";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {hasEnrollmentForCourse} from "../../../../../../queries/enrollement";
import {redirect} from "next/navigation";

interface CourseLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>
}

const CourseLayout = async ({children, params}: CourseLayoutProps) => {

    const resolvedParams = await params;
    const loggedInUser = await getLoggedInUser();
    const userId: string = loggedInUser?.id;
    if (!loggedInUser) {
        redirect('/login');
    }
    const enrollment = await hasEnrollmentForCourse(userId, resolvedParams.id);
    const isEnrolled = !!enrollment;
    return (
        <div className="">
            <div className="h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10">
                <div className="flex lg:hidden p-4 border-b h-full items-center bg-white shadow-sm relative">
                    {/* Course Sidebar For Mobile */}
                    <CourseSidebarMobile isEnrolled={isEnrolled} courseId={resolvedParams.id}/>
                    {/* <NavbarRoutes /> */}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
                    {/* sidebar starts */}
                    <CourseSidebar isEnrolled={isEnrolled} courseId={resolvedParams.id}/>
                    {/* sidebar ends */}
                </div>
                <main className="lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default CourseLayout;
