import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {CourseSidebar} from "./course-sidebar";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface IProps {
    courseId: string
}

export const CourseSidebarMobile = ({courseId}: IProps) => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
                <Menu/>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <VisuallyHidden>
                    <SheetTitle>Course Navigation</SheetTitle>
                </VisuallyHidden>
                <CourseSidebar courseId={courseId}/>
            </SheetContent>
        </Sheet>
    );
};
