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
import { ModuleList } from "./module-list";
import { IModule } from "../../../../../../model/module-model";
import { createNewModule, reorderModules } from "@/app/actions/module";
import { getSlug } from "@/lib/slug";

const formSchema = z.object({
  title: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface InitialData {
  modules?: IModule[];
}

interface ModulesFormProps {
  initialData: InitialData;
  courseId: string;
}

interface UpdateData {
  id: string;
  position: number;
}

export const ModulesForm = ({ initialData, courseId }: ModulesFormProps) => {
  const [modules, setModules] = useState<IModule[]>(initialData.modules || []);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    if (isCreating) {
      form.reset();
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("courseId", courseId);
      formData.append("slug", getSlug(values.title) || "");
      formData.append("order", (modules.length + 1).toString());
      const newModule = await createNewModule(formData);

      setModules((prev) => [...prev, newModule as IModule]);
      toast.success("Module created");
      form.reset();
      toggleCreating();
      router.refresh();
    } catch (error) {
      console.error("Error creating module:", error);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: UpdateData[]) => {
    try {
      setIsUpdating(true);

      const reorderedModules = [...modules];
      updateData.forEach(({ id, position }) => {
        const moduleIndex = reorderedModules.findIndex((m) => m.id === id);
        if (moduleIndex !== -1) {
          reorderedModules[moduleIndex].order = position+1;
        }
      });

      
      reorderedModules.sort((a, b) => (a.order || 0) - (b.order || 0));
      setModules(reorderedModules);

      await reorderModules(courseId, updateData);

      toast.success("Modules reordered");
    } catch (error) {
      console.error("Error reordering modules:", error);
      toast.error("Something went wrong");
      // Revert local state on error
      setModules(initialData.modules || []);
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/dashboard/courses/${courseId}/modules/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}

      <div className="font-medium flex items-center justify-between">
        Course Modules
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a module
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
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !modules?.length && "text-slate-500 italic"
          )}
        >
          {!modules?.length && "No module"}
          <ModuleList
            onEdit={onEdit}
            onReorder={onReorder}
            items={modules || []}
          />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & Drop to reorder the modules
        </p>
      )}
    </div>
  );
};
