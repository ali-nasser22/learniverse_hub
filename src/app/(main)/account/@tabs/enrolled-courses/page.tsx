import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface CourseData {
  id: number;
  title: string;
  category: string;
  chapters: number;
  totalModules: number;
  completedModules: number;
  totalQuizzes: number;
  quizzesTaken: number;
  quizMarks: number;
  otherMarks: number;
  totalMarks: number;
  imageUrl: string;
}

// Mock data - in a real app, this would come from props or API
const mockCourses: CourseData[] = [
  {
    id: 1,
    title: "Reactive Accelerator",
    category: "Development",
    chapters: 4,
    totalModules: 10,
    completedModules: 5,
    totalQuizzes: 10,
    quizzesTaken: 10,
    quizMarks: 50,
    otherMarks: 50,
    totalMarks: 100,
    imageUrl: "/assets/images/courses/course_1.png",
  },
  {
    id: 2,
    title: "Reactive Accelerator",
    category: "Development",
    chapters: 4,
    totalModules: 10,
    completedModules: 5,
    totalQuizzes: 10,
    quizzesTaken: 10,
    quizMarks: 50,
    otherMarks: 50,
    totalMarks: 100,
    imageUrl: "/assets/images/courses/course_1.png",
  },
  {
    id: 3,
    title: "Reactive Accelerator",
    category: "Development",
    chapters: 4,
    totalModules: 10,
    completedModules: 5,
    totalQuizzes: 10,
    quizzesTaken: 10,
    quizMarks: 50,
    otherMarks: 50,
    totalMarks: 100,
    imageUrl: "/assets/images/courses/course_1.png",
  },
  {
    id: 4,
    title: "Reactive Accelerator",
    category: "Development",
    chapters: 4,
    totalModules: 10,
    completedModules: 5,
    totalQuizzes: 10,
    quizzesTaken: 10,
    quizMarks: 50,
    otherMarks: 50,
    totalMarks: 100,
    imageUrl: "/assets/images/courses/course_1.png",
  },
];

function EnrolledCourses() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {mockCourses.map((course) => (
        <div
          key={course.id}
          className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full"
        >
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.title}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
              {course.title}
            </div>
            <span className="text-xs text-muted-foreground">
              {course.category}
            </span>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <BookOpen className="w-4" />
                <span>{course.chapters} Chapters</span>
              </div>
            </div>
            <div className="border-b pb-2 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-md md:text-sm font-medium text-slate-700">
                  Total Modules: {course.totalModules}
                </span>
                <div className="text-md md:text-sm font-medium text-slate-700">
                  Completed Modules{" "}
                  <Badge variant="default">
                    {course.completedModules.toString().padStart(2, "0")}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-md md:text-sm font-medium text-slate-700">
                  Total Quizzes: {course.totalQuizzes}
                </span>
                <div className="text-md md:text-sm font-medium text-slate-700">
                  Quiz taken{" "}
                  <Badge variant="default">{course.quizzesTaken}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-md md:text-sm font-medium text-slate-700">
                  Mark from Quizzes
                </span>
                <span className="text-md md:text-sm font-medium text-slate-700">
                  {course.quizMarks}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-md md:text-sm font-medium text-slate-700">
                  Others
                </span>
                <span className="text-md md:text-sm font-medium text-slate-700">
                  {course.otherMarks}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-md md:text-sm font-medium text-slate-700">
                Total Marks
              </span>
              <span className="text-md md:text-sm font-medium text-slate-700">
                {course.totalMarks}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EnrolledCourses;
