import { safeHandler } from "@/lib/safeHandler";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export const GET = safeHandler( async () => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(3);
  console.log("Featured events fetched:", events);
  return NextResponse.json({
    success:true,
    message:"Featured events fetched successfully",
    data:events,
    status:events?.status|| 200
  })
})