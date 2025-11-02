'use client'
import {Button} from "@/components/ui/button";
import {ReviewModal} from "@/app/(main)/courses/[id]/lesson/_components/review-modal";
import {useState} from "react";


export const GiveReviewModal = () => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setIsReviewModalOpen(true)} variant="outline" className="w-full mt-6">
                Give Review
            </Button>
            <ReviewModal open={isReviewModalOpen} setOpen={setIsReviewModalOpen}/>
        </>
    )
}