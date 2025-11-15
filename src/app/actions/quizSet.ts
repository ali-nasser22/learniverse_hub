"use server";

import {Quiz} from "../../../model/quiz-model";
import {QuizSet} from "../../../model/quizsets-model";
import {getSlug} from "@/lib/slug";
import {getLoggedInUser} from "@/lib/loggedin-user";
import mongoose from "mongoose";

export async function updateQuizSet(quizSetId: string, data: FormData) {
    try {
        const title = data.get("title");
        const slug = data.get("slug");
        const myQuizSet = await QuizSet.findByIdAndUpdate(quizSetId, {
            title: title,
            slug: slug,
        });
        return JSON.parse(JSON.stringify(myQuizSet));
    } catch (error) {
        console.log(error);
        throw new Error("Failed");
    }
}

export async function updateQuizSetStatus(quizSetId: string, active: boolean) {
    try {
        const updatedQuizSet = await QuizSet.findByIdAndUpdate(
            quizSetId,
            {active},
            {new: true}
        );

        if (!updatedQuizSet) {
            throw new Error("Quiz set not found");
        }

        return JSON.parse(JSON.stringify(updatedQuizSet));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to update quiz set status");
    }
}

export async function deleteQuizSet(quizSetId: string) {
    try {
        const quizSet = await QuizSet.findById(quizSetId);
        if (!quizSet) {
            throw new Error("Quiz set not found");
        }

        // Delete all quizzes in the set
        await Quiz.deleteMany({_id: {$in: quizSet.quizIds}});

        // Delete the quiz set
        await QuizSet.findByIdAndDelete(quizSetId);

        return {success: true};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete quiz set");
    }
}

export async function createQuizSetServer(data: { title: string }) {
    try {
        const loggedInUser = await getLoggedInUser();
        const quizSet = await QuizSet.create({
            title: data.title,
            active: false,
            quizIds: [],
            slug: getSlug(data.title) as string,
            instructorId: new mongoose.Types.ObjectId(loggedInUser?.id),
        });

        return JSON.parse(JSON.stringify(quizSet));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create quiz set");
    }
}

export async function getPublishedQuizSets() {
    try {
        const publishedQuizSets = await QuizSet.find({active: true});
        return JSON.parse(JSON.stringify(publishedQuizSets));
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch published quiz sets");
    }
}
