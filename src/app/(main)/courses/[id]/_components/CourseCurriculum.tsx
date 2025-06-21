import { Accordion } from "@/components/ui/accordion";

import { BookCheck, Clock10, Radio } from "lucide-react";
import CourseModuleList from "./module/CourseModuleList";
import { ICourse } from "../../../../../../model/course-model";
import { IModule } from "../../../../../../model/module-model";

interface CourseCurriculumProps {
  course: ICourse;
}

const CourseCurriculum = ({ course }: CourseCurriculumProps) => {
  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {course.modules?.reduce(
            (acc, module) => acc + Math.floor(module.duration / 60),
            0
          )}
          {"+ "}
          Hours
        </span>
        <span className="flex items-center gap-1.5">
          <Radio className="w-4 h-4" />
          {/* {course.modules[0].lessonIds.length} */}
          Live Class
        </span>
      </div>

      {/* contents */}
      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        className="w-full"
      >
        <CourseModuleList
          courseModules={course.modules as unknown as IModule[]}
        />
      </Accordion>
      {/* contents end */}
    </>
  );
};

export default CourseCurriculum;
