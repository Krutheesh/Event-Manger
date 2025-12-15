import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    // Event Reference
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Attendee info
    attendeeName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    attendeeEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    // QR Code (unique identifier for entry)
    qrCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 8,
      maxlength: 200,
    },

    // Check-in
    checkedIn: {
      type: Boolean,
      default: false,
      required: true,
    },

    checkedInAt: {
      type: Number,
      default: null,
    },

    // Status
    status: {
      type: String,
      required: true,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },

    // Registration timestamp
    registeredAt: {
      type: Number,
      required: true,
      default: () => Date.now(),
    },
  },
  {
    timestamps: false, // You are storing numeric timestamps manually
  }
);

// ---------------------------------------------------
// Indexes (matching Convex)
// ---------------------------------------------------
RegistrationSchema.index({ eventId: 1 });
RegistrationSchema.index({ userId: 1 });
RegistrationSchema.index({ eventId: 1, userId: 1 });
RegistrationSchema.index({ qrCode: 1 }, { unique: true });

// Prevent duplicate registration for the same event by the same user
RegistrationSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true }
); // Industry-standard protection

export default mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);
