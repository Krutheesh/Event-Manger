import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/eventModel";
/**
 * ============================
 * GET /api/events
 * Fetch all events
 * ============================
 */

export async function GET(){
  try {
    await dbConnect();
    console.log("iam from server route")
    const result = await Event.find().sort({ createdAt: -1 });
  
    return NextResponse.json(
 { success: true, message: "Events fetched successfully",data:result},
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching events:", error);
    return NextResponse.json(
       { success: false, message: "Error fetching events", error: error.message },
      { status: 500 }
    );
  }
}