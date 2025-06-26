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
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export interface Live {
  id: string;
  title: string;
  date: string;
  time: string;
}

export const columns = [
  {
    accessorKey: "title",
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
          Title <ArrowUpDown className="ml-2 h-4 w-4" />
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
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "time",
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
          Time <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: unknown }) => {
      const { id } = (row as any).original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/dashboard/lives/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
