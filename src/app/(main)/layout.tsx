import SiteFooter from "@/components/site-footer";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};

export default MainLayout;
