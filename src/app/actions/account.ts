"use server";

import { revalidatePath } from "next/cache";
import { IUser, User } from "../../../model/user-model";

export async function updateUserDetails(email: string, updatedData: IUser) {
  try {
    const user = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
    });

    if (!user) {
      return { ok: false, statusText: "User not found" };
    }
    revalidatePath("/account");

    return {
      ok: true,
      statusText: "Success",
    };
  } catch (error) {
    console.error("Failed to update user details:", error);
    return {
      ok: false,
      statusText: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
