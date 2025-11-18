import {ReactNode} from "react";
import AdminSidebar from "@/app/admin/dashboard/_components/admin-sidebar";
import {AdminNavbar} from "@/app/admin/dashboard/_components/admin-navbar";


interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div className="h-full">
            <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
                <AdminNavbar/>
            </div>
            <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <AdminSidebar/>
            </div>
            <main className="lg:pl-56 pt-[80px] h-full">{children}</main>
        </div>
    );
};

export default DashboardLayout;
