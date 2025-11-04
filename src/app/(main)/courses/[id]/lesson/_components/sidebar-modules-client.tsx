"use client"

import {useSearchParams} from "next/navigation";
import {Accordion, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {SidebarLessons} from "./sidebar-lessons";
import {ILesson} from "../../../../../../../model/lesson-model";
import {IModule} from "../../../../../../../model/module-model";

interface IProps {
    modulesData: IModule[];
    courseId: string;
}

export const SidebarModulesClient = ({modulesData, courseId}: IProps) => {
    const searchParams = useSearchParams();
    const lessonSlug = searchParams.get('name');

    // Find the module that contains the current lesson
    const expandModule = modulesData.find((module) => {
        const lessons = module.lessonIds as unknown as ILesson[];
        return lessons.find((lesson) => lesson.slug === lessonSlug);
    });

    const expandModuleId = expandModule?.id ?? modulesData[0]?.id;

    return (
        <Accordion
            defaultValue={expandModuleId}
            type="single"
            collapsible
            className="w-full px-6"
        >
            {modulesData.map((module, index) => (
                <AccordionItem className="border-0" value={module.id!} key={index}>
                    <AccordionTrigger>{module.title}</AccordionTrigger>
                    <SidebarLessons courseId={courseId} lessonsData={module.lessonIds as unknown as ILesson[]}
                                    moduleSlug={module.slug}/>
                </AccordionItem>
            ))}
        </Accordion>
    );
};