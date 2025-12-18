import {AccordionContent} from "@/components/ui/accordion";
import {SidebarLessonItems} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-lesson-items";
import {ILesson} from "../../../../../../../model/lesson-model";


interface IProps {
    lessonsData: ILesson[];
    moduleSlug: string;
    courseId: string;
    isEnrolled: boolean;
}

export const SidebarLessons = ({lessonsData, moduleSlug, courseId, isEnrolled}: IProps) => {
    const allLessons = lessonsData.sort((a, b) => a.order - b.order)
    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                {
                    allLessons.map((lesson) => (
                        <SidebarLessonItems isEnrolled={isEnrolled} lessonData={lesson} key={lesson.id}
                                            moduleSlug={moduleSlug}
                                            courseId={courseId}/>
                    ))
                }
            </div>
        </AccordionContent>
    )
}