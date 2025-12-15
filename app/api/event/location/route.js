import { safeHandler } from "@/lib/safeHandler";
import Event from "@/models/eventModel";
import { NextResponse } from "next/server";

export const GET = safeHandler( async () => {

const events = await Event.find({
       // upcoming events
  state: /telangana/i,
  city: /hyderabad/i,
})
  .sort({ startDate: 1 })       // nearest events first
  .limit(4);
console.log(events,"events in hyderabad");
  return NextResponse.json({
    success:true,
    message:"Events in Hyderabad, Telangana fetched successfully",
    data:events,
    status:events?.status|| 200
  })
})