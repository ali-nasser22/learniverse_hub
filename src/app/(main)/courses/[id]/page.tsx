import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";

interface SingleCoursePageProps {
  params: Promise<{ id: string }>;
}

const SingleCoursePage: React.FC<SingleCoursePageProps> = ({ params }) => {
  return (
    <>
      <CourseDetailsIntro params={params} />
      <CourseDetails params={params} />
      <Testimonials params={params} />
      <RelatedCourses />
    </>
  );
};
export default SingleCoursePage;
