'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {toast} from "sonner";

interface IProps {
    courseId: string;
    progressPercentage: number;
}

export const DownloadCertificate = ({courseId, progressPercentage}: IProps) => {
    const handleCertificateDownload = async () => {
        try {
            setIsCertificateDownloading(true);

            const response = await fetch(`/api/certificate?courseId=${courseId}`);

            if (!response.ok) {
                console.error('Failed to download certificate');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "certificate.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            URL.revokeObjectURL(url);

            toast.success("Certificate has been downloaded successfully.");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsCertificateDownloading(false);
        }
    }
    const [isCertificateDownloading, setIsCertificateDownloading] = useState(false);

    return (
        <Button onClick={handleCertificateDownload} disabled={progressPercentage !== 100} className="w-full mt-6">
            Download Certificate
        </Button>
    )
}