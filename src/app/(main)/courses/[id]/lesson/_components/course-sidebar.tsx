"use client";
import {CourseProgress} from "@/components/course-progress";
import {DownloadCertificate} from "@/app/(main)/courses/[id]/lesson/_components/download-certificate";
import {GiveReviewModal} from "@/app/(main)/courses/[id]/lesson/_components/give-review";
import {SidebarModules} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-modules";

export const CourseSidebar = () => {


    return (
        <>
            <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
                <div className="p-8 flex flex-col border-b">
                    <h1 className="font-semibold">Reactive Accelerator</h1>
                    {/* Check purchase */}
                    {
                        <div className="mt-10">
                            <CourseProgress variant="default" value={80}/>
                        </div>
                    }
                </div>
                <SidebarModules/>
                <div className="w-full px-6">
                    <GiveReviewModal/>
                    <DownloadCertificate/>
                </div>
            </div>
        </>
    );
};
