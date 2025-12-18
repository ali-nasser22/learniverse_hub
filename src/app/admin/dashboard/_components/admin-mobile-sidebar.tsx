"use client";

import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import AdminSidebar from "@/app/admin/dashboard/_components/admin-sidebar";


export const AdminMobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                    <SheetDescription>
                        This is the mobile navigation menu.
                    </SheetDescription>
                </VisuallyHidden>
                <AdminSidebar/>
            </SheetContent>
        </Sheet>
    );
};
