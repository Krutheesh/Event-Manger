import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "Untitled Event" },
    description: { type: String, trim: true, default: "" },

    // Organizer
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    organizerName: { type: String, trim: true, default: "Unknown Organizer" },

    // Event details
    category: { type: String, trim: true, default: "general" },
    tags: { type: [String], default: [] },

    // Date & Time
    startDate: { type: Number, default: () => Date.now() },
    endDate: { type: Number, default: () => Date.now() + 2 * 60 * 60 * 1000 }, // 2 hours by default
    timezone: { type: String, default: "Asia/Kolkata" },

    // Location
    locationType: { type: String, enum: ["physical", "online"], default: "physical" },
    venue: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "Unknown City" },
    state: { type: String, default: "" },
    country: { type: String, default: "India" },

    // Capacity & Ticketing
    capacity: { type: Number, default: 50 },
    ticketType: { type: String, enum: ["free", "paid"], default: "free" },
    ticketPrice: { type: Number, default: 0 },
    registrationCount: { type: Number, default: 0 },

    // Customization
    coverImage: { type: String, default: "" },
    themeColor: { type: String, default: "#000000" },

    // Timestamps
    createdAt: { type: Number, default: () => Date.now() },
    updatedAt: { type: Number, default: () => Date.now() },
  },
  {
    timestamps: true,
    collection: "events",
  }
);

// Indexes
eventSchema.index({ organizerId: 1 }, { name: "by_organizer" });
eventSchema.index({ category: 1 }, { name: "by_category" });
eventSchema.index({ startDate: 1 }, { name: "by_start_date" });
eventSchema.index({ title: "text" }, { name: "search_title" });

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
