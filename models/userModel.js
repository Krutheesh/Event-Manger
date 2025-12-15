import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Clerk Auth
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 120,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    tokenIdentifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 100, // Clerk IDs usually < 50 chars
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50, // Industry standard max name length
    },

    imageUrl: {
      type: String,
      default: null,
      maxlength: 500,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
        "Invalid image URL",
      ],
    },

    // Onboarding
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
      required: true,
    },

    // Attendee Preferences
    location: {
      city: { type: String, trim: true, maxlength: 100 },
      state: { type: String, trim: true, maxlength: 100 },
      country: { type: String, trim: true, maxlength: 100 },
    },

    interests: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 20; // avoid abuse
        },
        message: "Too many interests selected",
      },
      default: [],
    },

    // Organizer Tracking
    freeEventsCreated: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 10, // safety limit (your real limit is 1 free, but max is safe)
    },

    // Timestamps
    createdAt: {
      type: Number,
      default: () => Date.now(),
      required: true,
    },

    updatedAt: {
      type: Number,
      default: () => Date.now(),
      required: true,
    },
  },
  {
    timestamps: false, // Keeping numeric timestamps
  }
);

// Index
UserSchema.index({ tokenIdentifier: 1 });

// Auto-update `updatedAt`
UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("User", UserSchema);
