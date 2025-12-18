import {SidebarModulesClient} from "@/app/(main)/courses/[id]/lesson/_components/sidebar-modules-client";
import {getModuleById} from "../../../../../../../queries/modules";
import {IModule} from "../../../../../../../model/module-model";
import {replaceMongoIdInArray} from "@/lib/convertData";
import {ILesson} from "../../../../../../../model/lesson-model";


interface IProps {
    courseId: string;
    modules: {
        moduleId: string;
        lessons: unknown
    }[];
    isEnrolled: boolean;
}

export const SidebarModules = async ({courseId, modules, isEnrolled}: IProps) => {

    const lessonsWithStatus = modules.flatMap((module) =>
        module?.lessons?.filter(lesson => lesson?.lesson?.status === "completed") ?? []
    );

    const completedLessonIds = new Set(
        lessonsWithStatus.map(item => item?.lesson?.id).filter(Boolean)
    );

    let modulesData: IModule[] = await Promise.all(modules.map(async (module) => {
        return await getModuleById(module.moduleId) as IModule;
    }));
    modulesData = modulesData.sort((a, b) => a.order - b.order);

    const preparedModules = modulesData.map(module => {
        const plainModule = JSON.parse(JSON.stringify(module));
        const lessonsWithStatuses = (replaceMongoIdInArray(plainModule.lessonIds) as unknown as ILesson[]).map(lesson => {
            if (completedLessonIds.has(lesson.id)) {
                return {
                    ...lesson,
                    status: "completed"
                };
            }
            return lesson;
        });

        return {
            ...plainModule,
            lessonIds: lessonsWithStatuses
        };
    });

    return <SidebarModulesClient isEnrolled={isEnrolled} modulesData={preparedModules} courseId={courseId}/>;
}