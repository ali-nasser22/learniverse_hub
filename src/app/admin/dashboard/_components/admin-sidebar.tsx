import Link from "next/link";
import {AdminSidebarRoutes} from "@/app/admin/dashboard/_components/admin-sidbarroutes";


export default function AdminSidebar() {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Link href="/">
                    <h1 className="text-1xl font-bold">Learniverse Hub</h1>
                </Link>
            </div>
            <div className="flex flex-col w-full">
                <AdminSidebarRoutes/>
            </div>
        </div>
    );
}
