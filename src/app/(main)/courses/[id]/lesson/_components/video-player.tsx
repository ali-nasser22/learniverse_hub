"use client";

interface VideoPlayerProps {
    videoUrl: string;
}

export const VideoPlayer = ({videoUrl}: VideoPlayerProps) => {
    return (
        <div className="relative aspect-video">
            <iframe
                className="w-full h-full"
                src={videoUrl}
                title="video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
};
