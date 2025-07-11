import AlertBanner from "../../../../../../components/banner";
import { IconBadge } from "../../../../../../components/icon-badge";
import { ArrowLeft, BookOpenCheck, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { ModuleTitleForm } from "./_components/module-title-form";
import { LessonForm } from "./_components/lesson-form";
import { getCourseById } from "../../../../../../../queries/courses";
import { getModuleById } from "../../../../../../../queries/modules";
import { serializeDocument, serializeDocuments } from "@/lib/serialize";
import { ILesson } from "../../../../../../../model/lesson-model";
import { ModuleActions } from "../../_components/module-action";
import { IModule } from "../../../../../../../model/module-model";

interface ModuleParams {
  courseId: string;
  moduleId: string;
}

interface ModulePageProps {
  params: ModuleParams;
}

const Module = async ({ params }: ModulePageProps) => {
  const { courseId, moduleId } = await params;
  const course = await getCourseById(courseId);
  const myModule = await getModuleById(moduleId);
  const lessons = serializeDocuments(
    myModule?.lessonIds as ILesson[]
  ) as unknown as ILesson[];

  const serializedModule = serializeDocument(
    myModule as unknown as IModule
  ) as unknown as IModule;

  return (
    <>
      {myModule?.status !== "published" && (
        <AlertBanner
          label="This module is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-end">
              <ModuleActions module={serializedModule} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your module</h2>
              </div>
              <ModuleTitleForm
                initialData={{
                  title: myModule?.title,
                }}
                courseId={course?.id as string}
                moduleId={moduleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl">Module Lessons</h2>
              </div>
              <LessonForm
                initialData={{
                  lessons: lessons,
                }}
                moduleId={moduleId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              {/* <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2> */}
            </div>
            {/* <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Module;
