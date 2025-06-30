"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ILesson } from "../../../../../../../../model/lesson-model";
import { deleteLesson, updateLesson } from "@/app/actions/lesson";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LessonActionsProps {
  lesson: ILesson;
  moduleId: string;
}

export const LessonActions = ({ lesson, moduleId }: LessonActionsProps) => {
  const router = useRouter();
  const handlePublish = async () => {
    try {
      await updateLesson(
        {
          published: !lesson.published,
        },
        lesson?.id as string,
        moduleId
      );
      toast.success(
        ` ${lesson?.published ? "Lesson is unpublished" : "Lesson is published"}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLesson(lesson?.id as string, moduleId);
      toast.success("Lesson is deleted");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={handlePublish}>
        {lesson?.published ? "Unpublish" : "Publish"}
      </Button>

      {!lesson?.published && (
        <Button size="sm" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
