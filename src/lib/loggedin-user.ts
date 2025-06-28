import "server-only";
import { auth } from "../../auth";
import { getUserByEmail } from "../../queries/users";
import { IUser } from "../../model/user-model";

export async function getLoggedInUser(): Promise<IUser | null> {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  const user = await getUserByEmail(session.user?.email as string);
  return user as IUser;
}
