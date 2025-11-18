"use client";


import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";
import {useEffect, useState} from "react";

import {signOut} from "next-auth/react";
import {IUser} from "../../../../../model/user-model";
import {AdminMobileSidebar} from "@/app/admin/dashboard/_components/admin-mobile-sidebar";

export const AdminNavbar = () => {
    const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch("/api/user/me");
            const data = await response.json();
            setLoggedInUser(data);
        };
        getUser();
    }, []);
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <AdminMobileSidebar/>
            <div className="flex items-center justify-end w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="cursor-pointer">
                            <Avatar>
                                {/*<AvatarImage*/}
                                {/*  src={loggedInUser?.profilePicture}*/}
                                {/*  alt={loggedInUser?.firstName}*/}
                                {/*/>*/}
                                <AvatarFallback>
                                    {loggedInUser?.firstName?.charAt(0)}
                                    {loggedInUser?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-4">
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="/account">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="#" onClick={() => signOut()}>
                                Sign Out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
