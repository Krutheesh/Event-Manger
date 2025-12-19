import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { safeHandler } from "@/lib/safeHandler";

export const GET = safeHandler(async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({
    tokenIdentifier: clerkUser.id,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return NextResponse.json({
    success: true,
    data: user,
    status: 200,
  });
});
