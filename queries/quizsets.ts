import {replaceMongoIdInArray, replaceMongoIdInObject,} from "@/lib/convertData";
import {Quiz} from "../model/quiz-model";
import {IQuizSet, QuizSet} from "../model/quizsets-model";

export async function getQuizSets() {
    try {
        const quizSets = await QuizSet.find({})
            .populate({
                path: "quizIds",
                model: Quiz,
            })
            .lean();
        return replaceMongoIdInArray(quizSets) as IQuizSet[];
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch quiz sets");
    }
}

export async function getQuizSetById(quizSetId: string) {
    try {
        const quizSet = await QuizSet.findById(quizSetId as string)
            .populate({
                path: "quizIds",
                model: Quiz,
            })
            .lean();
        return replaceMongoIdInObject(quizSet) as unknown as IQuizSet;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch quiz set");
    }
}

