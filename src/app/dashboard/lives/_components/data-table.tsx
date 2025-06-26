"use client";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

interface DataTableProps {
  columns: unknown[];
  data: unknown[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<unknown[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<unknown[]>([]);

  // Mock table object since we don't have react-table types
  const table = {
    getColumn: (key: string) => ({
      getFilterValue: () => "",
      setFilterValue: (value: string) => {},
    }),
    getHeaderGroups: () => [],
    getRowModel: () => ({ rows: [] }),
    previousPage: () => {},
    nextPage: () => {},
    getCanPreviousPage: () => false,
    getCanNextPage: () => false,
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter lives..."
          value={table.getColumn("title").getFilterValue()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn("title").setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href="/dashboard/lives/add">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Live
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any, index: number) => (
              <TableRow key={index}>
                {headerGroup.headers?.map(
                  (header: any, headerIndex: number) => {
                    return (
                      <TableHead key={headerIndex}>
                        {header.isPlaceholder
                          ? null
                          : header.column.columnDef.header}
                      </TableHead>
                    );
                  }
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any, rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {row
                    .getVisibleCells?.()
                    ?.map((cell: any, cellIndex: number) => (
                      <TableCell key={cellIndex}>
                        {cell.column.columnDef.cell}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
