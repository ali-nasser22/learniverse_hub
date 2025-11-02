import {AccordionContent} from "@/components/ui/accordion";
import {SidebarLessonItems} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-lesson-items";

export const SidebarLessons = () => {

    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
                <SidebarLessonItems/>
            </div>
        </AccordionContent>
    )
}