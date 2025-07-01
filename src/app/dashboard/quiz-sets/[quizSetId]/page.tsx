import AlertBanner from "@/components/banner";

import { QuizSetAction } from "./_components/quiz-set-action";
import { TitleForm } from "./_components/title-form";
import { AddQuizForm } from "./_components/add-quiz-form";
import { QuizCard } from "./_components/quiz-card";
import { getQuizSetById } from "../../../../../queries/quizsets";
import { serializeDocuments } from "@/lib/serialize";
import { IQuiz } from "../../../../../model/quiz-model";

interface QuizSetProps {
  params: Promise<{
    quizSetId: string;
  }>;
}

const EditQuizSet = async ({ params }: QuizSetProps) => {
  const quizSetId = (await params).quizSetId;
  const quizSet = await getQuizSetById(quizSetId as string);
  const serializedQuizSet = serializeDocuments(
    quizSet.quizIds
  ) as unknown as IQuiz[];

  return (
    <>
      {!quizSet.active && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction
            quizSetId={quizSet.id as string}
            isPublished={quizSet.active}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          {/* Quiz List */}
          <div className="max-lg:order-2">
            <h2 className="text-xl mb-6">Questions List</h2>
            {quizSet.quizIds.length === 0 ? (
              <AlertBanner
                label="No Questions are in the set, add some using the form above."
                variant="warning"
                className="rounded mb-6"
              />
            ) : (
              <div className="space-y-6">
                {serializedQuizSet.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    quizSetId={quizSet.id as string}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your quiz set</h2>
            </div>
            <div className="max-w-[800px]">
              <TitleForm
                initialData={{
                  title: quizSet.title,
                }}
                quizSetId={quizSet.id as string}
              />
            </div>

            <div className="max-w-[800px]">
              <AddQuizForm
                setQuestions={serializedQuizSet}
                quizSetId={quizSet.id as string}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuizSet;
