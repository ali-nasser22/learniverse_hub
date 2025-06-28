import { BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ICourse } from "../../../../../model/course-model";
import { getCategoryById } from "../../../../../queries/categories";
import { IUser } from "../../../../../model/user-model";
import { getReport } from "../../../../../queries/reports";

export default async function EnrolledCourseCard({
  course,
  student,
}: {
  course: ICourse;
  student: IUser;
}) {
  const category = await getCategoryById(course.category as unknown as string);
  const filter = {
    course: course._id.toString(),
    student: student.id,
  };
  const report = await getReport(filter);

  // find attempted quiz from report
  const attemptedQuiz = report?.quizAssessment?.assessments?.filter(
    (quiz) => quiz.attempted
  );
  let mark = 0;
  attemptedQuiz?.forEach((quiz) => {
    quiz.options.map((option) => {
      if (option.isCorrect && option.isSelected) {
        mark += 5;
      }
    });
  });
  return (
    <div
      key={course.id}
      className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full"
    >
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={course.thumbnail as string}
          alt={course.title}
          className="object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
          {course.title}
        </div>
        <span className="text-xs text-muted-foreground">
          {category?.title ?? "No Category"}
        </span>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <BookOpen className="w-4" />
            <span>{course?.modules?.length ?? 0} Chapters</span>
          </div>
        </div>
        <div className="border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <span className="text-md md:text-sm font-medium text-slate-700">
              Total Modules: {course?.modules?.length ?? 0}
            </span>
            <div className="text-md md:text-sm font-medium text-slate-700">
              Completed Modules{" "}
              <Badge variant="outline">
                {report?.totalCompletedModules.length}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-md md:text-sm font-medium text-slate-700">
              Total Quizzes: {report?.quizAssessment?.assessments?.length}
            </span>
            <div className="text-md md:text-sm font-medium text-slate-700">
              Quiz taken{" "}
              <Badge variant="outline">{attemptedQuiz?.length}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-md md:text-sm font-medium text-slate-700">
              Mark from Quizzes
            </span>
            <span className="text-md md:text-sm font-medium text-slate-700">
              {mark}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-md md:text-sm font-medium text-slate-700">
              Other Marks
            </span>
            <span className="text-md md:text-sm font-medium text-slate-700">
              {report?.quizAssessment?.otherMarks}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-md md:text-sm font-medium text-slate-700">
            Total Marks
          </span>
          <span className="text-md md:text-sm font-medium text-slate-700">
            {mark + (report?.quizAssessment?.otherMarks ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
