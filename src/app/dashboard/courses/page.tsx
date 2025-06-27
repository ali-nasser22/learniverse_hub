import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { deepSerialize } from "@/lib/serialize";
import { ICourse } from "../../../../model/course-model";

interface Course {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
}

const CoursesPage = async () => {
  const data = await getInstructorDashboardData();
  const serializedData = deepSerialize(data);
  const courseDetails = serializedData?.courseDetails?.courses as ICourse[];

  const courses = courseDetails.map((course) => {
    return {
      id: course?._id.toString(),
      title: course?.title,
      price: course?.price,
      isPublished: course?.active,
    };
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses as Course[]} />
    </div>
  );
};

export default CoursesPage;
