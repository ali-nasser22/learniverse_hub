"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IModule } from "../../../../../../model/module-model";

interface UpdateData {
  id: string;
  position: number;
}

interface ModuleListProps {
  items: IModule[];
  onReorder: (updateData: UpdateData[]) => void;
  onEdit: (id: string) => void;
}

export const ModuleList = ({ items, onReorder, onEdit }: ModuleListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [modules, setModules] = useState<IModule[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setModules(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedModules = Array.from(modules);
    const [reorderedItem] = reorderedModules.splice(result.source.index, 1);
    reorderedModules.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedModules = reorderedModules.slice(startIndex, endIndex + 1);

    setModules(reorderedModules);

    const bulkUpdateData: UpdateData[] = updatedModules.map((module) => ({
      id: module.id,
      position: reorderedModules.findIndex((item) => item.id === module.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {modules.map((module, index) => (
              <Draggable
                key={module.id || `module-${index}`}
                draggableId={module.id || `module-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      module.status === "active" &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        module.status === "active" &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">{module.title}</p>
                      {module.order !== undefined && (
                        <p className="text-xs text-slate-500">
                          Order: {module.order}
                        </p>
                      )}
                    </div>

                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-gray-500",
                          module.status === "active" && "bg-emerald-600"
                        )}
                      >
                        {module.status === "active" ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(module.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
