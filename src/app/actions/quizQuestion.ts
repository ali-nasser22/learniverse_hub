"use server";
import {IQuiz, Quiz} from "../../../model/quiz-model";
import {QuizSet} from "../../../model/quizsets-model";
import {Assessment} from "../../../model/assessment-model";
import {getReport} from "../../../queries/reports";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {Report} from "../../../model/report-model";

export async function createQuizQuestion(quizSetId: string, data: IQuiz) {
    try {
        const quizQuestion = await Quiz.create(data);
        const quizSet = await QuizSet.findById(quizSetId);
        if (!quizSet) {
            throw new Error("Quiz set not found");
        }
        quizSet.quizIds.push(quizQuestion._id);
        await quizSet.save();
        return JSON.parse(JSON.stringify(quizQuestion));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create quiz question");
    }
}

export async function updateQuizQuestion(quizId: string, data: Partial<IQuiz>) {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, data, {
            new: true,
        });

        if (!updatedQuiz) {
            throw new Error("Quiz not found");
        }

        return JSON.parse(JSON.stringify(updatedQuiz));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update quiz question");
    }
}

export async function deleteQuizQuestion(quizSetId: string, quizId: string) {
    try {
        // Delete the quiz
        await Quiz.findByIdAndDelete(quizId);

        // Remove quiz ID from quiz set
        const quizSet = await QuizSet.findById(quizSetId);
        if (!quizSet) {
            throw new Error("Quiz set not found");
        }

        quizSet.quizIds = quizSet.quizIds.filter(
            (id: string) => id.toString() !== quizId
        );
        await quizSet.save();

        return {success: true};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete quiz question");
    }
}


export async function addQuizAssessment(courseId: string, quizSetId: string, answers) {
    try {
        const assessment = await Assessment.create({
            assessments: answers,
            otherMarks: 0
        });
        const loggedInUser = await getLoggedInUser();
        const foundReport = await getReport({
            course: courseId,
            student: loggedInUser?.id
        });
        if (!foundReport) {
            throw new Error("Failed to add answer for course");
        }
        await Report.findByIdAndUpdate(foundReport?.id, {
            quizAssessment: assessment._id
        })
    } catch (error) {
        console.log(error);
    }
}