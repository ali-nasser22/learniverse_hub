import {DataTable} from "@/app/admin/dashboard/courses/_components/data-table";
import {columns} from "@/app/admin/dashboard/courses/_components/columns";
import {getCourseList} from "../../../../../queries/courses";


export default async function CoursesPage() {
    const courses = await getCourseList();
    const modifiedCourses = courses.map((course) => {
        return {
            id: course.id,
            thumbnail: course.thumbnail,
            title: course.title,
            price: course.price,
            instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
            shownOnHome: course.shownOnHome,
        }
    })
    return (
        <>
            <div className="container mx-auto p-10 relative">
                <DataTable columns={columns} data={modifiedCourses}/>
            </div>
        </>
    )
}