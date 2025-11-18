import {replaceMongoIdInObject} from "@/lib/convertData";
import {IUser, User} from "../model/user-model";

export async function getUserByEmail(email: string) {
    const user = await User.findOne({
        email,
    }).lean();
    return replaceMongoIdInObject(user as unknown as IUser);
}

export async function getUserById(id: string) {
    try {
        const user = await User.findById(id).lean();
        return replaceMongoIdInObject(user as unknown as IUser);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllUsers(withAdmins = false) {
    try {
        const users = withAdmins ? await User.find({}).lean() : await User.find({
            role: {
                $in: ['STUDENT', 'INSTRUCTOR']
            }
        });
        return JSON.parse(JSON.stringify(users)) as unknown as IUser[];
    } catch (error) {
        console.error(error);
        throw error;
    }
}
