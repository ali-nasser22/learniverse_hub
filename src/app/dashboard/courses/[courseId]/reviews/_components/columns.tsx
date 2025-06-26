"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Link from "next/link";

export interface ReviewStudent {
  name: string;
}

export interface Review {
  id: string;
  student: ReviewStudent;
  rating: number;
  review: string;
}

export const columns = [
  {
    id: "name",
    accessorKey: "student.name",
    header: ({ column }: { column: unknown }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            (column as any).toggleSorting(
              (column as any).getIsSorted() === "asc"
            )
          }
        >
          Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }: { column: unknown }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            (column as any).toggleSorting(
              (column as any).getIsSorted() === "asc"
            )
          }
        >
          Rating <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "review",
    header: ({ column }: { column: unknown }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            (column as any).toggleSorting(
              (column as any).getIsSorted() === "asc"
            )
          }
        >
          Review <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
