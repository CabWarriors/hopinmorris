import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    carBrand: {
      type: String,
    },
    carLicencePlate: {
      type: String,
    },
    rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "ride" }],
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", userSchema);
