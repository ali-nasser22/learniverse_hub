import {Accordion, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {SidebarLessons} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-lessons";
import {getModuleById} from "../../../../../../../queries/modules";
import {IModule} from "../../../../../../../model/module-model";

interface IProps {
    courseId: string;
    modules: {
        moduleId: string;
        lessons: unknown
    }[]
}

export const SidebarModules = async ({courseId, modules}: IProps) => {

    const modulesData = await Promise.all(modules.map(async (module) => {
        return await getModuleById(module.moduleId) as IModule;
    }));
    console.log(modulesData);
    return (
        <Accordion
            defaultValue="item-1"
            type="single"
            collapsible
            className="w-full px-6"
        >
            {/* items */}
            {modulesData.map((module) => (
                <AccordionItem className="border-0" value="item-1" key={module.id}>
                    <AccordionTrigger>{module.title}</AccordionTrigger>
                    <SidebarLessons/>
                </AccordionItem>
            ))}
            {/* items ends */}
        </Accordion>
    )
}