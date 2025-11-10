"use client";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {addReview, deleteReview, updateReview} from "@/app/actions/review";
import {useEffect, useState} from "react";
import {getTestimonialForUser} from "../../../../../../../queries/testimonials";
import {Trash2} from "lucide-react";

const formSchema = z.object({
    rating: z.coerce
        .number()
        .min(1, {
            message: "Rating can be 1 to 5",
        })
        .max(5, {
            message: "Rating can be 1 to 5",
        }),
    review: z.string().min(1, {
        message: "Description is required!",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface ReviewModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    courseId: string;
    userId: string;
}

export const ReviewModal = ({open, setOpen, courseId, userId}: ReviewModalProps) => {
    const [existingReview, setExistingReview] = useState<{
        id: string;
        rating: number;
        review: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 0,
            review: "",
        },
    });

    const {isSubmitting} = form.formState;

    // Fetch existing review when modal opens
    useEffect(() => {
        const fetchReview = async () => {
            if (!open) return;

            setIsLoading(true);
            try {
                const testimonial = await getTestimonialForUser(userId, courseId);
                if (testimonial) {
                    setExistingReview({
                        id: testimonial.id,
                        rating: testimonial.rating,
                        review: testimonial.review,
                    });
                    // Pre-fill form with existing review
                    form.setValue('rating', testimonial.rating);
                    form.setValue('review', testimonial.review);
                } else {
                    setExistingReview(null);
                    // Reset form for new review
                    form.reset({
                        rating: 0,
                        review: "",
                    });
                }
            } catch (error) {
                console.error("Error fetching testimonial:", error);
                toast.error("Failed to load existing review");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReview();
    }, [open, courseId, userId, form]);

    const onSubmit = async (values: FormValues) => {
        try {
            if (existingReview) {
                await updateReview(existingReview.id, values.rating, values.review);
                toast.success("Review was updated successfully.");
                console.log("Update review:", {id: existingReview.id, ...values});
            } else {
                await addReview(userId, courseId, values.rating, values.review);
                toast.success("Review added successfully");
            }
            setOpen(false);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    const handleDelete = async () => {
        if (!existingReview) return;

        try {
            await deleteReview(existingReview.id);
            toast.success("Review was deleted successfully.");
            console.log("Delete review:", existingReview.id);
            setOpen(false);
        } catch (error) {
            toast.error("Failed to delete review");
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="overflow-y-auto max-h-[90vh]"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogTitle>
                    {existingReview ? "Update Your Review" : "Submit Your Review"}
                </DialogTitle>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-muted-foreground">Loading...</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 mt-8"
                        >
                            {/* rating */}
                            <FormField
                                control={form.control}
                                name="rating"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Course Rating</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g 5"
                                                {...field}
                                                type="number"
                                                min={1}
                                                max={5}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/* review */}
                            <FormField
                                control={form.control}
                                name="review"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Your Review</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Course review"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Write a brief overview about the course
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between gap-x-2">
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {existingReview ? "Update" : "Submit"}
                                    </Button>
                                </div>

                                {existingReview && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={handleDelete}
                                        disabled={isSubmitting}
                                        title="Delete review"
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
};