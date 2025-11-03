import {CourseProgress} from "@/components/course-progress";
import {DownloadCertificate} from "@/app/(main)/courses/[id]/lesson/_components/download-certificate";
import {GiveReviewModal} from "@/app/(main)/courses/[id]/lesson/_components/give-review";
import {SidebarModules} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-modules";
import {getCourseById} from "../../../../../../../queries/courses";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {getWatchForUser} from "../../../../../../../queries/watches";
import {IWatch} from "../../../../../../../model/watch-model";
import {replaceMongoIdInArray, replaceMongoIdInObject} from "@/lib/convertData";
import {ILesson} from "../../../../../../../model/lesson-model";
import {IModule} from "../../../../../../../model/module-model";


interface IProps {
    courseId: string;
}

export const CourseSidebar = async ({courseId}: IProps) => {


    const course = await getCourseById(courseId);
    const loggedInUser = await getLoggedInUser();
    const courseModules = replaceMongoIdInArray(course?.modules as unknown as IModule[]);
    const updatedModules = await Promise.all(
        courseModules.map(async module => {
            const moduleId = module.id;
            module.lessonIds?.map(lesson => {
                return replaceMongoIdInObject(lesson as unknown as ILesson)
            })

            const lessons = module.lessonIds!;
            const updatedLessons = await Promise.all(
                lessons.map(async lesson => {
                    const lessonId = lesson._id.toString();
                    const watch = await getWatchForUser(loggedInUser?.id, moduleId, lessonId) as IWatch;
                    if (watch?.status === 'completed') {
                        // @todo
                    }
                    return {
                        lesson: replaceMongoIdInObject(lesson as unknown as ILesson),
                    };
                })
            );
            return {
                moduleId: moduleId,
                lessons: replaceMongoIdInArray(updatedLessons as unknown as ILesson[]),
            };
        }) ?? []
    );
    return (
        <>
            <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
                <div className="p-8 flex flex-col border-b">
                    <h1 className="font-semibold">{course?.title}</h1>
                    {/* Check purchase */}
                    {
                        <div className="mt-10">
                            <CourseProgress variant="default" value={80}/>
                        </div>
                    }
                </div>
                <SidebarModules courseId={courseId} modules={updatedModules}/>
                <div className="w-full px-6">
                    <GiveReviewModal/>
                    <DownloadCertificate/>
                </div>
            </div>
        </>
    );
};
