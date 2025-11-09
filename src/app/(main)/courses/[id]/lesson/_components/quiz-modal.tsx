"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {ChangeEvent, useState} from "react";
import {addQuizAssessment} from "@/app/actions/quizQuestion";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface IProps {
    quizzes: {
        id?: string;
        title: string;
        description: string;
        options: {
            label: string;
            isTrue: boolean;
        }[];
    }[];
    courseId: string;
    quizSetId?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

function QuizModal({quizzes, open, courseId, quizSetId, setOpen}: IProps) {
    const router = useRouter();
    const totalQuestions = quizzes?.length;
    const [questionIndex, setQuestionIndex] = useState(0);
    const lastQuestionIndex = totalQuestions - 1;
    const currentQuestion = quizzes[questionIndex];
    const [answers, setAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [allCorrect, setAllCorrect] = useState(false);

    const allQuestionsAnswered = answers.length === totalQuestions;

    const getCurrentAnswer = () => {
        const answer = answers.find((a) => a.questionId === currentQuestion?.id);
        return answer?.options?.option || null;
    };

    const questionChangeHandler = (type: "next" | "prev") => {
        const nextQuestionIndex = questionIndex + 1;
        const prevQuestionIndex = questionIndex - 1;

        if (type === "next" && nextQuestionIndex <= lastQuestionIndex) {
            return setQuestionIndex((prev) => prev + 1);
        }

        if (type === "prev" && prevQuestionIndex >= 0) {
            setQuestionIndex((prev) => prev - 1);
        }
    };

    function updateAnswer(e: ChangeEvent, questionId: string, title: string, label: string) {
        if (isSubmitted) return;

        const key = e.target.name;
        const checked = e.target.checked;
        const obj = {};

        if (checked) {
            // @ts-ignore
            obj["option"] = label;
        }

        const answer = {
            questionId,
            options: obj,
        };

        const found = answers.filter((a) => a.questionId === answer.questionId);

        if (found) {
            const filtered = answers.filter((a) => a.questionId !== answer.questionId);
            setAnswers([...filtered, answer]);
        } else {
            setAnswers([...answers, answer]);
        }
    }

    const checkAllAnswersCorrect = () => {
        let correctCount = 0;

        answers.forEach((answer) => {
            const question = quizzes.find((q) => q.id === answer.questionId);
            if (question) {
                const correctOption = question.options.find((opt) => opt.isTrue);
                if (correctOption && correctOption.label === answer.options.option) {
                    correctCount++;
                }
            }
        });

        return correctCount === totalQuestions;
    };

    const formatAnswersForSubmission = () => {
        return answers.map((answer) => {
            const question = quizzes.find((q) => q.id === answer.questionId);

            if (!question) return null;

            const formattedOptions = question.options.map((opt) => ({
                option: opt.label,
                isCorrect: opt.isTrue,
                isSelected: opt.label === answer.options.option
            }));

            return {
                quizId: answer.questionId,
                options: formattedOptions,
                attempted: true
            };
        }).filter(Boolean);
    };

    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        const areAllCorrect = checkAllAnswersCorrect();
        setAllCorrect(areAllCorrect);
        setIsSubmitted(true);

        if (areAllCorrect) {
            try {
                const formattedAnswers = formatAnswersForSubmission();
                await addQuizAssessment(courseId, quizSetId, formattedAnswers);
                setOpen(false);
                router.refresh();
                toast.success("Quiz Submitted successfully.");
            } catch (error) {
                toast.error("Problem in submitting the quiz please try again later.");
                console.error(error);
            }
        }
    };

    const handleRetake = () => {
        setAnswers([]);
        setIsSubmitted(false);
        setAllCorrect(false);
        setQuestionIndex(0);
    };

    const currentAnswer = getCurrentAnswer();

    const getOptionClassName = (option: any) => {
        const baseClass = "flex items-center space-x-3 border rounded-lg p-4 cursor-pointer";

        if (!isSubmitted) {
            return `${baseClass} hover:bg-accent`;
        }

        const isSelected = currentAnswer === option.label;
        const isCorrect = option.isTrue;

        if (isSelected && isCorrect) {
            return `${baseClass} bg-green-100 border-green-500`;
        }

        if (isSelected && !isCorrect) {
            return `${baseClass} bg-red-100 border-red-500`;
        }

        if (!isSelected && isCorrect) {
            return `${baseClass} bg-green-50 border-green-300`;
        }

        return baseClass;
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="text-2xl">Quiz Details</DialogTitle>
                    <div>
                        <div className="text-sm text-gray-500 mb-4">
                            Question{" "}
                            <span className="text-foreground font-bold">
                {questionIndex + 1} / {totalQuestions}
              </span>
                        </div>
                        <div className="text-xl font-semibold mb-2">
                            {" "}
                            {currentQuestion?.title}
                        </div>
                        <div className="text-sm text-muted-foreground mb-6">
                            {" "}
                            A question can only have one correct answer & there is no negative
                            marking for incorrect selection.
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {currentQuestion?.options.map((option) => (
                                <div
                                    key={option.label}
                                    className={getOptionClassName(option)}
                                >
                                    <input
                                        type="radio"
                                        name={currentQuestion?.title}
                                        checked={currentAnswer === option.label}
                                        disabled={isSubmitted}
                                        onChange={(e) => {
                                            updateAnswer(
                                                e,
                                                currentQuestion.id || "",
                                                currentQuestion.title,
                                                option.label
                                            );
                                        }}
                                        id={`option-${option.label}`}
                                    />
                                    <Label
                                        htmlFor={`option-${option.label}`}
                                        className="flex-1 cursor-pointer"
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={questionIndex === 0}
                            onClick={() => questionChangeHandler("prev")}
                        >
                            <ArrowLeft/>
                            Previous Question
                        </Button>

                        <Button
                            disabled={questionIndex >= lastQuestionIndex}
                            onClick={() => questionChangeHandler("next")}
                        >
                            Next Question
                            <ArrowRight/>
                        </Button>

                        {allQuestionsAnswered && !isSubmitted && (
                            <Button className="bg-green-600" onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}

                        {isSubmitted && !allCorrect && (
                            <Button className="bg-orange-600" onClick={handleRetake}>
                                Retake Quiz
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default QuizModal;