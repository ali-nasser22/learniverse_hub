"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IModule } from "../../../../../../model/module-model";
import { deleteModule, updateModule } from "@/app/actions/module";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ModuleActionsProps {
  module: IModule;
}

export const ModuleActions = ({ module }: ModuleActionsProps) => {
  const router = useRouter();
  const handlePublish = async () => {
    try {
      await updateModule(
        {
          status: module?.status === "published" ? "draft" : "published",
        },
        module?.id as string
      );
      toast.success(
        ` ${module?.status === "published" ? "Module is unpublished" : "Module is published"}`
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteModule(module?.id as string);
      toast.success("Module is deleted");
      router.push(`/dashboard/courses/${module?.course}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button variant="outline" size="sm" onClick={handlePublish}>
        {module?.status === "published" ? "Unpublish" : "Publish"}
      </Button>

      {module?.status !== "published" && (
        <Button size="sm" onClick={handleDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
