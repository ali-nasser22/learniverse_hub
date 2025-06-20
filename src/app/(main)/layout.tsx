import SiteFooter from "@/components/site-footer";
import MainNav from "@/components/main-nav";
import { ReactNode } from "react";
const navLinks = [
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/documentation",
  },
];

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
        <div className="w-full px-4 md:px-6 lg:px-8 flex h-20 items-center justify-between py-6">
          <MainNav items={navLinks} />
        </div>
      </header>
      <main className="flex-1 pt-20 flex flex-col w-full">{children}</main>
      <SiteFooter />
    </div>
  );
};
export default MainLayout;
