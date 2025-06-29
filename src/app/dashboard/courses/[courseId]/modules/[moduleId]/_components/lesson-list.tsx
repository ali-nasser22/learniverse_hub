"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, CirclePlay } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ILesson } from "../../../../../../../../model/lesson-model";

interface UpdateData {
  id: string;
  position: number;
}

interface LessonListProps {
  items: ILesson[];
  onReorder: (updateData: UpdateData[]) => void;
  onEdit: (id: string) => void;
  isUpdating?: boolean;
}

export const LessonList = ({ items, onReorder, onEdit, isUpdating = false }: LessonListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lessons, setLessons] = useState<ILesson[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLessons(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedLessons = Array.from(lessons);
    const [reorderedItem] = reorderedLessons.splice(result.source.index, 1);
    reorderedLessons.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLessons = reorderedLessons.slice(startIndex, endIndex + 1);

    setLessons(reorderedLessons);

    const bulkUpdateData: UpdateData[] = updatedLessons.map((lesson) => ({
      id: lesson.id || lesson._id?.toString() || '',
      position: reorderedLessons.findIndex((item) => (item.id || item._id?.toString()) === (lesson.id || lesson._id?.toString())),
    }));

    onReorder(bulkUpdateData);
  };

  // Helper function to get lesson ID as string
  const getLessonId = (lesson: ILesson): string => {
    return lesson.id || lesson._id?.toString() || '';
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("relative", isUpdating && "pointer-events-none opacity-60")}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lessons">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lessons.map((lesson, index) => {
                const lessonId = getLessonId(lesson);
                return (
                  <Draggable
                    key={lessonId || `lesson-${index}`}
                    draggableId={lessonId || `lesson-${index}`}
                    index={index}
                    isDragDisabled={isUpdating}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={cn(
                          "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm transition-all",
                          lesson.published &&
                            "bg-sky-100 border-sky-200 text-sky-700",
                          snapshot.isDragging && "shadow-lg",
                          isUpdating && "opacity-60"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                            lesson.published &&
                              "border-r-sky-200 hover:bg-sky-200",
                            isUpdating && "cursor-not-allowed hover:bg-slate-200"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5" />
                        </div>

                        <div className="flex items-center gap-2 flex-1">
                          <CirclePlay size={18} />
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            {lesson.order !== undefined && (
                              <p className="text-xs text-slate-500">
                                Order: {lesson.order}
                              </p>
                            )}
                            {lesson.duration && (
                              <p className="text-xs text-slate-500">
                                Duration: {lesson.duration}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                          <Badge
                            className={cn(
                              "bg-gray-500",
                              lesson.published && "bg-emerald-600"
                            )}
                          >
                            {lesson.published ? "Published" : "Draft"}
                          </Badge>
                          <Pencil
                            onClick={() => !isUpdating && onEdit(lessonId)}
                            className={cn(
                              "w-4 h-4 cursor-pointer hover:opacity-75 transition",
                              isUpdating && "cursor-not-allowed opacity-50"
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};