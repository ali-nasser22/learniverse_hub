import { replaceMongoIdInObject } from "@/lib/convertData";
import { IUser, User } from "../model/user-model";

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
