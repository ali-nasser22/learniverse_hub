import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { getCourseById } from "../../../../queries/courses";
import { stripe } from "@/lib/stripe";

interface SuccessProps {
  searchParams: { session_id: string; courseId: string };
}

const Success: React.FC<SuccessProps> = async ({ searchParams }) => {
  const { session_id, courseId } = searchParams;
  if (!session_id) {
    throw new Error("No session_id found");
  }
  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const course = await getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const loggedInUser = await getUserByEmail(userSession.user.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center py-32">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-green-500 rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! Your Enrollment was Successful
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="#">Go to Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
