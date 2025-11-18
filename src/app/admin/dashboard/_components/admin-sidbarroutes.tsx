"use client";

import {BookCopy, BookOpen, LucideIcon, MessageSquareWarning, Settings, Users, Wrench} from "lucide-react";
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
        href: "/admin/users",
    },
    {
        icon: BookOpen,
        label: 'Manage Courses',
        href: "/admin/courses",
    },
    {
        icon: BookCopy,
        label: 'Manage Categories',
        href: "/admin/categories",
    },
    {
        icon: MessageSquareWarning,
        label: 'Manage Reports',
        href: "/admin/reports",
    },
    {
        icon: Wrench,
        label: 'Settings',
        href: "/admin/settings",
    },
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
