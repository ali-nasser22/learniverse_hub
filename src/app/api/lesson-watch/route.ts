import {NextRequest, NextResponse} from "next/server";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {getLessonById} from "../../../../queries/lessons";
import {ILesson} from "../../../../model/lesson-model";
import {getModuleBySlug} from "../../../../queries/modules";
import {IModule} from "../../../../model/module-model";
import {IWatch, Watch} from "../../../../model/watch-model";
import {dbConnect} from "../../../../service/mongo";
import {createWatchReport} from "../../../../queries/reports";

const STARTED = "started";
const COMPLETED = "completed";

async function updateReport(userId: string, courseId: string, moduleId: string, lessonId: string) {
    try {
        await createWatchReport({
            userId,
            courseId,
            moduleId,
            lessonId,
        })
    } catch (error) {
        console.log(error)
    }
}


export async function POST(req: NextRequest) {
    await dbConnect();
    const {courseId, lessonId, moduleSlug, status, lastTime} = await req.json();
    const loggedInUser = await getLoggedInUser();
    const lesson = await getLessonById(lessonId) as unknown as ILesson;
    const moduleData = await getModuleBySlug(moduleSlug) as unknown as IModule;


    if (!loggedInUser) {
        return new NextResponse('you are not authenticated', {
            status: 401
        });
    }

    if (status !== STARTED && status !== COMPLETED) {
        return new NextResponse("InValid Status. Can't be processed", {
            status: 500
        })
    }
    if (!lesson) {
        return new NextResponse("Invalid Lesson. Can't be processed", {
            status: 500
        })
    }

    const watchEntry = {
        lastTime,
        status,
        lesson: lessonId,
        module: moduleData.id,
        user: loggedInUser.id,
    }

    try {
        const found = await Watch.findOne({
            lesson: lessonId,
            module: moduleData.id,
            user: loggedInUser.id,
        }).lean() as unknown as IWatch;
        if (status === STARTED) {
            if (!found) {
                await Watch.create(watchEntry)
            }
        } else if (status === COMPLETED) {
            if (!found) {
                await Watch.create(watchEntry)
                await updateReport(loggedInUser.id, courseId, moduleData.id!, lessonId)
            } else {
                if (found.status === STARTED) {
                    // @ts-ignore
                    watchEntry['modified_at'] = Date.now();
                    await Watch.findByIdAndUpdate(found._id, {
                        status: COMPLETED,
                    })
                    await updateReport(loggedInUser.id, courseId, moduleData.id!, lessonId)
                }
            }
        }
        return new NextResponse('Watch Record Added Successfully', {
            status: 200
        })
    } catch (error) {
        console.error(error);
        // @ts-ignore
        return new NextResponse(error.message, {
            status: 500
        })
    }
}

