"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ICourse } from "../../../../../../model/course-model";
import { deleteCourse, updateCourse } from "@/app/actions/course";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CourseActionsProps {
  course: ICourse;
}

export const CourseActions = ({ course }: CourseActionsProps) => {
  const router = useRouter();
  const handlePublish = async () => {
    try {
      await updateCourse(course?.id as string, {
        active: !course?.active,
      });
      toast.success(
        ` ${course?.active ? "Course is unpublished" : "Course is published"}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteCourse(course?.id as string);
      toast.success("Course deleted successfully");
      router.push("/dashboard/courses");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={handlePublish}>
        {course?.active ? "Unpublish" : "Publish"}
      </Button>
      {!course?.active && (
        <Button size="sm" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
