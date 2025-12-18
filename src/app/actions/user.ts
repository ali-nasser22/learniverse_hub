"use server";

interface Admin {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    designation: string,
}

import {auth} from "../../../auth";
import {getUserByEmail} from "../../../queries/users";
import {IUser, User} from "../../../model/user-model";

export async function getCurrentUserRole() {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    const user = await getUserByEmail(session.user.email!);
    return user as IUser;
}

export async function addNewAdmin(user: Admin) {
    try {
        const admin = await User.create(user);
        return {
            admin: JSON.parse(JSON.stringify(admin)),
            success: true,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        }
    }
}