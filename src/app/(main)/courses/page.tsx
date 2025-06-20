import { getCourseList } from "../../../../queries/courses";
import { getCategoryList } from "../../../../queries/categories";
import CoursesPageClient from "./CoursesPageClient";
//import { ICourse } from "../../../../model/course-model";
import { ICategory } from "../../../../model/category-model";
import { IUser } from "../../../../model/user-model";

const CoursesPage: React.FC = async () => {
  // Fetch data from your existing queries
  const coursesData = await getCourseList();
  const categoriesData = await getCategoryList();

  // Helper function to safely serialize ObjectId or any object to string
  const serializeId = (obj: any): string | undefined => {
    if (!obj) return undefined;
    if (typeof obj === "string") return obj;
    if (obj._id) return obj._id.toString();
    if (obj.id) return obj.id.toString();
    return obj.toString();
  };

  // Helper function to serialize dates
  const serializeDate = (date: any): string | undefined => {
    if (!date) return undefined;
    if (date instanceof Date) return date.toISOString();
    if (typeof date === "string") return date;
    return date.toString();
  };

  // Serialize courses data to plain objects
  const courses = coursesData.map((course) => ({
    id: serializeId(course._id || course.id),
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    price: course.price,
    thumbnail: course.thumbnail,
    // Properly serialize modules array
    modules: (course.modules || []).map((module: any) => ({
      id: serializeId(module._id || module.id),
      title: module.title,
      description: module.description,
      status: module.status,
      slug: module.slug,
      course: serializeId(module.course),
      lessonIds: (module.lessonIds || []).map((lessonId: any) =>
        serializeId(lessonId)
      ),
      duration: module.duration,
      createdAt: serializeDate(module.createdAt),
      updatedAt: serializeDate(module.updatedAt),
      // Add any other module fields you need
    })),
    category: (course.category as unknown as ICategory)
      ? {
          id: serializeId(
            (course.category as unknown as ICategory)._id ||
              (course.category as unknown as ICategory).id
          ),
          title: (course.category as unknown as ICategory).title,
          thumbnail: (course.category as unknown as ICategory).thumbnail,
        }
      : null,
    instructor: (course.instructor as unknown as IUser)
      ? {
          id: serializeId(
            (course.instructor as unknown as IUser)._id ||
              (course.instructor as unknown as IUser).id
          ),
          firstName: (course.instructor as unknown as IUser).firstName,
          lastName: (course.instructor as unknown as IUser).lastName,
          designation: (course.instructor as unknown as IUser).designation,
        }
      : null,
    // Properly serialize testimonials array
    testimonials: (course.testimonials || []).map((testimonial: any) => ({
      id: serializeId(testimonial._id || testimonial.id),
      content: testimonial.content,
      rating: testimonial.rating,
      courseId: serializeId(testimonial.courseId),
      user: testimonial.user
        ? {
            id: serializeId(testimonial.user._id || testimonial.user.id),
            firstName: testimonial.user.firstName,
            lastName: testimonial.user.lastName,
            email: testimonial.user.email,
            // Add any other user fields you need, but avoid nested objects
          }
        : null,
      createdAt: serializeDate(testimonial.createdAt),
      updatedAt: serializeDate(testimonial.updatedAt),
    })),
    // Properly serialize enrollments array
    enrollments: (course.enrollments || []).map((enrollment: any) => ({
      id: serializeId(enrollment._id || enrollment.id),
      courseId: serializeId(enrollment.courseId),
      userId: serializeId(enrollment.userId),
      enrolledAt: serializeDate(enrollment.enrolledAt),
      status: enrollment.status,
      progress: enrollment.progress,
      // Add any other enrollment fields you need
    })),
    createdOn: serializeDate(course.createdOn),
    active: course.active,
    status: course.status,
    slug: course.slug,
    learning: course.learning,
    duration: course.duration,
  }));

  // Transform categories to match the expected format
  const categories = categoriesData.map((category) => ({
    id: serializeId(category._id || category.id),
    label: category.title as string,
    value: serializeId(category._id || category.id),
  }));

  return <CoursesPageClient initialCourses={courses} categories={categories} />;
};

export default CoursesPage;
