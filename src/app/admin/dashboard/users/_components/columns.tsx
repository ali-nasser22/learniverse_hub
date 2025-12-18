"use client";


import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";

interface UsersTable {
    id?: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    role?: string | undefined;
}

export const columns: ColumnDef<UsersTable>[] = [
    {
        accessorKey: "firstName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "lastName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "role",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role<ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    // {
    //     id: "actions",
    //     cell: ({row}) => {
    //         const {id} = row.original;
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-4 w-8 p-0">
    //                         <span className="sr-only">Open Menu</span>
    //                         <MoreHorizontal className="h-4 w-4"/>
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <Link href={`/dashboard/lives/${id}`}>
    //                         <DropdownMenuItem className="cursor-pointer">
    //                             <Pencil className="h-4 w-4 mr-2"/>
    //                             Edit
    //                         </DropdownMenuItem>
    //                     </Link>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];
