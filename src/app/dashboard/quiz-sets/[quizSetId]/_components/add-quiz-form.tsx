"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {useRouter} from "next/navigation";

import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {IQuiz} from "../../../../../../model/quiz-model";
import {createQuizQuestion} from "@/app/actions/quizQuestion";

const formSchema = z.object({
    title: z
        .string({
            required_error: "Question is required",
        })
        .min(1, {
            message: "Title is required",
        }),
    description: z.string().optional(),
    explanations: z
        .string({
            required_error: "Explanations is required",
        })
        .min(1, {
            message: "Explanations is required",
        }),
    mark: z
        .number({
            required_error: "Mark is required",
        })
        .min(1, {
            message: "Mark must be at least 1",
        }),
    slug: z
        .string({
            required_error: "Slug is required",
        })
        .min(1, {
            message: "Slug is required",
        }),
    optionA: z.object({
        text: z
            .string({
                required_error: "Option text is required",
            })
            .min(1, {
                message: "Option text is required",
            }),
        is_correct: z.boolean().default(false),
    }),
    optionB: z.object({
        text: z
            .string({
                required_error: "Option text is required",
            })
            .min(1, {
                message: "Option text is required",
            }),
        is_correct: z.boolean().default(false),
    }),
    optionC: z.object({
        text: z
            .string({
                required_error: "Option text is required",
            })
            .min(1, {
                message: "Option text is required",
            }),
        is_correct: z.boolean().default(false),
    }),
    optionD: z.object({
        text: z
            .string({
                required_error: "Option text is required",
            })
            .min(1, {
                message: "Option text is required",
            }),
        is_correct: z.boolean().default(false),
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddQuizFormProps {
    setQuestions: IQuiz[];
    quizSetId: string;
}

export const AddQuizForm = ({setQuestions, quizSetId}: AddQuizFormProps) => {

    const router = useRouter();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "all",
        defaultValues: {
            title: "",
            description: "",
            explanations: "",
            mark: 5,
            slug: "",
            optionA: {
                text: "",
                is_correct: false,
            },
            optionB: {
                text: "",
                is_correct: false,
            },
            optionC: {
                text: "",
                is_correct: false,
            },
            optionD: {
                text: "",
                is_correct: false,
            },
        },
    });

    const {isSubmitting, isValid, errors} = form.formState;
    console.log(errors);

    const onSubmit = async (values: FormValues): Promise<void> => {
        try {
            const structuredQuiz: Partial<IQuiz> = {
                title: values.title,
                description: values.description || "",
                explanations: values.explanations,
                mark: values.mark,
                slug: values.slug,
                options: [
                    values.optionA,
                    values.optionB,
                    values.optionC,
                    values.optionD,
                ],
            };

            if (isValid) {
                await createQuizQuestion(
                    quizSetId,
                    structuredQuiz as IQuiz
                );
            }

            form.reset({
                title: "",
                description: "",
                explanations: "",
                mark: 1,
                slug: "",
                optionA: {
                    text: "",
                    is_correct: false,
                },
                optionB: {
                    text: "",
                    is_correct: false,
                },
                optionC: {
                    text: "",
                    is_correct: false,
                },
                optionD: {
                    text: "",
                    is_correct: false,
                },
            });

            router.refresh();
            toast.success("Question added successfully");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-gray-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Add New Question
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    {/* quiz title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Question Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Enter question title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* quiz description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Question Description (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder="Enter question description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* explanations */}
                    <FormField
                        control={form.control}
                        name="explanations"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Explanations</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder="Enter question explanation"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* mark */}
                    <FormField
                        control={form.control}
                        name="mark"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Mark</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        disabled={isSubmitting}
                                        placeholder="Enter question mark"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseInt(e.target.value) || 0)
                                        }
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* slug */}
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Enter question slug"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* --------------- OPTION A -------- */}
                    <div className="space-y-3">
                        <FormLabel>Option A</FormLabel>
                        <div className="flex items-start gap-3">
                            <FormField
                                control={form.control}
                                name="optionA.is_correct"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="optionA.text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Enter option text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --------------- OPTION B -------- */}
                    <div className="space-y-3">
                        <FormLabel>Option B</FormLabel>
                        <div className="flex items-start gap-3">
                            <FormField
                                control={form.control}
                                name="optionB.is_correct"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="optionB.text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Enter option text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --------------- OPTION C -------- */}
                    <div className="space-y-3">
                        <FormLabel>Option C</FormLabel>
                        <div className="flex items-start gap-3">
                            <FormField
                                control={form.control}
                                name="optionC.is_correct"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="optionC.text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Enter option text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --------------- OPTION D -------- */}
                    <div className="space-y-3">
                        <FormLabel>Option D</FormLabel>
                        <div className="flex items-start gap-3">
                            <FormField
                                control={form.control}
                                name="optionD.is_correct"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="optionD.text"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    disabled={isSubmitting}
                                                    placeholder="Enter option text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-2">
                        <Button disabled={isSubmitting} type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
