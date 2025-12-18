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
import {getReport} from "../../../../../../../queries/reports";
import Quiz from "./quiz";
import {getQuizSetById} from "../../../../../../../queries/quizsets";
import AlertBanner from "@/components/banner";
import {serializeDocuments} from "@/lib/serialize";

interface IProps {
    courseId: string;
    isEnrolled: boolean;

}

export const CourseSidebar = async ({courseId, isEnrolled}: IProps) => {

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
                        lesson.status = 'completed';
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

    const report = await getReport({
        course: courseId,
        student: loggedInUser?.id,
    });
    const totalModulesCompleted = report?.totalCompletedModules?.length ?? 0;
    const progressPercentage = Math.round((totalModulesCompleted / courseModules?.length) * 100);
    const quizSet = course?.quizSet;
    const quizSetData = await getQuizSetById(quizSet?.toString() ?? '');
    const isQuizCompleted = !!report?.quizAssessment;
    const transformedQuizSet = {
        title: quizSetData.title,
        description: quizSetData.description,
        slug: quizSetData.slug,
        id: quizSetData.id,
        active: quizSetData.active,
        quizIds: serializeDocuments(quizSetData?.quizIds)
    }
    console.log(transformedQuizSet)
    return (
        <>
            <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
                <div className="p-8 flex flex-col border-b">
                    <h1 className="font-semibold">{course?.title}</h1>
                    {/* Check purchase */}
                    {
                        <div className="mt-10">
                            <CourseProgress variant={progressPercentage === 100 ? 'success' : 'default'}
                                            value={progressPercentage}/>
                        </div>
                    }
                </div>
                <SidebarModules isEnrolled={isEnrolled} courseId={courseId} modules={updatedModules}/>
                <div className="w-full px-4 lg:px-14 pt-10 pb-5 border-t">
                    {(quizSet && progressPercentage === 100) &&
                        <Quiz quizSet={transformedQuizSet} courseId={courseId} isAttempted={isQuizCompleted}/>}
                </div>
                <div className="w-full px-6 pb-10">
                    {(progressPercentage === 100 && loggedInUser) && (
                        <GiveReviewModal courseId={courseId} userId={loggedInUser.id}/>)}
                    {isQuizCompleted && progressPercentage === 100 ? (
                        <DownloadCertificate courseId={courseId} progressPercentage={progressPercentage}/>) : (
                        progressPercentage === 100 && (
                            <AlertBanner label='finish quiz to be able to download certificate' className='mt-4'/>))}
                </div>
            </div>
        </>
    );
};
