import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Course } from "./_components/columns";

const courses: Course[] = [
  {
    id: "1",
    title: "Reactive Accelerator",
    price: 49,
    isPublished: true,
  },
  {
    id: "2",
    title: "Think In A Redux Way",
    price: 10,
    isPublished: false,
  },
];

const CoursesPage = async () => {
  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
