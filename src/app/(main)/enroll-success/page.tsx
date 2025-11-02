import {Button} from "@/components/ui/button";
import {CircleCheck, CircleX} from "lucide-react";
import Link from "next/link";
import {auth} from "../../../../auth";
import {redirect} from "next/navigation";
import {getCourseById} from "../../../../queries/courses";
import {stripe} from "@/lib/stripe";
import {getUserByEmail} from "../../../../queries/users";
import Stripe from "stripe";
import {sendEmails} from "../../../lib/emails";
import {addEnrollment} from "../../../../queries/enrollement";
import {IUser} from "../../../../model/user-model";
import {ICourse} from "../../../../model/course-model";

interface SuccessProps {
    searchParams: { session_id: string; courseId: string };
}

const Success: React.FC<SuccessProps> = async ({searchParams}) => {
    const {session_id, courseId} = await searchParams;
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

    const loggedInUser = await getUserByEmail(userSession.user?.email as string);

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    const paymentIntent = checkoutSession?.payment_intent as Stripe.PaymentIntent;
    const paymentIntentStatus = paymentIntent?.status;

    if (paymentIntentStatus === "succeeded") {
        // update enrolledCourses in enrollment
        const enrollment = await addEnrollment({
            enrollment_date: new Date(),
            status: "not_started",
            method: paymentIntent.payment_method_types?.[0] as string,
            course: course.id as unknown as ICourse,
            student: loggedInUser?.id as unknown as IUser,
        });

        console.log("Enrollment added successfully", enrollment);

        // TODO: buy the domain name to fully function the feature

        // send email to student
        const studentEmailInfo = [
            {
                to: loggedInUser?.email as string,
                subject: "Enrollment Successful",
                message: `Congratulations ${loggedInUser?.firstName}, Your Enrollment was Successful for ${course.title}`,
            },
        ];
        const studentEmailResponse = await sendEmails(studentEmailInfo);
        console.log("Student email sent successfully", studentEmailResponse);

        // send email to instructor
        const instructorEmailInfo = [
            {
                to: course.instructor?.email as string,
                subject: "New Enrollment",
                message: `Congratulations Mr. ${course.instructor?.lastName}, A new enrollment was made for ${course.title} by ${loggedInUser?.firstName} ${loggedInUser?.lastName} with email ${loggedInUser?.email}`,
            },
        ];
        const instructorEmailResponse = await sendEmails(instructorEmailInfo);
        console.log("Instructor email sent successfully", instructorEmailResponse);
    }

    return paymentIntentStatus === "succeeded" ? (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center py-32">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                <CircleCheck className="w-32 h-32 bg-green-500 rounded-full p-0 text-white"/>
                <h1 className="text-xl md:text-2xl lg:text-3xl">
                    Congratulations{" "}
                    <span className="font-bold text-cyan-500">
            {loggedInUser?.firstName},
          </span>{" "}
                    Your Enrollment was Successful for{" "}
                    <span className="font-bold text-cyan-500">{course.title}</span>
                </h1>
                <div className="flex items-center gap-3">
                    <Button asChild size="sm">
                        <Link href="/courses">Browse Courses</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/courses/${courseId}/lesson`}>Go to Course</Link>
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center py-32">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                <CircleX className="w-32 h-32 bg-red-500 rounded-full p-0 text-white"/>
                <h1 className="text-xl md:text-2xl lg:text-3xl">Payment Failed</h1>
                <p className="text-sm text-gray-500">
                    Please try again or contact support if the problem persists.
                </p>
                <Button asChild variant="outline" size="sm">
                    <Link href="/courses">Browse Courses</Link>
                </Button>
            </div>
        </div>
    );
};

export default Success;
