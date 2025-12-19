// app/api/users/store/route.js
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { safeHandler } from "@/lib/safeHandler";

export const POST = safeHandler(async () => {
  // console.log("-------- store user called");
  const clerkUser = await currentUser();
// console.log("-------- clerkUser", clerkUser);
  if (!clerkUser?.id) {
    throw new Error("Unauthorized");
  }


  // const clerkUser = await currentUser();

  const now = Date.now();

  let user = await User.findOne({
    tokenIdentifier: clerkUser.id,
  });

  // ✅ User exists → update if needed
  if (user) {
    let updated = false;

    if (user.name !== clerkUser.fullName) {
      user.name = clerkUser.fullName ?? "Anonymous";
      updated = true;
    }

    if (user.email !== clerkUser.primaryEmailAddress?.emailAddress) {
      user.email = clerkUser.primaryEmailAddress?.emailAddress ?? "";
      updated = true;
    }

    if (user.imageUrl !== clerkUser.imageUrl) {
      user.imageUrl = clerkUser.imageUrl;
      updated = true;
    }

    if (updated) {
      user.updatedAt = now;
      await user.save();
    }

    return NextResponse.json({ userId: user._id });
  }

  // ✅ New user → insert
  user = await User.create({
    email: clerkUser.primaryEmailAddress?.emailAddress ?? "",
    tokenIdentifier: clerkUser.id,
    name: clerkUser.fullName ?? "Anonymous",
    imageUrl: clerkUser.imageUrl,

    hasCompletedOnboarding: false,
    freeEventsCreated: 0,

    createdAt: now,
    updatedAt: now,
  });

  return NextResponse.json({
    success: true,
    userId: user._id,
    status: user?.status || 201,
  });
});
