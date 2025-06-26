import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { getUserByEmail } from "../../../../../queries/users";
import { dbConnect } from "../../../../../service/mongo";

export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await dbConnect();
  try {
    const user = await getUserByEmail(session.user?.email as string);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
