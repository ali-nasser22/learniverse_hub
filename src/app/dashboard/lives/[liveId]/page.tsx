"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import {getLiveById, updateLiveForUser} from "../../../../../queries/lives";


const formSchema = z.object({
    title: z.string().min(1, {message: "Title is required!"}),
    date: z.date({required_error: "Date is required!"}),
    time: z.string({required_error: "Time is required!"}).min(1, {
        message: "Time is required!",
    }),
    description: z.string().min(1, {message: "Description is required!"}),
    url: z.string().url({message: "Invalid URL format!"}).min(1, {message: "URL is required!"}),
});

type FormValues = z.infer<typeof formSchema>;

const EditLive = () => {
    const router = useRouter();
    const {liveId} = useParams();
    const [livesData, setLivesData] = useState<any>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            date: undefined,
            time: "",
            url: "",
        },
    });

    const {isSubmitting} = form.formState;

    useEffect(() => {
        const getLiveData = async () => {
            const live = await getLiveById(liveId as string);
            setLivesData(live);

            if (live) {
                const scheduleDate = new Date(live.schedule);
                const hours = scheduleDate.getHours().toString().padStart(2, '0');
                const minutes = scheduleDate.getMinutes().toString().padStart(2, '0');

                form.reset({
                    title: live.title,
                    description: live.description,
                    date: scheduleDate,
                    time: `${hours}:${minutes}`,
                    url: live.liveUrl,
                });
            }
        };
        getLiveData();
    }, [liveId, form]);

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            const updatedLive = await updateLiveForUser(values, liveId as string);
            if (updatedLive.success) {
                router.push(`/dashboard/lives`);
                toast.success("Live updated");
            } else {
                toast.error(updatedLive.message || "Failed to update live");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div className="max-w-full w-[536px]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Live Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g 'Reactive Accelerator'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="time"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="block"
                                            disabled={isSubmitting}
                                            placeholder="Select time"
                                            {...field}
                                            type="time"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Live Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Live overview"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Write a brief description of your live.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="url"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Live Url</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="https://zoom.us/j/123456789"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the URL for the live session.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Link href="/dashboard/lives">
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditLive;