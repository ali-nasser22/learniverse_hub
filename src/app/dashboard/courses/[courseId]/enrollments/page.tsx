import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { deepSerialize } from "@/lib/serialize";
import { IEnrollment } from "../../../../../../model/enrollment-model";
import { getCourseById } from "../../../../../../queries/courses";
import { getUserById } from "../../../../../../queries/users";
import { formatMyDate } from "@/lib/date";
import { getReport } from "../../../../../../queries/reports";

interface Enrollment {
  id: string;
  date: string;
  studentName: string;
  studentEmail: string;
  progress: string;
  quizMark: string;
}

interface EnrollmentsPageProps {
  params: {
    courseId: string;
  };
}

const EnrollmentsPage = async ({ params }: EnrollmentsPageProps) => {
  const { courseId } = await params;
  const data = await getInstructorDashboardData();
  const serializedData = deepSerialize(data);
  const enrollments = serializedData?.courseDetails
    ?.enrollments as IEnrollment[];
  const enrollmentsForCourse = enrollments.filter(
    (enrollment) => enrollment?.course?.toString() === courseId
  ) as unknown as IEnrollment[];
  const course = await getCourseById(courseId);

  const enrollmentsData = enrollmentsForCourse.map(async (enrollment) => {
    const user = await getUserById(enrollment?.student as unknown as string);
    const report = await getReport({
      course: courseId,
      student: enrollment?.student as unknown as string,
    });

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

    return {
      id: enrollment?.id as string,
      date: formatMyDate(
        new Date(enrollment?.enrollment_date.toString().split("T")[0])
      ),
      studentName: `${user?.firstName} ${user?.lastName}`,
      studentEmail: user?.email,
      progress:
        enrollment?.status === "not_started"
          ? "Not Started"
          : enrollment?.status === "in_progress"
            ? "In Progress"
            : "Completed",
      quizMark: mark > 0 ? mark.toString() : "Not available",
    };
  });

  const resolvedEnrollmentsData = await Promise.all(enrollmentsData);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-mono">
        <span className="font-bold ">{course?.title}</span> Enrollments
      </h2>
      <DataTable
        columns={columns}
        data={resolvedEnrollmentsData as unknown as Enrollment[]}
      />
    </div>
  );
};

export default EnrollmentsPage;
