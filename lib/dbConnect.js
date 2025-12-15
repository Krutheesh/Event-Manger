import mongoose from "mongoose";
import Event from "../models/eventModel.js";
let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    console.log("Reusing existing database connection");
    return;
  }
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("New database connection established");

    // Here are **3 short real-life errors** that `mongoose.connection.on("error")` catches **after connecting**:

    // 1. **“MongoDB connection dropped because the internet went down after initial connection.”**
    // 2. **“A running query failed due to a temporary MongoDB server restart.”**
    // 3. **“Network interruption caused MongoDB to lose the active connection mid-request.”**

    mongoose.connection.on("error", (err) => {
      console.log("Database connection error:", err);
    });

  
  } catch (err) {
    console.log(err, err?.message);
   
    throw new Error("Database connection failed");
  }
}

export default dbConnect;
