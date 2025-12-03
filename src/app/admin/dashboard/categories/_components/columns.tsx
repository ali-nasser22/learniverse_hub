"use client";


import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import Image from "next/image";

interface CatsTable {
    id?: string;
    title?: string | undefined;
    thumbnail?: string | undefined;
}

export const columns: ColumnDef<CatsTable>[] = [
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "thumbnail",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Thumbnail <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => {
            const thumbnail = row.original.thumbnail;
            return thumbnail ? (
                <Image src={thumbnail} alt={row.original.title ?? 'Thumbnail'} width={50}
                       height={50}
                       className="rounded-md object-cover"/>
            ) : (
                <span className="text-gray-400">No Image</span>
            )
        }
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
