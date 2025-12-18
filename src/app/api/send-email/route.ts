import {NextRequest, NextResponse} from "next/server";
import {sendEmails} from "@/lib/emails";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();


        if (!body.emails || !Array.isArray(body.emails)) {
            return NextResponse.json(
                {error: "Invalid request format"},
                {status: 400}
            );
        }


        const results = await sendEmails(body.emails);


        const allSuccessful = results.every((r) => r.success);

        return NextResponse.json(
            {
                results,
                success: allSuccessful
            },
            {status: allSuccessful ? 200 : 207}
        );
    } catch (error) {
        console.error("Email API error:", error);
        return NextResponse.json(
            {error: "Failed to send emails"},
            {status: 500}
        );
    }
}