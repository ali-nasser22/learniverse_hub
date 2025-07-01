"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteQuizSet, updateQuizSetStatus } from "@/app/actions/quizSet";

interface QuizSetActionProps {
  quizSetId: string;
  isPublished: boolean;
}

export const QuizSetAction = ({
  isPublished,
  quizSetId,
}: QuizSetActionProps) => {
  const handleTogglePublish = async () => {
    try {
      await updateQuizSetStatus(quizSetId, !isPublished);
      console.log("Quiz set status updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating quiz set status:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuizSet(quizSetId);
      console.log("Quiz set deleted successfully");

      window.location.href = "/dashboard/quiz-sets";
    } catch (error) {
      console.error("Error deleting quiz set:", error);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={handleTogglePublish}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
