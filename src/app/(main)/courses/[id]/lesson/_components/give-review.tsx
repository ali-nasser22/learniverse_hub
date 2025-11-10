'use client'
import {Button} from "@/components/ui/button";
import {ReviewModal} from "@/app/(main)/courses/[id]/lesson/_components/review-modal";
import {useState} from "react";

interface IProps {
    courseId: string;
    userId: string
}

export const GiveReviewModal = ({courseId, userId}: IProps) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setIsReviewModalOpen(true)} variant="outline" className="w-full mt-6">
                Give Review
            </Button>
            <ReviewModal open={isReviewModalOpen} setOpen={setIsReviewModalOpen} courseId={courseId} userId={userId}/>
        </>
    )
}