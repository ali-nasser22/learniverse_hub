import { serializeDocuments } from "@/lib/serialize";
import { IQuizSet } from "../../../../model/quizsets-model";
import { getQuizSets } from "../../../../queries/quizsets";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const QuizSets = async () => {
  const quizSets = await getQuizSets();
  const serializedQuizSets = serializeDocuments(quizSets) as unknown as IQuizSet[];
  console.log(serializedQuizSets);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={serializedQuizSets} />
    </div>
  );
};

export default QuizSets;
