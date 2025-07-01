"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateCourseQuizSet } from "@/app/actions/course";

const formSchema = z.object({
  quizSetId: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
}

interface InitialData {
  quizSetId?: string;
}

interface QuizSetFormProps {
  initialData: InitialData;
  courseId: string;
  options?: Option[];
}

export const QuizSetForm = ({
  initialData,
  courseId,
  options,
}: QuizSetFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizSetId: initialData?.quizSetId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      await updateCourseQuizSet(courseId, values.quizSetId);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error updating course quiz set:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Set
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Quiz Set
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.quizSetId && "text-slate-500 italic"
          )}
        >
          {initialData.quizSetId
            ? options?.find((option) => option.value === initialData.quizSetId)
                ?.label || "Quiz set not found"
            : "No quiz set selected"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="quizSetId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options || []} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
