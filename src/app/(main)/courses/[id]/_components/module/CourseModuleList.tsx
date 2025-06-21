import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import { IModule } from "../../../../../../../model/module-model";
import CourseLesson from "./CourseLesson";

interface CourseModuleListProps {
  courseModules: IModule[];
}

const CourseModuleList = ({ courseModules }: CourseModuleListProps) => {
  if (!courseModules) return null;
  return (
    <>
      {courseModules.map((module, index) => (
        <AccordionItem
          key={module.id || index}
          className="border-none"
          value={`item-${index + 1}`}
        >
          <AccordionTrigger>{module.title}</AccordionTrigger>
          <AccordionContent>
            {/* header */}
            <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                {Math.floor(module.duration / 60)}+ Hours
              </span>
              {/* <span className="flex items-center gap-1.5">
                <NotepadText className="w-4 h-4" />
                {module.notes.length} Notes
              </span> */}
              {/* <span className="flex items-center gap-1.5">
                <FileQuestion className="w-4 h-4" />
                10 Quiz
              </span> */}
              {/* <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4" />
                {module.lessonIds.length} Live Class
              </span> */}
            </div>
            {/* header ends */}

            <div className="space-y-3">
              {module.lessonIds &&
                module.lessonIds.map((lessonId, index) => (
                  <CourseLesson key={index} lessons={lessonId} />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
};

export default CourseModuleList;
