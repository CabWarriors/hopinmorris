import mongoose, { Schema, models } from "mongoose";

const locationSchema = new Schema(
  {
    LocationName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    Longtitude: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true
  }
);

export const Location = mongoose.model("Location", locationSchema);