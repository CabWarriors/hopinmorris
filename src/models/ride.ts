import mongoose, { Schema, models } from "mongoose";

const rideSchema = new Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
    },
    seats: {
      type: Number,
      required: true,
    },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export const Ride = models.Ride || mongoose.model("Ride", rideSchema);
