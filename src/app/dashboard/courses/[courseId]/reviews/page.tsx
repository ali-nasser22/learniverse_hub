import { getInstructorDashboardData } from "@/lib/dashboard-helper";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { deepSerialize } from "@/lib/serialize";
import { ITestimonial } from "../../../../../../model/testimonial-model";
import { getUserById } from "../../../../../../queries/users";
import { getCourseById } from "../../../../../../queries/courses";

interface ReviewPageProps {
  params: {
    courseId: string;
  };
}
interface Review {
  id: string;
  content: string;
  courseId: string;
  rating: number;
  student: string;
  user: string;
}

const ReviewsPage = async ({ params }: ReviewPageProps) => {
  const { courseId } = await params;
  const data = await getInstructorDashboardData();
  const serializedData = deepSerialize(data);
  const reviews = serializedData?.courseDetails?.reviews as ITestimonial[];

  const reviewsForCourse = reviews.filter(
    (review) => review?.courseId.toString() === courseId
  ) as unknown as Review[];

  const course = await getCourseById(courseId);

  const reviewData = reviewsForCourse.map(async (review) => {
    const user = await getUserById(review?.user);
    return {
      id: review?.id,
      student: `${user?.firstName} ${user?.lastName}`,
      review: review?.content,
      rating: review?.rating,
    };
  });
  const reviewDataSolved = await Promise.all(reviewData);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-mono">
        <span className="font-bold ">{course?.title}</span> Reviews
      </h2>
      <DataTable columns={columns} data={reviewDataSolved} />
    </div>
  );
};

export default ReviewsPage;
