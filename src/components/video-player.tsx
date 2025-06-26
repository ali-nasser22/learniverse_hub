"use client";

interface VideoPlayerProps {
  src?: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps = {}) => {
  const videoSrc =
    src || "https://www.youtube.com/embed/LJi2tiWiYmI?si=-vs8fO-xzWmu7ztG";

  return (
    <div className="relative aspect-video">
      <iframe
        className="w-full h-full"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};
