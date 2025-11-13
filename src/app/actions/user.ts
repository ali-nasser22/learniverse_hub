"use server";


import {auth} from "../../../auth";
import {getUserByEmail} from "../../../queries/users";
import {IUser} from "../../../model/user-model";

export async function getCurrentUserRole() {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const user = await getUserByEmail(session.user.email!);
    return user as IUser;
}