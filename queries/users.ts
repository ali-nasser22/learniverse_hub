import { replaceMongoIdInObject } from "@/lib/convertData";
import { IUser, User } from "../model/user-model";

export async function getUserByEmail(email: string) {
  const user = await User.findOne({
    where: {
      email,
    },
  }).lean();
  return replaceMongoIdInObject(user as unknown as IUser);
}
