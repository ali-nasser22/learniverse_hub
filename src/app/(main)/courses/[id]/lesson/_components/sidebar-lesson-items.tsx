import {cn} from "@/lib/utils";
import Link from "next/link";
import {ILesson} from "../../../../../../../model/lesson-model";
import {CheckCircle, Lock, PlayCircle} from "lucide-react";


interface IProps {
    lessonData: ILesson;
    moduleSlug: string;
    courseId: string;
    isEnrolled: boolean;
}

export const SidebarLessonItems = ({lessonData, moduleSlug, courseId, isEnrolled}: IProps) => {
    const isPrivate = (lessonData: ILesson) => {
        return lessonData?.access === "private" && !isEnrolled;
    }
    const isCompleted = (lessonData: ILesson) => {
        return lessonData?.status === "completed";
    };
    return (
        <Link
            href={
                isPrivate(lessonData)
                    ? "#"
                    : `/courses/${courseId}/lessonData?name=${lessonData.slug}&module=${moduleSlug}`
            }
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600 ",
                isPrivate(lessonData)
                    ? "text-slate-700  hover:text-slate-700 cursor-default"
                    : isCompleted(lessonData) && "text-emerald-700 hover:text-emerald-700"
            )}
        >
            <div className="flex items-center gap-x-2">
                {
                    isPrivate(lessonData) ? (
                        <Lock size={16} className={cn("text-slate-700")}/>
                    ) : isCompleted(lessonData) ? (
                        <CheckCircle size={16} className={cn("text-emerald-700")}/>
                    ) : (
                        <PlayCircle size={16} className={cn("text-slate-700")}/>
                    )
                }
                {lessonData.title}
            </div>
        </Link>
    );
}