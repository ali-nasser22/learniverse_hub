"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MobileNav from "./mobile-nav";
import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { IUser } from "../../model/user-model";

interface NavItem {
  title: string;
  href: string;
  disable?: boolean;
}

interface MainNavProps {
  items?: NavItem[];
  children?: React.ReactNode;
}

const MainNav: React.FC<MainNavProps> = ({ items, children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: session } = useSession();
  const [loginSession, setLoginSession] = useState<Session | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<IUser | null>(null);

  useEffect(() => {
    setLoginSession(session);
    async function getUser() {
      try {
        const response = await fetch("/api/user/me");
        const data = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUser();
  }, [session]);
  return (
    <>
      <div className="flex items-center w-full px-6 justify-between">
        {/* Left side - Logo and Navigation Items */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
              Learniverse Hub
            </h1>
          </Link>
          {items?.length ? (
            <nav className="hidden gap-8 lg:flex">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disable ? "#" : item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm whitespace-nowrap"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        {/* Right side - User Actions */}
        <nav className="flex items-center gap-4">
          {loginSession ? (
            // Show profile avatar when user is logged in
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar>
                    <AvatarImage
                      src={loggedInUser?.profilePicture}
                      alt={loggedInUser?.firstName}
                    />
                    <AvatarFallback>
                      {loggedInUser?.firstName?.charAt(0)}
                      {loggedInUser?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-4">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/account">Profile</Link>
                </DropdownMenuItem>
                {loggedInUser?.role === "INSTRUCTOR" && (
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="account/enrolled-courses">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="">Testimonials & Certificates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      signOut({
                        callbackUrl: "/",
                      });
                    }}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Show login and register when user is not logged in
            <div className="items-center gap-4 hidden lg:flex">
              <Link
                href="/login"
                className={cn(buttonVariants({ size: "sm" }), "px-4")}
              >
                Login
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Register
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-4">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/register/student">Student</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/register/instructor">Instructor</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <button
            className="flex items-center space-x-2 lg:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </>
  );
};

export default MainNav;
