import {CheckCircle} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {ILesson} from "../../../../../../../model/lesson-model";

interface IProps {
    lessonData: ILesson
}

export const SidebarLessonItems = ({lessonData}: IProps) => {
    const isActive = true;
    const isCompleted = true;

    return (
        <Link
            href="#"
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
                isActive && "text-slate-700  hover:text-slate-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700"
            )}
        >
            <div className="flex items-center gap-x-2">
                <CheckCircle
                    size={16}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-emerald-700"
                    )}
                />
                {lessonData.title ?? 'sss'}
            </div>
        </Link>
    )
}