'use client'
import {ILesson} from "../../../../../../../model/lesson-model";
import ReactPlayer from 'react-player'
import {SyntheticEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

interface IProps {
    courseId: string;
    lesson: ILesson;
    module: string;
}

export const LessonVideo = ({courseId, lesson, module}: IProps) => {
    const [hasWindow, setHasWindow] = useState(false);
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [duration, setDuration] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasWindow(true);
        }
    }, [])

    // Extract video ID and convert to manifest URL, because cloudflare isn't supported by ReactPlayer
    const getVideoManifestUrl = (iframeUrl: string) => {
        const videoId = iframeUrl.split('/').pop();
        return `https://videodelivery.net/${videoId}/manifest/video.m3u8`;
    }

    const manifestUrl = getVideoManifestUrl(lesson.video_url);

    const handleOnStart = () => {
        console.log('started')
        setStarted(true);
    }
    const handleOnDuration = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
        const videoElement = event.target as HTMLVideoElement;
        if (videoElement && !isNaN(videoElement.duration)) {
            const videoDuration = videoElement.duration;
            setDuration(videoDuration);
        }
    }
    const handleOnProgress = () => {
        // @todo
    }
    const handleOnEnded = () => {
        console.log('ended')
        setEnded(true);
    }

    return (
        <>
            {hasWindow && (
                <ReactPlayer
                    src={manifestUrl}
                    controls={true}
                    width="100%"
                    height="470px"
                    onStart={handleOnStart}
                    onDurationChange={handleOnDuration}
                    onProgress={handleOnProgress}
                    onEnded={handleOnEnded}
                />
            )}
        </>
    );
}