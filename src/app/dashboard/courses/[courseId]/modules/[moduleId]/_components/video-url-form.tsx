"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/video-player";
import { updateLesson } from "@/app/actions/lesson";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Required",
  }),
  duration: z.number().min(1, {
    message: "Required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface InitialData {
  url?: string;
  duration?: number;
}

interface VideoUrlFormProps {
  initialData: InitialData;
  moduleId: string;
  lessonId: string;
}

export const VideoUrlForm = ({
  initialData,
  moduleId,
  lessonId,
}: VideoUrlFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url");

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData.url || "",
      duration: initialData.duration || 0,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Saving video data:", {
        moduleId,
        lessonId,
        url: values.url,
        duration: values.duration,
      });
      await updateLesson(
        {
          video_url: values.url,
          duration: values.duration,
        },
        lessonId,
        moduleId
      );

      toast.success("Lesson updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a video file");
      return;
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File size must be less than 100MB");
      return;
    }

    setIsUploading(true);
    toast.info("Uploading video...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // Set the video URL in the form
        form.setValue("url", result.playbackUrl);

        // Handle duration properly - convert seconds to minutes
        const durationInMinutes =
          result.duration > 0 ? Math.round(result.duration / 60) : 0;
        form.setValue("duration", durationInMinutes);

        toast.success(`Video uploaded successfully!`);

        if (result.duration <= 0) {
          toast.info(
            "Duration will be auto-detected after video processing completes"
          );
        }
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <div className="mt-6">
            <VideoPlayer src={initialData.url} />
          </div>
        </>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          {/* Upload Method Selector */}
          <div className="flex space-x-2 mb-4">
            <Button
              type="button"
              variant={uploadMethod === "url" ? "default" : "outline"}
              onClick={() => setUploadMethod("url")}
              size="sm"
            >
              Enter URL
            </Button>
            <Button
              type="button"
              variant={uploadMethod === "upload" ? "default" : "outline"}
              onClick={() => setUploadMethod("upload")}
              size="sm"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>

          {/* Video Upload Section */}
          {uploadMethod === "upload" && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                disabled={isUploading}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className={`cursor-pointer flex flex-col items-center ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-lg font-medium">
                  {isUploading ? "Uploading..." : "Click to upload video"}
                </span>
                <span className="text-sm text-gray-500 mt-1">
                  Maximum file size 100MB. MP4, MOV, AVI supported.
                </span>
              </label>
            </div>
          )}

          {/* URL Form Section */}
          {uploadMethod === "url" && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* url */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'https://www.youtube.com/watch?v=...'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Duration</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isSubmitting}
                          placeholder="In Minutes"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Save Button for Upload Method */}
          {uploadMethod === "upload" && form.getValues().url && (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() => onSubmit(form.getValues())}
                disabled={isUploading}
              >
                Save Video
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
