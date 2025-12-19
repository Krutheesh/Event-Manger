import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { safeHandler } from "@/lib/safeHandler";

export const POST = safeHandler(async (req) => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
   
  }

  const body = await req.json();
  const { location, interests } = body;

  if (!location || !interests || interests.length < 3) {
    throw new Error("Invalid onboarding data");
   
  }

  const user = await User.findOne({
    tokenIdentifier: clerkUser.id,
  });

  if (!user) {
    throw new Error("User not found");
    
  }

  user.location = location;
  user.interests = interests;
  user.hasCompletedOnboarding = true;
  user.updatedAt = Date.now();

  await user.save();

  return NextResponse.json({
    success: true,
    userId: user._id,
    status: 200,
  });
});
