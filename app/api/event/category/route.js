// import { safeHandler } from "@/lib/safeHandler";
// import Event from "@/models/eventModel";
// import { NextResponse } from "next/server";

// export const GET = safeHandler( async () => {
//   const categories = await Event.distinct("category");
//   //("Event categories fetched:", categories);
//   return NextResponse.json({
//     success:true,

//     message:"Event categories fetched successfully",
//     data:categories,
//     status:categories?.status|| 200
//   })
// })
