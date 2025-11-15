import {serializeDocuments} from "@/lib/serialize";
import {IQuizSet} from "../../../../model/quizsets-model";
import {getQuizSets} from "../../../../queries/quizsets";
import {columns} from "./_components/columns";
import {DataTable} from "./_components/data-table";
import {getLoggedInUser} from "@/lib/loggedin-user";

const QuizSets = async () => {
    const loggedInUser = await getLoggedInUser();
    const quizSets = await getQuizSets(loggedInUser?.id);
    const serializedQuizSets = serializeDocuments(quizSets) as unknown as IQuizSet[];
    console.log(serializedQuizSets);
    return (
        <div className="p-6">
            <DataTable columns={columns} data={serializedQuizSets}/>
        </div>
    );
};

export default QuizSets;
