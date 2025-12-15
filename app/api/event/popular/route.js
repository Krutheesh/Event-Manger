import { safeHandler } from "@/lib/safeHandler";
import Event from "@/models/eventModel";  
import { NextResponse } from "next/server";

export const GET = safeHandler( async () => {
  const events = await Event.find().sort({ createdAt: -1 }).limit(5);
  console.log("Popular events fetched:", events); 
  return NextResponse.json({
    success:true,
    message:"Popular events fetched successfully",
    data:events,
    status:events?.status|| 200
  })
})  
