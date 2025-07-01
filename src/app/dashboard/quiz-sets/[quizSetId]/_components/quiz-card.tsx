"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, CircleCheck, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { IQuiz } from "../../../../../../model/quiz-model";
import { useState } from "react";
import {
  updateQuizQuestion,
  deleteQuizQuestion,
} from "@/app/actions/quizQuestion";

interface QuizCardProps {
  quiz: IQuiz;
  quizSetId: string;
}

export const QuizCard = ({ quiz, quizSetId }: QuizCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(quiz?.title || "");
  const [editedOptions, setEditedOptions] = useState(quiz.options || []);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    try {
      await updateQuizQuestion(quiz.id as string, {
        title: editedTitle,
        options: editedOptions,
      });

      console.log("Quiz updated successfully");
      setIsEditing(false);
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  const handleDelete = async (quizId: string) => {
    try {
      await deleteQuizQuestion(quizSetId, quizId);
      console.log("Quiz deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border">
      {isEditing ? (
        // Edit mode - simple form
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Quiz title"
          />

          <div className="space-y-2 mb-4">
            {editedOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={option.is_correct}
                  onChange={(e) => {
                    const newOptions = [...editedOptions];
                    newOptions[index].is_correct = e.target.checked;
                    setEditedOptions(newOptions);
                  }}
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...editedOptions];
                    newOptions[index].text = e.target.value;
                    setEditedOptions(newOptions);
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Option text"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        // Display mode - existing content
        <>
          <h2 className="mb-3">{quiz?.title || "Untitled"}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quiz.options.map((option) => (
              <div
                className={cn(
                  "py-1.5 rounded-sm text-sm flex items-center gap-1 text-gray-600"
                )}
                key={option.text}
              >
                {option.is_correct ? (
                  <CircleCheck className="size-4 text-emerald-500" />
                ) : (
                  <Circle className="size-4" />
                )}
                <p>{option.text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Button variant="ghost" size="sm" onClick={() => handleEdit()}>
              <Pencil className="w-3 mr-1" /> Edit
            </Button>
            <Button
              size="sm"
              className="text-destructive"
              variant="ghost"
              onClick={() => handleDelete(quiz.id as string)}
            >
              <Trash className="w-3 mr-1" /> Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
