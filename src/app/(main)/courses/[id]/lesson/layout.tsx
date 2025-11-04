import {CourseSidebarMobile} from "./_components/course-sidebar-mobile";
import {CourseSidebar} from "./_components/course-sidebar";
import React from "react";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {redirect} from "next/navigation";

interface CourseLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>
}

const CourseLayout = async ({children, params}: CourseLayoutProps) => {

    const resolvedParams = await params;
    const loggedInUser = await getLoggedInUser();
    // const userId: string = loggedInUser?.id;
    if (!loggedInUser) {
        redirect('/login');
    }
    // const isEnrolled = await hasEnrollmentForCourse(userId, resolvedParams.id);
    // if (!isEnrolled) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <div className="text-center">
    //                 <h1 className="text-2xl font-bold">Access Denied</h1>
    //                 <p>You must be enrolled in this course to access this content.</p>
    //                 <div className="mt-4">
    //                     <EnrollCourse asLink={false} courseId={resolvedParams.id}/>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    return (
        <div className="">
            <div className="h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10">
                <div className="flex lg:hidden p-4 border-b h-full items-center bg-white shadow-sm relative">
                    {/* Course Sidebar For Mobile */}
                    <CourseSidebarMobile courseId={resolvedParams.id}/>
                    {/* <NavbarRoutes /> */}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
                    {/* sidebar starts */}
                    <CourseSidebar courseId={resolvedParams.id}/>
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
