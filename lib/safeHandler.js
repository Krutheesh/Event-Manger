import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const safeHandler = (handler) => {
  return async (req) => {
    try {
      await dbConnect();
      return await handler(req);
    } catch (error) {
      //("Error in safeHandler:", error);

      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Internal Server Error",
        },
        {
          status: error?.status || 500,
        }
      );
    }
  };
};
