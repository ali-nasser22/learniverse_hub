import {AccordionContent} from "@/components/ui/accordion";
import {SidebarLessonItems} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-lesson-items";
import {ILesson} from "../../../../../../../model/lesson-model";

interface IProps {
    lessonsData: ILesson[]
}

export const SidebarLessons = ({lessonsData}: IProps) => {
    return (

        lessonsData.map((lesson: ILesson, index) => (
            <AccordionContent key={index}>
                <div className="flex flex-col w-full gap-3">
                    <SidebarLessonItems lessonData={lesson} key={lesson.id}/>
                </div>
            </AccordionContent>
        ))


    )
}