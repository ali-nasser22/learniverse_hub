import {Separator} from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import {getCourseById} from "../../../../../../queries/courses";
import {replaceMongoIdInArray, replaceMongoIdInObject} from "@/lib/convertData";
import {ICourse} from "../../../../../../model/course-model";
import {IModule} from "../../../../../../model/module-model";
import {getLessonBySlug} from "../../../../../../queries/lessons";
import {ILesson} from "../../../../../../model/lesson-model";
import {LessonVideo} from "@/app/(main)/courses/[id]/lesson/_components/lesson-video";
import {getAllLivesForUser} from "../../../../../../queries/lives";
import Link from "next/link";

interface IProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ name: string, module: string }>;
}


const Course = async ({params, searchParams}: IProps) => {
    const resolvedParams = await params; //course id
    const otherParams = await searchParams; // lesson slug and module slug
    const course = await getCourseById(resolvedParams.id) as ICourse;
    const allModules = replaceMongoIdInArray(course?.modules)
        .sort((a, b) => a.order - b.order) as unknown as IModule[];
    const defaultLesson = replaceMongoIdInObject(allModules[0]?.lessonIds
        ?.sort((a, b) => a.order - b.order)[0]) as unknown as ILesson;
    const lessonToPlay = otherParams.name ? await getLessonBySlug(otherParams?.name) as unknown as ILesson : defaultLesson;
    const defaultModule = otherParams.module ?? allModules[0].slug;
    const livesData = await getAllLivesForUser(course?.instructor?._id.toString());
    const lives = livesData?.filter((live) => new Date(live?.schedule) > new Date());
    return (
        <div>
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4 w-full">
                    <LessonVideo courseId={resolvedParams.id} lesson={lessonToPlay} module={defaultModule}/>
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">{lessonToPlay.title}</h2>
                    </div>
                    <Separator/>
                    <VideoDescription description={lessonToPlay.description}/>
                </div>
                {
                    lives && lives.length > 0 ? (
                        <>
                            <Separator className='mt-6'/>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-6">
                                {lives.map((live, index) => (
                                    <div
                                        key={live?.id || index}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {live?.title}
                                            </h3>

                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {live?.description}
                                            </p>

                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                {new Date(live?.schedule).toLocaleString('en-US', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </div>

                                            <Link
                                                href={live?.liveUrl}
                                                className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                                            >
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                                                </svg>
                                                Join Live Stream
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <Separator className='mt-6'/>
                            <div className="text-center py-12 mt-6">
                                <p className="text-gray-500 text-lg">No upcoming live events</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Course;
