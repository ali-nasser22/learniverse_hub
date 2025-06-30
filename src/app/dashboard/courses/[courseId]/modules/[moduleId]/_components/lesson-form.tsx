"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LessonList } from "./lesson-list";
import { LessonModal } from "./lesson-modal";
import { ILesson } from "../../../../../../../../model/lesson-model";
import { createLessonServer } from "@/app/actions/lesson";
import { getSlug } from "@/lib/slug";
import { serializeDocument } from "@/lib/serialize";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface InitialData {
  lessons?: ILesson[];
}

interface LessonFormProps {
  initialData: InitialData;
  moduleId: string;
}

interface UpdateData {
  id: string;
  position: number;
}

export const LessonForm = ({ initialData, moduleId }: LessonFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLesson, setEditingLesson] = useState<ILesson | null>(null);

  const [lessons, setLessons] = useState<ILesson[]>(() => {
    if (!initialData.lessons) return [];

    return initialData.lessons.map((lesson) => {
      const serializedLesson = {
        ...lesson,
        id: lesson.id || (lesson._id ? lesson._id.toString() : undefined),
        _id: lesson._id ? lesson._id.toString() : undefined,
      };

      const { __v, ...cleanLesson } = serializedLesson as unknown as ILesson;
      return cleanLesson;
    });
  });

  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    if (isCreating) {
      form.reset();
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("moduleId", moduleId);
      formData.append("order", (lessons.length + 1).toString());
      formData.append("slug", getSlug(values.title) as string);

      const newLesson = await createLessonServer(formData);

      if (!newLesson) {
        throw new Error("Failed to create lesson");
      }

      const myLesson = serializeDocument(newLesson) as unknown as ILesson;

      setLessons((prevLessons) => [
        ...prevLessons,
        {
          id: myLesson.id || myLesson._id?.toString(),
          ...myLesson,
        },
      ]);

      toast.success("Lesson created successfully");
      toggleCreating();
      router.refresh();
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("Failed to create lesson");
    }
  };

  const onReorder = async (updateData: UpdateData[]) => {
    try {
      setIsUpdating(true);

      // Update local state to reflect new order
      const reorderedLessons = lessons
        .map((lesson) => {
          const lessonId = lesson.id || lesson._id?.toString() || "";
          const updateItem = updateData.find((item) => item.id === lessonId);
          return updateItem
            ? { ...lesson, order: updateItem.position + 1 }
            : lesson;
        })
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      setLessons(reorderedLessons);
      toast.success("Lessons reordered successfully");
      router.refresh();
    } catch (error) {
      console.error("Error reordering lessons:", error);
      toast.error("Failed to reorder lessons");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (lessonId: string) => {
    const lesson = lessons.find((lesson) => lesson.id === lessonId);
    setEditingLesson(lesson as ILesson);
    setIsEditing(true);
  };

  const onCloseModal = () => {
    setIsEditing(false);
    setEditingLesson(null);
  };

  const onLessonUpdate = (updatedLesson: ILesson) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) => {
        const lessonId = lesson.id || lesson._id?.toString() || "";
        const updatedLessonId =
          updatedLesson.id || updatedLesson._id?.toString() || "";
        return lessonId === updatedLessonId ? updatedLesson : lesson;
      })
    );
    onCloseModal();
  };

  const onLessonDelete = (deletedLessonId: string) => {
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => {
        const lessonId = lesson.id || lesson._id?.toString() || "";
        return lessonId !== deletedLessonId;
      })
    );
    onCloseModal();
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center z-10">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a lesson
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the lesson...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !lessons?.length && "text-slate-500 italic"
          )}
        >
          {!lessons?.length && "No lessons yet"}
          {lessons?.length > 0 && (
            <LessonList
              onEdit={onEdit}
              onReorder={onReorder}
              items={lessons}
              isUpdating={isUpdating}
            />
          )}
        </div>
      )}

      {!isCreating && lessons?.length > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & drop to reorder the lessons
        </p>
      )}
      <LessonModal
        open={isEditing}
        onClose={onCloseModal}
        lesson={editingLesson as ILesson}
        moduleId={moduleId}
        onUpdate={onLessonUpdate}
        onDelete={onLessonDelete}
      />

      {/* <LessonModal
        open={isEditing}
        onClose={onCloseModal}
        lessonId={editingLessonId as string}
        moduleId={moduleId}
        onUpdate={onLessonUpdate}
        onDelete={onLessonDelete}
      /> */}
    </div>
  );
};
