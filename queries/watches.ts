import {IWatch, Watch} from "../model/watch-model";
import {replaceMongoIdInObject} from "@/lib/convertData";

export async function getWatchForUser(userId: string, moduleId: string, lessonId: string) {
    try {
        const watch = await Watch.findOne({
            user: userId,
            lesson: lessonId,
            module: moduleId
        }).lean()
        return replaceMongoIdInObject(watch as unknown as IWatch);
    } catch (err) {
        console.log(err);
        return null;
    }
}