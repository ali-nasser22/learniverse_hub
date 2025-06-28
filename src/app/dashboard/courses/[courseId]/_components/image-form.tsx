"use client";

import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as z from "zod";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateCourse } from "@/app/actions/course";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface InitialData {
  imageUrl?: string;
}

interface ImageFormProps {
  initialData: InitialData;
  courseId: string;
}

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || "");

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: FormValues) => {
    try {
      if (values.imageUrl !== initialData.imageUrl) {
        await updateCourse(courseId, {
          thumbnail: values.imageUrl,
        });
      }
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleUploadComplete = (uploadedImageUrl: string, imageId: string) => {
    setImageUrl(uploadedImageUrl);
    onSubmit({ imageUrl: uploadedImageUrl });
  };

  const currentImageUrl = imageUrl || initialData.imageUrl;

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !currentImageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && currentImageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!currentImageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={currentImageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadDropzone onUploadComplete={handleUploadComplete} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
