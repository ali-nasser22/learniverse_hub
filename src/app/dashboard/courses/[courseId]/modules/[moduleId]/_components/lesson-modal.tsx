import { IconBadge } from "@/components/icon-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LayoutDashboard } from "lucide-react";
import { Eye } from "lucide-react";
import { Video } from "lucide-react";
import { LessonTitleForm } from "./lesson-title-form";
import { LessonDescriptionForm } from "./lesson-description-form";
import { LessonAccessForm } from "./lesson-access-form";
import { VideoUrlForm } from "./video-url-form";
import { ILesson } from "../../../../../../../../model/lesson-model";
import { LessonActions } from "./lesson-action";

interface LessonModalProps {
  open: boolean;
  onClose: () => void;
  lesson: ILesson;
  moduleId: string;
  onUpdate: (lesson: ILesson) => void;
  onDelete: (lessonId: string) => void;
}

export const LessonModal = ({
  open,
  onClose,
  lesson,
  moduleId,
  // onUpdate,
  // onDelete,
}: LessonModalProps) => {


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        className="sm:max-w-[1200px] w-[96%] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Lesson Editor</DialogTitle>
          <DialogDescription>
            Customize and manage the settings for this lesson.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex items-center justify-end">
              <LessonActions lesson={lesson} moduleId={moduleId} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize Your chapter</h2>
              </div>
              <div>
                <h2 className="text-xl">Lesson Title</h2>
              </div>
            </div>

            <LessonTitleForm
              initialData={{ title: lesson?.title }}
              moduleId={moduleId}
              lessonId={lesson?.id as string}
            />

            <LessonDescriptionForm
              initialData={{ description: lesson?.description }}
              moduleId={moduleId}
              lessonId={lesson?.id as string}
            />

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <LessonAccessForm
                initialData={{ isFree: lesson?.access === "public" }}
                moduleId={moduleId}
                lessonId={lesson?.id as string}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <VideoUrlForm
              initialData={{
                url: lesson?.video_url,
                duration: lesson?.duration,
              }}
              moduleId={moduleId}
              lessonId={lesson?.id as string}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
