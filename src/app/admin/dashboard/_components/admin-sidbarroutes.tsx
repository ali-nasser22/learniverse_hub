"use client";

import {LucideIcon, Settings, Users} from "lucide-react";
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
        label: "Users",
        href: "/admin/users",
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
