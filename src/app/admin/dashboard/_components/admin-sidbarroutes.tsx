"use client";

import {BookCopy, BookOpen, LucideIcon, Settings, Users} from "lucide-react";
import {SidebarItem} from "@/app/dashboard/_components/sidebar-item";


interface Route {
    icon: LucideIcon;
    label: string;
    href: string;
}

const routes: Route[] = [
    {
        icon: Settings,
        label: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        icon: Users,
        label: "Manage Users",
        href: "/admin/dashboard/users",
    },
    {
        icon: BookOpen,
        label: 'Manage Courses',
        href: "/admin/dashboard/courses",
    },
    {
        icon: BookCopy,
        label: 'Manage Categories',
        href: "/admin/dashboard/categories",
    },
    // {
    //     icon: MessageSquareWarning,
    //     label: 'Manage Reports',
    //     href: "/admin/dashboard/reports",
    // },
    // {
    //     icon: Wrench,
    //     label: 'Settings',
    //     href: "/admin/dashboard/settings",
    // },
];

export const AdminSidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
};
