// models/User.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  // Clerk auth
  email: { type: String, required: true },
  tokenIdentifier: {
    type: String, // Clerk user ID
    required: true,
    unique: true,
    index: true, // same as by_token
  },
  name: { type: String, required: true },
  imageUrl: { type: String },

  // Onboarding
  hasCompletedOnboarding: { type: Boolean, default: false },

  // Attendee preferences
  location: { type: LocationSchema },
  interests: [{ type: String }],

  // Organizer tracking
  freeEventsCreated: { type: Number, default: 0 },

  // Timestamps (Convex-style numbers)
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
