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

export interface Student {
  name: string;
  email: string;
  quizMark: number;
  progress: number;
}

export interface Enrollment {
  id: string;
  student: Student;
  date: string;
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
    accessorKey: "student.email",
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
          Student Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "student.quizMark",
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
          Quiz Mark <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "student.progress",
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
          Progress <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
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
          Enroll Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
