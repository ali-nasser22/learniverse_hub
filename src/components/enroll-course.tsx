"use client";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/app/actions/stripe";

type EnrollCourseProps = {
  asLink?: boolean;
  courseId?: string;
};

const EnrollCourse = ({ asLink, courseId }: EnrollCourseProps) => {
  const handleEnroll = async (courseId: string) => {
    const { url } = await createCheckoutSession(courseId);
    window.location.assign(url as string);
  };
  return (
    <>
      <form action={() => handleEnroll(courseId as string)}>
        {courseId && <input type="hidden" name="courseId" value={courseId} />}
        {asLink ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button type="submit" className={cn(buttonVariants({ size: "lg" }))}>
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
