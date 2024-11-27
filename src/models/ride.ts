import mongoose, { Schema, models } from "mongoose";

const rideSchema = new Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    endLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
    departureTime: {
      type: Date,
    },
    seats: {
      type: Number,
      required: true,
    },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { 
    timestamps: true
  }
);

export const Ride = mongoose.model("Ride", rideSchema);