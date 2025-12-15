import { safeHandler } from "@/lib/safeHandler";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export const GET = safeHandler( async () => {
  const categoryCounts = await Event.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  console.log("Event category counts fetched:", categoryCounts);    
  return NextResponse.json({
    success:true,
    message:"Event category counts fetched successfully",
    data:categoryCounts,
    status:categoryCounts?.status|| 200
  })
}
)
