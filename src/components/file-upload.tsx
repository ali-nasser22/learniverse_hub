"use client";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface UploadDropzoneProps {
  isMulti?: boolean;
  label?: string;
  onUploadComplete?: (imageUrl: string, imageId: string) => void;
}

export const UploadDropzone = (props: UploadDropzoneProps) => {
  const { isMulti = false, label, onUploadComplete } = props;

  const [droppedFiles, setDroppedFiles] = useState<File[] | null>(null);

  console.log(droppedFiles);

  const [isUploading, setIsUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);

  // upload progress utility
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    const progressInterval = startSimulatedProgress();
    setDroppedFiles(acceptedFiles);

    try {
      const file = acceptedFiles[0]; // Take first file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadProgress(100);
        toast.success('Image uploaded successfully!');
        console.log('Image URL:', result.imageUrl);
        
        // Call the callback function if provided
        if (onUploadComplete) {
          onUploadComplete(result.imageUrl, result.imageId);
        }
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
      console.error('Upload error:', error);
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    multiple: isMulti,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  useEffect(() => {
    if (fileRejections.length > 1) {
      toast.error("Too many files rejected");
    } else if (fileRejections.length > 0) {
      toast.error("File rejected - check size and format");
    }
  }, [fileRejections]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mt-3 flex cursor-pointer items-center justify-center rounded-md border border-dashed p-3 py-12 hover:bg-muted/30",
        isUploading ? "pointer-events-none !cursor-not-allowed opacity-80" : ""
      )}
    >
      <input multiple={isMulti} {...getInputProps()} disabled={isUploading} />
      <div className="flex flex-col items-center gap-3 text-center !text-[#858585]">
        <CloudUpload size={48} className="text-gray-600" />
        <h4 className="!font-normal !text-[#858585]">
          <span className="font-semibold text-black underline">
            Click to upload
          </span>{" "}
          or drag and drop <br />
          Maximum file size 50 MB.
        </h4>
        <p className="text-sm">Only JPEG, PNG and WebP images will be accepted</p>
        {isUploading ? (
          <div className="mx-auto mt-4 w-full max-w-xs">
            <Progress
              value={uploadProgress}
              className="h-1 w-full bg-zinc-200"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};