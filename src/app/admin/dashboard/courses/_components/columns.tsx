"use client";


import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, Eye, EyeOff, MoreHorizontal} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {toggleCourseShownOnHome} from "@/app/actions/course";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface CoursesTable {
    id?: string;
    title?: string | undefined;
    thumbnail?: string | undefined;
    price?: number | undefined;
    instructor?: string | undefined;

    shownOnHome?: boolean | undefined;
}


const handleClick = async (id: string, shownOnHome: boolean, router: unknown) => {
    try {
        const course = await toggleCourseShownOnHome(id, shownOnHome);
        if (course) {
            if (shownOnHome) {
                toast.success("Course Now Showed On Home!");
            } else {
                toast.success("Course Now Removed from Home!");
            }
        }
        router.refresh();
    } catch (error) {
        console.log(error);
    }
}

export const columns: ColumnDef<CoursesTable>[] = [
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
        cell: ({row}) => {
            const title = row.original.title;
            return <Link href={`/courses/${row.original.id}`}>{title ?? 'No Title'}</Link>
        }
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
    {
        accessorKey: "price",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "instructor",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Instructor <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        accessorKey: "shownOnHome",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Shown On Home <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const courseId = row.original.id;
            const shownOnHome = row.original.shownOnHome;
            const router = useRouter();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-4 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Button variant="ghost"
                                onClick={() => handleClick(courseId!, !shownOnHome, router)}>
                            <DropdownMenuItem className="cursor-pointer">
                                {shownOnHome ? <EyeOff/> : <Eye/>}
                                {shownOnHome ? 'Remove From Home' : 'Show On Home'}
                            </DropdownMenuItem>
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
