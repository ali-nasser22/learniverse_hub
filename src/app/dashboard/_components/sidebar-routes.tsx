"use client";

import { BarChart, BookOpen, BookA, Radio, LucideIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

interface Route {
  icon: LucideIcon;
  label: string;
  href: string;
}

const routes: Route[] = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/dashboard/courses",
  },
  {
    icon: BookOpen,
    label: "Add Course",
    href: "/dashboard/courses/add",
  },
  {
    icon: Radio,
    label: "Lives",
    href: "/dashboard/lives",
  },
  {
    icon: BookA,
    label: "Quizes",
    href: "/dashboard/quiz-sets",
  },
];

export const SidebarRoutes = () => {
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
