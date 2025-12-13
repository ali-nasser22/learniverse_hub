import {NextRequest, NextResponse} from 'next/server';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {getLoggedInUser} from "@/lib/loggedin-user";
import {getCourseList} from "../../../../queries/courses";
import {getEnrolledCoursesForUser} from "../../../../queries/enrollement";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const {message, conversationHistory} = await request.json();


        const user = await getLoggedInUser();
        if (!user) {
            return NextResponse.json(
                {error: 'User not authenticated'},
                {status: 401}
            );
        }


        const isRelevant = await checkMessageRelevance(message);
        if (!isRelevant) {
            return NextResponse.json({
                response: "I am sorry I don't answer such questions. I'm here to help you find the best courses for your learning journey.",
                courses: [],
            });
        }


        const allCourses = await getCourseList(false);


        const enrolledCourses = await getEnrolledCoursesForUser(user.id);
        const enrolledCourseIds = enrolledCourses.map((enrollment: any) =>
            enrollment.course?.id || enrollment.course?._id
        );


        const simplifiedCourses = allCourses.map((course: any) => ({
            id: course.id || course._id,
            title: course.title,
            subtitle: course.subtitle,
            price: course.price,
            category: course.category?.title || 'Uncategorized',
            instructor: course.instructor?.firstName && course.instructor?.lastName
                ? `${course.instructor.firstName} ${course.instructor.lastName}`
                : 'Unknown',
        }));


        const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});

        const prompt = `You are a course recommendation assistant for Learniverse Hub platform.

User's request: "${message}"

Available courses:
${JSON.stringify(simplifiedCourses, null, 2)}

User's enrolled course IDs: ${enrolledCourseIds.join(', ') || 'None'}

${conversationHistory && conversationHistory.length > 0 ? `Previous conversation:\n${conversationHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}` : ''}

Instructions:
1. Recommend 1-2 courses that best match the user's request
2. DO NOT recommend courses the user is already enrolled in
3. Consider price filters if mentioned (e.g., "under $50", "free courses")
4. Provide a brief, friendly explanation for why these courses fit

Return your response in this EXACT JSON format (no markdown, no code blocks):
{
  "message": "Your friendly explanation here",
  "recommendedCourses": [
    {"id": "course_id_1"},
    {"id": "course_id_2"}
  ]
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let parsedResponse;
        try {

            const cleanedResponse = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();
            parsedResponse = JSON.parse(cleanedResponse);
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', responseText);
            return NextResponse.json({
                response: responseText,
                courses: [],
            });
        }


        const recommendedCourses = parsedResponse.recommendedCourses
            .map((rec: any) =>
                allCourses.find((course: any) =>
                    (course.id || course._id) === rec.id
                )
            )
            .filter(Boolean)
            .map((course: any) => ({
                id: course.id || course._id,
                title: course.title,
                description: course.subtitle || '',
                price: course.price,
                thumbnail: course.thumbnail,
                instructor: course.instructor?.firstName && course.instructor?.lastName
                    ? `${course.instructor.firstName} ${course.instructor.lastName}`
                    : 'Unknown',
            }));

        return NextResponse.json({
            response: parsedResponse.message,
            courses: recommendedCourses,
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            {error: 'Failed to process request'},
            {status: 500}
        );
    }
}


async function checkMessageRelevance(message: string): Promise<boolean> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({model: 'gemini-2.5-flash'});

    const prompt = `Is this message related to learning, courses, education, skills, or requesting course recommendations? 
Message: "${message}"

Respond with ONLY "yes" or "no".`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text().toLowerCase().trim();
        return response.includes('yes');
    } catch (error) {
        
        return true;
    }
}