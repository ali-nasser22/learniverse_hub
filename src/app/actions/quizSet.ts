"use server";

import { QuizSet } from "../../../model/quizsets-model";

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
