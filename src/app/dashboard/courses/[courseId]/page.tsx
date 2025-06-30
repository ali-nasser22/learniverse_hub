import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";
import { CourseActions } from "./_components/course-action";
import AlertBanner from "../../../../components/banner";
import { QuizSetForm } from "./_components/quiz-set-form";
import { getCourseById } from "../../../../../queries/courses";
import { SubtitleForm } from "./_components/subtitle-form";
import {
  getCategoryById,
  getCategoryList,
} from "../../../../../queries/categories";
import { serializeDocument } from "@/lib/serialize";
import { IModule } from "../../../../../model/module-model";
import { ICourse } from "../../../../../model/course-model";

interface EditCourseProps {
  params: Promise<{
    courseId: string;
  }>;
}

const EditCourse = async ({ params }: EditCourseProps) => {
  const courseId = (await params).courseId;
  const course = await getCourseById(courseId);
  const categories = await getCategoryList();
  const category = await getCategoryById(course?.category as unknown as string);
  const mappedCategories = categories.map((category) => ({
    value: category?.id,
    label: category?.title,
  }));
  const rowModules = course?.modules?.sort((a, b) => a.order - b.order);
  const modules = serializeDocument(rowModules || []) as unknown as IModule[];
  const serializedCourse = serializeDocument(
    course as unknown as ICourse
  ) as unknown as ICourse;
  return (
    <>
      {!course?.active && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the courses list."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions course={serializedCourse} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course?.title,
              }}
              courseId={courseId}
            />
            <SubtitleForm
              initialData={{
                subtitle: course?.subtitle,
              }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{
                description: course?.description,
              }}
              courseId={courseId}
            />
            <ImageForm
              initialData={{
                imageUrl: course?.thumbnail,
              }}
              courseId={courseId}
            />
            <CategoryForm
              initialData={{
                options: mappedCategories,
                categoryId: category?.id,
              }}
              courseId={courseId}
            />
            <QuizSetForm initialData={{}} courseId="1" />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>
              <ModulesForm initialData={{ modules }} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm
                initialData={{
                  price: course?.price,
                }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
