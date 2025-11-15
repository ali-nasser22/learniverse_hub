"use client";
import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {PlusCircle} from "lucide-react";
import {IQuizSet} from "../../../../../model/quizsets-model";

interface DataTableProps {
    columns: ColumnDef<IQuizSet>[];
    data: IQuizSet[];
    filterColumn?: string;
    filterPlaceholder?: string;
    addButtonText?: string;
    addButtonHref?: string;
    isLoading?: boolean;
    error?: string | null;
}

export function DataTable({
                              columns,
                              data = [],
                              filterColumn = "title",
                              filterPlaceholder = "Filter quiz sets...",
                              addButtonText = "New Quiz Set",
                              addButtonHref = "/dashboard/quiz-sets/add",
                              isLoading = false,
                              error = null,
                          }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );


    const safeData = React.useMemo(() => {
        if (!Array.isArray(data)) {
            console.warn(
                "DataTable: Expected data to be an array, received:",
                typeof data
            );
            return [];
        }
        return data.filter(Boolean);
    }, [data]);

    const table = useReactTable({
        data: safeData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });


    if (isLoading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-24">
                    <div className="text-muted-foreground">Loading quiz sets...</div>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-24">
                    <div className="text-destructive">
                        Error loading quiz sets: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header with filter and add button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder={filterPlaceholder}
                        value={
                            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {safeData.length > 0 && (
                        <span className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} of {safeData.length}{" "}
                            quiz sets
            </span>
                    )}
                </div>
                <Link href={addButtonHref}>
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        {addButtonText}
                    </Button>
                </Link>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-muted/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {table.getColumn(filterColumn)?.getFilterValue()
                                        ? "No quiz sets match your search."
                                        : "No quiz sets found. Create your first quiz set to get started."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {safeData.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
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
            )}
        </div>
    );
}
