"use client";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {createNewCategory} from "@/app/actions/category";
import {toast} from "sonner";
import {UploadDropzone} from "@/components/file-upload";
import {useState} from "react";
import Image from "next/image";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Category Title is required!",
    }),
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const AddCategory = () => {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string>("");

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            imageUrl: "",
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const handleUploadComplete = (uploadedImageUrl: string, imageId: string) => {
        setImageUrl(uploadedImageUrl);
        form.setValue("imageUrl", uploadedImageUrl, {
            shouldValidate: true
        });
    };

    const onSubmit = async (values: FormValues) => {
        try {
            const cat = await createNewCategory(values.title, values.imageUrl);
            if (cat) {
                console.log(cat);
                toast.success("Category Added Successfully!");
                router.push("/admin/dashboard/categories");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add category");
        }
    };

    return (
        <section className="py-8">
            <h1 className="text-center text-2xl font-bold">Add Category</h1>
            <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
                <div className="max-w-full w-[536px]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 mt-8"
                        >
                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="Category title..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* Thumbnail */}
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail</FormLabel>
                                        <FormControl>

                                            {!imageUrl ? (
                                                <div>
                                                    <UploadDropzone
                                                        onUploadComplete={handleUploadComplete}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative aspect-video mt-2">
                                                    <Image
                                                        alt="Category thumbnail"
                                                        width={550}
                                                        height={500}
                                                        className="object-cover rounded-md"
                                                        priority
                                                        src={imageUrl}
                                                    />
                                                </div>
                                            )}

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center gap-x-2">
                                <Link href="/admin/dashboard/categories">
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={!isValid || isSubmitting}>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default AddCategory;