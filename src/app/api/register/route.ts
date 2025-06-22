import { dbConnect } from "../../../../service/mongo";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../model/user-model";

export const POST = async (req: NextRequest) => {
  const { firstName, lastName, email, password, userRole } = await req.json();

  await dbConnect();

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: userRole.toUpperCase(),
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
