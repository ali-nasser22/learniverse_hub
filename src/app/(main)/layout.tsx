import SiteFooter from "@/components/site-footer";
import MainNav from "@/components/main-nav";
import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

const navLinks = [
    {
        title: "The Wizard",
        href: "/wizard",
    },
    {
        title: "Courses",
        href: "/courses",
    },
    {
        title: "Documentation",
        href: "https://github.com/ali-nasser22/learniverse_hub",
    },
];

const MainLayout = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
                <SessionProvider>
                    <div className="w-full px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between py-6">
                        <MainNav items={navLinks}/>
                    </div>
                </SessionProvider>
            </header>
            <main className="flex-1 pt-20 flex flex-col w-full">{children}</main>
            <SiteFooter/>
        </div>
    );
};
export default MainLayout;
