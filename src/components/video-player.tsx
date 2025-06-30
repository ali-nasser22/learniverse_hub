"use client";

import { useState } from "react";

interface VideoPlayerProps {
  src?: string;
}

export const VideoPlayer = ({ src }: VideoPlayerProps = {}) => {
  const videoSrc = src || "";
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {videoSrc ? (
        <div className="relative aspect-video">
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-600">Loading video...</p>
              </div>
            </div>
          )}

          {/* Video iframe */}
          <iframe
            className="w-full h-full"
            src={videoSrc}
            title="Video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={handleLoad}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </div>
      ) : (
        <div className="relative aspect-video bg-gray-100 rounded-md flex items-center justify-center">
          <p className="text-gray-500">No video URL provided</p>
        </div>
      )}
    </>
  );
};
