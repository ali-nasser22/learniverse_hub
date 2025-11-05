import {VideoPlayer} from "./_components/video-player";
import {Separator} from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import {getCourseById} from "../../../../../../queries/courses";
import {replaceMongoIdInArray, replaceMongoIdInObject} from "@/lib/convertData";
import {ICourse} from "../../../../../../model/course-model";
import {IModule} from "../../../../../../model/module-model";
import {getLessonBySlug} from "../../../../../../queries/lessons";
import {ILesson} from "../../../../../../model/lesson-model";

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
    console.log(defaultModule);
    return (
        <div>
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4 w-full">
                    <VideoPlayer videoUrl={lessonToPlay.video_url}/>
                </div>
                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">{lessonToPlay.title}</h2>
                    </div>
                    <Separator/>
                    <VideoDescription description={lessonToPlay.description}/>
                </div>
            </div>
        </div>
    );
};

export default Course;
