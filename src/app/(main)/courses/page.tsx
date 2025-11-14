import {getCourseList} from "../../../../queries/courses";
import {getCategoryList} from "../../../../queries/categories";
import {ICategory} from "../../../../model/category-model";
import {ICourse} from "../../../../model/course-model";
import CoursesPageClient from "@/app/(main)/courses/CoursesPageClient";
import {serialize} from "@/lib/serialize";


const CoursesPage = async () => {
    const courses = (await getCourseList()) as unknown as ICourse[];
    const categories = (await getCategoryList()) as unknown as ICategory[];

    const coursesData = serialize(courses);
    const categoriesData = serialize(categories);
    return (
        <CoursesPageClient courses={coursesData} categories={categoriesData}/>
    )
};

export default CoursesPage;